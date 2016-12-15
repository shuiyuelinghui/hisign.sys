export default class EntrustDataService {

    constructor(
        ALIMS_URL,
        UtilityService,
        DICT_DATA_CONFIG
    ) {
        this.alimsUrl = ALIMS_URL;
        this.utilityService = UtilityService;
        this.dictDataConfig = DICT_DATA_CONFIG;
    }

    fetchDictionary() {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysdicts/rootkeybylist', this.dictDataConfig);
    }

    saveTemporaryData(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/submissions/submcase/temporarySave', params);
    }

    submitentrust(params, type) {
        if (type == 1) {
            return this.utilityService.asyncPost(this.alimsUrl+'/submissions/submcase/insert', params);
        } else if (type == 2) {
            return this.utilityService.asyncPost(this.alimsUrl+'/submissions/submcase/update', params);
        } else if (type == 3) {
            return this.utilityService.asyncPost(this.alimsUrl+'/submissions/submcase/externalinsert', params);
        } else if (type == 4) {
            return this.utilityService.asyncPost(this.alimsUrl+'/submissions/submcase/serverinsert', params);
        } else if (type == 5) {
            return this.utilityService.asyncPost(this.alimsUrl+'/submissions/submAppendSubmit', params);
        }
    }

    getDocGenerateResult(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/books/findexistsbyuuid', params);
    }

    //根据委托id，查询委托暂存相关信息
    getTempCompleteInfo(submId) {
        return this.utilityService.asyncGet(this.alimsUrl+'/submissions/'+submId+'/tempcompleteinfo');
    }

    getCompleteInfo(submId) {
        return this.utilityService.asyncGet(this.alimsUrl+'/submissions/'+submId+'/completeinfo');
    }

    getBaseInfo(submId) {
        return this.utilityService.asyncGet(this.alimsUrl+'/submissions/'+submId+'/baseinfo');
    }

    getSubmInfo(submId, flag) {
        if (flag == 1) {
            return this.utilityService.asyncGet(this.alimsUrl+'/submissions/'+submId+'/tempcompleteinfo');
        } else if (flag == 2 || flag == 4 ) {
            return this.utilityService.asyncGet(this.alimsUrl+'/submissions/'+submId+'/completeinfo');
        } else if (flag == 3) {
            return this.utilityService.asyncGet(this.alimsUrl+'/submissions/'+submId+'/baseinfo');
        }
    }

    getEviCategory(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysdicts/list', params);
    }

    fetchSubmitReasonModel(serverCode) {
        return this.utilityService.asyncGet(this.alimsUrl+'/syssubmitreasons/' + serverCode + '/selectlist');
    }

    //删除暂存
    delTmpSubm(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/submissions/del/tempsubm', params);
    }

    // 删除委托
    delEntrust(params) {
        return this.utilityService.asyncPost(this.alimsUrl+ '/submissions/del', params);
    }

    //获取送检人
    getSubmittedBy(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysusers/selectbyorgid', params);
    }

    // 获取pdf路径
    getPdfPath(params) {
        return this.utilityService.asyncPost(this.alimsUrl + '/books/info', params);
    }

    //获取单位信息
    getDepartmentInfo(id, type) {
        if (type == 1) {
            return this.utilityService.asyncGet(this.alimsUrl+'/sysentrustunits/'+id+'/infobyuserid');
        } else {
            return this.utilityService.asyncGet(this.alimsUrl+'/sysentrustunits/'+id+'/infobyunitid');
        }
    }
}

EntrustDataService.$inject = [
    'ALIMS_URL',
    'UtilityService',
    'DICT_DATA_CONFIG'
];
