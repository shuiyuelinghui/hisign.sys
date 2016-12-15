import store from 'store';
import cookie from 'js-cookie';

export default class FilterController {
    constructor(
        $scope,
        $state,
        $stateParams,
        $timeout,
        toaster,
        CommonDataService,
        AdmindesignsService,
        UtilityService,
        SC_MAPPING,
        PAGE_ID_MAPPING,
        DT_DEFAULT_SETTING
    ) {
        this.$scope = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.toaster = toaster;
        this.dataService = CommonDataService;
        this.admindesignsService = AdmindesignsService;
        this.utilityService = UtilityService;
        this.scMapping = SC_MAPPING;
        this.pageIdMapping = PAGE_ID_MAPPING;
        this.dtDefaultSetting = Object.assign({}, store.get('dtCustomSetting') || DT_DEFAULT_SETTING);
        this.dtCustomSetting = Object.assign({}, this.dtDefaultSetting);

        this.professionData = [];
        this.professionDataAll = [];
        this.categoryData = [];
        this.drp = {};
        this.timeRange = ['今天', '本周', '本月', '本季度', '本年'];
        this.timeMoment = [
            [moment(), moment()],
            [moment().startOf('week'), moment().endOf('week')],
            [moment().startOf('month'), moment().endOf('month')],
            [moment().startOf('quarter'), moment().endOf('quarter')],
            [moment().startOf('year'), moment().endOf('year')]
        ];

        this.timeMapping = ['', 'week', 'month', 'quarter', 'year'];

        this.submCode = '';
        this.defaultCondition = {};
        this.activeCondition = {};
        this.savedActiveCondition = store.get('savedActiveCondition') || {};
        this.historyActiveCondition = store.get('historyActiveCondition') || {};
        this.detailSearchCondition = false;
        this.savedConditionTabActive = false;
        this.stateName = this.$state.current.name;
        this.pageId = this.$stateParams.pageId;

        this.defaultShowCondition = {};

        this.conditionShowCount = 5;

        this.limitCount = 50; //缓存限制个数

        this.inputData = {
            orgName: ""
        }

    }

    $onInit() {

        this.taskCtrl = this.$scope.$parent.task;
        this.nodeCode = this.getNodeCode();
        
        this.$scope.$on('search', () => {
            this.search();
        });

        this.conditionCount = this.scMapping(this.pageId).length;

        this.isShowCondition();
       
        this.buildSearchCondition();
        this.fetchFilterData();
       
        this.$timeout(() => {
            this.buildDateRangePicker();
           
        }, 1000);

        this.$scope.$on('zTreeSelectedConfirm', (e, zTreeSelectedNode) => {
            this.inputData.orgName = zTreeSelectedNode.name;
        });

    }

    isShowCondition() {
        let mapping = this.scMapping(this.pageId);
         mapping.forEach((item, index) => {
            if (index < this.conditionShowCount) {
                this.defaultShowCondition[item] = true;
            } else {
                this.defaultShowCondition[item] = false;
            }
          
        });        
    }

    getNodeCode() {
        //通过config获得nodeCode 
        let nodeCode = this.utilityService.findObjKeyByValue(this.pageIdMapping, this.pageId);       
        return nodeCode;
    }

    hasSearchCondition(condition) {
       
        return this.scMapping(this.pageId).indexOf(condition) >= 0;
    }

    buildSearchCondition() {
        let scAry = this.scMapping(this.pageId);
        scAry.forEach((item) => {
            if(item === 'submDate' || item === 'acceptDate' || item === 'applyDate') {
                this.defaultCondition[item] = '不限';
            } else if(item === 'serverCode' || item === 'section' || item === 'urgentLevel' || item === 'expireState' || item === 'actionCode'|| item === 'identifyCategory' || item === 'submState') {
                this.defaultCondition[item] = [{name:'不限',code:-1}];
            }
        });
        this.activeCondition = $.extend({}, this.defaultCondition);
    }

    buildDateRangePicker() {
        if(this.hasSearchCondition('submDate')) {
            this.drp['submDate'] = this.admindesignsService.initDateRangePicker('submDate');
        }
        if(this.hasSearchCondition('acceptDate')) {
            this.drp['acceptDate'] = this.admindesignsService.initDateRangePicker('acceptDate');
        }
        if(this.hasSearchCondition('applyDate')) {
            this.drp['applyDate'] = this.admindesignsService.initDateRangePicker('applyDate');
        }

        for(let key in this.drp) {
            this.drp[key].on('apply.daterangepicker', (ev, picker) => {

                let startDate = this.utilityService.formatDate(picker.startDate, "YYYY/MM/DD"),
                    endDate = this.utilityService.formatDate(picker.endDate, "YYYY/MM/DD");

                this.$scope.$apply(() => {
                    this.activeCondition[key] = startDate + ' - ' + endDate;
                });

                $(ev.target).val(startDate + ' - ' + endDate);
            });
        }
    }

