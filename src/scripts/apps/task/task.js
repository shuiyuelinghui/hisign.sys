import 'twbs-pagination';
import cookie from 'js-cookie';
import store from 'store';
// import _ from 'underscore';

export default class TaskController {

    constructor(
        $scope,
        $state,
        $stateParams,
        $timeout,
        $compile,
        toaster,
        CommonDataService,
        AdmindesignsService,
        TaskDataService,
        UtilityService,
        CommonService,
        DT_TITLE_MAPPING,
        DT_DEFAULT_SETTING,
        PAGE_ID_MAPPING,
        DT_ACTION_MAPPING,
        DT_TYPE_ACTION_MAPPING,
        DT_SUB_TITLE_MAPPING,
        DT_SUB_TYPE_MAPPING,
        DT_SUB_ACTION_MAPPING,
        NODE_ICON_MAPPING,
        FILE_URL,
        $q
    ) {
        this.$scope = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.$compile = $compile;
        this.toaster = toaster;
        this.dataService = CommonDataService;
        this.taskDataService = TaskDataService;
        this.admindesignsService = AdmindesignsService;
        this.utilityService = UtilityService;
        this.commonService =  CommonService;

        this.slickslide;
        this.slidePerPage = 4;

        this.dtTitleMapping = DT_TITLE_MAPPING;
        this.dtDefaultSetting = Object.assign({}, store.get('dtCustomSetting') || DT_DEFAULT_SETTING);
        this.dtCustomSetting = Object.assign({}, this.dtDefaultSetting);
        this.pageIdMapping = PAGE_ID_MAPPING;
        this.dtActionMapping = DT_ACTION_MAPPING;
        this.dtTypeActionMapping = DT_TYPE_ACTION_MAPPING;
        this.dtSubTitleMapping = DT_SUB_TITLE_MAPPING;
        this.dtSubTypeMapping = DT_SUB_TYPE_MAPPING;
        this.dtSubActionMapping = DT_SUB_ACTION_MAPPING;
        this.nodeIconMapping = NODE_ICON_MAPPING;
        this.fileUrl = FILE_URL;
        this.$q = $q;

        this.taskMenuData = [];
        this.activeMenuIndex;
        this.nodeCode = '';
        this.pageId = $stateParams.pageId;

        this.searchFilterShow = false;
        this.stateName = this.$state.current.name;

        this.dt;
        this.totalRecords = 0;
        this.pageNum = 1;
        this.pageSize = 10;
        this.totalPages;
        this.orderBy = 'insDate';
        this.sort = 'desc';

        this.dtData = [];
        this.searchCondition;
        this.paginationInitialed = false;

        this.titleObj = this.commonService.getTitleObj(this.dtTitleMapping, this.pageId);
    }

    $onInit() {

        this.admindesignsService.initNProgress("#dt_container");

        this.$timeout(()=>{
            this.admindesignsService.initAdminPanel();
        }, 1000);

        //判断是否需要获取节点
        if (this.commonService.isNeedMenu(this.stateName)) {
            this.fetchTaskMenu().then(() => {
                this.fetchSubmissionList();
                if (this.stateName == "app.entrust.select.list" || this.stateName == "app.entrust.select.departmentlist") {
                    this.getSubmStateCategoryCount();
                }


                this.dtOrder();
            }, (err) => {
                console.log(err);
            });
        } else {
            this.fetchSubmissionList();
            if (this.stateName == "app.entrust.select.list" || this.stateName == "app.entrust.select.departmentlist") {
                this.getSubmStateCategoryCount();
            }
            this.dtOrder();
        }


    }

    gotoSlide() {
        let nodeCode = this.utilityService.findObjKeyByValue(this.pageIdMapping, this.pageId),
            slideIndex = this.utilityService.findArrayIndexByObjValue(this.taskMenuData, 'nodeCode', nodeCode),
            index;

        this.nodeCode = nodeCode;
        this.activeMenuIndex = slideIndex;
        index = Math.floor(slideIndex/this.slidePerPage);
        if(index >= 1) this.slickslide.slickGoTo(index*this.slidePerPage);
    }
    
