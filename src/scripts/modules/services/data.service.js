import cookie from 'js-cookie';

export default class CommonDataService {
    constructor(SYS_URL, ALIMS_URL, UtilityService) {
        this.utilityService = UtilityService;
        this.alimsUrl = ALIMS_URL;
        this.sysUrl = SYS_URL;
        this.stateData = {};
    }

    // 获取委托单位
    fetchZtreeData() {
        return this.utilityService.asyncGet(this.sysUrl+'/organises/alltree');
    }

    // 获取委托列表
    fetchSubmissionList(params, stateName) {

        if (stateName == "app.task.todo.personal") {
            return this.utilityService.asyncPost(this.alimsUrl+'/submissions/list', params);
        } else if (stateName == "app.task.todo.departments") {
            return this.utilityService.asyncPost(this.alimsUrl+'/submissions/lablist', params);
        } else if (stateName == "app.task.done.personal") {
            return this.utilityService.asyncPost(this.alimsUrl+'/submissions/handlelist', params);
        } else if (stateName == "app.task.done.departments") {
            return this.utilityService.asyncPost(this.alimsUrl+'/submissions/labhandlelist', params);
        } else if (stateName == "app.entrust.select.list") {
            return this.utilityService.asyncPost(this.alimsUrl+'/submissions/mysubmlist', params);
        } else if (stateName == "app.entrust.select.departmentlist") {
            return this.utilityService.asyncPost(this.alimsUrl+'/submissions/unitsubmlist', params);
        } else if (stateName == "app.entrust.select.temporarylist") {
            return this.utilityService.asyncPost(this.alimsUrl+'/submissions/tempsubmlist', params);
        }
    }

    // 获取鉴定机构
    fetchAuthInstitution(pageId) {
        //TODO: remove after release;
        //this.alimsUrl = 'http://211.157.146.6:8822/api/alims';
        if (pageId == 'ap1010') {
            return this.utilityService.asyncGet(this.alimsUrl+'/servers/'+cookie.get('userId')+'/supernoself');
        } else {
            return this.utilityService.asyncGet(this.alimsUrl+'/servers/'+cookie.get('userId')+'/super');
        }
        
    }

    // 获取专业列表
    fetchProfessionList(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sections/selectlist', params);
    }

    // 获取紧急情况
    fetchUrgentLevel() {
        return this.utilityService.asyncGet(this.alimsUrl + '/sysdicts/rootkey/CasePriorityModel');
    }
    // 获取归档文件位置
    fetchFiledPositionModel() {
        return this.utilityService.asyncPost(this.alimsUrl + '/sysdicts/rootkeybylist', ['FiledPositionModel']);
    }

    // 获取到期情况
    fetchExpireState() {
        return this.utilityService.asyncGet(this.alimsUrl+'/sysdicts/rootkey/ExpireSituModel');
    }

    // 获取子table数据
    fetchSubTable(id) {
        return this.utilityService.asyncGet(this.alimsUrl+'/submissions/'+id+'/completeinfo');
    }

    // 保存用户设置
    saveCustomSetting(params) {
        params = {
            userId: cookie.get('userId'),
            userSettingJson: params
        };

        return this.utilityService.asyncPost(this.alimsUrl+'/userSetting/save', params);
    }

    // 获取用户设置
    fetchCustomSetting() {
        return this.utilityService.asyncGet(this.alimsUrl+'/userSetting/'+cookie.get('userId'));
    }

    //获取鉴定机构信息
    getServerInfo(serverCode) {
        return this.utilityService.asyncGet(this.alimsUrl+'/servers/' + serverCode + '/infobycode');
    }

    //获取申请类型
    fetchActionCode(nodeCode) {
        return this.utilityService.asyncGet(this.alimsUrl+'/busExaNodes/'+nodeCode+'/info');
    }

    //获取留痕信息
    fetchFootPrintData(submId) {
        return this.utilityService.asyncGet(this.alimsUrl+'/circualtions/'+submId+'/listbysubm');
    }

