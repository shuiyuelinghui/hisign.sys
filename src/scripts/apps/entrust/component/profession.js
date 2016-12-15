/*import _ from 'underscore';*/

export default class ProfessionController {

    constructor(
        $scope,
        $timeout,
        $compile,
        toaster,
        UtilityService,
        AdmindesignsService,
        EntrustAcceptDataCenterService,
        CommonDataService,
        ProfessionDataService
    ) {

        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$compile = $compile;
        this.toaster = toaster;
        this.utilityService = UtilityService;
        this.admindesignsService = AdmindesignsService;
        this.dcService = EntrustAcceptDataCenterService;
        this.professionDataService = ProfessionDataService;
        this.commonDataService = CommonDataService;

        this.proData = [];
        this.categoryData = [];
        this.requireData = [];
        this.categorySelectModelNameList = [];
        this.requireSelectModelNameList = [];

        this.JSON = JSON;
        this.ss;

        this.serverCode = this.dcService.submission.serverCode;
        this.proTmpl =
                '<div class="slide-content">'+
                    '{{if !disabled}}'+
                    '<span class="fa fa-edit fa-edit-pro"></span>'+
                    '<span class="fa fa-minus-circle fa-minus-circle-pro"></span>'+
                    '{{/if}}'+
                    '<div class="pro-name">'+
                        '<p>${proName}</p>'+
                    '</div>'+
                    '<div class="pro-content">'+
                        '<h1>${cateName}</h1>'+
                        '<p>'+
                            '<span>${requireName}</span>'+
                        '</p>'+
                    '</div>'+
                '</div>';

        this.editProData = {};
        this.editMode = false;
        this.editDefaultRequireData = [];
        this.editCustomRequireData = [];
        this.editIndex;
        this.popoverInstance;

        this.proSelectCount = 0;
    }

    $onInit() {
        this.$timeout(() => {
            let con = $('#pro_slide'),
                submissionData = this.dcService.submission,
                pl;

            if(this.dcService.activeState === 'app.accept' || this.dcService.flag === '2') {
                this.proData.push({
                    section: submissionData.section,
                    sectionName: submissionData.sectionName
                });
                this.fetchCategoryList();
                this.fetchRequireList(0, submissionData.identifyCategory);
            } else {
                this.fetchProfessionList();
            }

            this.initSlide();

            if(this.dcService.mode !== 'display') {
                pl = this.dcService.professionList[0];
                this.addProfession(pl.profession, pl.category, pl.require);
            }
            con.on('click', '.fa-minus-circle-pro', (e) => {
                let t = $(e.target),
                    index = $('.fa-minus-circle', con).index(t);

                this.deleteProfession(index);
            });
            con.on('click', '.fa-edit-pro', (e) => {
                let t = $(e.target),
                    index = $('.fa-edit', con).index(t);

                this.editProfession(index);
            });

            $('.panel').on('click', '#add_pro', (e) => {
                if(this.editIndex === -1) return;
                this.initEditProfessionPopover(-1);
            });
        });

        this.$scope.$on('proPopoverHidden', () => {
            this.resetEditProPopoverData();
        });
    }

    initSlide() {
        this.ss = this.admindesignsService.initSlickSlide('pro-slide', {
            arrows: true,
            dots: false,
            slidesToShow: 3,
            slidesToScroll: 3,
            prevArrow: '<span class="ss-prev fa fa-chevron-left"></span>',
            nextArrow: '<span class="ss-next fa fa-chevron-right"></span>'
        });
    }

    buildModelNameList(length) {
        let i;
        for(i = 0; i < length; i++) {
            this.categorySelectModelNameList.push('proCate_'+i);
            this.requireSelectModelNameList.push('proRequire_'+i);
        }
    }

