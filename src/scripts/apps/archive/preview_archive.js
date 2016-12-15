export default class PreviewArchiveController {

    constructor(
        $scope,
        $timeout,
        AdmindesignsService,
        UtilityService
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.admindesignsService = AdmindesignsService;
        this.utilityService = UtilityService;
        this.counter = 5;
    }

    $onInit() {
        this.admindesignsService.initAdminPanel();
    }

    countDown() {
        this.$timeout(() => {
            if(this.counter > 1) {
                this.counter--;
                this.countDown();
            } else {
                this.closeMagnificPopup();
                this.utilityService.goState('app.task.todo.personal');
            }
        }, 1000);
    }

    openMagnificPopup(url, options) {
        this.admindesignsService.openMagnificPopup(url, this.$scope, options);
    }

    closeMagnificPopup() {
        this.admindesignsService.closeMagnificPopup();
    }

    confirmFn() {
        this.closeMagnificPopup();
        this.$timeout(() => {
            this.openMagnificPopup('doc-confirm-result.html');
            this.countDown();
        }, 0);
    }
    changeApprovalContent($event) {
        $(".btn-dimmer").removeClass("item-active");
        $($event.currentTarget).addClass("item-active");

        $("#comment").val($($event.currentTarget).children("span").html());
    }

    toggleDocMenu() {

        this.admindesignsService.toggleDocMenu();
    }

}

PreviewArchiveController.$inject = [
    '$scope',
    '$timeout',
    'AdmindesignsService',
    'UtilityService'
];