    //退出
    logout(){
        return this.utilityService.asyncGet(this.sysUrl+'/logout');
    }

    //获取委托基本信息
    fetchSubmissionData(submId) {
        return this.utilityService.asyncGet(this.alimsUrl+'/submissions/'+submId+'/submcase');
    }

    //获取审批意见
    fetchSysopinionsData(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysopinions/selectlist', params);
    }

    //获取鉴定复核人
    fetchTestUsers() {
        return this.utilityService.asyncGet(this.alimsUrl+'/sysusers/'+cookie.get('userId')+'/testuser');
    }

    //根据nodeCode获取下个节点
    getNextNode(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/busExaNodes/next', params);
    }
    //获取节点培配置
    getNodeConfig(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/nodes/nodeconfiginfo', params);
    }

    //获取业务审批人员
    getBusinessPersonnel(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/personbusiness/selectlist', params);
    }

    //获取鉴定类别
    fetchCategoryList(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysidentifycategorys/list', params);
    }

    //获取鉴定进度
    fetchStatus(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/nodes/listbyuser', params);
    }

    //获取提交确认弹窗基本数据
    fetchConfirmData(id) {
        return this.utilityService.asyncGet(this.alimsUrl+'/submissions/'+id+'/promptinfo');
    }

    //获取用户信息
    fetchUserInfo(params) {
        return this.utilityService.asyncGet(this.alimsUrl+'/sysusers/' + cookie.get('userId') + "/info", params);
    }

    //获取鉴定文书列表
    fetchUserInfo(params) {
        return this.utilityService.asyncGet(this.alimsUrl+'/sysusers/' + cookie.get('userId') + "/info", params);
    }
    
    // 获取pdf路径
    getPdfPath(params) {
        return this.utilityService.asyncPost(this.alimsUrl + '/books/info', params);
    }

    //生成pdf
    createPdf(params) {
        return this.utilityService.asyncPost(this.alimsUrl + '/books/genpdf', params);
    }

    // 获取鉴定文书列表
    fetchDocListData(submId) {
        return this.utilityService.asyncGet(this.alimsUrl+'/appraisalbooks/'+submId+'/listbysubm');
    }

    //提交文书审批 || 文档打印
    docRelaSubmit(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/appraisalbooks/examineSubmit', params);
    }

    //获取历史文档
    fetchHistoryList (submId) {
        return this.utilityService.asyncGet(this.alimsUrl+'/appraisalbooks/' + submId + '/historybysubmid');
    }

    // 获取提示框页面基本信息
    fetchApprovalDetail(id) {
        return this.utilityService.asyncGet(this.alimsUrl+'/submissions/'+id+'/promptinfo');
    }

    // 获取确认文档-目录信息
    fetchArchiveDirectory (params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/fileds/getbysubmId', params);
    }

    //获取专业下的人员
    fetchPerson (params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysusers/testuserbyserver', params);
    }

    //获取平台信息
    loadPlatform() {
        return this.utilityService.asyncGet(this.alimsUrl+'/sysdicts/platform');
    }

    //获取检材样本列表、包含补送
    fetchSampleList(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/submissions/samplesbycode', params);
    }

    //获取文书附件信息
    getBookResultlist(submId) {
        return this.utilityService.asyncGet(this.alimsUrl+'/appraisebookDocuments/' + submId + '/resultlist');
    }

    //获取文书附件信息
    getDocuments(submId) {
        return this.utilityService.asyncGet(this.alimsUrl+'/appraisebookDocuments/' + submId + '/resultlist');
    }

    //获取文书附件信息
    getDefaultDocuments(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/appraisebookDocuments/selectlist', params);
    }

    //删除附件
    delDocuments(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/documents/del', params);
    }

    //提交附件
    insDocuments(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/documents/insert', params);
    }

    //获取节点输出物
    getOutputMaterials(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/nodeOutputMaterials/submnodeoutputlist', params);
    }

    
}   

CommonDataService.$inject = ['SYS_URL', 'ALIMS_URL', 'UtilityService'];