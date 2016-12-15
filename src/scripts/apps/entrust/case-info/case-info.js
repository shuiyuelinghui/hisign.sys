
export default class CaseInfoController {

    constructor(
        $scope,
        $timeout,
        AdmindesignsService,
        EntrustAcceptDataCenterService
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.admindesignsService = AdmindesignsService;
        this.dcService = EntrustAcceptDataCenterService;
        this.dictData = {};
    }

    $onInit() {
        this.$timeout(() => {
            this.dcService.caseForm = this.form;
        });
    }
}

CaseInfoController.$inject = [
    '$scope',
    '$timeout',
    'AdmindesignsService',
    'EntrustAcceptDataCenterService'
];
