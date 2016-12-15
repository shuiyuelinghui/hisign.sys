export default class AppController {

    constructor(
        $scope,
        $timeout,
        UtilityService,
        AdmindesignsService
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.utilityService = UtilityService;
        this.admindesignsService = AdmindesignsService;
    }

    $onInit() {
        this.$scope.$on('$stateChangeStart', () => {
            this.admindesignsService.closeMagnificPopup();
        });

        this.$scope.$on('$stateChangeSuccess', () => {
            this.admindesignsService.scrollTop();
        });

        this.utilityService.goState('app.task.todo.personal');
    }

}

AppController.$inject = [
    '$scope',
    '$timeout',
    'UtilityService',
    'AdmindesignsService'
];