    setDateRangeTime(id, index) {
        let start = this.timeMoment[index][0],
            end = this.timeMoment[index][1];

        this.admindesignsService.setDRPStartDate(id, start);
        this.admindesignsService.setDRPEndDate(id, end);

        $("#"+id).val(start.format("YYYY/MM/DD") + ' - ' + end.format("YYYY/MM/DD"));
    }

    fetchAuthInstitution() {
        return this.dataService.fetchAuthInstitution(this.pageId)
            .then(response => {
                this.authInstitutionData = response;
            });
    }

    fetchUrgentLevel() {
        return this.dataService.fetchUrgentLevel()
            .then(response => {
                this.urgentLevelData = response;
            });
    }

    fetchExpireState() {
        return this.dataService.fetchExpireState()
            .then(response => {
                this.expireStateData = response;
            });
    }

    fetchActionCode(nodeCode) {
        return this.dataService.fetchActionCode(nodeCode)
            .then(response => {
                this.actionCodeData = response;
            });
    }

    fetchStatus(code) {
        let params = {
            serverCode: code
        }

        return this.dataService.fetchStatus(params)
            .then(response => {
                this.statusData = response;
            });
    }

    fetchProfessionList(event, code, noUserId) {
        let params = {};
        if(event && event.target.className.indexOf('active') >= 0) return;
        if(noUserId) params.noUserId = true;
        if(code) params.serverCode = code;

        return this.dataService.fetchProfessionList(params)
            .then(response => {
                if(!noUserId) {
                    this.professionDataAll = response;
                    this.professionData = response;
                } else {
        
                    if(this.professionData.length >= this.professionDataAll.length) {
                        this.professionData = response;
                    } else {
                        this.professionData = this.professionData.concat(response);
                    }
                }

                if (this.stateName != "app.entrust.select.temporarylist") {
                    this.filterActiveProfessionData();
                }
                
            });
    }

    fetchIdentifyCategorysList(event, section) {;
        if(event && event.target.className.indexOf('active') >= 0) return;
       
        let arr = this.buildActiveCondition(),
            params = {},
            serverArr = arr.serverCode;

        params.section = section;
        params.noUserId = true;

        //通过专业找到相应的serverCode
        this.professionData.forEach((item) => {
            if (item.section == section) {
                params.serverCode = item.serverCode;
            }
        });

        return this.dataService.fetchCategoryList(params)
            .then(response => {
                this.categoryData = this.categoryData.concat(response);
            });      
    }


    fetchFilterData() {
        if(this.hasSearchCondition('serverCode')) {
            this.fetchAuthInstitution();
        }
        if(this.hasSearchCondition('section')) {
            this.fetchProfessionList();
        }
        if(this.hasSearchCondition('urgentLevel')) {
            this.fetchUrgentLevel();
        }
        if(this.hasSearchCondition('expireState')) {
            this.fetchExpireState();
        }
        if(this.hasSearchCondition('actionCode')) {
            this.fetchActionCode(this.nodeCode);
        }

        if (this.hasSearchCondition('submState')) {
            this.fetchStatus();
        }
    }

    filterActiveProfessionData() {
        let i,
            len = this.activeCondition['section'].length - 1;

        for(i = len; i >= 0; i--) {
            let code = this.activeCondition['section'][i]['code'],
                index = this.utilityService.findArrayIndexByObjValue(this.professionData, 'section', code);

            if(index < 0) this.activeCondition['section'].splice(i, 1);
        }

        if(!this.activeCondition['section'].length) {
            this.activeCondition['section'].push({name: '不限',code:-1});
        }
    }

    toggleActiveCondition(event, category, name, code) {
        let isActive = event.target.className.indexOf('active') >= 0;
        if(isActive) this.deleteActiveCondition(category, code);
        else this.selectActiveCondition(category, name, code);
    }

    selectActiveCondition(category, name, code) {
        if(category === 'submDate' || category === 'acceptDate' || category === 'applyDate') {
            this.activeCondition[category] = name;
            if(name === '不限') $('#'+category).val('');
        } else if(category === 'serverCode' || category === 'section' || category === 'urgentLevel' || category === 'expireState'|| category === 'actionCode' || category === 'identifyCategory'|| category === 'submState') {
            if(code === -1) {
                this.activeCondition[category] = [{
                    name: '不限',
                    code: code
                }];

                if(category === 'serverCode') this.professionData = this.professionDataAll;
            } else {
                if(this.activeCondition[category][0]['code'] === -1) {
                    this.activeCondition[category] = [];
                }
                this.activeCondition[category].push({
                    name: name,
                    code: code
                });
            }
        }
    }

