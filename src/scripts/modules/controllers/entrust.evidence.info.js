export default class EntrustEvidenceInfoController {
	
    constructor($scope,
                EntrustAcceptActionService) {

        this.$scope = $scope;
        this.actionService = EntrustAcceptActionService;
    }

    $onInit() {

        this.actionService.delegateDtRowAction($("#entrust_detail_evidence_info"), this.$scope);

    }

}


EntrustEvidenceInfoController.$inject = [
    '$scope',
    'EntrustAcceptActionService'
]
