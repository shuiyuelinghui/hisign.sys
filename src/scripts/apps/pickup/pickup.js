import 'twbs-pagination';
import cookie from 'js-cookie';
import store from 'store';
// import _ from 'underscore';

export default class PickupController {

    constructor(
        $scope,
        $stateParams,
        $timeout,
        $compile,
        CommonDataService,
        AdmindesignsService,
        PickupDataService,
        CommonService,
        UtilityService,
        DT_TITLE_MAPPING,
        DT_DEFAULT_SETTING,
        PAGE_ID_MAPPING,
        DT_ACTION_MAPPING,
        DT_TYPE_ACTION_MAPPING
    ) {
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.$compile = $compile;
        this.dataService = CommonDataService;
        this.pickupDataService = PickupDataService;
        this.admindesignsService = AdmindesignsService;
        this.commonService = CommonService;
        this.utilityService = UtilityService;

        this.dtTitleMapping = DT_TITLE_MAPPING;
        this.dtDefaultSetting = Object.assign({}, store.get('dtCustomSetting') || DT_DEFAULT_SETTING);
        this.pageIdMapping = PAGE_ID_MAPPING;
        this.dtActionMapping = DT_ACTION_MAPPING;
        this.dtTypeActionMapping = DT_TYPE_ACTION_MAPPING;

        this.result = $stateParams.result;
        this.submId = $stateParams.id;

        this.dt;
        this.totalRecords = 0;
        this.orderBy = 'insDate';
        this.sort = 'desc';

        this.pageId = this.pageIdMapping[this.result];

        this.dtData = [];
        this.samcircuList = [];
        this.confirmData = {};
        this.counter = 5;
        this.timer = null;
    }

    $onInit() {
        this.fetchDictionary();
        this.fetchSamplesList();
        this.fetchBasicInfo(this.submId);
        this.dtOrder();
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
            frc = 0,
            userInfo;

        userInfo = store.get("userInfo");

        for(let i = 0; i < outerLen; i++ ) {
            if(!showData[i].display) continue;
            key = showData[i].key;
            title.push({title:this.commonService.getTitleNameByKey(titleMapping, key, "ap1051")});
            if(showData[i]['fixed']) {
                if(i <= outerLen / 2) flc++;
                else frc++;
            }

            for(j = 0, innerLen = raw.length; j < innerLen; j++) {
                if(typeof data[j] === 'undefined') data[j] = [];
                
                let val = raw[j][key];
      
                raw[j]['receiver'] = userInfo.userName;

                if(this.utilityService.isDate(key))
                {
                    val = this.utilityService.formatDate(val, "YYYY-MM-DD");
                    raw[j][key] = val;
                }

                // //流转类型
                // if (key == "type") {
                //     val = ' <div class="section w100">' +
                //             '<label class="field select mtn">' +
                //             '<select required ng-model="pickup.allData['+j+'].type"'+
                //             'ng-options="item.dictKey as item.dictValue1 for item in pickup.dictData.TransferTypeModel" >'+
                //             '<option value="">请选择</option> </select>' +
                //             '<i class="arrow"></i></label></div>';
                //     console.log(this.dictData.TransferTypeModel);
                // }


                if(key === 'type') {    // 流转类型
                    let modelName = 'pickup.allData['+j+'].type',
                        dictName = 'pickup.dictData.TransferTypeModel';
                    val= '<dt-select model="'+modelName+'" data="'+dictName+'"></dt-select>';
                }
               

                //保存位置
                if (key == "storePlace") {
                    val = '<input type="text" required class="gui-input w100" ng-model="pickup.allData['+j+'].storePlace">';
                }

                //备注
                if (key == "comments") {
                    val = '<input name="pick' + j + '" type="text" class="gui-input w150" ng-model="pickup.allData['+j+'].comments">';
                }

                //保存条件
                if (key == "storeCondition") {
                    val = '<div class="input-wrapper ui-input-select" style="z-index:'+(innerLen-j)+'" input-select-dl dict="pickup.dictData.SaveCondiModel">' +
                        '<input type="text" required class="gui-input w100" placeholder="" required ng-model="pickup.allData['+j+'].storeCondition"></div>';
                }

                data[j].push(val);
            }
        }

        title.push({title:'操作'});
        title.unshift({title:'序号'});
        data.forEach((item) => {
            item.push('');
            item.unshift('');
        });

        this.tableData = data;

        if(type === this.pageId) {
            this.dtData = showData;
        }

        return {title, data, flc, frc};
    }