    deleteRelatedActiveCondition(category, code) {
        let i,
            j,
            lenProfessionData = this.professionData.length - 1,
            lenCategoryData = this.categoryData.length -1;

        if (category == 'serverCode') {
            for(i = lenProfessionData; i >= 0; i--) {
                if(this.professionData[i].serverCode === code) {
                    let len = this.activeCondition['section'].length - 1;
                    for(j = len; j >= 0; j--) {
                        let section = this.professionData[i].section;
                        if(this.activeCondition['section'][j].code === section) {
                            this.deleteActiveCondition(2, section);
                        }
                    }
                    this.professionData.splice(i, 1);
                }
            }
        } else {
            for(i = lenCategoryData; i >= 0; i--) {
                if(this.categoryData[i].section === code) {
                    if(typeof this.activeCondition['identifyCategory'] !== 'undefined') {
                        let len = this.activeCondition['identifyCategory'].length - 1;
                        for(j = len; j >= 0; j--) {
                            let identifyCategory = this.categoryData[i].numberCode;
                            if(this.activeCondition['identifyCategory'][j].numberCode === identifyCategory) {
                                this.deleteActiveCondition(2, identifyCategory);
                            }
                        }
                    }
                    this.categoryData.splice(i, 1);
                }
            }
        }
    }

    deleteActiveCondition(category, code) {
        let i,
            restoreProfessionData = false;

        if(category === 'submDate' || category === 'acceptDate' || category === 'applyDate') {
            this.activeCondition[category] = '不限';
            $('#'+category).val('');
        } else if(category === 'serverCode' || category === 'section' || category === 'urgentLevel' || category === 'expireState' || category === 'actionCode' || category === 'identifyCategory' || category === 'submState') {
            i = this.utilityService.findArrayIndexByObjValue(this.activeCondition[category], 'code', code);
            this.activeCondition[category].splice(i, 1);
            if(!this.activeCondition[category].length) {
                this.activeCondition[category].push({
                    name: '不限',
                    code: -1
                });
                if(category === 'serverCode') restoreProfessionData = true;
            }
        }

        if(category === 'serverCode' || category === 'section' ) this.deleteRelatedActiveCondition(category, code);
        if(restoreProfessionData) this.professionData = this.professionDataAll;

    }

    asyncActiveCondition(type) {
        let timestamp = moment().format('YYYY-MM-DD'),
            key = "";

        if(!this[type][this.pageId]) {
            this[type][this.pageId] = {};
        }
        if(!this[type][this.pageId][timestamp]) {
            this[type][this.pageId][timestamp] = [];
        }
        

        let tmpCondition = $.extend({}, this.activeCondition, this.inputData),
            isSave = false;

        for (let key in tmpCondition) {
            if (this.utilityService.isArray(tmpCondition[key])) {
                for (let val of tmpCondition[key]) {
                    if (val.name != "不限") {
                        isSave = true;
                    }
                }
            } else {
                if (tmpCondition[key] != "不限") {
                    isSave = true;
                }
            }
        }

        if (isSave) {
            this[type][this.pageId][timestamp].push({
                timestamp: moment().format('HH:mm:ss'),
                condition: $.extend({}, this.activeCondition, this.inputData)
            });
            //
            let len = 0,
                overDate = '', //过期日期 日期

                overNodeType = '',
                overIndex = '',
                overDue = +moment(timestamp + ' ' + this[type][this.pageId][timestamp][0].timestamp); //过期毫秒数

            for (let nodeType in this[type]) {
                for (let date in this[type][nodeType]) {
                    for (let i = 0; i < this[type][nodeType][date].length; i++) {
                       let dateMoment = +moment(date + ' ' + this[type][nodeType][date][i].timestamp);
                        if (dateMoment <= overDue) {
                            overDue = dateMoment;
                            overNodeType = nodeType;
                            overDate = date;
                            overIndex = i;
                        }
                    }

                    len += this[type][nodeType][date].length;
                }
            }

            if (len > this.limitCount) {
                this[type][overNodeType][overDate].splice(overIndex,1);
            }

            store.set(type, this[type]);

            this.dataService.saveCustomSetting({
                historyActiveCondition: store.get('historyActiveCondition') || {},
                savedActiveCondition: store.get('savedActiveCondition') || {},
                dtCustomSetting: this.dtCustomSetting
            });

            if(type === 'savedActiveCondition') {
                this.toaster.pop('success', null, '保存成功');
            }
        }
    }

    deleteAsyncActiveCondition(type, day, index, allDay = false) {
        if(allDay) {
            delete this[type][this.pageId][day];
        } else {
            this[type][this.pageId][day].splice(index, 1);
        }
        store.set(type, this[type]);

        this.dataService.saveCustomSetting({
            historyActiveCondition: store.get('historyActiveCondition') || {},
            savedActiveCondition: store.get('savedActiveCondition') || {},
            dtCustomSetting: this.dtCustomSetting
        });
        this.toaster.pop('success', null, '删除成功');
    }