    fetchTaskMenu() {
        var deferred = this.$q.defer();
        this.taskDataService.fetchTaskMenu(this.stateName)
            .then(response => {
                this.taskMenuData = response.nodeDatas;
                store.set("nodeDatas",this.taskMenuData);

                this.nodeCode = this.taskMenuData[0].nodeCode;
                if (this.stateName== "app.task.todo.personal" || this.stateName=="app.task.todo.departments") {
                    if(this.pageId === '') {

                        this.pageId = this.pageIdMapping[this.nodeCode];
                        this.utilityService.goState(this.stateName, {pageId: this.pageId});
                        deferred.reject("goState");
                        return;
                    }

                } 

                this.$timeout(() => {
                    this.slickslide = this.admindesignsService.initSlickSlide('task-slide', {
                        arrows: true,
                        dots: true,
                        dotsClass: 'slick-pagination',
                        slidesToShow: this.slidePerPage,
                        slidesToScroll: this.slidePerPage,
                        prevArrow: '<span class="ss-prev fa fa-chevron-left"></span>',
                        nextArrow: '<span class="ss-next fa fa-chevron-right"></span>'
                    });
                    this.admindesignsService.initSlickSlideTip(this.taskMenuData);
                    this.gotoSlide();
                }, 50);
                deferred.resolve();

            });

        return deferred.promise;
    }

    transformData(raw, titleMapping, dataMapping, type) {
        let i,
            j,
            key,
            innerLen,
            showData = dataMapping[type],
            outerLen = Object.keys(showData).length,
            title = [],
            data = [],
            flc = 0,
            frc = 0;

        for( i = 0; i < outerLen; i++ ) {
            if(!showData[i].display) continue;
            key = showData[i].key;
            title.push({title:this.commonService.getTitleNameByKey(titleMapping, key, this.pageId)});
            // title.push({title:titleMapping[key]});
            if(showData[i]['fixed']) {
                if(i <= outerLen / 2) flc++;
                else frc++;
            }

            for(j = 0, innerLen = raw.length; j < innerLen; j++) {

                if(typeof data[j] === 'undefined') data[j] = [];

                let val = raw[j][key];

                if (this.utilityService.isDate(key) && val !== null) {
                    if (key == "operateTime" || key == "updDate") {
                        val = this.utilityService.formatDate(val, "YYYY-MM-DD hh:mm:ss");
                    } else {
                        val = this.utilityService.formatDate(val, "YYYY-MM-DD");
                    }
                }
                
                data[j].push(val);
            }
        }

        title.push({title:'操作'});
        if (this.stateName != 'app.entrust.select.temporarylist') {
            if(type === this.pageId) title.unshift({title:''});
        }
       
        title.unshift({title:'序号'});
        data.forEach((item) => {
            item.push('');
            if (this.stateName != 'app.entrust.select.temporarylist') {
                if(type === this.pageId) item.unshift('');
            }
            item.unshift('');
        });

        if(type === this.pageId) {
            this.dtData = showData;
        }

        return {title, data, flc, frc};
    }

    fetchSubmissionList(options = {}) {

        NProgress.start();
        let nodeCode = this.utilityService.findObjKeyByValue(this.pageIdMapping, this.pageId),

            params = $.extend(true, {}, {
                searchCondition: {
                    userId: cookie.get('userId'),
                    submState: nodeCode
                },
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                orderBy: this.orderBy,
                sort: this.sort
            }, options),
            transData;

        this.dataService.fetchSubmissionList(params, this.stateName)
            .then(response => {

                NProgress.done();

                this.totalRecords = response.total;

                this.initPagination();

                if (this.stateName == "app.entrust.select.temporarylist") {
                    this.allData = response.tempsubmissions;
                } else if (this.utilityService.isEmpty(response.submissions)) {
                    //科长审核和主任审核
                    this.allData = response.postponeAborts;
                } else {
                    this.allData = response.submissions;
                }
               
                transData = this.transformData(
                    this.allData,
                    this.dtTitleMapping,
                    this.dtDefaultSetting,
                    this.pageId
                );

                if(this.dt) this.dt.destroy();
                $('#datatable').on('draw.dt', function() {
                    let tdList = $('#datatable td');
                    for(let i = 0, len = tdList.length; i < len; i++) {
                        let td = tdList[i];
                        if(td.offsetWidth < td.scrollWidth) {
                            $(td).attr('title', $(td).html());
                        }
                    }
                });
                this.dt = this.admindesignsService.initDataTable('datatable', {
                    data: transData.data,
                    columns: transData.title,
                    fixedColumns: {
                        leftColumns: transData.flc+2,
                        rightColumns: transData.frc+1
                    },
                    createdRow: (row, data, index) => {
                        let actionContent = this.getActionContentByPageId(this.pageId, index).join(''),
                            actionHtml = this.$compile(actionContent)(this.$scope),
                            orderNum = (this.pageNum-1)*this.pageSize+index+1,
                            plusBtn = this.$compile(`
                                            <span
                                                class="fa fa-plus-circle fs16"
                                                ng-click="task.addSubTable($event)"
                                            ></span>
                                      `)(this.$scope),
                            submId = this.allData[index].id;

                        $('td:last-child', row)
                            .attr('data-id', submId)
                            .append(actionHtml);

                        $('td:first-child', row).append(orderNum);

                        //委托暂存页面，不展示加号
                        if (this.stateName != 'app.entrust.select.temporarylist') {
                            $('td', row).eq(1)
                                .attr('data-id', submId)
                                .append(plusBtn);
                        }
                    }
                });

                this.renderDtOrder();


                //TODO: 确认正确调用tooltip的时机
                this.$timeout(() => {
                    this.admindesignsService.initTooltipster();
                }, 100);
            });



    }

