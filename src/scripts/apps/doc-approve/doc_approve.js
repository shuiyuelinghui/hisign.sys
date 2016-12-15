export default class DocApproveController {

    constructor(
        $scope,
        $stateParams,
        $timeout,
        UtilityService,
        AdmindesignsService,
        CommonDataService,
        CommonService,
        SubmitCompService
    ) {
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.utilityService =  UtilityService;
        this.admindesignsService = AdmindesignsService;
        this.dataService = CommonDataService;
        this.commonService = CommonService;
        this.submitCompService = SubmitCompService;

        this.type = this.$stateParams.type || this.commonService.docType.bookAppraisal;
        this.submId = this.$stateParams.id;
        this.result = this.$stateParams.result;
        /***************submitComp代码************/
        this.fileBaseUrl = './templates/apps/doc_approve/';
        this.$scope.confirmUrl = this.fileBaseUrl + 'confirm.html';
        this.$scope.resultUrl = this.fileBaseUrl + 'result.html';
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
        this.getSubmissionData()
            .then(()=>{
                if (this.result == '1003' && this.submissionData.sqqzr) {
                    this.result = '1001';
                }
                this.buildConfigData();
                this.fetchApproveTpl(1);
                this.opinionRequired();
                if (this.configData.resultMapping.leaderApprove) {
                    this.configData.leaderApprove = '1';
                    this.getBusinessPersonnel(4);
                }
            });
        this.listenConfirmEvent()
    }
    //构建传入组件的数据
    buildConfigData () {
        //根据不同节点，配置不同文案
        let resultMapping = {
            //授权签字人审签
            '1001': {
                pageId: 'ap1100',
                pageTitle: '授权签字人审批',
                resultTitle: '鉴定文书授权签字人审批结果'
            },
            //技术负责人审签
            '1003': {
                pageId: 'ap1100',
                pageTitle: '技术负责人审批',
                resultTitle: '鉴定文书技术负责人审批结果'
            },
            //鉴定文书程序审批
            '1101': {
                pageId: 'ap1200',
                pageTitle: '鉴定文书程序审批',
                resultTitle: '鉴定文书程序审批结果',
                leaderApprove: true  //是否领导审批
            },
            //鉴定文书领导审批
            '1201': {
                pageId: 'ap1300',
                pageTitle: '鉴定文书领导审批',
                resultTitle: '鉴定文书领导审批结果'
            }
        };

        this.configData = {
            //路径地址：
            tplUrl: this.fileBaseUrl + 'submitCompTpl.html',
            //组件文案配置：
            resultValue: '1',
            leaderApprove: '', ////是否领导审批
            submitName: '提交',
            approveName: '审核',
            imageUrl: './assets/images/add_approve_opinion.png',
            tplIndex: 0,
            resultMapping: resultMapping[this.result],
            leaderPerson: '', //领导审批人
            //需要外部调接口传入组件的数据
            tplData: {},//意见模板数据
            leaderPersonnelData: {},//领导审批人员列表
            //组件需要提交的数据
            formData: {
                cnasFlag: '1',
                cmaFlag: '1',
                auditor: '',
                auditorType: ''
            },
            //组件内部需要调的方法：
            fetchApproveTpl: (resultValue)=>{
                this.fetchApproveTpl(resultValue);
            },
            goBack: ($event)=>{
                if ($event) {$event.stopPropagation();}
                this.goBack();
            }
        }
        if (this.configData.resultMapping.leaderApprove) {
            this.configData.leaderApprove = '1';
        }
        //设置页面标题
        this.title = this.configData.resultMapping.pageTitle;
        this.$scope.resultTitle = this.configData.resultMapping.resultTitle;
    }
    //获取委托信息
    getSubmissionData() {
        return this.dataService.fetchSubmissionData(this.submId)
            .then((response) => {
                this.submissionData = response;
            });
    }
    //获取业务审批人员
    //type：1、授权签字人 2、技术负责人 4、领导审批人
    getBusinessPersonnel(type) {
        let params = {
            "serverCode": this.submissionData.serverCode,
            "section": this.submissionData.section,
            "type": type,
            "noUserId": true
        };
        this.dataService.getBusinessPersonnel(params)
            .then((response) => {
                this.configData.leaderPersonnelData = response;
            });
    }
    //系统配置：意见 是否必选项
    opinionRequired () {
        this.dataService.getServerInfo(this.submissionData.serverCode)
            .then((res) => {
                this.configData.exaOpinionWriteRule = res.exaOpinionWriteRule;
                this.configData.isShowCnas = res.aptitudes.toUpperCase().indexOf("CNAS") !== -1;
                this.configData.isShowCma = res.aptitudes.toUpperCase().indexOf("CMA") !== -1;
            })
    }
    //获取意见模板
    fetchApproveTpl(resultValue) {
        this.configData.formData.opinion = '';
        let params = {
            serverCode: this.submissionData.serverCode,
            nodeCode: this.submissionData.submState,
            type: resultValue
        };
        this.submitCompService.fetchApproveTpl(params)
            .then((response) => {
                if (response && response.length) {
                    this.configData.tplData = response;
                    this.configData.formData.opinion = this.configData.tplData[0].content + '\r';
                    this.configData.tplIndex = 0;
                    //TODO: 确认正确调用tooltip的时机
                    this.$timeout(() => {
                        this.admindesignsService.initTooltipster();
                        if (resultValue == 2) {
                            $(".tplScroller").scroller();
                        } else {
                            $(".tplScroller").scroller('destroy');
                        }
                    }, 0);
                } else {
                    this.configData.tplData = [];
                }
            })
    }
    //监听发出确认框事件,并弹出确认框
    listenConfirmEvent($event) {
        this.$scope.$on('approveSubmitSuccess', ()=> {
            this.admindesignsService.openMagnificPopup( './templates/modal/confirmPopup.html',this, {}, null,this.closePopup);
            this.bulidSubmitParams();
        });
    }
    //构建组件提交数据
    bulidSubmitParams() {
        this.submitParams = Object.assign({}, {
            submId: this.submId,
            section: this.submissionData.section,
            nodeCode: this.submissionData.submState
        }, this.configData.formData);

        this.submitParams.result = this.result.slice(0,-1) + this.configData.resultValue;
        if (this.configData.resultValue == '1') {
            switch(this.configData.leaderApprove) {
                case '1':
                    this.submitParams.auditor = this.configData.leaderPerson;
                    this.submitParams.auditorType = '3';
                    break;
                case '2':
                    this.submitParams.result = '1201';
                    break;
            }
        } else {
            this.submitParams.auditor = '';
            this.submitParams.auditorType = '';
        }

    }
    //提交数据
    submitData() {
        this.submitCompService.docRelaSubmit(this.submitParams)
            .then((response) => {
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
        this.closePopup();
        this.goState('app.task.todo.personal', {pageId: this.configData.resultMapping.pageId});
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
//              this.goBack();
				this.commonService.skipUrl(this.result);
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

}

DocApproveController.$inject = [
    '$scope',
    '$stateParams',
    '$timeout',
    'UtilityService',
    'AdmindesignsService',
    'CommonDataService',
    'CommonService',
    'SubmitCompService'
];
