export default class AcceptSubmitCompController {
    constructor(
        $scope,
        $timeout,
        $stateParams,
        AdmindesignsService,
        SubmitCompService,
        CommonDataService
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$stateParams = $stateParams;
        this.admindesignsService = AdmindesignsService;
        this.submitCompService = SubmitCompService;
        this.commomDataService = CommonDataService;

        this.$scope.configData = this.$scope.$parent.submitComp.configData;

        this.acceptId = $stateParams.id;
        this.flag = this.$stateParams.flag;
        this.result = this.$stateParams.result;

        this.resultValue = '1';
        this.now = moment().format('YYYY-MM-DD');
        this.exaOpinionWriteRule = '';
        this.allReject = false;
        this.tplIndex = 0;
        this.tplData = {};
        this.personModel = {};
        this.formData = {};
        this.submitParams = {};

    }

    $onInit() {
        this.$scope.$watch('configData.allReject', (newVale)=> {
            if (newVale && this.resultValue =='1') {
                this.resultValue = '2';
                this.fetchApproveTpl('2');
            }
        });
        this.$scope.$on('preparedApproveSubmit', () => {
            this.bulidSubmitParams();
            this.$scope.$emit('approveSubmitSuccess',this.submitParams);
        });
        this.getSubmissionData(this.resultValue)
            .then(()=>{
                this.fetchApproveTpl('1');
                this.opinionRequired();
                this.fetchPickupPerson();
                this.fetchAgreedDay()
            });
    }
    //选择li给textarea赋值
    chooseTpl(index, tplContent) {
        let formData = this.formData;
        this.tplIndex = index;
        if (tplContent) {
            if (formData.opinion) {
                let len = formData.opinion.length + tplContent.length;
                if (len < 100 && formData.opinion.indexOf(tplContent) == -1) {
                    formData.opinion += tplContent + '\r';
                }
            } else {
                formData.opinion = tplContent + '\r';
            }
        }

    }

    //获取委托信息
    getSubmissionData() {
        return this.commomDataService.fetchSubmissionData(this.acceptId)
            .then((response) => {
                this.submissionData = response;
            });
    }
    //获取意见模板
    fetchApproveTpl(resultValue) {
        this.formData.opinion = '';
        let params = {
            serverCode: this.submissionData.serverCode,
            nodeCode: this.submissionData.submState,
            type: resultValue
        };
        this.submitCompService.fetchApproveTpl(params)
            .then((response) => {
                if (response && response.length) {
                    this.tplData = response;
                    this.formData.opinion = this.tplData[0].content + '\r';
                    this.tplIndex = 0;
                    //TODO: 确认正确调用tooltip的时机
                    this.$timeout(() => {
                        //this.admindesignsService.initTooltipster();
                        if (resultValue == 2) {
                            $(".tplScroller").scroller();
                        } else {
                            $(".tplScroller").scroller('destroy');
                        }
                    }, 0);
                }else {
                    this.tplData = [];
                }
            })
    }
    //系统配置：意见 是否必选项
    opinionRequired () {
        this.commomDataService.getServerInfo(this.submissionData.serverCode)
            .then((res) => {
                this.exaOpinionWriteRule = res.exaOpinionWriteRule;
            })
    }
    //获取收检人字典
    fetchPickupPerson() {
        let params = {
            serverCode: this.submissionData.serverCode,
            section: this.submissionData.section,
            noUserId: true
        };
        this.submitCompService.fetchPickupPerson(params)
            .then((response) => {
                this.personModel = response;
            });
    }
    //获取日期
    getDateStr () {
        if (this.timerDelay) {this.$timeout.cancel(this.timerDelay)}
        this.timerDelay = this.$timeout(() => {
            let beginDate =moment().format("YYYY-MM-DD"),
                agreedDay = this.formData.agreedDay,
                params = {};

            params = {
                serverCode: this.submissionData.serverCode,
                beginDate: beginDate,
                noUserId : true
            };

            if ($.isNumeric(agreedDay)) {
                params.type = '0';
                params.days = parseInt(agreedDay);

                this.submitCompService.calcDueDate(params)
                    .then((response) => {
                        this.formData.agreedDateStr = response.dueDate;
                    });
            } else {
                this.formData.agreedDateStr = undefined;
            }
            this.timerDelay = null;
        }, 500);
    }
    //获取天数
    getDays () {
        let beginDate =moment().format("YYYY-MM-DD"),
            agreedDateStr = this.formData.agreedDateStr,
            params = {};

        params = {
            serverCode: this.submissionData.serverCode,
            type: '1',
            beginDate: beginDate,
            endDate: agreedDateStr,
            noUserId : true
        };
        this.submitCompService.calcDueDate(params)
            .then((response) => {
                this.formData.agreedDay = response.days;
            });
    }
    //获取约定期限默认值
    fetchAgreedDay() {
        let params = {
            serverCode: this.submissionData.serverCode,
            section: this.submissionData.section,
            noUserId: true
        };

        this.submitCompService.fetchAgreedDay(params)
            .then((response) => {
                this.formData.agreedDay = response.agreedDay;
                this.getDateStr();
            });
    }
    //构建组件提交数据
    bulidSubmitParams() {
        this.submitParams = Object.assign({}, {
            nodeCode: this.submissionData.submState
        }, this.formData);
        if (this.resultValue == '1') {
            this.submitParams.result ='0501';
        } else {
            this.submitParams.result = '0502';
            delete this.submitParams.agreedDay;
            delete this.submitParams.agreedDateStr;
            delete this.submitParams.auditor;
        }

        //判断是否重新受理
        if (this.flag == '1') {
            this.submitParams.operateType = '1';
        }
    }

}

AcceptSubmitCompController.$inject = [
    '$scope',
    '$timeout',
    '$stateParams',
    'AdmindesignsService',
    'SubmitCompService',
    'CommonDataService'
];