    fetchProfessionList() {
        let params = {
            serverCode: this.serverCode,
            noUserId: true
        };

        this.commonDataService.fetchProfessionList(params)
            .then((response) => {

                if(this.filterdna) {
                    //remove DNA for non-DNA professions
                    if(!this.isdna) {
                        let index = 0;
                        for(let item of response) {
                            //TODO: add to constants
                            if(item.numberCode == 3) {
                                response.splice(index, 1);
                            }

                            index++;
                        }
                    }
                    else { //keep only DNA
                        let index = 0;
                        for(let item of response) {
                            //TODO: add to constants
                            if(item.numberCode == 3) {
                                response = response.splice(index, 1);
                                break;
                            }

                            index++;
                        }
                    }
                }

                this.buildModelNameList(response.length);
                this.proData = response;
                this.fetchCategoryList();
            });
    }

    fetchCategoryList() {
        for(let i = 0, len = this.proData.length; i < len; i++) {
            let params = {
                serverCode: this.serverCode,
                section: this.proData[i].section
            };
            this.categoryData.push('');
            this.professionDataService.fetchCategoryList(params)
                .then((response) => {
                    this.categoryData[i] = response;
                    this.requireData.push('');
                    if(!response.length) this.fetchRequireList(i, '');
                });
        }
    }

    fetchRequireList(index, code) {
        let params = {
            serverCode: this.serverCode,
            section: this.proData[index].section,
            identifyCategoryCode: code
        };

        return this.professionDataService.fetchRequireList(params)
            .then(response => {
                this.requireData.splice(index, 1, response);
            });
    }

    calculateProSelectCount(e) {
        let checked = $(e.target).prop('checked');
        if(checked) this.proSelectCount++;
        else this.proSelectCount--;
    }

    splitRequireList(list) {
        let require = {name: [], code: []};
        list.forEach((item) => {
            try {
                item = JSON.parse(item);
                if(typeof item === 'object') {
                    require.name.push(item.name);
                    require.code.push(item.code);
                } else {
                    require.name.push(item);
                }
            } catch(e) {
                require.name.push(item);
            }
        });

        require.name = require.name.join(',');
        require.code = require.code.join(',');

        return require;
    }

    mergeProfessionList(pro, cate, require) {
        let i, len,
            result = false;

        for(i = 0, len = this.dcService.professionList.length; i < len; i++) {
            let item = this.dcService.professionList[i];

            if(
                item.profession.code === pro.code &&
                (item.category.code === cate.code || typeof cate !== 'object')
            ) {
                let itemRequireCodeAry = item.require.code.split(','),
                    itemRequireNameAry = item.require.name.split(','),
                    requireCodeAry = require.code.split(','),
                    requireNameAry = require.name.split(',');

                if(_.difference(requireNameAry, itemRequireNameAry).length) {
                    item.require.code = _.union(itemRequireCodeAry, requireCodeAry).join(',');
                    item.require.name = _.union(itemRequireNameAry, requireNameAry).join(',');
                    $('#pro_slide .slide-content .pro-content span').eq(i).html(item.require.name);
                } else {
                    this.toaster.pop('error', null, '相同专业和鉴定类型不可以重复添加');
                }
                result = true;
                break;
            }
        }

        return result;
    }

    addProfession(pro, cate, require, disabled = false, index) {
        let data = {
                proName: pro.name,
                cateName: cate.name,
                requireName: require.name,
                disabled: disabled
            },
            slide = $.tmpl(this.proTmpl, data),
            content = '<div class="slide-content">'+slide.html()+'</div>';

        if(this.utilityService.isEmpty(index)) {
            this.ss.slickAdd(content);
        } else {
            this.ss.slickAdd(content, index);
            this.ss.slickRemove(index);
        }
    }

    saveProfession(index) {
        let checkList;

        this.closePopover();
        checkList = $('#pro_popover input[type="checkbox"]:checked');

        for(let i = 0, len = checkList.length; i < len; i++) {

            let cb = $(checkList[i]),
                pro = JSON.parse(cb.attr('data-pro')),
                cate = JSON.parse(cb.attr('data-category')),
                require = this.splitRequireList(JSON.parse(cb.attr('data-require'))),
                data = {
                    profession: pro,
                    category: cate,
                    require
                };

            if(this.mergeProfessionList(pro, cate, require)) continue;
            this.addProfession(pro, cate, require, false, index);
            if(this.utilityService.isEmpty(index)) {
                this.dcService.professionList.push(data);
            } else {
                this.dcService.professionList.splice(index, 0, data);
            }
        }
        this.editIndex = null;
    }

