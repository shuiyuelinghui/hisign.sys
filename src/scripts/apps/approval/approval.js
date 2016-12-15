import cookie from 'js-cookie';
export default class ApprovalController {

    constructor(
        $scope,
        $timeout,
        AdmindesignsService,
        UtilityService,
        CommonService
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.admindesignsService = AdmindesignsService;
        this.utilityService = UtilityService;
        this.counter = 5;
        
        this.userId = cookie.get('userId');
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

    $onInit() {}

    openMagnificPopup(url, options) {
        this.admindesignsService.openMagnificPopup(url, this.$scope, options);
    }

    closeMagnificPopup() {
        this.admindesignsService.closeMagnificPopup();
    }

    confirmFn() {
        this.closeMagnificPopup();
        this.$timeout(() => {
            this.openMagnificPopup('approval-result.html');
            this.countDown();
        }, 0);
    }

    changeApprovalContent($event) {
        $(".btn-dimmer").removeClass("item-active");
        $($event.currentTarget).addClass("item-active");

        $("#comment").val($($event.currentTarget).children("span").html());
    }

}

ApprovalController.$inject = [
    '$scope',
    '$timeout',
    'AdmindesignsService',
    'UtilityService',
    'CommonService'
];
