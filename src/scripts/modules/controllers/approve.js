export default class ApproveController {
    constructor($scope,
                $timeout,
                $stateParams,
                UtilityService,
                AdmindesignsService,
                CommonDataService,
                ApproveDataService,
                CommonService,
                EntrustAcceptDataCenterService
        ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$stateParams = $stateParams;
        this.utilityService = UtilityService;
        this.admindesignsService = AdmindesignsService;
        this.commomDataService = CommonDataService;
        this.commonService = CommonService;
        this.dataService = ApproveDataService;
        this.dcService = EntrustAcceptDataCenterService;
        this.formData = {};
        this.tplData = [];
        this.placeData = [];
        this.approveDetailData = {};
        this.opinionData = {};
        this.infoDate = {};
        this.submissionData = {};   //页面加载后的基本信息: serverCode section submState
        this.reviewModel = {};
        this.personModel = {};
        this.basicInfo = {};
        this.extralInfo = {};
        this.submId = this.$stateParams.id;  //url上绑定了 id result flag
        this.flag = this.$stateParams.flag; //flag 为1代表 重新预受理/跨级审批/预受理审核
        this.submResult = '';//每个页面的唯一标识
        this.submCode = '';
        this.formIndex = 0;   //表单字典类别
        this.resultIndex = {};
        this.personType = "";  //签字人类型
        this.resultCode = 0; //结果框字典类别
        this.urlIndex = 0;     //提交地址类型
        this.resultValue = 0;  //0:原因   1:通过   2:不通过
        this.timer = null;
        this.JSON = JSON;


        this.tplIndex = -1;
        this.counter = 5;
        this.timerDelay = null;
        this.now = moment().format('YYYY-MM-DD');

        this.searchFilterShow = false;
        this.type = {
            isApprove: false,
            isPreaccept: false,
            isSectionChief: false,
            isAccept: false,
            isApply: false,
            isDelayApply: '',
            isAbortendApply: '',
            isDelayApply: false,
            isDoc: false,
            isDocConfirm: false,
            isDocProgram: false,
            isDocStopApply: false
        };
        this.formDictionary = {
            'result': '',
            'success': '',
            'fail': '',
            'approveTime': '',
            'opinion': '',
            'apply_reason': '',
            'apply_person': '',
            'submit':'',
            'imageUrl': ""
        };
        this.resultDictionary = {
            'title': '',
            'number': '',
            'actionLink': ''
        };
        this.confirmData = {};
        this.oldSumbit = '';
        this.submitFlag = false;
        this.tplData = [];
        this.isActive = true;

        //提交文档 设置当前时间
        this.fileData = {
            fileDateStr: moment().format('YYYY-MM-DD'),
            archivesEndFlag: ''
        };
        this.dictData = {};
        this.formData.opinion = '';
        this.allReject = '';
        
        this.results = this.$stateParams.result;
    }

    $onInit() {
        //初始化dataService数据

        this.getResultIndex();
        this.getFormResult();
        this.getSubmissionData();
        this.getType();
        this.getPersonType();
        this.getFormDictionary();
        this.getResultDictionary();
        if (this.result =="1501") {
            this.fetchFiledPosition()
        }
        //点击空白关闭弹窗
        this.closeComp()
    }

    getSubmissionData() {
        this.commomDataService.fetchSubmissionData(this.submId)
            .then((response) => {
                this.submissionData = response;
                //意见：用户设置
                this.opinionRequired();
                //文书拟稿 ||(文书相关)
                if (this.result =='0802' || this.resultIndex.nodeType == 4 ) {
                    this.getNextNode();
                    if (this.resultIndex.nodeType == 4) {
                        //获取文书编号
                        this.fetchDocListData();
                        this.fetchApproveTpl();
                    }
                } else {
                    //获取意见模板
                    this.fetchApproveTpl();
                }

                //获取负责人
                if ((this.resultIndex.index == 1 && this.resultIndex.approveType == 5) || this.resultIndex.index == 2) {
                    this.fetchPersonbusiness();
                }
                //受理：获取收检人、约定期限
                if (this.resultIndex.approveType == 4) {
                    this.fetchPickupPerson();
                    this.fetchAgreedDay();
                }
                //申请：获取申请编号
                if (this.resultIndex.approveType == 5 || this.resultIndex.approveType == 6) {
                    this.fetchApplyId();
                }
                //提交归档：获取字典
                if (this.result == '1401') {
                    this.fetchDictionary();
                }

            });
    }


    getType() {
        this.submResult = this.$stateParams.result;
        /* var isPreaccept = ['0201','0301','0401'],
         isSectionChief = ['1701','1703','1705','1707','1709','1711'],*/

        var typeMap = {
            isApprove: ['0201', '0301', '0401', '1801', '1803', '1805', '1807', '1809', '1811'],
            isPreaccept: ['0201', '0301', '0401'],
            isSectionChief: ['1701', '1703', '1705', '1707', '1709', '1711'],
            isAccept: ['0501'],
            isApply: ['0602', '0704', '0804', '0705', '0706', '0805'],
            isDelayApply: ['0602', '0704', '0804'],
            isAbortendApply: ['0705', '0706', '0805'],
            isDocStopApply: ['0805'],
            isDoc: ['0901', '1001', '1003', '1201', '1101'],
            isDocConfirm: ['0901'],
            isDocProgram: ['1101']
        };

        for (var key in typeMap) {
            var arrayIndex = Array.indexOf(typeMap[key], this.submResult);

            if (arrayIndex !== -1) {
                this.type[key] = true;
                switch (key) {
                    case 'isPreaccept' :
                        this.formIndex = arrayIndex;
                        this.resultCode = arrayIndex;
                        break;
                    case 'isAccept' :
                        this.formIndex = 3;
                        this.resultCode = 3;
                        break;
                    case 'isApply' :
                        if (this.submResult == "0704") {
                            this.formIndex = 1;
                        } else if (this.submResult == "0804") {
                            this.formIndex = 2;
                        }
                        break;
                    case 'isDelayApply':
                        this.urlIndex = 1;
                        break;
                    case 'isAbortendApply':
                    {
                        this.urlIndex = 2;
                        break;
                    }
                    case 'isDocStopApply':
                    {
                        this.formIndex = 2;
                        break;
                    }
                }
            }
        }

    }

     getFormDictionary() {
        let tpl = {
            'result': ['', '审批结果：', '审批结果：', '审批结果：', '受理结果：', '审批结果：', '审批结果：','是否认可项目：'],
            'success': ['', '审批通过', '同意预受理', '同意预受理意见，不予受理此案件', '受理通过', '审批通过', '审批通过', '通过'],
            'fail': ['', '审批不通过', '不予预受理', '不同意预受理意见，受理此案件', '受理不通过', '审批不通过', '审批不通过', '退回'],
            'approveTime': ['审批时间：', '审批时间：', '审批时间：', '审批时间：'],
            'approve_opinion': ['', '审批意见：', '审批意见：', '审批意见：', '受理意见：', '审批意见：', '审批意见：', '呈批意见：'],
            'reason': ['', '延期原因：', '中止原因：', '终止原因：'],
            'apply_person': ['', '授权签字人：', '技术负责人：', '审批人：', '科长审核人：', '主任审核人：'],
            'submit': ['', '审核', '受理', '申请', '呈批', '归档'],
            'imageUrl': ['','./assets/images/add_approve_opinion.png', './assets/images/add_accept_opinion.png','./assets/images/add_apply_reason.png','./assets/images/add_doc_opinion.png']
        };
        if (this.result == '1501') {
            this.formDictionary.opinion = '确认归档意见：';
            this.formDictionary.submit = this.oldSumbit = tpl.submit[1];
            this.formDictionary.imageUrl = tpl.imageUrl[1];
        }
         if (this.result == '1401') {
             this.formDictionary.submit = this.oldSumbit = tpl.submit[1];
             this.formDictionary.imageUrl = tpl.imageUrl[1];
         }
        if (this.resultIndex.index == 1) {
            if (this.resultIndex.nodeType == 4) {
                this.formDictionary.result = tpl.result[1];
            } else {
                this.formDictionary.result = tpl.result[this.resultIndex.approveType];
            }
        } else if (this.resultIndex.nodeType == 3) {
            this.formDictionary.result = tpl.result[7];
        }

        if (this.resultIndex.index == 1) {
            if (this.resultIndex.nodeType == 4 ) {
                this.formDictionary.fail = tpl.fail[7];
                this.formDictionary.success = tpl.success[7];
                this.formDictionary.opinion = tpl.approve_opinion[1];
            } else {
                this.formDictionary.success = tpl.success[this.resultIndex.approveType];
                this.formDictionary.fail = tpl.fail[this.resultIndex.approveType];
                this.formDictionary.opinion = tpl.approve_opinion[this.resultIndex.approveType];
            }

        } else if (this.resultIndex.index == 2){
            this.formDictionary.opinion = tpl.reason[this.resultIndex.actionType];
        } else if (this.resultIndex.nodeType == 3) {
            this.formDictionary.opinion = tpl.approve_opinion[7];
        }

        this.formDictionary.apply_person = tpl.apply_person[this.personType];

        if (this.resultIndex.index == 1 ) {
            if(this.resultIndex.approveType !== 4) {
                this.formDictionary.submit = this.oldSumbit = tpl.submit[1];
                this.formDictionary.imageUrl = tpl.imageUrl[1];
            } else {
                this.formDictionary.submit = this.oldSumbit = tpl.submit[2];
                this.formDictionary.imageUrl = tpl.imageUrl[2];
            }
        }else if (this.resultIndex.index == 2 ) {
            this.formDictionary.submit = this.oldSumbit = tpl.submit[3];
            this.formDictionary.imageUrl = tpl.imageUrl[3];
        } else if (this.resultIndex.nodeType == 3) {
            this.formDictionary.submit = this.oldSumbit = tpl.submit[4];
            this.formDictionary.imageUrl = tpl.imageUrl[4];
        }



    }

    getResultDictionary() {

        var tpl = {
            'nodeName': ['', '收检', '检验', '文书'],
            'actionName': ['', '延期', '中止', '终止', "拟稿"],
            "approveName": ['', '跨级审批', '案件预受理', '案件预受理审核', '案件预受理'],
            'index': ['', "审批", "申请"],
            'number': ['', '委托编号：', '', '委托编号：', '受理编号：'],
            "actionlink": ['', '', '鉴定中止意见书', '鉴定终止意见书'],
            "docRelaTitle": ['', '复核', '授权签字人审批','技术负责人审批', '程序审批','领导审批']

        };


        if (this.resultIndex.approveType < 5 && this.resultIndex.index == 1) {
            tpl.index[this.resultIndex.index] = '';
            this.resultDictionary.number = tpl.number[this.resultIndex.approveType];
        } else {
            tpl.approveName[this.resultIndex.approveType] = '';
            this.resultDictionary.number = tpl.actionName[this.resultIndex.actionType] + '申请编号：';
        }

        if (this.result == '0802') {
            this.resultDictionary.title = '鉴定文书拟稿结果';
        } else if (this.result == '1401') {
            this.resultDictionary.title = '鉴定文书提交归档结果';
        } else if (this.result == '1501') {
            this.resultDictionary.title = '鉴定文书确认归档结果';
        } else if (this.resultIndex.nodeType == 4){
            this.resultDictionary.title = '鉴定文书' + tpl.docRelaTitle[this.resultIndex.docRelaType]+ '结果';
        } else{
            this.resultDictionary.title = tpl.nodeName[this.resultIndex.nodeType] + tpl.actionName[this.resultIndex.actionType] + tpl.index[this.resultIndex.index] + tpl.approveName[this.resultIndex.approveType] + '结果';
        }

        if (this.result == "0705" || this.result == "0706") {
            this.resultDictionary.actionLink = tpl.actionlink[this.resultIndex.actionType];
        } else {
            this.resultDictionary.actionLink = tpl.actionName[this.resultIndex.actionType] + '申请审批单';
        }
    }

    //获取表单result
    getFormResult() {
        if (this.result == '1003') {
            if (this.submissionData.sqqzr) {
                this.result = '1001';
            }
        }

        if (!this.resultValue) {
            this.formData.result = this.result;
        } else if (this.resultValue == '2') {
            if (this.result == '0401') {
                this.formData.result = '0401'
            } else {

                let len = this.result.length;
                if ((1*this.result.charAt(len-1) +1) == 10) {
                    this.formData.result = this.result.slice(0,-2) + 10;
                } else {
                    this.formData.result = this.result.slice(0,-1) + (1*this.result.charAt(len-1) +1) ;
                }

            }
        } else {
            if (this.result == '0401') {
                this.formData.result = '0402';
            } else {
                this.formData.result = this.result;
                this.showLeader = false;
            }

            if (this.result == '1101' && this.leaderApprove == '1') {
                this.formData.result = '1101';
                this.showLeader = true;
            } else if (this.result == '1101' && this.leaderApprove == '2') {
                this.formData.result = '1201';
                this.showLeader = false;
            }
            if (this.result == '1401' && this.resultValue == '1') {
                this.formData.auditorType = '1';
            }
        }
    }
    //获取意见模板
    fetchApproveTpl() {
        this.getFormResult();
        let params = {
            serverCode: this.submissionData.serverCode,
            nodeCode: this.submissionData.submState,
            type: this.resultValue
        };

        this.dataService.fetchApproveTpl(params)
            .then((response) => {
                this.formData.opinion = '';
                if (response) {
                    this.tplData = response;
                }
                //TODO: 确认正确调用tooltip的时机
                this.$timeout(() => {
                    this.admindesignsService.initTooltipster();
                }, 100);
                let content = '';
                if(this.tplData[0]) {
                    content = this.tplData[0].content || '';
                    this.chooseTpl(0, content);
                }

            })
    }
    //获取约定期限默认值
    fetchAgreedDay() {
        let params = {
            serverCode: this.submissionData.serverCode,
            section: this.submissionData.section,
            noUserId: true
        };

        this.dataService.fetchAgreedDay(params)
            .then((response) => {
                this.formData.agreedDay = response.agreedDay;
                this.getDateStr();
            });
    }
    // 获取归档位置
    fetchFiledPosition() {
        this.commomDataService.fetchFiledPositionModel()
            .then((res) => {
                if (res) {
                    this.placeData = res.FiledPositionModel;
                }
                let content = '';
                if(this.placeData[0]) {content = this.placeData[0].content}
                this.choosePlace(0, content || '');
            })

    }

    fetchPickupPerson() {
        let params = {
            serverCode: this.submissionData.serverCode,
            section: this.submissionData.section,
            noUserId: true
        }
        this.dataService.fetchPickupPerson(params)
            .then((response) => {
                this.personModel = response;
            });
    }


    fetchPersonbusiness() {
        let params = {
            serverCode: this.submissionData.serverCode,
            section: this.submissionData.section,
            type: this.personType
        };

        this.dataService.fetchPersonbusiness(params)
            .then((response) => {
                this.reviewModel = response;
            });
    }

    getPersonType() {
        if (this.result == '0705') {
            this.personType = '1';
        } else if (this.result == '0706') {
            this.personType = '2';
        } else if (this.result == '0805') {
            this.personType = '3';
        } else if (this.resultIndex.index == 2 && this.resultIndex.actionType == 1) {
            this.personType = '4';
        } else if (this.resultIndex.approveType == 5) {
            this.personType = '5';
        }
    }

    toggleApproveFrom($event) {
        if ($('#slideUpAnimate').css('display') == 'none' && this.result == '0501') {
            this.allReject = this.dcService.checkEvidenceSampleAllReject();

            if (this.allReject) {
                this.resultValue= '2'
            } 
            this.fetchApproveTpl();
        }
        this.isActive = !this.isActive;
        $('#slideUpAnimate').stop(true, true).slideToggle('slow',() => {
            this.formDictionary.submit = this.submitFlag ?  this.oldSumbit : '提交';
            this.submitFlag = !this.submitFlag;
            this.$scope.$apply();
        } );



        this.delegateDateTimePickerAction();

        if ($event) {
            $event.stopPropagation();
        }

        $(".approve-suggestion-tpl ul").scroller();
    }

    chooseTpl(index, tplContent) {
        this.tplIndex = index;
        if (tplContent) {
            tplContent = tplContent + '\r';
            if (this.formData.opinion) {
                let len = this.formData.opinion.length + tplContent.length;
                if (len < 100 && this.formData.opinion.indexOf(tplContent) == -1) {
                    this.formData.opinion += tplContent;
                }
            } else {
                this.formData.opinion = tplContent
            }
        }

    }

    choosePlace(index, tplContent)  {
        this.placeIndex = index;
        this.formData.archivePosition = tplContent;
    }


    popupConfirm($event) {
        if ($('#slideUpAnimate').css('display') == 'none') {
            this.toggleApproveFrom($event);
        } else {
            if (this.resultIndex.index !== 2) {
                //受理单独处理
                if (this.resultIndex.approveType == 4) {
                    this.handleAccept();
                } else {
                    this.admindesignsService.openMagnificPopup('confirm.html', this, {}, () => {
                        if (this.resultIndex.approveType < 4 && this.resultIndex.approveType != 0) {
                            this.dataService.fetchApprovalDetail(this.submId)
                                .then((response) => {
                                    /*前三审批节点 获取 送检材料*/
                                    this.approveDetailData = response;
                                });
                            /*if 预受理审核： 获取预受理审核信息*/
                            if (this.resultIndex.approveType == 3) {
                                this.fetchOpinionData();
                            }
                        } else {
                            /*if 科长||主任 审批： 获取页面信息*/
                            if (this.resultIndex.approveType == 5 || this.resultIndex.approveType == 6) {
                                this.basicInfo = this.dataService.basicInfo;
                                this.extralInfo = this.dataService.extralInfo;
                            }

                            /*if 文书拟稿提交*/
                            if (this.resultIndex.index == 0 && this.resultIndex.nodeType == 3) {
                                let reviewPerson = this.reviewPerson ? this.JSON.parse(this.reviewPerson) : {},
                                    appointAuditor = this.appointAuditor ? this.JSON.parse(this.appointAuditor) : {},
                                    techAuditor = this.appointAuditor ? this.JSON.parse(this.techAuditor) : {};
                                if (!this.formData.auditorType) {
                                    this.formData.auditor = reviewPerson.userId;
                                    this.personName = reviewPerson.name;
                                    this.personType = '鉴定复核人：';
                                    this.formData.auditorType = "";
                                } else if (this.formData.auditorType == '1') {
                                    this.formData.auditor = appointAuditor.userId;
                                    this.personName = appointAuditor.name;
                                    this.personType = '指定授权签字人';
                                } else if (this.formData.auditorType == '2') {
                                    this.formData.auditor = techAuditor.userId;
                                    this.personName = techAuditor.name;
                                    this.personType = '指定技术负责人';
                                }
                                //获取文书编号
                                this.fetchDocListData();
                            }
                            /*if 文书相关提交 */
                            if (this.resultIndex.nodeType == 4) {
                                let leaderPerson = this.leaderPerson ? this.JSON.parse(this.leaderPerson) : {},
                                    appointAuditor = this.appointAuditor ? this.JSON.parse(this.appointAuditor) : {},
                                    techAuditor = this.techAuditor ? this.JSON.parse(this.techAuditor) : {},
                                    reviewPerson = this.reviewPerson ? this.JSON.parse(this.reviewPerson) : {};
                                if (this.resultValue == '2' || (this.result !== '1101' && this.result !== '0901')) {
                                    this.formData.auditor = '';
                                    this.formData.auditorType = '';
                                    this.workHandOver = '';
                                }
                                if (this.result == '1101' ) {

                                    //领导审批
                                    if (this.leaderApprove == '1'){
                                        this.formData.auditor = leaderPerson.userId;
                                        this.formData.auditorType = '3';
                                        this.personName = leaderPerson.userName;
                                    } else if ((this.leaderApprove == '2')) {
                                        this.formData.auditor = '';
                                        this.formData.auditorType = '';
                                        this.personName = '';
                                    }

                                } else if (this.result == '0901') {
                                    //鉴定文书复核
                                    if (this.workHandOver == '1') {
                                        this.formData.auditor = reviewPerson.userId;
                                        this.personName = reviewPerson.name;
                                        this.personType = '鉴定复核人：';
                                        delete this.formData.auditorType;
                                    } else if (this.formData.auditorType == "1") {
                                        this.formData.auditor = appointAuditor.userId;
                                        this.personName = appointAuditor.userName;
                                        this.personType = '指定授权签字人';
                                    } else if (this.formData.auditorType == "2") {
                                        this.formData.auditor = techAuditor.userId;
                                        this.personName = techAuditor.userName;
                                        this.personType = '指定技术负责人';
                                    }
                                }
                            }
                        }
                    });
                }
            }
            else {
                this.submitApprove();
            }
        }
        $event.stopPropagation();
    }

    popupResult(response) {
        this.admindesignsService.openMagnificPopup('result.html', this, {}, () => {
            if (this.resultIndex.index == 1) {
                this.submCode = response.submCode;
            } else {
                this.submCode = response.code;
            }
            this.counter
            this.counter = 5;
            this.countDown();
        }, ()=> {
            this.cancelTimeout();
        });
    }

    //打印相关动作
    doPrint(type) {
        this.goToState(type);
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

    handleAccept () {
        let params = Object.assign({}, {
            nodeCode: this.submissionData.submState
        }, this.formData);
        this.$scope.$emit('approveSubmitSuccess',params);

    }
    //审批|| 申请拟稿
    commonsubmit() {
        let params = Object.assign({}, {
            submId: this.submId,
            section: this.submissionData.section,
            nodeCode: this.submissionData.submState
        }, this.formData);

        if (this.urlIndex) {
            params.reason = params.opinion;
            params.opinion = null;
            delete params.opinion;

            if (this.urlIndex == 2) {

                if (this.resultIndex.actionType == 2) {
                    params.type = '1';
                } else {
                    params.type = '2';
                }
            } else if (this.urlIndex == 1) {
                //延期

            }
        }
        //判断是否重新预受理/跨级审批/预受理审核
        if (this.flag == '1') {
            switch (this.result) {
                //重新跨级审批
                case '0201':
                    params.operateType = '3';
                    break;
                //重新预受理
                case '0301':
                    params.operateType = '1';
                    break;
                //重新预受理审核
                case '0401':
                    params.operateType = '2';
                    break;
            }
        }

        this.dataService.submitApprove(params, this.urlIndex)
            .then((response) => {
                this.popupResult(response);
            });
    }

    fetchApplyId() {
        let params = {
            "submId": this.submId,
            "submState": this.submissionData.submState,
            "noUserId": true
        };
        let index = '';
        if (this.resultIndex.actionType == 1) {
            index = 1;
        } else if (this.resultIndex.actionType == 2 || this.resultIndex.actionType == 3) {
            index = 2;
        }
        this.dataService.fetchApplyId(params, index)
            .then((response) => {
                this.dataService.extralInfo = response;
                this.applyId = response.id;
            });
    }


    //提交数据
    submitApprove() {
        if (this.resultIndex.index == 1) {
            this.admindesignsService.closeMagnificPopup();
        }
        this.toggleApproveFrom();

        if (this.resultIndex.index == 0 && this.resultIndex.nodeType == 3 ) {
            //提交:文书拟稿
            this.docSubmit()
        } else if (this.resultIndex.nodeType == 4) {
            //提交:文书相关
            if (this.resultIndex.docRelaType == 1 && this.workHandOver == '1') {
                //重新鉴定复核
                this.repeatRecheckedSubmit()
            } else {
                this.docRelaSubmit()
            }

        } else if (this.result == '1501') {
            //提交:确认文档
            this.confirmArchiveSubmit();
        } else if (this.resultIndex.index == 1 && (this.resultIndex.approveType == 5 || this.resultIndex.approveType == 6)){
            this.submitSection();
        } else if (this.result == '1401'){
            this.filedSubmit();
        } else {
            this.commonsubmit();
        }
    }

    reselection() {
        this.admindesignsService.closeMagnificPopup();
        this.toggleApproveFrom();
    }

    closePopup() {
        this.admindesignsService.closeMagnificPopup();
    }

    countDown() {
        this.timer = this.$timeout(() => {
            if (this.counter > 1) {
                this.counter--;
                this.countDown();
            } else {
                this.admindesignsService.closeMagnificPopup();
//              this.goback();
				this.commonService.skipUrl(this.results);
            }
        }, 1000);
    }


    goback($event) {
        if ($event) {$event.stopPropagation();}
        console.log(this.commomDataService.stateData);
        let pageId = this.commomDataService.stateData ? this.commomDataService.stateData.pageId : '',
            oldState = this.commomDataService.stateData ? this.commomDataService.stateData.status : 'app.task.todo.personal';
        this.utilityService.goState(oldState, {pageId});
    }
    //系统配置：意见 是否必选项
    opinionRequired () {
        this.commomDataService.getServerInfo(this.submissionData.serverCode)
            .then((res) => {
                this.opinionRequired = res.exaOpinionWriteRule;
            })
    }


    getResultIndex() {
        this.result = this.$stateParams.result;
        this.resultIndex = this.dataService.getResultIndex(this.result);
    }

    delegateDateTimePickerAction() {
        let _self = this;
        $('body').on('focusin', '.bs-datetimepicker', function() {
            if($(this).data('initialize')) return;

            $(this).data('initialize', true);
            _self.admindesignsService.initDateTimePicker($(this));
        });
    }


    getDateStr () {
        if (this.timerDelay) {this.$timeout.cancel(this.timerDelay)}
         this.timerDelay = this.$timeout(() => {
            let beginDate =moment().format("YYYY-MM-DD"),
                agreedDay = this.formData.agreedDay || this.formData.days,
                params = {};
             if (this.resultIndex.actionType == 1 && this.resultIndex.index == 2) {
                 beginDate =moment(this.submissionData.agreedDate).format("YYYY-MM-DD");
             }
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
                        if (this.result == '0501') {
                            this.formData.agreedDateStr = response.dueDate;
                        } else{
                            this.formData.endDate = response.dueDate;
                        }
                    });
            } else {
                this.formData.agreedDateStr = undefined;
                this.formData.endDate = undefined;
            }
             this.timerDelay = null;
        }, 500);
    }

    getDays () {
        let beginDate =moment().format("YYYY-MM-DD"),
            agreedDateStr = this.formData.agreedDateStr || this.formData.endDate,
            params = {};
        if (this.resultIndex.actionType == 1 && this.resultIndex.index == 2) {
            beginDate =moment(this.submissionData.agreedDate).format("YYYY-MM-DD");
        }
        params = {
            serverCode: this.submissionData.serverCode,
            type: '1',
            beginDate: beginDate,
            endDate: agreedDateStr,
            noUserId : true
        };
        this.dataService.calcDueDate(params)
            .then((response) => {
                if (this.result == '0501') {
                    this.formData.agreedDay = response.days;
                } else{
                    this.formData.days = response.days;
                }
            });
    }

    /*********文书拟稿*********/
    //文书拟稿复核人
    fetchTestUsers() {
        this.commomDataService.fetchTestUsers()
            .then((response) => {
                this.testUsersData = response;
            });
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
        this.commomDataService.getBusinessPersonnel(params)
            .then((response) => {
                if (type == 1) {
                    this.grantPersonnelData = response;
                } else if (type == 2) {
                    this.techPersonnelData = response;
                } else if (type ==4) {
                    this.leaderPersonnelData = response;
                }
            });

    }
    //获取重新复核人员
    fetchRecheckeduser() {
        let params = {
            submId:this.submId
        }
        this.dataService.fetchRecheckeduser(params)
            .then((res)=>{
                this.repeatRecheckedList = res;
            })
    }
    getNextNode() {
        if (this.result == '0802') {
            let params = {
                "serverCode": this.submissionData.serverCode,
                "section": this.submissionData.section,
                "nodeCode": this.submissionData.submState,
                "noUserId": true
            };
            this.commomDataService.getNextNode(params)
                .then((response) => {
                    let nextNodeCode = response.nodeCode;
                    //let nextNodeCode = '0001';
                    if (nextNodeCode == '0900') {
                        this.showReviewer = true;
                        this.fetchTestUsers();
                    } else {
                        this.showReviewer = false;
                        this.formData.auditorType = '';
                        this.getBusinessPersonnel(1);
                        this.getBusinessPersonnel(2);
                    }
                });
        }
        if (this.result == '0901') {
            //鉴定复核
            this.getBusinessPersonnel(1);
            this.getBusinessPersonnel(2);
            this.fetchRecheckeduser();
            let params = {
                "serverCode": this.submissionData.serverCode,
                "section": this.submissionData.section,
                "nodeCode": this.submissionData.submState,
                "noUserId": true
            };
            this.commomDataService.getNodeConfig(params)
                .then((res) => {
                    this.isRepeatRechecked = res.isRepeatRechecked || '0';
                    if (res.isRepeatRechecked == '1') {
                        this.workHandOver = '1';
                    } else{
                        this.formData.auditorType = '1';
                    }
                });

        } else if (this.result == '1101') {
            this.getBusinessPersonnel(4);
        }
    }
    /*文书拟稿提交*/
    docSubmit() {
        let params = Object.assign({}, {
            submId: this.submId,
            section: this.submissionData.section,
            nodeCode: this.submissionData.submState,
            result: '0802'
        }, this.formData);
        this.dataService.docSubmit(params)
            .then((response) => {
               this.popupResult(response);
            });
    }
    /*文书相关提交*/
    docRelaSubmit() {
        let params = Object.assign({}, {
            submId: this.submId,
            section: this.submissionData.section,
            nodeCode: this.submissionData.submState
        }, this.formData);
        this.dataService.docRelaSubmit(params)
            .then((response) => {
                this.popupResult(response);
            });
    }
    /*重新文书复核提交*/
    repeatRecheckedSubmit() {
        let params = Object.assign({}, {
            submId: this.submId,
            section: this.submissionData.section,
            nodeCode: this.submissionData.submState
        }, this.formData);
        this.dataService.repeatRecheckedSubmit(params)
            .then((response) => {
                this.popupResult(response);
            });
    }
    /*确认文档提交*/
    confirmArchiveSubmit() {
        let params ={
            submId: this.submId,
            section: this.submissionData.section,
            nodeCode: this.submissionData.submState,
            result: this.result,
            archiveOpinion: this.formData.opinion,
            archivePosition: this.formData.archivePosition
        };
        this.dataService.confirmArchiveSubmit(params)
            .then((response) => {
                this.popupResult(response);
            });
    }
