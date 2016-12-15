
export default class CancelController {
    constructor(
        $scope,
        ALIMS_URL,
        UtilityService,
        AdmindesignsService,
        CommonDataService,
        toaster
    ) {
        this.$scope = $scope;
        this.alimsUrl = ALIMS_URL;
        this.utilityService = UtilityService;
        this.admindesignsService = AdmindesignsService;
        this.dataService = CommonDataService;
        this.toaster = toaster;
    }

    $onInit() {
        this.fetchSubmissionData();
    }


    fetchSubmissionData() {
        return this.dataService.fetchSubmissionData(this.id)
                .then((response) => {
                    this.submissionData = response;
                });
    }

    //回撤
    submit() {

        let params = {
            submId: this.id,
            result: this.result,
            nodeCode: this.submissionData.submState,
            section : this.submissionData.section
        };

        this.cancel(params)
            .then(() => {
                this.admindesignsService.closeMagnificPopup();
            });
    }
    
    close() {
        this.admindesignsService.closeMagnificPopup();
    }

    cancel(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/submissions/retracement', params);
    }
}

CancelController.$inject = [
    '$scope',
    'ALIMS_URL',
    'UtilityService',
    'AdmindesignsService',
    'CommonDataService',
    'toaster'
];
