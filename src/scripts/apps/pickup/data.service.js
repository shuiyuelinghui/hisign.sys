import cookie from 'js-cookie';

export default class PickupDataService {

    constructor(ALIMS_URL, UtilityService) {
        this.alimsUrl = ALIMS_URL;
        this.utilityService = UtilityService;

        this.dictionary = [
            'TransferTypeModel',  // 流转类型
            'SaveCondiModel'      // 保存条件

        ];
    }

    fetchSampleListData(submId) {
        return this.utilityService.asyncGet(this.alimsUrl+'/submissions/'+submId+'/samples');
    }

    receiveSubmit(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/submissions/receiveSubmit', params);
    }

    fetchDictionary() {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysdicts/rootkeybylist', this.dictionary);
    }

}

PickupDataService.$inject = ['ALIMS_URL', 'UtilityService'];