    getActionContentByPageId(pageId, index) {

        if (this.stateName=="app.task.todo.departments") {
            pageId ="ap5000";
        }

        let actionContent = this.dtActionMapping[pageId],
            sendAction = '<span class="fa fa-gavel fs18 text-primary tooltipster mr10" title="补送" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence\',\'1801\', 4)"></span>',
            testAction = '<span class="fa fa-gavel fs18 text-primary tooltipster mr10" title="修改检验记录" ng-click="task.actionRedirect($event, \'app.examine\',\'0702\', 1)"></span>';
        
        if ( typeof actionContent === 'undefined') {
            //获取每条记录的type
            let type  = "";
            if (this.stateName== "app.task.todo.personal") {
               type = this.allData[index].actionCode;
            } else {
               type = this.allData[index].operateStep;
            }

            if (this.utilityService.isEmpty(type)) {
                return [];
            }

            actionContent = this.dtTypeActionMapping[pageId][type].slice();
            
            if (this.stateName== "app.entrust.select.list") {
                if (this.allData[index].isAppend == "1") {
                    actionContent.splice(actionContent.length-1, 0, sendAction);
                }
            }

            if (this.stateName== "app.task.done.personal") {
                if (this.allData[index].isEditTest == "1") {
                    actionContent.splice(actionContent.length-1, 0, testAction);
                }
            }
           
        }

        return actionContent;
    }


    fetchSubTableData(id) {
        return this.dataService.fetchSubTable(id);
    }

    toggleSearchFilter() {
        this.searchFilterShow = !this.searchFilterShow;
    }

    destroyPagination() {
        if(this.paginationInitialed) {
            //destroy pagination
            $('#datatable_pagination').twbsPagination('destroy');
            this.paginationInitialed = false;
        }
    }

    initPagination(options = {}) {

        this.destroyPagination();
        if(this.totalRecords === 0) return;
        this.totalPages = Math.ceil(this.totalRecords/this.pageSize);
        this.admindesignsService.initTwbsPagination('datatable_pagination', Object.assign({}, {
            totalPages: this.totalPages,
            startPage: this.pageNum,
            onPageClick: (event, page) => {
                if(!this.dt) return;
                this.pageNum = page;
                this.$scope.$broadcast('search');
            }
        }, options));

        this.paginationInitialed = true;
    }

    gotoNode(nodeCode) {

        let pageId = this.pageIdMapping[nodeCode];
        if (this.stateName == "app.task.todo.personal") {
            this.utilityService.goState('app.task.todo.personal', {pageId: pageId});
        } else {
            this.utilityService.goState('app.task.todo.departments', {pageId: pageId});
        }
        
    }

    renderDtOrder() {
        let dtHeadList = $('#dt_container th');

        dtHeadList.toArray().forEach((item) => {
            let title = $(item).html(),
                key = this.utilityService.findObjKeyByValue(this.titleObj, title);

            if(key) {
                $(item).attr('class', 'sorting');
                if(key === this.orderBy) {
                    $(item).attr('class', this.sort === 'desc' ? 'sorting_desc' : 'sorting_asc');
                }
            }
        });
    }
    
