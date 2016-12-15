
export default class DocDratDataService {
    constructor(SYS_URL, ALIMS_URL, UtilityService) {
        this.utilityService = UtilityService;
        this.alimsUrl = ALIMS_URL;
        this.sysUrl = SYS_URL;
    }

    // 获取鉴定文书列表
    fetchDocListData(submId, nodeCode) {

        if (nodeCode != '0700') {
            return this.utilityService.asyncGet(this.alimsUrl+'/appraisalbooks/'+submId+'/listbysubm');
        } else {
            return this.utilityService.asyncGet(this.alimsUrl+'/tests/'+submId +'/listbysubm');
        }
        
    }

    // 获取检验记录列表
    fetchTestRecordListData(submId) {
        return this.utilityService.asyncGet(this.alimsUrl+'/tests/'+submId+'/listbysubm');
    }

    //获取字典
    fetchDictionary(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysdicts/rootkeybylist', params);
    }

    //生成文书
    docSubmit(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/appraisalbooks/insert', params);
    }

    //提交审批
    examineSubmit(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/appraisalbooks/appraisalbookSubmit', params);
    }

    //删除鉴定文书
    docDel(docId) {
        return this.utilityService.asyncGet(this.alimsUrl+'/appraisalbooks/'+docId+'/del');
    }

    //鉴定文书历史版本
    fetchBookHistoryData(bookId) {
        return this.utilityService.asyncGet(this.alimsUrl+'/appraisalbooks/'+bookId+'/history');
    }

    //鉴定书草稿
    getBookDraftInfo(bookId) {
        return this.utilityService.asyncGet(this.alimsUrl+'/appraisalbooks/'+bookId+'/historylatest');
    }

    //鉴定文书审批记录
    fetchBookCircualtionData(submId) {
        return this.utilityService.asyncGet(this.alimsUrl+'/appraisalbooks/'+submId+'/circualtionlistbysubm');
    }

    // 获取可以生成文书的数量
    getCreateDocNum(serverCode) {
        return this.utilityService.asyncGet(this.alimsUrl+'/servers/'+serverCode+'/infobycode');
    }
}   

DocDratDataService.$inject = ['SYS_URL', 'ALIMS_URL', 'UtilityService'];