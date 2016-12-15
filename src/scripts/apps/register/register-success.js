// import '../../../sass/apps/register.scss';

export default class RegisterSuccessController {

    constructor($timeout, $stateParams, AdmindesignsService) {
        this.$timeout = $timeout;
        this.userName = $stateParams.userName;
        this.admindesignsService = AdmindesignsService;
        this.counter = 5;
    }

    countDown() {
        this.$timeout(() => {
            if(this.counter > 1) {
                this.counter--;
                this.countDown();
            } else location.href = '/login';
        }, 1000);
    }

    $onInit() {
        this.countDown();
        this.admindesignsService.initTooltip();
    }
}

RegisterSuccessController.$inject = [
    '$timeout',
    '$stateParams',
    'AdmindesignsService'
];