    dtOrder() {
        $('#dt_container').on('click', 'th', (e) => {
            let t = $(e.target),
                title = t.html(),
                key = this.utilityService.findObjKeyByValue(this.titleObj, title);

            if(key) {
                this.orderBy = key;
                if(t.hasClass('sorting_asc')) this.sort = 'desc';
                else this.sort = 'asc';
                this.$scope.$broadcast('search');
            }
        });
    }
    
    renderSubTable(type, raw) {
        let orderNum = 0,
            transData;

        transData = this.transformData(
            raw,
            this.dtSubTitleMapping,
            this.dtSubTypeMapping,
            type
        );

        this.admindesignsService.initDataTable(type, {
            data: transData.data,
            columns: transData.title,
            fixedColumns: {
                leftColumns: transData.flc+1,
                rightColumns: transData.frc+1
            },
            createdRow: (row, data, index) => {
                $('td:first-child', row).append(++orderNum);
            }
        });
    }

    addSubTable(e) {
        let id = $(e.target).parent().data('id');

        let subTitleMapping = {
            'memberList': '被鉴定人',
            'memberDNAList': 'DNA案件人员',
            'nameLessCorpseList': '无名尸'
        };

        this.admindesignsService.openMagnificPopup('sub-datatable.html', this, {}, () => {
            let dtContent = '';

            this.fetchSubTableData(id).then((response) => {
                let key,
                    dtCon = $('#sub_dt_container');

                for(key in response) {
                    if(this.dtSubTypeMapping[key] && response[key].length) {
                        dtContent +=
                            '<div class="panel">' +
                                '<div class="panel-heading">' +
                                    '<span class="panel-title">' + subTitleMapping[key] + '</span>' +
                                '</div>' +
                                '<div class="panel-body">' +
                                    '<table class="table table-striped table-bordered" id="'+key+'"></table>' +
                                '</div>' +
                            '</div>';
                    }
                }
                dtCon.html(dtContent);
                for(key in response) {
                    if(this.dtSubTypeMapping[key] && response[key].length) {
                        this.renderSubTable(key, response[key]);
                    }
                }
            });
        });
    }

    showCustomSettingPopup(url) {
        this.admindesignsService.openMagnificPopup(url, this, {}, () => {
            this.$timeout(() => {
                let dom,
                    prevIndex,
                    activeIndex;
                
                $('.switch input').on('change', (e) => {
                    let t = $(e.target),
                        checked = t.prop('checked'),
                        fa = t.parent().prev();

                    if(!checked) {
                        fa.addClass('disappear');
                    } else {
                        fa.removeClass('disappear');
                    }
                    this.dtCsToggleDisplay(checked, t.attr('id'));
                });

                dom = this.admindesignsService.initJqUiSortable($('.dt-custom-setting'), {
                    connectWith: 'ul',
                    axis: 'y',
                    items: 'li:not(.unsortable)'
                });
                dom.on('sortstart', (e, ui) => {
                    let sortableList = $('#dt_custom_setting_container li');
                    prevIndex = sortableList.index($(ui.item));
                });
                dom.on('sortupdate', (e, ui) => {
                    let sortableList = $('#dt_custom_setting_container li'),
                        t = $(e.target);

                    activeIndex = sortableList.index($(ui.item));
                    if(!ui.sender) this.dtCsReorder(prevIndex, activeIndex);
                    else this.dtCsToggleFixed(t, activeIndex);
                });
            });
        });
    }

    dtCsToggleDisplay(checked, key) {
        let index = this.utilityService.findArrayIndexByObjValue(this.dtCustomSetting[this.pageId], 'key', key),
            item = this.dtCustomSetting[this.pageId][index];

        item.display = checked;
    }

    dtCsReorder(prevIndex, activeIndex) {
        let list = this.dtCustomSetting[this.pageId],
            item = list[prevIndex];

        list.splice(prevIndex, 1);
        list.splice(activeIndex, 0, item);
    }

