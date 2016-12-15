export default class DocCommonController {

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

        this.type = this.$stateParams.type;
        this.submId = this.$stateParams.id;
        this.submState = this.$stateParams.nodeCode;
        this.flag = this.$stateParams.flag; //0 正常 1:打印
    }

    $onInit() {
        this.getSubmissionData();
    }

    //获取委托基本信息
    getSubmissionData() {
        this.commomDataService.fetchSubmissionData(this.submId)
            .then((response) => {
                this.submInfo = response;
                this.showSidebar = true;
                this.showTitel(this.submState);

            });
    }

    showTitel(nodeCode) {
        if (nodeCode == "0700") {
            this.title = "检验鉴定预览";
        }

        //打印
        if (this.flag == 1) {
            this.showSidebar = false;
            this.title = "打印";
        }

        if (nodeCode == "0800") {
            this.title = "文档预览";
        }
    }
}

DocCommonController.$inject = [
    '$scope',
    '$timeout',
    '$stateParams',
    'UtilityService',
    'AdmindesignsService',
    'CommonDataService'
];

