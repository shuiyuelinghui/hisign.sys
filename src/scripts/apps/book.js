export default class bookCommonController {

    constructor(
        $scope,
        $timeout,
        $stateParams,
        UtilityService,
        AdmindesignsService,
        CommonDataService
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$stateParams = $stateParams;
        this.utilityService = UtilityService;
        this.admindesignsService = AdmindesignsService;
        this.commomDataService = CommonDataService;

        this.submId = this.$stateParams.id;
        this.panelType = this.$stateParams.panelType; //0 pdf 1 doc
        this.showSidebar = true;
    }

    $onInit() {

        this.getSubmissionData();
    }

    //获取委托基本信息
    getSubmissionData() {
        this.commomDataService.fetchSubmissionData(this.submId)
            .then((response) => {
                this.submInfo = response;

                this.showTitel(this.submInfo.submState);
            });
    }

    showTitel(nodeCode) {
        if (nodeCode == "0700") {
            this.title = "检验鉴定预览";
        }
        console.log(nodeCode);
        if (nodeCode == "0800") {
            this.title = "鉴定文书送审稿";
        }

        //打印
        if (this.flag == 1) {
            this.showSidebar = false;
            this.title = "打印";
        }
    }
}

bookCommonController.$inject = [
    '$scope',
    '$timeout',
    '$stateParams',
    'UtilityService',
    'AdmindesignsService',
    'CommonDataService'
];

