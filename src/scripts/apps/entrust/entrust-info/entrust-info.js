import store from 'store';

export default class EntrustInfoController {

    constructor(
        $scope,
        $timeout,
        AdmindesignsService,
        EntrustDataService,
        EntrustAcceptDataCenterService
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.admindesignsService = AdmindesignsService;
        this.entrustDataService = EntrustDataService;
        this.dcService = EntrustAcceptDataCenterService;
        this.dictData = {};
        this.showOrgIdentity = true;
    }

    $onInit() {
        this.userInfo = store.get("userInfo");

        this.$scope.$on('zTreeSelectedConfirm', (e, zTreeSelectedNode) => {
            this.dcService.submission.departmentDetailName = zTreeSelectedNode.name;
            this.dcService.submission.departmentId = zTreeSelectedNode.orgId;
            this.getDepartmentInfo(this.dcService.submission.departmentId);
        });

        this.$scope.$on('dictFetchSuccess', () => {
            this.showOrgIdentity = this.setOrgIdentity();
        });

        this.$timeout(() => {
            this.dcService.entrustForm = this.form;
        });

    }

    getDepartmentInfo(orgId) {
        this.entrustDataService.getDepartmentInfo(orgId)
            .then((response) => {
                this.dcService.submission.departmentPhone = response.phone;
                this.dcService.submission.departmentFaxno = response.faxNo;
                this.dcService.submission.departmentPostno = response.postNo;
                this.dcService.submission.departmentAddress = response.address;
            });
    }

    setOrgIdentity() {
        let submission = this.dcService.submission,
            dictKey= this.dcService.dictData.OldIdentifiedTypeModel[1].dictKey;

        return (
            submission.cityIdentifiedType === dictKey ||
            submission.countyIdentifiedType === dictKey ||
            submission.otherIdentifiedType === dictKey
        );
    }

    toggleOrigIdentityState() {
        this.showOrgIdentity = !this.showOrgIdentity;
    }

    getUserInfo(id) {

        let userId = $("#"+id).attr("data-id"),
            other = "";

          
        for (let val of this.dcService.submittedByInfo) {
            if (val.userId == userId) {

                if (id.startsWith("other")) {
                    this.dcService.submission.otherContact = val.contact;
                    this.dcService.submission.otherPosition = val.post;
                    this.dcService.submission.otherCredentialType = this.dcService.dictData.CreTypeModel[0].dictKey;
                    this.dcService.submission.otherCredentialNumber = val.policeId;
                } else {
                    this.dcService.submission.contact = val.contact;
                    this.dcService.submission.position = val.post;
                    this.dcService.submission.credentialType = this.dcService.dictData.CreTypeModel[0].dictKey;
                    this.dcService.submission.credentialNumber = val.policeId;
                }    
               

                return ;
            }
       }

    }
}

EntrustInfoController.$inject = [
    '$scope',
    '$timeout',
    'AdmindesignsService',
    'EntrustDataService',
    'EntrustAcceptDataCenterService'
];
