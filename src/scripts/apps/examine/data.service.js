/**
 * Created by Administrator on 2016/10/9 0009.
 */
import cookie from 'js-cookie';

export default class ExamineDataService {
    constructor(SYS_URL, ALIMS_URL, UtilityService) {
        this.utilityService = UtilityService;
        this.alimsUrl = ALIMS_URL;
        this.sysUrl = SYS_URL;
        this.userId = cookie.get('userId');
    }


    fetchRecordList (id) {
        return this.utilityService.asyncGet(this.alimsUrl+'/tests/'+id +'/listbysubm');
    }

    fetchSampleResultList(id) {
        return this.utilityService.asyncGet(this.alimsUrl+'/tests/'+id +'/samples');
    }

    fetchResultSelect(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysidentifyresults/selectlist', params);
    }

    fetchTestUser(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysusers/testuserbyserver', params);
    }

    fetchTplList (params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/templates/selectlist', params);
    }

    fetchMethodList (params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/systestmethods/selectlist', params);
    }

    fetchDevicesList (params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/systestdevices/selectlist', params);
    }

    makeRecord(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/tests/insert', params);
    }

    fetchRecordDetail(testId) {
        return this.utilityService.asyncGet(this.alimsUrl+'/tests/' + testId);
    }

    modifyRecord(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/tests/update', params);
    }

    deleteRecord(id) {
        return this.utilityService.asyncGet(this.alimsUrl+'/tests/' + id + '/del');
    }

    fetchExamineDetail(id) {
        return this.utilityService.asyncGet(this.alimsUrl+'/submissions/'+id+'/promptinfo');
    }

    submitExamine(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/tests/testSubmit', params);
    }
    //获取验证接口
    fetchValidate(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sections/infobycode', params);
    }
	
	//文书拟稿  获取检材样本鉴定结果
	fetchSampleResult(id) {
		return this.utilityService.asyncGet(this.alimsUrl+'/tests/'+id +'/sampleappraisalresults');
	}

    editTest(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/tests/editTestSubmit', params);
    }

}

ExamineDataService.$inject = ['SYS_URL', 'ALIMS_URL', 'UtilityService'];