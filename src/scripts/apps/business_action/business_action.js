/**
 * Created by Administrator on 2016/9/21 0021.
 */
export default class BusinessActionController {

    constructor($scope,
                $stateParams,
                $timeout,
                UtilityService,
                AdmindesignsService,
                SubmitCompService,
                CommonDataService,
                CommonService,
                EntrustAcceptActionService
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$stateParams = $stateParams;
        this.utilityService = UtilityService;
        this.admindesignsService = AdmindesignsService;
        this.commomDataService = CommonDataService;
        this.commonService = CommonService;
        this.dataService = SubmitCompService;
        this.actionService = EntrustAcceptActionService;

        this.submId = this.$stateParams.id;
        this.result = this.$stateParams.result;
        this.fileBaseUrl = './templates/apps/business_action/';
        this.$scope.resultUrl = this.fileBaseUrl + 'result.html';
        this.configData = {};
        this.submitParams = {};
        this.counter = 5;
        this.code = '';

        this.$scope.submitData = ()=>{
            this.submitData()
        };
        this.reviewData = {};
    }

    $onInit() {
        this.buildConfigData();
        this.getSubmissionData()
            .then(()=>{
                this.fetchApproveTpl(0);
                this.fetchPersonbusiness(this.configData.resultMapping.personType);
            });
        this.listenResultEvent();
        this.actionService.delegateDateTimePickerAction();
    }
    /************submitComp相关代码*********************/
    //构建传入组件的数据
    buildConfigData () {
        //根据不同节点，配置不同文案
        //type: 1 中止；  2 终止
        let resultMapping = {
            //任务领取延期
            '0602': {
                delay: true,
                pageId: 'ap1050',
                personType: '4',
                reason: '延期原因：',
                auditor: '科长审核人：',
                pageTitle: '任务领取延期',
                resultTitle: '任务领取延期申请结果',
                code: '延期申请编号：',
                printName: '打印延期申请审批单',
                printUrl: '',
                getDateStr: ()=>{
                    this.getDateStr()
                },
                getDays: ()=>{
                    this.getDays()
                }
            },
            //鉴定延期申请
            '0704': {
                delay: true,
                pageId: 'ap1060',
                personType: '4',
                reason: '延期原因：',
                auditor: '科长审核人：',
                pageTitle: '检验延期',
                resultTitle: '检验延期申请结果',
                code: '延期申请编号：',
                printName: '打印延期申请审批单',
                printUrl: '',
                getDateStr: ()=>{
                    this.getDateStr()
                },
                getDays: ()=>{
                    this.getDays()
                }
            },
            //鉴定中止申请
            '0705': {
                type: '1',
                pageId: 'ap1060',
                personType: '1',
                reason: '中止原因：',
                auditor: '授权签字人：',
                pageTitle: '检验中止',
                resultTitle: '检验中止申请结果',
                code: '中止申请编号：',
                printName: '打印鉴定中止意见书',
                printUrl: ''
            },
            //鉴定终止申请
            '0706': {
                type: '2',
                pageId: 'ap1060',
                personType: '2',
                reason: '终止原因：',
                auditor: '技术负责人：',
                pageTitle: '检验终止',
                resultTitle: '检验终止申请结果',
                code: '终止申请编号：',
                printName: '打印鉴定终止意见书',
                printUrl: ''
            },
            //拟稿延期申请
            '0804': {
                delay: true,
                pageId: 'ap1080',
                personType: '4',
                reason: '延期原因：',
                auditor: '科长审核人：',
                pageTitle: '文书延期',
                resultTitle: '文书延期申请结果',
                code: '延期申请编号：',
                printName: '打印延期申请审批单',
                printUrl: '',
                getDateStr: ()=>{
                    this.getDateStr()
                },
                getDays: ()=>{
                    this.getDays()
                }
            },
            //拟稿终止申请
            '0805': {
                type: '2',
                pageId: 'ap1080',
                personType: '3',
                reason: '终止原因:',
                auditor: '审批人：',
                pageTitle: '文书终止',
                resultTitle: '文书终止申请结果',
                code: '中止申请编号：',
                printName: '打印终止申请审批单',
                printUrl: ''
            }
        };

        this.configData = {
            //路径地址：
            tplUrl:  this.fileBaseUrl + 'submitCompTpl.html',
            //组件文案配置：
            submitName: '提交',
            approveName: '申请',
            imageUrl: './assets/images/add_apply_reason.png',
            resultMapping: resultMapping[this.result],
            //需要外部调接口传入组件的数据
            tplIndex: 0,
            tplData: {},
            reviewModel: {},
            //组件需要提交的数据
            formData: {},
            //组件内部需要调的方法：
            goBack: ($event)=>{
                if ($event) {$event.stopPropagation();}
                this.goBack($event);
            }
        };
        //配置页面标题
        this.pageTitle = this.configData.resultMapping.pageTitle;
        this.$scope.resultTitle = this.configData.resultMapping.resultTitle;
    }
    //获取委托信息
    getSubmissionData() {
        return this.commomDataService.fetchSubmissionData(this.submId)
            .then((response) => {
                this.submissionData = response;
                this.reviewData.basicInfo = this.submissionData;
            });
    }
    //获取意见模板
    fetchApproveTpl(resultValue) {
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
                }
            })
    }
    //获取签字人字典
    fetchPersonbusiness(personType) {
        let params = {
            serverCode: this.submissionData.serverCode,
            section: this.submissionData.section,
            type: personType
        };

        this.dataService.fetchPersonbusiness(params)
            .then((response) => {
                this.configData.reviewModel = response;
            });
    }

    //获取日期
    getDateStr () {
        if (this.timerDelay) {this.$timeout.cancel(this.timerDelay)}
        this.timerDelay = this.$timeout(() => {
            let beginDate = moment(this.submissionData.agreedDate).format("YYYY-MM-DD"),
                agreedDay = this.configData.formData.days,
                params = {};

            params = {
                serverCode: this.submissionData.serverCode,
                beginDate: beginDate,
                noUserId : true
            };

            if ($.isNumeric(agreedDay)) {
                params.type = '0';
                params.days = parseInt(agreedDay);

                this.dataService.calcDueDate(params)
                    .then((response) => {
                        this.configData.formData.endDate = response.dueDate;
                    });
            } else {
                this.configData.formData.endDate = undefined;
            }
            this.timerDelay = null;
        }, 500);
    }
    //获取天数
    getDays () {
        let beginDate = moment(this.submissionData.agreedDate).format("YYYY-MM-DD"),
            agreedDateStr = this.configData.formData.endDate,
            params = {};

        params = {
            serverCode: this.submissionData.serverCode,
            type: '1',
            beginDate: beginDate,
            endDate: agreedDateStr,
            noUserId : true
        };
        this.dataService.calcDueDate(params)
            .then((response) => {
                this.configData.formData.days = response.days;
            });
    }
    //监听发出结果框事件,并弹出确认框
    listenResultEvent($event) {
        this.$scope.$on('approveSubmitSuccess', ()=> {
            this.submitData()
            this.admindesignsService.openMagnificPopup( './templates/modal/resultPopup.html',this, {}, this.countDown, ()=>{
                this.closePopup();
                this.cancelTimeout();
            })
        });
    }
    //构建组件提交数据
    bulidSubmitParams() {
        this.submitParams = Object.assign({}, {
            submId: this.submId,
            section: this.submissionData.section,
            nodeCode: this.submissionData.submState
        }, this.configData.formData);
        this.submitParams.result = this.result;
        if (!this.configData.resultMapping.delay) {
            this.submitParams.type = this.configData.resultMapping.type;
        }
    }
    //提交数据
    submitData() {
        this.bulidSubmitParams();
        if (this.configData.resultMapping.delay) {
            this.dataService.postponeSubmit(this.submitParams)
                .then((response) => {
                    this.code = response.code;
                });
        } else {
            this.dataService.abortendSubmit(this.submitParams)
                .then((response) => {
                    this.code = response.code;
                });
        }
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
            this.hideTime = true;
        }
    }
    //打印相关动作
    doPrint(type) {
        type = type ? type : this.commonService.docType.bookConfirmation;
        this.utilityService.goState("doc", {id: this.submId, type:type, nodeCode: this.submissionData.submState, flag: 1}, true);
        this.cancelTimeout();
    }


};

BusinessActionController.$inject = [
    '$scope',
    '$stateParams',
    '$timeout',
    'UtilityService',
    'AdmindesignsService',
    'SubmitCompService',
    'CommonDataService',
    'CommonService',
    'EntrustAcceptActionService'
];
