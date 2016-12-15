export default class DocPublishDataService {

    constructor(
        ALIMS_URL,
        UtilityService
    ) {
        this.alimsUrl = ALIMS_URL;
        this.utilityService = UtilityService;
        this.dict = [
            'IdenBookSendTypeModel',
            'IsNoIssueModel',
            'DeclassifiedModel',
            'SendSituationModel',
            'TransferTypeModel',
            'SaveCondiModel',
            'IsNoModel'
        ];
    }

    fetchDictionary() {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysdicts/rootkeybylist', this.dict);
    }

    submit(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/issues/issueSubmit', params);
    }
}

DocPublishDataService.$inject = [
    'ALIMS_URL',
    'UtilityService'
];
