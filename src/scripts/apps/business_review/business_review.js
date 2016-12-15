/**
 * Created by Administrator on 2016/9/21 0021.
 */
export default class BusinessReviewController {

    constructor($scope,
                $timeout,
                $stateParams,
                UtilityService,
                AdmindesignsService,
                CommonDataService,
                ReivewDataService,
                SubmitCompService,
                CommonService
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$stateParams = $stateParams;
        this.utilityService = UtilityService;
        this.admindesignsService = AdmindesignsService;
        this.commomDataService = CommonDataService;
        this.dataService = ReivewDataService;
        this.submitCompService = SubmitCompService;
        this.commonService = CommonService;

        this.reviewData = {}; //包含 基本信息，额外信息

        this.submId = this.$stateParams.id;
        this.result = this.$stateParams.result;
        this.fileBaseUrl = './templates/apps/business_review/';
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
        this.buildConfigData();
        this.getSubmissionData()
            .then(()=>{
                this.fetchExtralInfo();
                this.opinionRequired();
                this.fetchApproveTpl(1);
                if (this.configData.resultMapping.auditor) {
                    this.fetchPersonbusiness('5');
                }
            });
        this.listenResultEvent();
    }

    //获取延期信息
    fetchPostponesInfo() {
        let params = {
            "submId": this.submId,
            "submState": this.submissionData.submState,
            "noUserId": true
        };
        this.dataService.fetchPostponesInfo(params)
            .then((response) => {
                this.reviewData.extralInfo = response;
            });
    }
    //获取[中止|终止]信息
    fetchAbortendsInfo() {
        let params = {
            "submId": this.submId,
            "submState": this.submissionData.submState,
            "noUserId": true
        };
        this.dataService.fetchAbortendsInfo(params)
            .then((response) => {
                this.reviewData.extralInfo = response;
            });
    }

    //获取[延期|中止|终止]信息
    fetchExtralInfo() {
        if (this.configData.resultMapping.actionType == 0) {
            //延期
            this.fetchPostponesInfo();
        } else {
            //中止终止
            this.fetchAbortendsInfo();
        }
    }

    /************submitComp相关代码*********************/
    //构建传入组件的数据
    buildConfigData () {
        //根据不同节点，配置不同文案
        //actionType: 0 延期; 1 中止; 2 终止
        //科长审核
        let sectionChiefMapping = {
            //收检延期
            '1701': {
                actionType: '0',
                pageId: 'ap1800',
                auditor: '主任审核人：',
                pageTitle: '任务领取延期',
                resultTitle: '任务领取延期审批结果'
            },
            //检验延期
            '1703': {
                actionType: '0',
                pageId: 'ap1800',
                auditor: '主任审核人：',
                pageTitle: '检验延期',
                resultTitle: '检验延期审批结果'
            },
            //检验中止
            '1707': {
                actionType: '1',
                pageId: 'ap1800',
                auditor: '主任审核人：',
                pageTitle: '检验中止',
                resultTitle: '检验中止审批结果'
            },
            //检验终止
            '1709': {
                actionType: '2',
                pageId: 'ap1800',
                auditor: '主任审核人：',
                pageTitle: '检验终止',
                resultTitle: '检验终止审批结果'
            },
            //文书延期
            '1705': {
                actionType: '0',
                pageId: 'ap1800',
                auditor: '主任审核人：',
                pageTitle: '文书延期',
                resultTitle: '文书延期审批结果'
            },
            //文书终止
            '1711': {
                actionType: '2',
                pageId: 'ap1800',
                auditor: '主任审核人：',
                pageTitle: '文书终止',
                resultTitle: '文书终止审批结果'
            }
        };
        //主任审核
        let directorMapping = {};
        for (let key in sectionChiefMapping) {
            let result = key.slice(0,1) + '8' + key.slice(2);
            directorMapping[result] = Object.assign({},sectionChiefMapping[key]);
            directorMapping[result].pageId = 'ap1803';
            delete directorMapping[result].auditor;
        }

        let resultMapping = Object.assign({},sectionChiefMapping, directorMapping);

        this.configData = {
            //路径地址：
            tplUrl:  this.fileBaseUrl + 'submitCompTpl.html',
            //组件文案配置：
            submitName: '提交',
            approveName: '审核',
            imageUrl: './assets/images/add_approve_opinion.png',
            resultMapping: resultMapping[this.result],
            //需要外部调接口传入组件的数据
            resultValue: '1',
            exaOpinionWriteRule: '',
            tplIndex: 0,
            tplData: {},
            reviewModel: {},
            //组件需要提交的数据
            formData: {},
            //组件内部需要调的方法：
            fetchApproveTpl: (resultValue)=>{
                this.fetchApproveTpl(resultValue);
            },
            goBack: ($event)=>{
                if ($event) {$event.stopPropagation();}
                this.goBack($event);
            }
        };
        //配置页面标题
        if (this.configData.resultMapping.auditor) {
            this.pageTitle = this.configData.resultMapping.pageTitle + '科长审核';
        } else {
            this.pageTitle = this.configData.resultMapping.pageTitle + '主任审核';
        }
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
    //获取签字人字典
    fetchPersonbusiness(personType) {
        let params = {
            serverCode: this.submissionData.serverCode,
            section: this.submissionData.section,
            type: personType
        };

        this.submitCompService.fetchPersonbusiness(params)
            .then((response) => {
                this.configData.reviewModel = response;
            });
    }
    //监听发出结果框事件,并弹出确认框
    listenResultEvent($event) {
        this.$scope.$on('approveSubmitSuccess', ()=> {
            this.admindesignsService.openMagnificPopup( './templates/modal/confirmPopup.html',this, {}, null,this.closePopup);
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
            this.submitParams.result = this.result;
        } else {
            let len = this.result.length;
            if ((1*this.result.charAt(len-1) +1) == 10) {
                this.submitParams.result = this.result.slice(0,-2) + 10;
            } else {
                this.submitParams.result = this.result.slice(0,-1) + (1*this.result.charAt(len-1) +1) ;
            }
        }

        if (this.configData.resultMapping.actionType == 0) {
            this.submitParams.postponeId = this.reviewData.extralInfo.id;
        } else {
            this.submitParams.abortendId = this.reviewData.extralInfo.id;
        }
    }
    //提交数据
    submitData() {
        this.bulidSubmitParams();
        this.submitCompService.submitSection(this.submitParams, this.configData.resultMapping.actionType)
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
//              this.goBack();
				this.closePopup();
				this.commonService.skipUrl(this.result);
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
};

BusinessReviewController.$inject = [
    '$scope',
    '$timeout',
    '$stateParams',
    'UtilityService',
    'AdmindesignsService',
    'CommonDataService',
    'ReivewDataService',
    'SubmitCompService',
    'CommonService'
];
