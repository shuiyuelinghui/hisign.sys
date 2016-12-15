export default class CrossApprovalController {

    constructor($scope,
                $timeout,
                $stateParams,
                UtilityService,
                AdmindesignsService,
                CommonDataService,
                SubmitCompService,
                CommonService
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$stateParams = $stateParams;
        this.utilityService = UtilityService;
        this.admindesignsService = AdmindesignsService;
        this.commomDataService = CommonDataService;
        this.dataService = SubmitCompService;
        
        this.commonService = CommonService;
		
        this.submId = this.$stateParams.id;
        this.flag = this.$stateParams.flag;
        this.result = this.$stateParams.result;
        this.fileBaseUrl = './templates/apps/crossApproval/';
        this.$scope.confirmUrl = this.fileBaseUrl + 'confirm.html';
        this.$scope.resultUrl = this.fileBaseUrl + 'result.html';
        this.$scope.resultTitle = '跨级审批结果';
        this.configData = {};
        this.approveDetailData = {};
        this.submitParams = {};
        this.counter = 5;
        this.submCode = '';

        this.$scope.submitData = ()=>{
            this.submitData()
        };
        this.$scope.closePopup = ()=>{
            this.closePopup();
        };
    }
    $onInit() {
        this.buildConfigData();
        this.getSubmissionData()
            .then(()=>{
                this.configData.fetchApproveTpl(1);
                this.opinionRequired();
            });
        this.listenConfirmEvent()
    }
    //构建传入组件的数据
    buildConfigData () {
        this.configData = {
            //路径地址：
            tplUrl: this.fileBaseUrl + 'submitCompTpl.html',
            //组件文案配置：
            resultValue: '1',
            submitName: '提交',
            approveName: '审核',
            imageUrl: './assets/images/add_approve_opinion.png',
            tplIndex: 0,
            //需要外部调接口传入组件的数据
            tplData: {},
            exaOpinionWriteRule: '',
            //组件需要提交的数据
            formData: {},
            //组件内部需要调的方法：
            fetchApproveTpl: (resultValue)=>{
                this.fetchApproveTpl(resultValue);
            },
            goBack: ($event)=>{
                if ($event) {$event.stopPropagation();}
                this.goBack();
            }
        }
    }
    //获取委托信息
    getSubmissionData() {
        return this.commomDataService.fetchSubmissionData(this.submId)
            .then((response) => {
                this.submissionData = response;
            });
    }
    //系统配置：意见 是否必选项
    opinionRequired () {
        this.commomDataService.getServerInfo(this.submissionData.serverCode)
            .then((res) => {
                this.configData.exaOpinionWriteRule = res.exaOpinionWriteRule;
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
        this.dataService.fetchApproveTpl(params)
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
            this.admindesignsService.openMagnificPopup( './templates/modal/confirmPopup.html',this, {}, this.fetConfirmData,this.closePopup);
        });
    }

    //获取确认框所需的数据
    fetConfirmData() {
        this.dataService.fetConfirmData(this.submId)
            .then((response) => {
                this.approveDetailData = response;
            });
    }

    //构建组件提交数据
    bulidSubmitParams() {
        this.submitParams = Object.assign({}, {
            submId: this.submId,
            section: this.submissionData.section,
            nodeCode: this.submissionData.submState
        }, this.configData.formData);
        this.submitParams.result = this.configData.resultValue == '1' ? '0201' : '0202';
        //判断是否重新跨级审批
        if (this.flag == '1') {
            this.submitParams.operateType = '3';
        }
    }
    //提交数据
    submitData() {
        this.bulidSubmitParams();
        this.dataService.approveSubmit(this.submitParams)
            .then((res) => {
                this.submCode = res.submCode;
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
        this.goState('app.task.todo.personal',{pageId:'ap1010'});
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
                this.commonService.skipUrl(this.result);
//              this.goBack();
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
CrossApprovalController.$inject = [
    '$scope',
    '$timeout',
    '$stateParams',
    'UtilityService',
    'AdmindesignsService',
    'CommonDataService',
    'SubmitCompService',
    'CommonService'
];


