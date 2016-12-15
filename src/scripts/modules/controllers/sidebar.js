import store from 'store';
export default class SidebarController {
    constructor($scope, $state, $location, SidebarService, CommonDataService) {
        this.$scope = $scope;
        this.$state = $state;
        this.$location = $location;
        this.sidebarService = SidebarService;
        this.commonDataService = CommonDataService;
        this.isHome = true;

        this.menuItems = [];
        this.userInfo = {};
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

        // Sidebar Left Collapse Entire Menu event
        $('.sidebar-toggle-mini').on('click', function(e) {
            e.preventDefault();

            // If sidebar is set to Horizontal we return
            if ($('body.sb-top').length) { return; }

            // Close Menu
            Body.addClass('sb-l-c');
            this.sidebarService.triggerResize();

            // After animation has occured we toggle the menu.
            // Upon the menu reopening the classes will be toggled
            // again, effectively restoring the menus state prior
            // to being hidden
            if (!Body.hasClass('mobile-view')) {
                setTimeout(function() {
                    Body.toggleClass('sb-l-m sb-l-o');
                }, 250);
            }
        });

        // Functions Calls

        $("#toggle_sidemenu_t").on('click', this.sidebarService.sidebarTopToggle);
        $("#toggle_sidemenu_r").on('click', this.sidebarService.sidebarRightToggle);

        this.sidebarService.sbOnLoadCheck();


        var lazyLayout = _.debounce(() => { this.sidebarService.rescale }, 300);
        $(window).resize(lazyLayout);

        this.fetchMenuData();
        this.toggleSidebarSubMenu();
        this.fetchUserInfo();
    }

    toggleSidebarSubMenu() {
        this.sidebarService.toggleSidebarSubMenu();
    }

    fetchMenuData() {
        let params = {
            "systemId":"ALIMS"
        }
        //获取菜单
        return this.sidebarService.fetchMenuData(params)
            .then(response => {
                this.menuItems = response;
                this.sidebarService.initNanoScroller();
            });
    }

    fetchUserInfo() {
        //获取用户信息
        return this.commonDataService.fetchUserInfo()
            .then(response => {

                if(response.avatar == "") {
                    response.avatar = this.getDefaultAvatar(response.cid);
                }
                this.userInfo = response;
                store.set('userInfo', this.userInfo);
            });
    }

    getDefaultAvatar(cid) {

        var avatarPath = "./assets/images/avatar_default_male.png";

        if (parseInt(cid.substr(16, 1)) % 2 == 0) {
            avatarPath = "./assets/images/avatar_default_female.png";
        }

        return avatarPath;
    }
}

SidebarController.$inject = [
    '$scope',
    '$state',
    '$location',
    'SidebarService',
    'CommonDataService'
];