import cookie from 'js-cookie';

export default class ReivewDataService {
    constructor(SYS_URL, ALIMS_URL, UtilityService) {
        this.utilityService = UtilityService;
        this.alimsUrl = ALIMS_URL;
        this.sysUrl = SYS_URL;

        this.userId = cookie.get('userId');
    }
    // 获取中止/终止信息
    fetchAbortendsInfo (params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/abortends/getbysubm', params);
    }
    // 获取延期信息
    fetchPostponesInfo  (params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/postpones/getbysubm', params);
    }
}

ReivewDataService.$inject = ['SYS_URL', 'ALIMS_URL', 'UtilityService'];
