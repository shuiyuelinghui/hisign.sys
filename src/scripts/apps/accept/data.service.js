export default class AcceptDataService {

    constructor(ALIMS_URL, UtilityService) {
        this.alimsUrl = ALIMS_URL;
        this.utilityService = UtilityService;
    }

    getAcceptData(id) {
        return this.utilityService.asyncGet(this.alimsUrl+'/submissions/'+id+'/completeinfo');
    }

    submitAccept(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/submissions/acceptSubmit', params);
    }
}

AcceptDataService.$inject = ['ALIMS_URL', 'UtilityService'];