//科长审核提交
    submitSection () {
        let params = Object.assign({}, {
            submId: this.submId,
            section: this.submissionData.section,
            nodeCode: this.submissionData.submState
        }, this.formData);

        if (this.resultIndex.index ==1 && (this.resultIndex.approveType == 5 || this.resultIndex.approveType == 6)){
            if (this.resultIndex.actionType == 1) {
                params.postponeId = this.applyId || '';
            } else {
                params.abortendId = this.applyId|| '';
            }
        }
        let index = '';
        if (this.resultIndex.actionType == 1) {
            index = 1;
        } else if (this.resultIndex.actionType == 2 || this.resultIndex.actionType == 3) {
            index = 2;
        }
        this.dataService.submitSection(params, index)
            .then((response) => {
                this.popupResult(response);
            });
    }
    /*****************提交文书****************/
    //获取字典
    fetchDictionary() {
        this.dataService.fetchDictionary(['IsNoIssueModel'])
            .then((response) => {
                this.dictData.IsNoIssueModel = response.IsNoIssueModel;
            });
    }
    filedSubmit() {
        let params = Object.assign({}, {
            "result": this.result,
            "submId": this.submId,
            "section": this.submissionData.section,
            "nodeCode": this.submissionData.submState
        }, this.fileData);

        this.dataService.filedSubmit(params)
            .then((response) => {
                this.popupResult(response);
            });
    }
    //获取鉴定文书列表
    fetchDocListData() {
        this.dataService.fetchDocListData(this.submId)
            .then((response) => {
                let tempArr = [];
                this.confirmData.docCode = '';
                this.docListData = response;
                let len = this.docListData.length;
                for (let i = 0; i < len; i++) {
                    tempArr.push(this.docListData[i].code);
                }
                this.confirmData.docCode = tempArr.join(',');
            });
    }

    /*****************其他*************/
    //获取预受理弹窗理数据
    fetchOpinionData () {
        this.dataService.fetchOpinionData(this.submId)
            .then((res)=>{
                this.opinionData = res;
            });
    }

    goToState(type) {
        this.utilityService.goState("doc", {id: this.submId, type:type, nodeCode: this.submissionData.submState, flag: 1}, true);
    }

    closeComp() {
        let that = this;
        $(document).on('click', function(e) {
            let t = $(e.target);
            if(!(t.hasClass('.ui-approve') || t.parents('.ui-approve').length)) {
                if (that.submitFlag) {
                    $('#slideUpAnimate').stop(true, false).slideUp('slow',() => {
                        that.formDictionary.submit = that.submitFlag ?  that.oldSumbit : '提交';
                        that.submitFlag = !that.submitFlag;
                        that.isActive = true;
                        that.$scope.$apply();
                    } );
                }
            }
        });
    }

}


ApproveController.$inject = [
    '$scope',
    '$timeout',
    '$stateParams',
    'UtilityService',
    'AdmindesignsService',
    'CommonDataService',
    'ApproveDataService',
    'CommonService',
    'EntrustAcceptDataCenterService'
];