    saveEditProfession() {
        this.dcService.professionList.splice(this.editIndex, 1);
        this.saveProfession(this.editIndex);
    }

    updateProfession() {
        if(this.editMode) this.saveEditProfession();
        else {
            this.saveProfession();
            $('#add_pro').replaceWith($('<div id="add_pro">+</div>'));
        }
    }

    deleteProfession(index) {
        this.$scope.$apply(() => {
            this.dcService.professionList.splice(index, 1);
        });
        if(index === this.editIndex && this.popoverInstance) {
            this.popoverInstance.popover('destroy');
        }
        this.ss.slickRemove(index);
    }

    buildEditProfessionRequireData(editData, requireData) {
        let requireList = editData.require.name.split(',');

        for(let i = 0, len = requireList.length; i < len; i++) {
            let index;
            if(requireData === '') {
                index = -1;
            } else {
                index = this.utilityService.findArrayIndexByObjValue(requireData, 'value', requireList[i]);
            }
            if(index >= 0) {
                this.editDefaultRequireData.push({
                    name: requireList[i],
                    code: requireData[index].id
                });
            } else {
                this.editCustomRequireData.push(requireList[i]);
                this.editDefaultRequireData.push(requireList[i]);
            }
        }
    }

    initEditProfessionPopover(index) {
        let url = './templates/apps/entrust/popover/profession-list.html',
            con,
            popover;

        if(index >= 0) {
            con = $('#pro_slide');
            popover = con.find('.slide-content').eq(index);
        } else {
            popover = $('#add_pro');
        }
        
        if(this.popoverInstance) {
            this.resetEditProPopoverData();
            this.popoverInstance.popover('hide');
            this.popoverInstance.popover('destroy');
        }

        this.editIndex = index;
        this.popoverInstance = popover;

        this.utilityService.asyncGet(url)
            .then((response) => {
                this.admindesignsService.initBsPopover(popover, {
                    placement: 'bottom',
                    html: true,
                    content: this.$compile(response)(this.$scope),
                    viewport: '.panel',
                    container: con ? con : false,
                });

                popover.popover('show');
            });
    }

    editProfession(index) {
        if(this.editIndex === index) return;
        this.initEditProfessionPopover(index);
        this.editProData = this.dcService.professionList[index];
        this.editMode = true;
        this.fetchRequireList(index, '')
            .then(() => {
                let section = this.editProData.profession.code,
                    i = this.utilityService.findArrayIndexByObjValue(this.proData, 'section', section);

                this.buildEditProfessionRequireData(this.editProData, this.requireData[i]);
            });
    }

    resetEditProPopoverData() {
        this.editProData = {};
        this.editMode = false;
        this.editDefaultRequireData = [];
        this.editCustomRequireData = [];
    }

    isShowAddProfessionBtn() {
        let dcs = this.dcService;
        return (
            dcs.mode !== 'edit' ||
            (dcs.mode === 'edit' && dcs.flag !== '2' && dcs.activeState !== 'app.accept')
        );
    }

    handleProCategoryChange(index, code) {
        this.fetchRequireList(index, code);
        this.$timeout(() => {
            $('#pro_require_'+index).select2('val', []);
        });
    }

    closePopover() {
        this.admindesignsService.closeBsPopover(this.popoverInstance);
    }
}

ProfessionController.$inject = [
    '$scope',
    '$timeout',
    '$compile',
    'toaster',
    'UtilityService',
    'AdmindesignsService',
    'EntrustAcceptDataCenterService',
    'CommonDataService',
    'ProfessionDataService'
];