    dtCsToggleFixed(target, index) {
        let item = this.dtCustomSetting[this.pageId][index];
        if(target.hasClass('fixed-left') || target.hasClass('fixed-right')) {
            item.fixed = true;
        } else {
            item.fixed = false;
        }
    }


    saveCustomSetting() {
        this.dataService.saveCustomSetting({
            historyActiveCondition: store.get('historyActiveCondition') || {},
            savedActiveCondition: store.get('savedActiveCondition') || {},
            dtCustomSetting: this.dtCustomSetting
        }).then(() => {
            this.admindesignsService.closeMagnificPopup();
            this.utilityService.reloadState();
        });
        store.set('dtCustomSetting', this.dtCustomSetting);
    }

    cancelCustomSetting() {
        this.admindesignsService.closeMagnificPopup();
        this.dtCustomSetting = Object.assign({}, this.dtDefaultSetting);
    }

    openFootPrintPopup(e) {

        let data = this._getSubmDataByEvent(e);
        // this.submId = data.id;
        //为了保证所有页面可以共用一个modal, 把委托id放到scope上。
        this.$scope.submId = data.id;

        this.admindesignsService.openMagnificPopup("footprint.html", this, {});
    }

    openCancelPopup(e, result) {

        let data = this._getSubmDataByEvent(e);

        this.submId = data.id;
        this.result = result;

        this.admindesignsService.openMagnificPopup("cancel.html", this, {});
    }

    openWorkHandover(e) {
        let data = this._getSubmDataByEvent(e);
        this.submId = data.id;
        this.admindesignsService.openMagnificPopup("workHandover.html", this, {});
    }

    goToPage() {


        if(!$.isNumeric(this.tmpPageNum)) {
            this.toaster.pop('error', null, '请输入正确数字');
            return;
        }

        this.tmpPageNum = parseInt(this.tmpPageNum);

        if (this.tmpPageNum > this.totalPages || this.tmpPageNum < 1)
        {
            this.toaster.pop('error', null, '输入的页数超出范围');
        }
        else{
            this.pageNum = this.tmpPageNum;
            this.tmpPageNum = "";

            this.$scope.$broadcast('search');
        }


    }

    changeToPageSize() {

        this.pageNum = 1;
        this.$scope.$broadcast('search');
    }


    actionRedirect(e, state, result, flag, isNewWindow) {
        let data = this._getSubmDataByEvent(e),
            id = data.id;
        this.utilityService.goState(state, {id, result, flag}, isNewWindow);
    }

    _getSubmDataByEvent(e) {
        return $(e.target).parent().data();
    }

    //删除委托暂存  
    delSubm(e, type) {

        let data = this._getSubmDataByEvent(e),
            submIds = [],
            id = data.id;
            submIds.push(id);

        this.admindesignsService.openConfirmDeleteMagnificPopup(this, {}, () => {
            this.taskDataService.delSubm(submIds, type)
            .then((response) => {
                this.toaster.pop("success", "", "删除成功");
                this.$scope.$broadcast('search');
            });

        });
    }

    //打印委托书
    printSubmBook(e) {
        let data = this._getSubmDataByEvent(e);

        let params =
            {
                "submId": data.id,
                "type": "1",
                "fileFormat":"PDF"
            },
            url = "";
        this.dataService.getPdfPath(params)
            .then((response) => {

                let pdfFilePath = this.fileUrl + "/" + response.path + "/download";
                window.open("pdf_viewer.html?file=" + pdfFilePath + '&title=鉴定委托书','_blank');

            });
    }

    getSubmStateCategoryCount() {
        this.taskDataService.getSubmStateCategoryCount(this.stateName)
            .then((response) => {
                this.categoryInfo = response;
            });
    }
}

TaskController.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    '$compile',
    'toaster',
    'CommonDataService',
    'AdmindesignsService',
    'TaskDataService',
    'UtilityService',
    'CommonService',
    'DT_TITLE_MAPPING',
    'DT_DEFAULT_SETTING',
    'PAGE_ID_MAPPING',
    'DT_ACTION_MAPPING',
    'DT_TYPE_ACTION_MAPPING',
    'DT_SUB_TITLE_MAPPING',
    'DT_SUB_TYPE_MAPPING',
    'DT_SUB_ACTION_MAPPING',
    'NODE_ICON_MAPPING',
    'FILE_URL',
    '$q'
];