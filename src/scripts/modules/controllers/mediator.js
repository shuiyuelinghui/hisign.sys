import cookie from 'js-cookie';
import store from 'store';
export default class MediatorController {
    constructor(UtilityService, CommonDataService) {
        this.utilityService = UtilityService;
        this.commonDataService = CommonDataService;
        this.token = '';
        this.userId = '';
    }

    $onInit() {

        let token = cookie.get('token'),
            userId = cookie.get('userId');

        if(
            (token === 'null' || this.utilityService.isEmpty(token)) ||
            (userId === 'null' || this.utilityService.isEmpty(userId))
        ) {
            token = this.utilityService.getParameterByName('token');
            userId = this.utilityService.getParameterByName('userId');
            if(token) cookie.set('token', token);
            if(userId) cookie.set('userId', userId);

            if(this.utilityService.isEmpty(token) || this.utilityService.isEmpty(userId)) {
                window.location.href = '/login';
            }
        }

        //fetchUserInfo After cookie set
        this.fetchUserInfo();
        //缓存用户设置
        this.fetchCustomSetting();
    }

    fetchUserInfo() {
        //获取用户信息
        return this.commonDataService.fetchUserInfo()
            .then(response => {

                if (response.message) {
                    return;
                }

                //TODO: add to constants
                if (response.userType == 2) {//鉴定用户
                    this.utilityService.goState('app.task.todo.personal');
                } else {
                    this.utilityService.goState('app.entrust.select.list');
                }
            });
    }
    //缓存用户设置
    fetchCustomSetting() {
        this.commonDataService.fetchCustomSetting()
            .then((response) => {
                store.set('dtCustomSetting', response.settings.dtCustomSetting);
                store.set('historyActiveCondition', response.settings.historyActiveCondition);
                store.set('savedActiveCondition', response.settings.savedActiveCondition);
            });
    }
}

MediatorController.$inject = [
    'UtilityService',
    'CommonDataService'
];