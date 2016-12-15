/**
 * Created by Administrator on 2016/10/9 0009.
 */
import cookie from 'js-cookie';

export default class MapShowDataService {
    constructor(SYS_URL, ALIMS_URL, UtilityService, FILE_URL) {
        this.utilityService = UtilityService;
        this.alimsUrl = ALIMS_URL;
        this.sysUrl = SYS_URL;
        this.fileUrl = FILE_URL;
        this.userId = cookie.get('userId');

        this.submissionData = {};
        this.fileSlideSampleList = []; //检材列表
        this.fileSlideMappingDataItem = []; //案件图片列表
        this.fileSlideDataItem = {}; //根据sampleId分类重构检材图片数据对象 {sampleId: [response]}
        this.submitData = [];
    }

    //获取照片列表
    fetchPicturesList(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/documents/list', params);
    }
   
    //提交图谱
    submitMap(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/documents/insert', params);
    }

    buildSubmitData() {
        let arr = [];
        for (let item in this.fileSlideDataItem) {
            for (let j = 0; j < this.fileSlideDataItem[item].length; j++) {
                arr.push(this.fileSlideDataItem[item][j]);
            }
        }

        this.submitData = this.fileSlideMappingDataItem.concat(arr);
    }

    buildFileSubmitData(fileData, resultData, flag, fileDataKey, sampleId) {
        let arr = this[fileDataKey],
            objectId = '';

        if (flag == '4') {
            objectId = sampleId;
        } else if (flag == '5') {
            objectId = this.submissionData.id;
        }

        if (sampleId) {arr = this[fileDataKey][sampleId];}

        for (let i = 0, len = fileData.length; i < len; i++) {
            arr.push({
                type: fileData[i].imgType ? '2' : '1',
                objectId: objectId,
                name: fileData[i].name,
                path: resultData[i].downloadLink,
                description: '',
                flag: flag,
                filesPrefixUuid: ''
            });
        }

    }


}

MapShowDataService.$inject = ['SYS_URL', 'ALIMS_URL', 'UtilityService', 'FILE_URL'];