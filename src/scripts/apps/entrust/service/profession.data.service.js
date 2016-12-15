export default class ProfessionDataService {

    constructor(ALIMS_URL, UtilityService) {
        this.alimsUrl = ALIMS_URL;
        // this.alimsUrl = 'http://211.157.146.6:8822/api/alims';
        this.utilityService = UtilityService;
    }

    fetchCategoryList(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysidentifycategorys/selectlist', params);
    }

    fetchRequireList(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysidentifyrequests/list', params);
    }

}

ProfessionDataService.$inject = ['ALIMS_URL', 'UtilityService'];