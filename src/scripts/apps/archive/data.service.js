
export default class ArchiveDataService {
    constructor(SYS_URL, ALIMS_URL, UtilityService) {
        this.utilityService = UtilityService;
        this.alimsUrl = ALIMS_URL;
        this.sysUrl = SYS_URL;
    }

   	//获取科室信息
    getSyslabsInfo(params){
   		return this.utilityService.asyncPost(this.alimsUrl+'/syslabs/listbyserver', params);
    }
   
    //获取归档人
    getLabUsers(labId){
  		return this.utilityService.asyncGet(this.alimsUrl+'/sysusers/'+labId+'/usersbylab');
    }

    //生成档案
    createArchive(params) {
    	return this.utilityService.asyncPost(this.alimsUrl+'/fileds/insert', params);
    }

    //删除档案
    deleteArchive(id) {
    	return this.utilityService.asyncGet(this.alimsUrl+'/fileds/'+id+'/del');
    }

    //提交档案
    filedSubmit(params) {
    	return this.utilityService.asyncPost(this.alimsUrl+'/fileds/filedSubmit', params);
    }

    //查询档案
   	getArchiveInfo(params){
   		return this.utilityService.asyncPost(this.alimsUrl+'/fileds/getbysubmId', params);
   	}
   	
   	//获取字典项
   	fetchDictionary(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysdicts/rootkeybylist', params);
    }
}   

ArchiveDataService.$inject = ['SYS_URL', 'ALIMS_URL', 'UtilityService'];