    toggleDetailSearchCondition() {
        this.detailSearchCondition = !this.detailSearchCondition;
    }

    buildActiveCondition() {
        let sc = {},
            key,
            i,
            len;

        for (key in this.activeCondition) {
            if (this.utilityService.isArray(this.activeCondition[key])) {
                for (i = 0, len = this.activeCondition[key].length; i < len; i++) {
                    if (this.activeCondition[key][i]['code'] !== -1) {
                        if (typeof sc[key] === 'undefined') sc[key] = [];
                        sc[key].push(this.activeCondition[key][i]['code']);
                    }
                }
                if(sc[key]) sc[key] = sc[key].join(',');
            }
        }

        return sc;
    }

    buildDrpCondition() {
        let sc = {},
            key,
            drp;

        for(key in this.drp) {

            drp = this.drp[key].data('daterangepicker');

            if ($('#'+key).val() != "") {
                sc[key+'Start'] = drp.startDate.format('YYYY-MM-DD');
                sc[key+'End'] = drp.endDate.format('YYYY-MM-DD');
            }
            else {
                sc[key+'Start'] = "";
                sc[key+'End'] = "";
            }
        }
      
        return sc;
    }

    initDateRang(id) {
       $("#" + id).trigger("click");
    }

    search() {
        let sc;

        sc = $.extend({}, {
            userId: cookie.get('userId')
        }, this.buildActiveCondition());

        if (this.inputData.orgName == '') {
            delete this.inputData.orgName;
        }

        sc = $.extend({}, sc, this.buildDrpCondition());
        sc = $.extend({}, sc, this.inputData);

        this.buildActiveCondition();
        this.taskCtrl.fetchSubmissionList({
            searchCondition: sc
        });
        this.asyncActiveCondition('historyActiveCondition');
    }

    research(condition, type, date) {

        let sc = {},
            key,
            i,
            len, 
            tmpCondition;
        
        tmpCondition = $.extend({}, condition);

        for (key in tmpCondition) {
            if (this.utilityService.isArray(tmpCondition[key])) {
               
                for (i = 0, len = tmpCondition[key].length; i < len; i++) {
                    if (tmpCondition[key][i]['code'] !== -1) {
                        if (typeof sc[key] === 'undefined') sc[key] = [];
                        sc[key].push(tmpCondition[key][i]['code']);
                    }
                }
                if(sc[key]) sc[key] = sc[key].join(',');
                delete tmpCondition[key];
            } else {
                if (this.utilityService.isDate(key)) {
                    if (tmpCondition[key] != "不限") {
                        //构建日期数据, type:1历史查询 2保存条件
                        let index = this.utilityService.findArrayIndexByValue(this.timeRange, tmpCondition[key]);
    
                        if (index === -1) {
                            sc[key + 'Start'] = moment(tmpCondition[key].split('-')[0]).format("YYYY-MM-DD");
                            sc[key + 'End'] = moment(tmpCondition[key].split('-')[1]).format("YYYY-MM-DD");
                        } else {
                            if (type == 1) {
                                //历史查询的时候，根据传入的date参数构建日期
                                sc[key + 'Start'] = moment(date).startOf(this.timeMapping[index]).format("YYYY-MM-DD");
                                sc[key + 'End'] = moment(date).endOf(this.timeMapping[index]).format("YYYY-MM-DD");
                            } else if (type == 2) {
                                //保存查询的时候，根据当前日期构建日期
                                sc[key + 'Start'] = this.timeMoment[index][0].format("YYYY-MM-DD");
                                sc[key + 'End'] = this.timeMoment[index][1].format("YYYY-MM-DD");
                            }
                        }
                    }

                    delete tmpCondition[key];
                }
            }
        }

        sc = $.extend({}, {
            userId: cookie.get('userId')
        }, sc);

        sc = $.extend({}, sc, tmpCondition);

        this.taskCtrl.fetchSubmissionList({
            searchCondition: sc
        });
    }

    resetCondition() {
        this.activeCondition = Object.assign({}, this.defaultCondition);
        this.professionData = this.professionDataAll;
        this.inputData = {};
        $('#submDate').val('');
        $('#acceptDate').val('');
        $('#applyDate').val('');

    }

    handleTabClick(e) {
        let t = $(e.target).data('target');
        if(t.indexOf('search_condition') >= 0) {
            this.savedConditionTabActive = false;
        } else {
            this.savedConditionTabActive = true;
        }
    }

    buildDateValue() {
        this.activeCondition.submDate == $("#submDate").val();
    }
}

FilterController.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    'toaster',
    'CommonDataService',
    'AdmindesignsService',
    'UtilityService',
    'SC_MAPPING',
    'PAGE_ID_MAPPING',
    'DT_DEFAULT_SETTING'
];
