import cookie from 'js-cookie';
import store from 'store';

export default class EntrustController {

    constructor(
        $scope,
        $state,
        $timeout,
        toaster,
        UtilityService,
        AdmindesignsService,
        EntrustAcceptRenderService,
        EntrustAcceptDataCenterService,
        EntrustAcceptActionService,
        EntrustDataService,
        EntrustAcceptUtilService,
        PDF_URL,
        FILE_URL
    ) {
        this.$scope = $scope;
        this.$state = $state;
        this.$timeout = $timeout;
        this.toaster = toaster;
        this.utilityService = UtilityService;
        this.admindesignsService = AdmindesignsService;
        this.renderService = EntrustAcceptRenderService;
        this.dcService = EntrustAcceptDataCenterService;
        this.actionService = EntrustAcceptActionService;
        this.dataService = EntrustDataService;
        this.utilService = EntrustAcceptUtilService;
        this.pdfUrl = PDF_URL;
        this.fileUrl = FILE_URL;

        this.userId = cookie.get('userId');
        this.userInfo = store.get("userInfo");

        this.submId = $state.params.id;
        this.flag = $state.params.flag; // 1、暂存 2、修改 3、复制 4、补送
        this.isSubmitPending = false;
        this.submitResult = [];

        this.stateName = this.$state.current.name;

        this.tmpFlag = 1;
        this.updFlag = 2;
        this.copyFlag = 3;
        this.appendFlag = 4;
        this.counter = 5;
        this.timer = null;

        this.isReuse = false;
        this.channelType = this.utilityService.getParameterByName('channelType') || 1;
    }

    $onInit() {
        let con = $('#entrust_container');

        this.isReuse = (this.stateName === 'app.entrust.apply.evidence.reuse');
        this.dcService.activeState = this.stateName;
        this.dcService.flag = this.flag;

        if (!this.utilityService.isEmpty(this.flag)) {
            this.getSubmInfo();
        }

        this.admindesignsService.delegateDateTimePickerAction();
        
        this.actionService.delegateDtRowAction(con, this.$scope);


        this.$scope.$on('fetchInstitutionSuccess', () => {
            this.dcService.prepareDictMapping()
                .then(() => {
                    this.renderService.render(this.$scope);
                    this.$scope.$broadcast('dictFetchSuccess');
                    //设置默认值
                    if (this.utilityService.isEmpty(this.flag) && !this.isReuse) {
                        this.setDefaultValue();
                    }


                    this.dcService.watchChange(this.$scope);
                });
        });

        this.utilService.resetData(this.$scope);
        this.userInfo = store.get('userInfo');
        this.$timeout(() => {
            this.dcService.containerForm = this.form;
        });
        this.$scope.$on('memberListAdded', () => {
            this.renderService.addSampleList(this.$scope);
        });
    }

    saveTemporaryData() {
        this.isSubmitPending = true;
        let data = this.dcService.getData();

        data.submission.id = this.submId;

        //补送的时候, 增加补送标记
        if (this.flag == this.appendFlag) {
            data.submission.flag = 1;
        }      
        this.dataService.saveTemporaryData(data)
            .then((response) => {
                this.submId = response.id;
                this.toaster.pop('success', null, '暂存数据成功');
                this.isSubmitPending = false;
            });
    }

    // 复用委托
    reuseEntrust() {
        this.cancelTimeout();
        store.set('dcService', this.dcService.getData());
        window.location.href = '/app/entrust/apply/evidence/reuse?channelType='+this.channelType;
    }

    openMagnificPopup(url) {
        let baseUrl = './templates/apps/entrust/modal/';
        this.admindesignsService.openMagnificPopup(baseUrl+url,this, {showCloseBtn: false})
    }

    openResultPopup(url) {
        let baseUrl = './templates/apps/entrust/modal/';
        this.admindesignsService.openMagnificPopup(baseUrl+url,this,  {showCloseBtn: false}, () => {
            this.countDown();
        },()=> {
            this.cancelTimeout();
        });
    }


    checkDataCompleteness() {
        if(!this.dcService.checkDataCompleteness()) {
            this.openMagnificPopup('error-info.html');
        } else {
            this.openMagnificPopup('pre-submit-info.html');
        }
    }

    submitentrust() {

        this.isSubmitPending = true;
        let params = this.dcService.getData(),
            type = 1; // 1、insert 2、update 3、外部单位 4、绿色通道 5、补送

        //调用insert 复制、新增、暂存

        //修改
        if (this.flag == this.updFlag) {
            type = 2;
            this.channelType = 2;
        }

        if (this.stateName == "app.entrust.apply.external" || this.channelType == 3) {
            type = 3;
            this.channelType = 3;
        }

        if (this.stateName == "app.entrust.apply.channel" || this.channelType == 4) {
            type = 4;
            this.channelType = 4;
        }

        if (this.flag == this.appendFlag || (params.submission.flag == 1 && this.flag == this.tmpFlag)) {
            params.submission.superId = this.submId;
            type = 5;
            this.channelType = 5;
        }

        //复制、暂存和补送提交时, 去掉委托id   
        if (this.flag == this.tmpFlag || this.flag == this.copyFlag || this.flag == this.appendFlag) {
            delete params.submission.id;
        }

        this.dataService.submitentrust(params, type)
            .then((response) => {
                //update 的时候，返回值为object
                if (type == 2 || type == 5) {
                    this.submitResult.push(response);
                } else {
                    this.submitResult = response;
                }

                let idAry;
                this.admindesignsService.initNProgress("#pre_submit_info_modal .panel-body");

                idAry = this.buildDocIframe(this.submitResult);
                NProgress.start();
                this.getDocGenerateResult(idAry);
            });
    }

