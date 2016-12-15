import cookie from 'js-cookie';

export default class SubmitCompService {
    constructor(SYS_URL, ALIMS_URL, UtilityService) {
        this.utilityService = UtilityService;
        this.alimsUrl = ALIMS_URL;
        this.sysUrl = SYS_URL;

        this.resultData = {};
        this.userId = cookie.get('userId');
    }

    //获取审批意见
    fetchApproveTpl(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysopinions/selectlist',params);
    }
    //获取[跨级审批|预受理]确认框展示数据
    fetConfirmData (id) {
        return this.utilityService.asyncGet(this.alimsUrl+'/submissions/'+id+'/promptinfo');
    }
    //获取预受理审核确认弹窗数据
    fetchOpinionData (id) {
        return this.utilityService.asyncGet(this.alimsUrl+'/circualtions/'+id +'/latest');
    }
    //提交接口: [跨级审批|预受理|预受理审核]
    approveSubmit(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/submissions/examineSubmit', params);
    }
    //提交接口: 延期申请
    postponeSubmit(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/submissions/postponeSubmit', params);
    }
    //提交接口: [中止|终止]申请
    abortendSubmit(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/submissions/abortendSubmit', params);
    }
    //提交接口: [主任|科长]审批
    submitSection(params, index) {
        var targetUrl = ['/postpones', '/abortends', '/abortends'];
        return this.utilityService.asyncPost(this.alimsUrl + targetUrl[index] + '/examineSubmit', params);
    }

    //获取签字人字典
    fetchPersonbusiness(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/personbusiness/selectlist', params);
    }

    //受理：获取收检人
    fetchPickupPerson (params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysusers/testuserbyserver', params);
    }
    //计算日期：[受理|延期]
    calcDueDate(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysholidays/calcduedate', params);
    }
    //受理:获取约定期限
    fetchAgreedDay(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sections/infobycode', params);
    }

    // 提交文书相关数据
    docRelaSubmit (params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/appraisalbooks/examineSubmit', params);
    }

    //提交文书拟稿审批
    docSubmit(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/appraisalbooks/appraisalbookSubmit', params);

    }
    //提交文书相关审批
    docRelaSubmit(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/appraisalbooks/examineSubmit', params);
    }
    /*重新文书复核提交*/
    repeatRecheckedSubmit(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/appraisalbooks/repeatRecheckedSubmit', params);
    }

    //提交确认文档
    confirmArchiveSubmit(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/fileds/filedAck', params);
    }

    // 获取鉴定文书列表
    fetchDocListData(submId) {
        return this.utilityService.asyncGet(this.alimsUrl+'/appraisalbooks/'+submId+'/listbysubm');
    }

    //提交档案
    filedSubmit(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/fileds/filedSubmit', params);
    }
    //获取字典项
    fetchDictionary(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysdicts/rootkeybylist', params);
    }
    //获取重新复核人员
    fetchRecheckeduser(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysusers/recheckeduser', params);
    }
}

SubmitCompService.$inject = ['SYS_URL', 'ALIMS_URL', 'UtilityService'];
