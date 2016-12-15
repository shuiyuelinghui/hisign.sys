import cookie from 'js-cookie';

export default class TaskDataService {

    constructor(ALIMS_URL, UtilityService) {
        this.alimsUrl = ALIMS_URL;
        this.utilityService = UtilityService;
        this.userId = cookie.get('userId');
    }

    fetchTaskMenu(stateName) {

        if (stateName == "app.task.todo.personal") {
            return this.utilityService.asyncGet(this.alimsUrl+'/submissions/taskMenus/' + this.userId);
        } else if (stateName == "app.task.todo.departments") {
            return this.utilityService.asyncGet(this.alimsUrl+'/submissions/labtaskMenus/' + this.userId);
        }
        
    }

    //删除委托
    delSubm(params, type) {

        if (type == "1") {
            return this.utilityService.asyncPost(this.alimsUrl+'/submissions/del/tempsubm', params);
        }  else {
            return this.utilityService.asyncPost(this.alimsUrl+'/submissions/del', params);
        }
    }

    //委托状态分类统计
    getSubmStateCategoryCount(stateName) {
        if (stateName == "app.entrust.select.list") {
            return this.utilityService.asyncGet(this.alimsUrl+'/submissions/'+this.userId+'/submStateCategoryCount');
        } else if (stateName == "app.entrust.select.departmentlist") {
            return this.utilityService.asyncGet(this.alimsUrl+'/submissions/'+this.userId+'/unitSubmStateCategoryCount');
        }
    }
}

TaskDataService.$inject = ['ALIMS_URL', 'UtilityService'];