    buildDocIframe(data) {
        let docFrag = $(document.createDocumentFragment()),
            idAry = [],
            serverCode = this.dcService.submission.serverCode;
        for(let i = 0, len = data.length; i < len; i++) {
            let params = {
                    flag: '2',
                    type: '1',
                    // bookType: '551',
                    filter: data[i].submId,
                    identifyCategoryCode: data[i].identifyCategory,
                    uuid: data[i].submFileUUID,
                    serverCode: serverCode,
                    section: data[i].section
                },
                source = this.pdfUrl+'/bookUpload/uploadFile.html?'+$.param(params),
                iframe = $('<iframe width="0" height="0" src="'+source+'"></iframe>');

            docFrag.append(iframe);
            idAry.push(data[i].submFileUUID);
        }

        $('body').append(docFrag);
        return idAry;
    }

    getDocGenerateResult(idAry) {
        let counter = 6;
        this.dataService.getDocGenerateResult(idAry)
            .then((response) => {
                if(!response.isexists) {
                    if(--counter >= 0) {
                        this.$timeout(() => {
                            this.getDocGenerateResult(idAry);
                        }, 3000);
                    } else {
                        this.admindesignsService.closeMagnificPopup();
                        this.toaster.pop('error', null, '生成文书超时');
                    }
                } else {
                    //如果是委托暂存的情况，删除暂存信息
                    if (this.flag == this.tmpFlag || (typeof this.flag == 'undefined' && this.submId)) {
                        this.delTmpSubm();
                    }
                    this.mergePdfPath = response.mergePdfPath;
                    NProgress.done();
                    this.admindesignsService.closeMagnificPopup();
                    this.openResultPopup('count-down.html');
                }
            });
    }

    delTmpSubm(){
        let submIds = [];
        submIds.push(this.submId);

        this.dataService.delTmpSubm(submIds)
            .then((response) => {

            });
    }

    getSubmInfo() {
        this.dataService.getSubmInfo(this.submId, this.flag)
            .then((response) => {
                this.dcService.submissionId = response.submission.id;

                 //补送的时候, 不需要检材样本
                if (this.flag == this.appendFlag) {
                    this.dcService.isAppend = true;
                    for (let val of response.evidenceList) {
                        val.sampleDNAList = [];
                        val.sampleList = [];
                    }
                    response.memberList = [];
                    response.memberDNAList = [];
                    response.nameLessCorpseList = [];
                    response.parentAlrightList = [];
                    response.relativesRelationList = [];
                } else {
                    this.dcService.isAppend = false;
                }

                //复制的时候，清空id
                if (this.flag == this.copyFlag ) {
                    this.submId = "";
                }

                this.dcService.buildData(response);
                this.dcService.setData(response);
                this.dcService.splitFileData(this.$scope);

            });
    }

    reloadPage() {
        window.location.reload();
    }

    //设置默认值
    setDefaultValue() {
        this.dcService.submission.submittedBy = this.userInfo.userName;
        this.dcService.submission.contact = this.userInfo.contact;
        this.dcService.submission.position = this.userInfo.post;
        this.dcService.submission.credentialType = this.dcService.dictData.CreTypeModel[0].dictKey;
        this.dcService.submission.credentialNumber = this.userInfo.policeId;
        this.dcService.caseInfo.caseType = this.dcService.dictData.CaseTypeModel[0].dictKey;
        this.dcService.caseInfo.priority = this.dcService.dictData.CasePriorityModel[0].dictKey;
        this.dcService.submission.submitDateStr = moment().format("YYYY-MM-DD");
        //委托方对鉴定方法的要求 添加默认值
        this.dcService.submission.methodRequest = this.dcService.dictData.TestMethodRequestModel[0].dictValue1+"\r";

        this.getDepartmentInfo(this.userInfo.userId, 1);
    }

    getDepartmentInfo(id, type) {

        this.dataService.getDepartmentInfo(id, type)
            .then((response) => {
                this.dcService.submission.departmentPhone = response.phone;
                this.dcService.submission.departmentFaxno = response.faxNo;
                this.dcService.submission.departmentPostno = response.postNo;
                this.dcService.submission.departmentAddress = response.address;
                this.dcService.submission.departmentDetailName = response.entrustUnitName;
                this.dcService.submission.departmentId = response.entrustUnitId;
            });
    }

    countDown() {
        this.timer = this.$timeout(() => {
            if (this.counter > 1) {
                this.counter--;
                this.countDown();
            } else {
                this.printSubmBook();
            }
        }, 1000);
    }

    //打印相关动作
    doPrint(url) {
        window.open(url,'_blank');
        this.cancelTimeout();
    }

    //打印委托书
    printSubmBook() {

        let pdfFilePath = this.fileUrl + "/" + this.mergePdfPath + "/download";
        window.open("pdf_viewer.html?file=" + pdfFilePath + '&title=鉴定委托书', '_blank');
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
}

EntrustController.$inject = [
    '$scope',
    '$state',
    '$timeout',
    'toaster',
    'UtilityService',
    'AdmindesignsService',
    'EntrustAcceptRenderService',
    'EntrustAcceptDataCenterService',
    'EntrustAcceptActionService',
    'EntrustDataService',
    'EntrustAcceptUtilService',
    'PDF_URL',
    'FILE_URL'
];
