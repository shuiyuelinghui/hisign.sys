export default class PageofficeDataService {

    constructor(
        UtilityService,
        ALIMS_URL,
        SYS_URL
    ) {
        this.utilityService = UtilityService;
        this.alimsUrl = ALIMS_URL;
        this.sysUrl = SYS_URL;
    }

    // 获取检验方法
    getSysMethod(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/systestmethods/list', params);
    }

    // 获取检验仪器方法
    getSysAppliance(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/systestdevices/list', params);
    }

    // 获取图片附件
    getDocuments(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/documents/samples/list', params);
    }

}

PageofficeDataService.$inject = [
    'UtilityService',
    'ALIMS_URL',
    'SYS_URL'
];
