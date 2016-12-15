import cookie from 'js-cookie';

export default class WorkHandoverDataService {

    constructor(ALIMS_URL, UtilityService) {
        this.alimsUrl = ALIMS_URL;
        this.utilityService = UtilityService;
        this.userId = cookie.get('userId');
    }

    workhandwork(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/submissions/workHandover', params);
    }
}

WorkHandoverDataService.$inject = ['ALIMS_URL', 'UtilityService'];