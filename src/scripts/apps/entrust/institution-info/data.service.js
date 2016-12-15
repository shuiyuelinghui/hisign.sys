import cookie from 'js-cookie';

export default class InstitutionInfoDataService {

    constructor(ALIMS_URL, UtilityService) {
        this.alimsUrl = ALIMS_URL;
        this.utilityService = UtilityService;
        this.userId = cookie.get('userId');
    }

    fetchInstitution() {
        return this.utilityService.asyncGet(this.alimsUrl+'/servers/'+this.userId+'/super');
    }

}

InstitutionInfoDataService.$inject = ['ALIMS_URL', 'UtilityService'];