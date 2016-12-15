// import '../../../sass/apps/register.scss';

export default class RegisterController {

    constructor(
        $scope,
        PatternService,
        UtilityService,
        AdmindesignsService,
        RegisterDataService
    ) {
        this.$scope = $scope;
        this.isId = PatternService.isId();
        // this.isAlphaNumeric = PatternService.isAlphaNumeric();
        this.isPoliceId = PatternService.isPoliceId();
        this.utilityService = UtilityService;
        this.admindesignsService = AdmindesignsService;
        this.registerDataService = RegisterDataService;

        this.orgName = '';
        this.formData = {
            orgId: ''
        };
        this.pwdLevel = 0;
    }

    $onInit() {
        this.admindesignsService.initTooltipster('wechat_content');
        this.$scope.$on('zTreeSelectedConfirm', (e, zTreeSelectedNode) => {
            this.orgName = zTreeSelectedNode.name;
            this.formData.orgId = zTreeSelectedNode.orgId;
        });
    }

    checkPwdLevel(e) {
        let pwd = e.target.value;
        if(!pwd.length) this.pwdLevel = 0;
        else this.pwdLevel = this.utilityService.checkPwdLevel(pwd);
    }

    add() {
        this.registerDataService.add(this.formData)
            .then(response => {
                this.utilityService.goState('register-success', {userName:this.formData.userName});
            });
    }
}

RegisterController.$inject = [
    '$scope',
    'PatternService',
    'UtilityService',
    'AdmindesignsService',
    'RegisterDataService'
];
