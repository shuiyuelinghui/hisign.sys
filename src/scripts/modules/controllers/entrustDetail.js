export default class EntrustDetailController {
	
    constructor(
        $scope,
        $stateParams,
        FILE_URL,
        PdfJsService,
        AdmindesignsService,
        CommonDataService,
        EntrustDataService,
        EntrustAcceptDataCenterService,
        EntrustAcceptRenderService,
        EntrustAcceptActionService,
        EntrustAcceptUtilService
    ) {

        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.PdfJsService = PdfJsService;
        this.fileUrl = FILE_URL;
		this.admindesignsService = AdmindesignsService;
        this.commonDataService = CommonDataService;
        this.dataService = EntrustDataService;
        this.dcService = EntrustAcceptDataCenterService;
        this.renderService = EntrustAcceptRenderService;
        this.actionService = EntrustAcceptActionService;
        this.utilService = EntrustAcceptUtilService;

        this.submId = $stateParams.id;
        this.showOrgIdentity = true;
        this.dcService.dtActionReadonly = true;
        this.fileSlideInited = false;
        this.submState;
    }

    $onInit() {
        let con = $('#entrust_container');
        this.showBook();
        this.getCompleteInfo();
        this.actionService.delegateDtRowAction(con, this.$scope);
        this.utilService.resetData(this.$scope);
    }

    showBook() {
        let params =
            {
                "submId": this.submId,
                "type": "1",
                "fileFormat":"PDF"
            },
            url = "";
        this.commonDataService.getPdfPath(params)
            .then((response) => {
                url = this.getFileUrl(response.path);
                this.PdfJsService.showPdf(url);
            });
    }

    getFileUrl(id) {
        return this.fileUrl+'/'+id+'/download';
    }
    
    openFootPrintPopup() {
        this.$scope.submId = this.submId;
        this.admindesignsService.openMagnificPopup("footprint.html", this, {});
    }

    getCompleteInfo() {
        this.dataService.getCompleteInfo(this.submId)
            .then((response) => {
                this.submState = response.submission.submState;
                this.dcService.buildData(response);
                this.dcService.setData(response);
                this.dcService.prepareDictMapping()
                    .then(() => {
                        this.dcService.updateSummary();
                        this.renderService.render(this.$scope, this.submState);
                        this.showOrgIdentity = this.setOrgIdentity();
                        this.dcService.splitFileData(this.$scope);
                    });


            });
    }

    setOrgIdentity() {
        let submission = this.dcService.submission,
            dictKey= this.dcService.dictData.OldIdentifiedTypeModel[1].dictKey;

        return (
            submission.cityIdentifiedType === dictKey ||
            submission.countyIdentifiedType === dictKey ||
            submission.otherIdentifiedType === dictKey
        );
    }

    toggleOrigIdentityState() {
        this.showOrgIdentity = !this.showOrgIdentity;
    }

    setActiveTab(tab) {
        if(tab === 'entrust-info' && !this.fileSlideInited) {
            this.$scope.$broadcast('fileSlideDataPreparedRo');
            this.fileSlideInited = true;
        }
    }

    //TODO: 临时解决datatables乱的情况
    redrawDt() {
        this.renderService.render(this.$scope, this.submState);
    }
}


EntrustDetailController.$inject = [
    '$scope',
    '$stateParams',
    'FILE_URL',
    'PdfJsService',
    'AdmindesignsService',
    'CommonDataService',
    'EntrustDataService',
    'EntrustAcceptDataCenterService',
    'EntrustAcceptRenderService',
    'EntrustAcceptActionService',
    'EntrustAcceptUtilService'
];
