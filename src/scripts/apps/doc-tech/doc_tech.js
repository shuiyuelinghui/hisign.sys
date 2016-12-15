export default class DocTechController {

    constructor(
        $scope,
        $timeout,
        $stateParams,
        AdmindesignsService,
        UtilityService,
        CommonService
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$stateParams = $stateParams;
        this.admindesignsService = AdmindesignsService;
        this.utilityService = UtilityService;
        this.commonService = CommonService;

        this.type = this.$stateParams.type || this.commonService.docType.bookAppraisal;

        this.submId = this.$stateParams.id;
    }

    $onInit() {
        this.title = "技术负责人审批";
    }

}

DocTechController.$inject = [
    '$scope',
    '$timeout',
    '$stateParams',
    'AdmindesignsService',
    'UtilityService',
    'CommonService'
];
