import cookie from 'js-cookie';
import store from 'store';

export default class WorkHandoverController {
    constructor(
        $scope,
        $stateParams,
        ALIMS_URL,
        UtilityService,
        AdmindesignsService,
        CommonDataService,
        toaster
    ) {
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.alimsUrl = ALIMS_URL;
        this.utilityService = UtilityService;
        this.admindesignsService = AdmindesignsService;
        this.dataService = CommonDataService;
        this.receiver = -1;
        this.toaster = toaster;
    }

    $onInit() {
        
        this.fetchSubmissionData();
        this.userInfo = store.get("userInfo");
    }


    fetchSubmissionData() {
        return this.dataService.fetchSubmissionData(this.id)
                .then((response) => {
                    this.submissionData = response;
                    this.fetchPerson();
                });
    }

    //获取交接人
    fetchPerson() {
        let params = {
            serverCode: this.submissionData.serverCode,
            section: this.submissionData.section
        }
        this.dataService.fetchPerson(params)
            .then((response) => {
                this.handoverUserData = response;
            });
    }

    //工作交接
    save() {
        if (this.receiver == "-1") {
            this.toaster.pop("error", "", "请选择交接人");
            return;
        }

        let params = {
            operateUsrName: this.userInfo.userName,//当前用户的name
            receiveUsrId: this.receiver,
            receiveUsrName: $('#receiver').find(":selected").text().trim(),
            nodeCode : this.submissionData.submState,
            submId: this.id
        };

        this.workhandwork(params)
            .then(() => {
                this.admindesignsService.closeMagnificPopup();
                window.location.reload();
            });
    }
    
    close() {
        this.admindesignsService.closeMagnificPopup();
    }

    workhandwork(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/submissions/workHandover', params);
    }
}

WorkHandoverController.$inject = [
    '$scope',
    '$stateParams',
    'ALIMS_URL',
    'UtilityService',
    'AdmindesignsService',
    'CommonDataService',
    'toaster'
];