    fetchSamplesList(options = {}) {
       
        let transData;

        this.pickupDataService.fetchSampleListData(this.submId)
            .then(response => {
                this.allData = response;
                this.totalRecords = response.length;
                transData = this.transformData(
                    response,
                    this.dtTitleMapping,
                    this.dtDefaultSetting,
                    this.pageId
                );
                if(this.dt) this.dt.destroy();

                this.dt = this.admindesignsService.initDataTable('datatable', {
                    data: transData.data,
                    columns: transData.title,
                    fixedColumns: {
                        leftColumns: transData.flc+1,
                        rightColumns: transData.frc+1
                    },
                    initComplete: () => {
                        this.$compile($('#pickupForm'))(this.$scope);
                    },
                    createdRow: (row, data, index) => {
                        row = this.$compile(row)(this.$scope);

                        let actionContent = this.dtActionMapping[this.pageId].join(''),
                            orderNum = index+1;

                        $('td:last-child', row)
                            .attr('data-id', this.submId)
                            .append(actionContent);

                        $('td:first-child', row).append(orderNum);

                        this.$compile(actionContent)(this.$scope)
                    }
                });

                this.renderDtOrder();
            });

            //延迟初始化tooltip
            this.$timeout(() => {
                this.admindesignsService.initTooltipster();
            }, 1000);
    }

    renderDtOrder() {
        let dtHeadList = $('#dt_container th');

        dtHeadList.toArray().forEach((item) => {
            let title = $(item).html(),
                key = this.utilityService.findObjKeyByValue(this.dtTitleMapping, title);

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
                key = this.utilityService.findObjKeyByValue(this.dtTitleMapping, title);

            if(key) {
                this.orderBy = key;
                if(t.hasClass('sorting_asc')) this.sort = 'desc';
                else this.sort = 'asc';
                this.fetchSamplesList();
            }
        });
    }
    
    showConfirmPopup(url) {
        this.admindesignsService.openMagnificPopup(url, this, {}, () => {
        
            this.confirmData.transCount = this.totalRecords;
            this.confirmData.caseName = this.basicInfo.caseName;
            this.confirmData.sectionName = this.basicInfo.sectionName;
            this.confirmData.identifyCategoryName = this.basicInfo.identifyCategoryName;
        });
    }

    fetchBasicInfo(submId) {
        return this.dataService.fetchSubmissionData(submId)
                .then((response) => {
                    this.basicInfo = response;
                });
    }

    closeConfirmPopup() {
        this.admindesignsService.closeMagnificPopup();
    }

    receiveSubmit() {
        this.admindesignsService.closeMagnificPopup();
    }

    //收检提交
    receiveSubmit() {

        //构建提交数据
        this.allData.forEach((item) => {
            item.sampleAcceptCode = item.acceptCode;
            item.transferDateStr = item.transferDate;
            delete item.amount;
            delete item.measuringUnit;
            delete item.name;
            delete item.acceptCode;
            delete item.transferDate;
            delete item.sampleCode;
            delete item.sampleType;
            delete item.documentList;

            this.samcircuList.push(item);
        });

        let params = {
            laundryFlag: "2",
            nodeCode: this.basicInfo.submState,
            result: this.result,
            submId: this.submId,
            section: this.basicInfo.section,
            samcircuList: this.samcircuList
        };
        this.pickupDataService.receiveSubmit(params)
            .then((response) => {
                this.closeConfirmPopup();
                this.admindesignsService.openMagnificPopup('pickup-result.html', this, {}, () => {
                    this.countDown();
                }, ()=> {
                    this.cancelTimeout();
                });
            }); 
    }

    fetchDictionary() {
        this.pickupDataService.fetchDictionary()
            .then(response => {
                this.dictData = response;
            });
    }


    countDown() {
        this.timer = this.$timeout(() => {
            if (this.counter > 1) {
                this.counter--;
                this.countDown();
            } else {
                this.admindesignsService.closeMagnificPopup();
                this.commonService.skipUrl(this.result);
//              this.utilityService.goState('app.task.todo.personal', {pageId: 'ap1050'});
            }
        }, 1000);
    }

    //打印相关动作
    doPrint(url) {
        this.goToState(url);
        this.cancelTimeout();
    }


    //取消计时器
    cancelTimeout () {
        if (this.timer) {
            this.$timeout.cancel(this.timer);
            this.timer = null;
            this.hideTime = true;
        }
    }

    goback($event) {
        /*let pageId = this.commomDataService.stateData.fromParams ? this.commomDataService.stateData.fromParams.pageId : 'ap1010',
            oldState = this.commomDataService.stateData.fromParams ? this.commomDataService.stateData.fromState.name : 'app.task.todo.personal';*/
        this.utilityService.goState('app.task.todo.personal', {pageId: 'ap1050'});
        if ($event) {$event.stopPropagation();}

    }

    goToState(type) {
        this.utilityService.goState("doc", {id: this.submId, type:type, nodeCode: this.basicInfo.submState, flag: 1}, true);
    }     
}

PickupController.$inject = [
    '$scope',
    '$stateParams',
    '$timeout',
    '$compile',
    'CommonDataService',
    'AdmindesignsService',
    'PickupDataService',
    'CommonService',
    'UtilityService',
    'DT_TITLE_MAPPING',
    'DT_DEFAULT_SETTING',
    'PAGE_ID_MAPPING',
    'DT_ACTION_MAPPING',
    'DT_TYPE_ACTION_MAPPING'
];