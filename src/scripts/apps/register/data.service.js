export default class ResigterDataService {
    constructor(SYS_URL, ALIMS_URL, UtilityService) {
        this.sysUrl = SYS_URL;
        this.alimsUrl = ALIMS_URL;
        this.utilityService = UtilityService;
    }

    add(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysuserregists/add', params);
    }

    loadPlatform() {
        return this.utilityService.asyncGet(this.alimsUrl+'/sysdicts/platform');
    }
}

ResigterDataService.$inject = ['SYS_URL', 'ALIMS_URL', 'UtilityService'];