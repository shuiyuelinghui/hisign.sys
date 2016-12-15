export default class InspectionController {

    constructor(
                $stateParams,
                AdmindesignsService,
                PDF_URL
    ) {
        this.$stateParams = $stateParams;
        this.adminDesignsService = AdmindesignsService;
        this.pdfUrl = PDF_URL;
    }

    $onInit() {
        let params = {
                    flag: '1',
                    type: this.$stateParams.type,
                    bookType: "1",
                    filter: this.$stateParams.submId,
                    identifyCategoryCode: this.$stateParams.identifyCategory,
                    uuid: this.$stateParams.uuid,
                    serverCode: this.$stateParams.serverCode,
                    section: this.$stateParams.section
                };

        this.source = this.pdfUrl+'/bookUpload/uploadFile.html?'+$.param(params);
        console.log(this.source);
    }

    confirm() {

    }

    toggleDocMenu() {

        this.adminDesignsService.toggleDocMenu();
    }


}

InspectionController.$inject = [
    '$stateParams', 
    'AdmindesignsService', 
    'PDF_URL'
];
