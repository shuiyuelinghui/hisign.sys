import store from 'store';

export default class InstitutionInfoController {

    constructor(
        $scope,
        AdmindesignsService,
        EntrustAcceptDataCenterService,
        InstitutionInfoDataService,
        EntrustAcceptUtilService
    ) {
        this.$scope = $scope;
        this.admindesignsService = AdmindesignsService;
        this.dcService = EntrustAcceptDataCenterService;
        this.dataService = InstitutionInfoDataService;
        this.utilService = EntrustAcceptUtilService;

        this.institutionData = {};
        this.serverCode = '';
    }

    $onInit() {
        this.fetchInstitution();
    }

    fetchInstitution() {
        this.dataService.fetchInstitution()
            .then((response) => {
                let serverCode = this.dcService.submission.serverCode;
                this.institutionData = response;
                if(this.utilService.isNew()) {
                    this.setInstitutionInfo(null, (serverCode || response[0].orgCode), response[0].name);
                }
                this.$scope.$emit('fetchInstitutionSuccess');
            });
    }

    setInstitutionInfo(e, code, name) {
        if(this.dcService.activeState === 'app.entrust.apply.evidence.reuse') {
            this.dcService.setData(store.get('dcService'));
        }
        this.dcService.submission.serverCode = code;
        this.dcService.submission.serverName = name;

        if(e) this.dcService.prepareDictMapping();
    }
}

InstitutionInfoController.$inject = [
    '$scope',
    'AdmindesignsService',
    'EntrustAcceptDataCenterService',
    'InstitutionInfoDataService',
    'EntrustAcceptUtilService'
];
