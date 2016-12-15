
export default class ErrorController {

    constructor(
        $scope,
        $stateParams
    ) {
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.status;
    }

    $onInit() {
        $('body').addClass('error-page');
        this.status = this.$stateParams.status;
    }
}

ErrorController.$inject = [
    '$scope',
    '$stateParams'
];