import cookie from 'js-cookie';
export default class WorkHandoverController {

    constructor(
        $scope,
        $state,
        $stateParams,
        AdmindesignsService,
        CommonDataService,
        WorkHandoverDataService,
        toaster
    ) {
        this.$scope = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.admindesignsService = AdmindesignsService;
        this.dataService = CommonDataService,
        this.workhandDataService = WorkHandoverDataService;
        this.handoverUserData = [];
        this.nodeCode = this.$stateParams.nodeCode;
        this.counter = 5;
        this.receiver = -1;
        this.toaster = toaster;
    }

    $onInit() {
        this.fetchHandoverUsers();

    }

    //获取交接人
    fetchHandoverUsers() {
        this.dataService.fetchTestUsers()
            .then((response) => {
                this.handoverUserData = response;
            });
    }

    //工作交接
    save() {
        if (this.auditor == "-1") {
            this.toaster.pop("error", "", "请选择交接人");
            return;
        }

        let params = {
            userId: cookie.get('userId'),
            userName: "",//当前用户的name
            receiveId: this.receiver,
            receiveName: $('#receiver').find(":selected").text().trim(),
            nodeCode : this.nodeCode
        };

        this.workhandDataService.workhandwork(params)
            .then(() => {
                this.$state.go("app.task.todo.personal")
            });
    }
}

WorkHandoverController.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    'AdmindesignsService',
    'CommonDataService',
    'WorkHandoverDataService',
    'toaster'
];
