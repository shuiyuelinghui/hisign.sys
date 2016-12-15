import cookie from 'js-cookie';
export default class ConfirmArchiveController {

    constructor(
        $scope,
        $timeout,
        $stateParams,
        UtilityService,
        AdmindesignsService,
        CommonDataService,
        ArchiveDataService,
        SubmitCompService,
        CommonService
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$stateParams = $stateParams;
        this.utilityService = UtilityService;
        this.admindesignsService = AdmindesignsService;
        this.dataService = CommonDataService;
        this.archiveDataService = ArchiveDataService;
        this.commonService = CommonService;
        this.submitCompService = SubmitCompService;

        this.submId = this.$stateParams.id;
        this.result = this.$stateParams.result;
        this.fileBaseUrl = './templates/apps/archive/';
        this.$scope.confirmUrl = this.fileBaseUrl + 'confirm-archive-confirm.html';
        this.$scope.resultUrl = this.fileBaseUrl + 'confirm-archive-result.html';
        this.$scope.resultTitle = '鉴定文书确认归档结果';
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
        this.fetchSubmissionData()
            .then(()=>{
                this.fetchApproveTpl(0);
                this.fetchFiledPosition();
            })
        this.listenConfirmEvent();
    }

    //获取档案信息
    getArchiveInfo() {
        let params = {
            serverCode: this.submissionData.serverCode,
            submId: this.submId
        };

        this.archiveDataService.getArchiveInfo(params)
            .then((response) => {
                this.archiveData = response;
                this.numbers = response.numbers;
                this.pages = response.pages;

                if (this.isTermination()) {
                    this.archiveData.bookCodes = this.submissionData.acceptCode;
                }
            });
    }

    //获取委托信息
    fetchSubmissionData() {
        return this.dataService.fetchSubmissionData(this.submId)
            .then((response) => {
                this.submissionData = response;
                this.getArchiveInfo();
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

    /**********************submitComp代码***************************/
    //构建传入组件的数据
    buildConfigData () {
        this.configData = {
            //路径地址：
            tplUrl: this.fileBaseUrl + 'confirm_submitCompTpl.html',
            //组件文案配置：
            submitName: '提交',
            approveName: '审核',
            imageUrl: './assets/images/add_approve_opinion.png',
            placeIndex: 0,
            tplIndex: 0,
            //需要外部调接口传入组件的数据
            placeData: {},
            tplData: {},
            //组件需要提交的数据
            formData: {},
            //组件内部需要调的方法：
            goBack: ($event)=>{
                if ($event) {$event.stopPropagation();}
                this.goBack();
            }
        }
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
                }else {
                    this.configData.tplData = [];
                }
            })
    }
    // 获取归档位置
    fetchFiledPosition() {
        this.dataService.fetchFiledPositionModel()
            .then((res) => {
                if (res) {
                    this.configData.placeData = res.FiledPositionModel;
                    console.log(this.configData.placeData);
                    this.configData.formData.archivePosition = this.configData.placeData[0].dictValue1 + '\r';
                    this.configData.placeIndex = 0;
                    //TODO: 确认正确调用tooltip的时机
                    this.$timeout(() => {
                        $(".tplScroller").scroller();
                        this.admindesignsService.initTooltipster();
                    }, 0);
                }else {
                    this.configData.placeData = [];
                }
            })

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

        this.submitCompService.confirmArchiveSubmit(this.submitParams)
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
        this.goState('app.task.todo.personal',{pageId:'ap1600'});
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
    //打印相关动作
    doPrint(type) {
        type = type ? type : this.commonService.docType.bookConfirmation;
        this.utilityService.goState("doc", {id: this.submId, type:type, nodeCode: this.submissionData.submState, flag: 1}, true);
        this.cancelTimeout();
        this.hideTime = true;
    }
}

ConfirmArchiveController.$inject = [
    '$scope',
    '$timeout',
    '$stateParams',
    'UtilityService',
    'AdmindesignsService',
    'CommonDataService',
    'ArchiveDataService',
    'SubmitCompService',
    'CommonService'
];
