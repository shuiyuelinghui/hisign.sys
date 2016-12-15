
export default class DocDataCenterService {

    constructor(
        UtilityService
    ) {

        this.utilityService = UtilityService;
        this.fileSlideDataItem = [];
        this.fileSlideDataReuseItem = [];
        this.fileSlideMappingDataItem = [];
        this.fileSlideOtherItem = [];
        this.dcType = 'doc';
    }

    buildFileSubmitData(fileData, resultData, flag, fileDataKey) {
        for(let i = 0, len = fileData.length; i < len; i++) {
            this[fileDataKey].push({
                type: fileData[i].imgType ? '2' : '1',
                objectId: '',
                id: '',
                name: fileData[i].name,
                path: resultData[i].id,
                description: '',
                flag: flag,
                filesPrefixUuid: ''
            });
        }
    }
}

DocDataCenterService.$inject = [
    'UtilityService'
];
