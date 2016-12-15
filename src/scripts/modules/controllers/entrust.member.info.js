export default class EntrustMemberInfoController {
	
    constructor($scope,
            EntrustAcceptActionService) {

        this.$scope = $scope;
        this.actionService = EntrustAcceptActionService;
    }

    $onInit() {

        this.actionService.delegateDtRowAction($("#entrust_detail_member_info"), this.$scope);


    }

}


EntrustMemberInfoController.$inject = [
    '$scope',
    'EntrustAcceptActionService'
]
