export default class DocConfirmController {

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
        this.fileBaseUrl = './templates/apps/doc_confirm/';
        this.$scope.confirmUrl = this.fileBaseUrl + 'confirm.html';
        this.$scope.resultUrl = this.fileBaseUrl + 'result.html';
        this.$scope.resultTitle = '鉴定文书复核结果';
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
        this.title = "鉴定文书复核";
        this.buildConfigData();
        this.getSubmissionData()
            .then(()=>{
                this.fetchApproveTpl(1);
                this.opinionRequired();
                this.getNodeConfig();
                this.fetchRecheckeduser();
                this.getBusinessPersonnel(1);
                this.getBusinessPersonnel(2);
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
            reviewPerson: '', //复核人
            grantPerson: '', //授权人
            techPerson: '', //技术负责人
            //需要外部调接口传入组件的数据
            isRepeatRechecked: '', //是否重新复核配置
            workHandOver: '',
            tplData: {},//意见模板数据
            repeatRecheckedList: {},//重新复核人员列表
            grantPersonnelData: {},//授权签字人员列表
            techPersonnelData: {},//技术负责人员列表
            //组件需要提交的数据
            formData: {
                cnasFlag: '1',
                cmaFlag: '1'
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
    }
    //获取委托信息
    getSubmissionData() {
        return this.dataService.fetchSubmissionData(this.submId)
            .then((response) => {
                this.submissionData = response;
            });
    }
    //获取是否重新复核配置
    getNodeConfig() {
        let params = {
            "serverCode": this.submissionData.serverCode,
            "section": this.submissionData.section,
            "nodeCode": this.submissionData.submState,
            "noUserId": true
        };
        this.dataService.getNodeConfig(params)
            .then((res) => {

                this.configData.isRepeatRechecked = res.isRepeatRechecked || '0';
                //this.configData.isRepeatRechecked = '0';
                if (this.configData.isRepeatRechecked == '1') {
                    this.configData.workHandOver = '1';
                } else{
                    this.configData.formData.auditorType = '1';
                }
            });
    }
    //获取重新复核人员
    fetchRecheckeduser() {
        let params = {
            submId:this.submId
        };
        this.submitCompService.fetchRecheckeduser(params)
            .then((res)=>{
                this.configData.repeatRecheckedList = res;
            })
    }

    //获取业务审批人员
    //type：1、授权签字人 2、技术负责人
    getBusinessPersonnel(type) {
        let params = {
            "serverCode": this.submissionData.serverCode,
            "section": this.submissionData.section,
            "type": type,
            "noUserId": true
        };
        this.dataService.getBusinessPersonnel(params)
            .then((response) => {
                if (type == 1) {
                    this.configData.grantPersonnelData = response;
                } else if (type == 2) {
                    this.configData.techPersonnelData = response;
                }
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

        if (this.configData.resultValue == '1') {
            this.submitParams.result ='0901';

            switch(this.configData.formData.auditorType) {
                case '1':
                    this.submitParams.auditor = this.configData.grantPerson;
                    break;
                case '2':
                    this.submitParams.auditor = this.configData.techPerson;
                    break;
                default :
                    this.submitParams.auditor = this.configData.reviewPerson;
                    this.submitParams.auditorType = '';
            }
        } else {
            this.submitParams.result = '0902';
            this.submitParams.auditor = '';
            this.submitParams.auditorType = '';
        }
        console.log(this.submitParams);
    }
    //提交数据
    submitData() {
        if (this.configData.workHandOver == '1' && this.configData.resultValue == '1') {
            this.submitCompService.repeatRecheckedSubmit(this.submitParams)
                .then((response) => {
                    this.closePopup();
                    this.admindesignsService.openMagnificPopup( './templates/modal/resultPopup.html',this, {}, this.countDown, this.cancelTimeout);
                });
        } else {
            this.submitCompService.docRelaSubmit(this.submitParams)
                .then((response) => {
                    this.closePopup();
                    this.admindesignsService.openMagnificPopup( './templates/modal/resultPopup.html',this, {}, this.countDown, this.cancelTimeout);
                });
        }
    }

    //跳转不同节点
    goState(state, pageId) {
        state = state ? state : 'app.task.todo.personal';
        this.utilityService.goState(state, pageId);
    }
    goBack() {
        this.goState('app.task.todo.personal',{pageId:'ap1090'});
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

DocConfirmController.$inject = [
    '$scope',
    '$stateParams',
    '$timeout',
    'UtilityService',
    'AdmindesignsService',
    'CommonDataService',
    'CommonService',
    'SubmitCompService'
];
