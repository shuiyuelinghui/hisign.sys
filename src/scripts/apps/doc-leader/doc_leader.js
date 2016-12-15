/**
 * Created by Administrator on 2016/10/25 0025.
 */
export default class DocLeaderController {

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
        this.title = "鉴定文书领导审批";
    }

}

DocLeaderController.$inject = [
    '$scope',
    '$timeout',
    '$stateParams',
    'AdmindesignsService',
    'UtilityService',
    'CommonService'
];
