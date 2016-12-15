export default class DocController {
    constructor(
        $scope,
        $timeout,
        $state,
        $stateParams,
        $sce,
        FILE_URL,
        PDF_URL,
        PdfJsService,
        DocDratDataService,
        CommonDataService,
        EntrustAcceptDataCenterService,
        EntrustDataService,
        EntrustAcceptRenderService,
        ExamineDataService,
        AdmindesignsService,
        UtilityService,
        CommonService,
        DOC_MAPPING
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$sce = $sce;
        this.fileUrl = FILE_URL;
        this.pdfUrl = PDF_URL;
        this.dataService = CommonDataService;
        this.docDataService = DocDratDataService;
        this.PdfJsService = PdfJsService;
        this.dcService = EntrustAcceptDataCenterService;
        this.entrustDataService = EntrustDataService;
        this.renderService = EntrustAcceptRenderService;
        this.commonService = CommonService;
        this.examineDataService = ExamineDataService;
        this.utilityService = UtilityService;
        this.adminDesignsService = AdmindesignsService;

        this.stateName = this.$state.current.name;
        this.docMapping = DOC_MAPPING;

        this.docListData = [];
        this.dcService.dtActionReadonly = true;

        this.iframeArr = [this.commonService.docType.bookAppraisal,
                          this.commonService.docType.bookApproval,
                          this.commonService.docType.bookConfirmation,
                          this.commonService.docType.bookCover,
                          this.commonService.docType.bookDirectory,
                          this.commonService.docType.bookInspection,
                          this.commonService.docType.bookRefusedAcceptance,
                          this.commonService.docType.bookDraft
                          ]
    }
    

    $onInit() {

        this.fetchSubmissionData();
        this.fetchBookCircualtionData();
        this.showContent();
    }

    showContent() {
        if (this.type == this.commonService.docType.bookProxy) {
            this.showBook();
        } else if (this.type == this.commonService.docType.sampleInfo) {
            this.getCompleteInfo();
        } else if (this.type == this.commonService.docType.examineRecord) {
            this.getExamineData();
        } 
    }

    fetchSubmissionData() {
        return this.dataService.fetchSubmissionData(this.id)
            .then(response => {
                this.submInfo = response;
                this.fetchDocListData();
//              this.fetchResultSelect();
            });
    }

    //获取鉴定文书信息
    fetchDocListData() {
        return this.docDataService.fetchDocListData(this.id, this.nodeCode)
            .then(response => {
                this.docListData = response;
                if (response.length != 0) {

                    //文书编号
                    this.code = response[0].code||response[0].typeName;

                    this.currentDocId = response[0].id;
                    
                    let id  = this.returnIdByType(response[0].id),
                        bookType = "";

                    //构建pageoffice 数据
                    if (this.type == this.commonService.docType.bookAppraisal) {
                        bookType = response[0].type;
                    } else if (this.type == this.commonService.docType.bookInspection) {
                        this.tempalteId = response[0].type;
                    }
                    
                    this.bulidIframeSource(id, this.type, bookType);
                  
                    this.fetchBookHistory(response[0].id);

                    if (this.type == this.commonService.docType.bookDraft) {
                        this.getBookDraftInfo(response[0].id);
                    }

                } else {
                    if (!this.showSidebar || this.type == this.commonService.docType.bookConfirmation) {
                        this.bulidIframeSource(this.id, this.type, "");
                    }
                }
            });
    }

    fetchBookHistory(bookId) {
        return this.docDataService.fetchBookHistoryData(bookId)
            .then(response => {
                this.docHistoryData = response;
            });
    }

    fetchBookCircualtionData() {
        return this.docDataService.fetchBookCircualtionData(this.id)
            .then(response => {
                this.recordsData = response;
            });
    }

    reloadData(bookId) {

        this.currentDocId = bookId;

        //切换文书时，需要重新构建数据
        if (this.type == this.commonService.docType.bookAppraisal || this.type == this.commonService.docType.bookApproval || this.type == this.commonService.docType.bookConfirmation || this.type == this.commonService.docType.bookInspection) {

            let bookType = "";

            for (let val of this.docListData) {
                if (val.id == bookId && this.type == this.commonService.docType.bookAppraisal) {
                    bookType = val.type;
                    this.code = val.code;
                    break;
                }

                if (val.id == bookId && this.type == this.commonService.docType.bookInspection) {
                    this.tempalteId = val.type;
                    this.code = val.typeName;
                    break;
                }
            }

            let id  = this.returnIdByType(bookId);

            this.bulidIframeSource(id, this.type, bookType);
        }

        this.fetchBookHistory(bookId);

        if (this.type == this.commonService.docType.bookDraft) {
            this.getBookDraftInfo(bookId);
        }
    }

    //根据不同文书类型，返回不同的id
    returnIdByType(bookId) {
        return (this.type == this.commonService.docType.bookAppraisal||this.type == this.commonService.docType.bookInspection)?bookId:this.id;
    }


    toggleDocMenu() {
        this.adminDesignsService.toggleDocMenu();
    }

    openFootPrintPopup() {
        this.$scope.submId = this.id;
        this.adminDesignsService.openMagnificPopup("footprint.html", this, {});
    }

    //pdf
    showBook(type) {
        let params =
            {
                "submId": this.id,
                "type": this.type.toString(),
                "fileFormat":"PDF"
            },
            url = "";
        this.dataService.getPdfPath(params)
            .then((response) => {
                url = this.getFileUrl(response.path);
                this.PdfJsService.showPdf(url);
            });
    }

    getFileUrl(id) {
        return this.fileUrl+'/'+id+'/download';
    }

    goToState(type) {
        this.utilityService.goState(this.stateName, {type: type});
    }

    //构建pageoffice 方法
    bulidIframeSource(id, type, bookType) {
        let params = {
                    filter: id,
                    type: type,
                    tempalteId: this.tempalteId,
                    bookType: bookType,
                    identifyCategoryCode: this.submInfo.identifyCategory,
                    serverCode: this.submInfo.serverCode,
                    section: this.submInfo.section,
                    uuid: "",
                    flag: "1"
                };

        this.source = this.$sce.trustAsResourceUrl(this.pdfUrl+'/bookUpload/uploadFile.html?'+$.param(params));
        console.log(this.source);
    }

    getCompleteInfo() {
        this.entrustDataService.getCompleteInfo(this.id)
            .then((response) => {
                this.dcService.buildData(response);
                this.dcService.setData(response);
                this.dcService.prepareDictMapping()
                    .then(() => {
                        this.dcService.updateSummary();
                        this.renderService.render(this.$scope, this.submInfo.submState);

                    });


            });
    }

    isShow(type) {
        return this.docMapping(this.nodeCode).indexOf(type) >= 0;
    }

    getExamineData() {
        this.fetchRecordList();
//      this.fetchSampleResultList();
		this.fetchSampleResult();
    }

    //获取检验记录列表
    fetchRecordList () {
        this.examineDataService.fetchRecordList(this.id)
             .then((response) => {
                this.recordList = response;
            })
    }

   	fetchSampleResult () {
   		this.examineDataService.fetchSampleResult(this.id)
   			.then((response) => {
   				this.sampleResult = response.samples;
   			})
    }

    //检验记录用
    bulidIframeData(type) {
        this.utilityService.goState("doc", {id: this.id, type:type, nodeCode: "0700"}, true);
    }

    needIframe() {
        return this.iframeArr.indexOf(this.type);
    }

    getBookDraftInfo(bookId) {
        return this.docDataService.getBookDraftInfo(bookId)
            .then(response => {
                 this.source = this.$sce.trustAsResourceUrl(this.pdfUrl+'/bookUpload/openWordByPath.html?path='+response.id);
            });
    }

}

DocController.$inject = [
    '$scope',
    '$timeout',
    '$state',
    '$stateParams',
    '$sce',
    'FILE_URL',
    'PDF_URL',
    'PdfJsService',
    'DocDratDataService',
    'CommonDataService',
    'EntrustAcceptDataCenterService',
    'EntrustDataService',
    'EntrustAcceptRenderService',
    'ExamineDataService',
    'AdmindesignsService',
    'UtilityService',
    'CommonService',
    'DOC_MAPPING'
];