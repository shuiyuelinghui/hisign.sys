import cookie from 'js-cookie';
import store from 'store';

export default class HeaderController {
    constructor($scope, $state, AdmindesignsService, SidebarService, UtilityService, CommonDataService) {
        this.$scope = $scope;
        this.$state = $state;
        this.admindesignsService = AdmindesignsService;
        this.sidebarService = SidebarService;
        this.commonDataService = CommonDataService;
        this.utilityService = UtilityService;
        this.isHome = true;
        this.userInfo = store.get("userInfo");
    }

    listenStateChange() {
        this.$scope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
            if(toState.name === 'app.home') this.isHome = true;
            else this.isHome = false;
        });
    }

    $onInit() {
        let state = this.$state.current.name;
        if(state === 'app.home') this.isHome = true;
        else this.isHome = false;
        this.listenStateChange();
        this.loadPlatform();
    }

    fullScreen() {
        this.admindesignsService.fullScreen();
    }

    sidebarLeftToggle() {

        this.sidebarService.sidebarLeftToggle();
    }

    toggleSystem() {
        this.admindesignsService.toggleSystem();
    }


    logout() {

        this.commonDataService.logout()
            .then(response => {

                //remove data
                cookie.remove('token');
                cookie.remove('userId');

                //跳转到登陆页面
                location.href = 'login';
            });
    }

    openMagnificPopup() {
        this.admindesignsService.openMagnificPopup("logout.html", this);
    }

    closeMagnificPopup() {
        this.admindesignsService.closeMagnificPopup();
    }

    loadPlatform() {
        this.commonDataService.loadPlatform()
            .then(response => {
                this.fullName = (!this.utilityService.isEmpty(response.fullName)) ?response.fullName:response.platformName;
        });
    }
}

HeaderController.$inject = [
    '$scope',
    '$state',
    'AdmindesignsService',
    'SidebarService',
    'UtilityService',
    'CommonDataService'
];