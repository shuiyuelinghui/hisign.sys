import cookie from 'js-cookie';

export default class DocPublishController {

    constructor(
        $scope,
        $stateParams,
        $timeout,
        UtilityService,
        AdmindesignsService,
        CommonDataService,
        DocPublishDataService,
        NodeDataTableService,
        DT_ACTION_MAPPING,
        CommonService
    ) {
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.utilityService = UtilityService;
        this.admindesignsService = AdmindesignsService;
        this.commonDataService = CommonDataService;
        this.dataService = DocPublishDataService;
        this.ndtService = NodeDataTableService;
        this.dtActionMapping = DT_ACTION_MAPPING;
        this.commonService = CommonService;

        this.pageNum = 1;
        this.pageSize = 10;

        this.dictData = {};
        this.initData = {};
        this.$scope.formData = {
            issue:{
                serverCode: '',
                submId: '',
                category: '',
                issueDate: '',
                issueDateStr: '',
                unit: '',
                receiptor: '',
                recipients: '',
                phone: '',
                receiveSampleStatus: '1',
                userId: '',
                postingStatus: '',
            },
            confidential: {},
            samcircuList: []
        };

        this.id = this.$stateParams.id;
        this.result = this.$stateParams.result;
        this.counter = 5;
    }

    $onInit() {
        this.fetchDictionary();
        this.getDocPublishData();
        this.admindesignsService.delegateDateTimePickerAction();
    }

    getDtFormElement(key, index) {
        let modelName,
            dictName;

        if(key === 'type') {    // 流转类型
            modelName = 'formData.samcircuList['+index+'].type';
            dictName = 'docPublish.dictData.TransferTypeModel';
            return '<dt-select model="'+modelName+'" data="'+dictName+'" required=true></dt-select>';
        }

        if(key === 'storeCondition') {  // 保存条件
            modelName = 'formData.samcircuList['+index+'].storeCondition';
            dictName = 'docPublish.dictData.SaveCondiModel';
            return `
                <div
                    class="input-wrapper ui-input-select"
                    input-select-dl
                    dict="${dictName}"
                >
                    <input
                            type="text"
                            required
                            class="gui-input fl"
                            ng-model="${modelName}"
                    />
                </div>
            `;
        }

        if(key === 'receiver') {    // 接收人
            modelName = 'formData.samcircuList['+index+'].receiver';
            return '<dt-input model="'+modelName+'" required=true></dt-input>';
        }

        if(key === 'storePlace') {    // 位置
            modelName = 'formData.samcircuList['+index+'].storePlace';
            return '<dt-input model="'+modelName+'" required=true></dt-input>';
        }

        if(key === 'comments') {    // 备注
            modelName = 'formData.samcircuList['+index+'].comments';
            return '<dt-input model="'+modelName+'"></dt-input>';
        }

        return false;
    }

    fetchDictionary() {
        this.dataService.fetchDictionary()
            .then((response) => {
                this.dictData = response;
            });
    }

    setFormData() {
        let userId = cookie.get('userId'),
            submId = this.$stateParams.id;

        Object.assign(this.$scope.formData, {
            userId: userId,
            result: this.$stateParams.result,
            nodeCode: this.initData.submState,
            section: this.initData.section,
            submId: submId,
            laundryFlag: '3',
            issue:{
                serverCode: this.initData.serverCode,
                submId: submId,
                category: this.initData.sendBookType,
                issueDate: '',
                issueDateStr: '',
                unit: '',
                receiptor: '',
                recipients: '',
                phone: '',
                receiveSampleStatus: '1',
                userId: userId,
                postingStatus: '',
            }
        });
    }

    getDocPublishData(id) {
        this.commonDataService.fetchSubmissionData(this.id)
            .then((response) => {
                this.initData = response;
                
                this.getDocPublishDtData();
                this.setFormData();
                this.setDefaultVal();
            });
    }

    getDocPublishDtData() {
        let params = {
            serverCode: this.initData.serverCode,
            submCode: this.initData.submCode
        }
        this.commonDataService.fetchSampleList(params)
            .then((response) => {
                let transData = this.ndtService.transformData(response, 'ap2021', (key, index) => {
                        return this.getDtFormElement(key, index);
                    }),
                    actionContent = this.dtActionMapping['ap2021'];

                this.$scope.formData.samcircuList = response;
                this.$timeout(() => {
                    this.ndtService.renderDt(this.$scope, transData, actionContent, this.pageNum, "docPublishTableForm");
                }, 1000);
            });
    }

    renderDt() {
        let dtData = this.$scope.formData.samcircuList,
            transData = this.ndtService.transformData(dtData, 'ap2021', (key, index) => {
                return this.getDtFormElement(key, index);
            }),
            actionContent = this.dtActionMapping['ap2021'];

        this.ndtService.renderDt(this.$scope, transData, actionContent, this.pageNum, "docPublishTableForm");
    }

    delRow(e) {
        this.admindesignsService.openConfirmDeleteMagnificPopup(this, {}, () => {
            let t = $(e.target),
                trList = t.parents('table').find('tr'),
                targetTr = t.parents('tr'),
                index = trList.index(targetTr)-1;

            this.$scope.formData.samcircuList.splice(index, 1);
            this.renderDt();
        });
       
    }

    openMagnificPopup(url) {
        let baseUrl = './templates/apps/doc_publish/modal/';
        this.admindesignsService.openMagnificPopup(baseUrl+url, this, {}, this.countDown, this.cancelTimeout);
    }
    
    goBack() {
        this.utilityService.goState('app.task.todo.personal', {pageId: 'ap1700'});
    }

    submit() {

        let samcircuList = [];
        //构建提交数据
        this.$scope.formData.samcircuList.forEach((item) => {
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
            delete item.submId;

            samcircuList.push(item);
        });


        if (this.$scope.formData.issue.category == '2') {
            this.$scope.formData.confidential.unitCode = this.initData.serverCode;
        } else {
            this.$scope.formData.confidential = {};
        }

        this.$scope.formData.samcircuList = samcircuList;

        this.dataService.submit(this.$scope.formData)
            .then((response) => {
                this.openMagnificPopup('count-down.html');
                
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
            }
        }, 1000);
    }
    cancelTimeout () {
        if (this.timer) {
            this.$timeout.cancel(this.timer);
            this.timer = null;
        }
    }

    setDefaultVal() {
        this.$scope.formData.confidential.unitCode = this.initData.serverName;
        this.$scope.formData.confidential.content = this.initData.bookCodes;
        this.$scope.formData.confidential.sendDateStr = moment().format("YYYY-MM-DD");
        this.$scope.formData.confidential.recipients = this.initData.submittedBy + "," + this.initData.otherSubmittedBy;
        this.$scope.formData.confidential.receivingUnitName = this.initData.departmentDetailName;
    }
    
}

DocPublishController.$inject = [
    '$scope',
    '$stateParams',
    '$timeout',
    'UtilityService',
    'AdmindesignsService',
    'CommonDataService',
    'DocPublishDataService',
    'NodeDataTableService',
    'DT_ACTION_MAPPING',
    'CommonService'
];
