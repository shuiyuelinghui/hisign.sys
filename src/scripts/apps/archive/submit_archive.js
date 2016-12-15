export default class SubmitArchiveController {

    constructor(
        $scope,
        $timeout,
        $stateParams,
        toaster,
        AdmindesignsService,
        UtilityService,
        CommonDataService,
        ArchiveDataService,
        SubmitCompService,
        CommonService
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$stateParams = $stateParams;
        this.toaster = toaster;
        this.admindesignsService = AdmindesignsService;
        this.utilityService = UtilityService;        
        this.archiveService= ArchiveDataService;
        this.dataService = CommonDataService;
        this.commonService = CommonService;
        this.submitCompService = SubmitCompService;

        this.formData = {
            filedCatalogList: [],
            fileDateStr: moment().format('YYYY-MM-DD')
        };

        this.startPageNumber = 0;
        this.endPageNumber = 0;

        this.submId = this.$stateParams.id;
        this.result = this.$stateParams.result;
        this.fileBaseUrl = './templates/apps/archive/';
        this.$scope.confirmUrl = this.fileBaseUrl + 'submit-archive-confirm.html';
        this.$scope.resultUrl = this.fileBaseUrl + 'submit-archive-result.html';
        this.$scope.resultTitle = '鉴定文书提交归档结果';
        this.configData = {};
        this.submitParams = {};
        this.counter = 5;

        this.$scope.submitData = ()=>{
            this.submitData()
        };
        this.$scope.closePopup = ()=>{
            this.closePopup();
        };
    }

    $onInit() {
        this.buildConfigData();
        this.listenConfirmEvent();
        this.delegateDateTimePickerAction();
        this.fetchSubmissionData();

    }

    //获取委托信息
    fetchSubmissionData() {
        this.dataService.fetchSubmissionData(this.submId)
            .then((response) => {
                this.submissionData = response;
                this.getSyslabsInfo();
                this.getArchiveInfo();
                this.fetchDictionary();
            });
    }
	
	getSyslabsInfo() {
        let params = {
            serverCode: this.submissionData.serverCode
        };

        this.archiveService.getSyslabsInfo(params)
            .then((response) => {
                this.sysLabData = response;
            });
	}

    //获取档案信息
    getArchiveInfo() {
        let params = {
            serverCode: this.submissionData.serverCode,
            submId: this.submId,
            noUserId: true
        };

        this.archiveService.getArchiveInfo(params)
            .then((response) => {
                this.archiveInfo = response;
                this.configData.archiveInfo = response;
                if (this.isTermination()) {
                    this.archiveInfo.bookCodes = this.submissionData.acceptCode;
                }
                //TODO: 确认正确调用tooltip的时机
                this.$timeout(() => {
                    this.admindesignsService.initTooltipster();
                }, 100);
            });
    }

    getLabUsers(labId) {
        this.archiveService.getLabUsers(labId)
            .then((response) => {
                this.labUsesData = response;
            });
    }
	
	fetchDictionary() {
        let dicts=['ArchRetentionPeriodModel','IsNoIssueModel','FiledTypeModel','BookTypeModel', 'TermFileTypeModel'];
        this.archiveService.fetchDictionary(dicts)
            .then((response) => {
                this.dictData = response;
                this.configData.IsNoIssueModel = response.IsNoIssueModel;
                if (this.isTermination()) {
                    this.dictData.FiledTypeModel = this.dictData.TermFileTypeModel;
                }
            });
	}

    isTermination() {
        if (this.submissionData.actionCode=='0706' || this.submissionData.actionCode == '0805') {
            this.isTerminate = true;
            return true;
        } else {
            this.isTerminate = false;
            return false;
        }
    }

    createArchive() {

        let params = {
            "serverCode": this.submissionData.serverCode,
            "submId": this.submId,
            "archiveTestType": this.archiveInfo.archiveTestType
        },

        filedCatalogList = this.formData.filedCatalogList.slice();
        for (let key = filedCatalogList.length-1 ; key >= 0; key--) {
            if (typeof filedCatalogList[key] != 'undefined') {
                if (this.list[key].checked == true) {
                    filedCatalogList[key].name = this.dictData.FiledTypeModel[key].dictValue1;
                    filedCatalogList[key].groupValue = this.dictData.FiledTypeModel[key].dictKey; 
                } else {
                    filedCatalogList.splice(key, 1);
                }

            } else {
                filedCatalogList.splice(key, 1);
            }
        }
       
        params = $.extend(params, this.formData);
        params.filedCatalogList = filedCatalogList;

        if (this.isTermination()) {
            params.archiveType = "";
        } else {
            params.archiveType = params.archiveType.join(",");
        }
        
        this.archiveService.createArchive(params)
            .then((response) => {
                this.archiveInfo = response;
                this.configData.archiveInfo = response;
                if (this.isTermination()) {
                    this.archiveInfo.bookCodes = this.submissionData.acceptCode;
                }

                this.utilityService.goState("doc", {id: this.submId, type: this.commonService.docType.bookCover, nodeCode: this.submissionData.submState}, true);
            });
    }

    deleteArchive(id) {
        this.admindesignsService.openConfirmDeleteMagnificPopup(this, {}, () => {
            this.archiveService.deleteArchive(id)
            .then((response) => {
                this.archiveInfo = false;
                    this.configData.archiveInfo = false;
                this.toaster.pop("success", "", "删除成功");
            });

        });
    }

    calculatePageNumber(index) {

        let pageNumber = 0,
            startPageNumber = 1,
            endPageNumber = 0,
            firstFlag = true,
            currentPage = 0,
            numbers = 0;

        for (var i = 0; i <= this.formData.filedCatalogList.length-1; i++) {
            if (typeof this.formData.filedCatalogList[i] != 'undefined') {
                if (typeof this.formData.filedCatalogList[i].page != 'undefined') {

                    if (this.formData.filedCatalogList[i].page == '') {
                        currentPage = 0;
                    } else {
                        currentPage = parseInt(this.formData.filedCatalogList[i].page);
                    }

                    if (currentPage != 0) {
                        if (firstFlag) {
                            this.formData.filedCatalogList[i].pageNumber = startPageNumber + "-" + currentPage;
                            firstFlag = false;
                            endPageNumber = currentPage;
                        } else {
                            startPageNumber = parseInt(endPageNumber) + 1;

                            endPageNumber = (startPageNumber+parseInt(currentPage) -1);
                            this.formData.filedCatalogList[i].pageNumber = startPageNumber + "-" + endPageNumber;
                        }
                    } else {
                        this.formData.filedCatalogList[i].pageNumber = "";
                    }

                    numbers ++ ;
                }
            }
        }

        this.formData.pages = endPageNumber;
        this.formData.numbers = numbers;


    }

    delegateDateTimePickerAction() {
        let _self = this;
        $('body').on('focusin', '.bs-datetimepicker', function() {
            if($(this).data('initialize')) return;

            $(this).data('initialize', true);
            _self.admindesignsService.initDateTimePicker($(this));
        });
    }

    filedSubmit() {

        let params = {
            "result": this.result,
            "submId": this.submId,
            "section": this.submissionData.section,
            "nodeCode": this.submissionData.submState
        };

        this.archiveService.filedSubmit(params)
            .then((response) => {
                this.closeConfirmPopup();
                this.admindesignsService.openMagnificPopup('submit-archive-result.html', this, {}, () => {
                });
            });
    }

/**********************submitComp代码***************************/
    //构建传入组件的数据
    buildConfigData () {
    this.configData = {
        //路径地址：
        tplUrl: this.fileBaseUrl + 'submit_submitCompTpl.html',
        //组件文案配置：
        submitName: '提交',
        approveName: '审核',
        imageUrl: './assets/images/add_approve_opinion.png',
        fileDateStr: moment().format('YYYY-MM-DD'),
        //需要外部调接口传入组件的数据
        IsNoIssueModel: {},
        //组件需要提交的数据
        archiveInfo: '',
        formData: {
            archivesEndFlag: '1'
        },
        //组件内部需要调的方法：
        goBack: ($event)=>{
            if ($event) {$event.stopPropagation();}
            this.goBack();
        }
    }
}

    //监听发出确认框事件,并弹出确认框
    listenConfirmEvent($event) {
        this.$scope.$on('approveSubmitSuccess', ()=> {
            this.admindesignsService.openMagnificPopup( './templates/modal/confirmPopup.html',this, {}, this.fetConfirmData,this.closePopup);
        });
    }
    //构建组件提交数据
    bulidSubmitParams() {
        this.submitParams = Object.assign({}, {
            "result": this.result,
            "submId": this.submId,
            "section": this.submissionData.section,
            "nodeCode": this.submissionData.submState
        }, this.configData.formData);
    }
    //提交数据
    submitData() {
        this.bulidSubmitParams();

        this.submitCompService.filedSubmit(this.submitParams)
            .then((res) => {
                this.closePopup();
                this.admindesignsService.openMagnificPopup( './templates/modal/resultPopup.html',this, {}, this.countDown, this.cancelTimeout);
            });
    }
    //跳转不同节点
    goState(state, pageId) {
        state = state ? state : 'app.task.todo.personal';
        this.utilityService.goState(state, pageId);
    }
    goBack() {
        this.goState('app.task.todo.personal',{pageId:'ap1500'});
    }
    //关闭弹窗
    closePopup() {
        this.admindesignsService.closeMagnificPopup();
    }
    //倒计时
    countDown() {
        this.timer = this.$timeout(() => {
            if (this.counter > 1) {
                this.counter--;
                this.countDown();
            } else {
                this.closePopup();
                this.goBack();
            }
        }, 1000);
    }
    //取消计时器
    cancelTimeout () {
        if (this.timer) {
            this.$timeout.cancel(this.timer);
            this.timer = null;
        }
    }
    //打印相关动作
    doPrint(type) {
        type = type ? type : this.commonService.docType.bookConfirmation;
        this.utilityService.goState("doc", {id: this.submId, type:type, nodeCode: this.submissionData.submState, flag: 1}, true);
        this.cancelTimeout();
        this.hideTime = true;
    }
}

SubmitArchiveController.$inject = [
    '$scope',
    '$timeout',
    '$stateParams',
    'toaster',
    'AdmindesignsService',
    'UtilityService',
    'CommonDataService',
    'ArchiveDataService',
    'SubmitCompService',
    'CommonService'
];
