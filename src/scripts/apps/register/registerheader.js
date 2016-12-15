// import '../../../sass/apps/register.scss';

export default class RegisterHeaderController {

    constructor(
        $scope,
        $sce,
        FILE_URL,
        RegisterDataService
    ) {
        this.$scope = $scope;
        this.$sce = $sce;
        this.fileUrl = FILE_URL;
        this.registerDataService = RegisterDataService;
    }

    $onInit() {
        this.loadPlatform();
    }
   

    loadPlatform() {
        this.registerDataService.loadPlatform()
            .then(response => {
                this.$scope.orgName = response.orgName;
                this.$scope.platformName = response.platformName;
                this.$scope.platformLogo = this.fileUrl + "/"+response.platformLogo + "/download";
                this.$scope.copyrights = this.$sce.trustAsHtml(response.copyrights);
                this.$scope.companyName = response.companyName;

                document.title = this.$scope.orgName+this.$scope.platformName;
            });
    }

}

RegisterHeaderController.$inject = [
    '$scope',
    '$sce',
    'FILE_URL',
    'RegisterDataService'
];
