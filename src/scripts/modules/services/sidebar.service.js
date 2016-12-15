import cookie from 'js-cookie';

export default class SidebarService {

    constructor($http, $timeout, SYS_URL, ALIMS_URL, UtilityService) {
        this.$http = $http;
        this.$timeout = $timeout;
        this.sysUrl = SYS_URL;
        this.alimsUrl = ALIMS_URL;
        this.utilityService = UtilityService;

        var options = {};
        // Variables
        this.Window = $(window);
        this.Body = $('body');
        this.Navbar = $('.navbar');
        this.Topbar = $('#topbar');

        // Constant Heights
        this.windowH = this.Window.height();
        this.bodyH = this.Body.height();
        this.navbarH = 0;
        this.topbarH = 0;

        // Variable Heights
        if (this.Navbar.is(':visible')) { this.navbarH = this.Navbar.height(); }
        if (this.Topbar.is(':visible')) { this.topbarH = this.Topbar.height(); }

        // Calculate Height for inner content elements
        this.contentHeight = this.windowH - (this.navbarH + this.topbarH);

        // Set Default Options
        var defaults = {
            sbl: "sb-l-o", // sidebar left open onload
            sbr: "sb-r-c", // sidebar right closed onload
            sbState: "save", //Enable localstorage for sidebar states

            collapse: "sb-l-m", // sidebar left collapse style
            siblingRope: true
            // Setting this true will reopen the left sidebar
            // when the right sidebar is closed
        };

        // Extend Default Options.
        this.options = $.extend({}, defaults, options);
    }

    // SideBar Left Toggle Function
    sidebarLeftToggle() {
        // If sidebar is set to Horizontal we return
        if ($('body.sb-top').length) { return; }

        // We check to see if the the user has closed the entire
        // leftside menu. If true we reopen it, this will result
        // in the menu resetting itself back to a minified state.
        // A second click will fully expand the menu.
        if ($('body').hasClass('sb-l-c') && this.options.collapse === "sb-l-m") {
            $('body').removeClass('sb-l-c');
        }

        // Toggle sidebar state(open/close)
        $('body').toggleClass(this.options.collapse).removeClass('sb-r-o').addClass('sb-r-c');
        this.triggerResize();
    };

    // SideBar Right Toggle Function
    sidebarRightToggle() {

        // If sidebar is set to Horizontal we return
        if ($('body.sb-top').length) { return; }

        // toggle sidebar state(open/close)
        if (this.options.siblingRope === true && !$('body').hasClass('mobile-view') && $('body').hasClass('sb-r-o')) {
            $('body').toggleClass('sb-r-o sb-r-c').toggleClass(this.options.collapse);
        }
        else {
            $('body').toggleClass('sb-r-o sb-r-c').addClass(this.options.collapse);
        }
        this.triggerResize();
    };

    // SideBar Left Toggle Function
    sidebarTopToggle() {

        // Toggle sidebar state(open/close)
        $('body').toggleClass('sb-top-collapsed');

    };

    // Check window size on load
    // Adds or removes "mobile-view" class based on window size
    sbOnLoadCheck() {

        // If sidebar menu is set to Horizontal we add
        // unique custom mobile css classes
        if ($('body.sb-top').length) {
            // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
            if ($(window).width() < 900) {
                $('body').addClass('sb-top-mobile').removeClass('sb-top-collapsed');
            }
            return;
        }

        // Check Body for classes indicating the state of Left and Right Sidebar.
        // If not found add default sidebar settings(sidebar left open, sidebar right closed).
        if (!$('body.sb-l-o').length && !$('body.sb-l-m').length && !$('body.sb-l-c').length) {
            $('body').addClass(this.options.sbl);
        }
        if (!$('body.sb-r-o').length && !$('body.sb-r-c').length) {
            $('body').addClass(this.options.sbr);
        }

        if ($('body').hasClass('sb-l-m')) { $('body').addClass('sb-l-disable-animation'); }
        else { $('body').removeClass('sb-l-disable-animation'); }

        // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
        if ($(window).width() < 1080) {
            $('body').removeClass('sb-r-o').addClass('mobile-view sb-l-m sb-r-c');
        }

        this.resizeBody();
    };


    // Check window size on resize
    // Adds or removes "mobile-view" class based on window size
    sbOnResize() {

        // If sidebar menu is set to Horizontal mode we return
        // as the menu operates using pure CSS
        if ($('body.sb-top').length) {
            // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
            if ($(window).width() < 900 && !$('body').hasClass('sb-top-mobile')) {
                $('body').addClass('sb-top-mobile');
            } else if ($(window).width() > 900) {
                $('body').removeClass('sb-top-mobile');
            }
            return;
        }

        // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
        if ($(window).width() < 1080 && !$('body').hasClass('mobile-view')) {
            $('body').removeClass('sb-r-o').addClass('mobile-view sb-l-m sb-r-c');
        } else if ($(window).width() > 1080) {
            $('body').removeClass('mobile-view');
        } else {
            return;
        }

        this.resizeBody();
    };

    // Function to set the min-height of content
    // to that of the body height. Ensures trays
    // and content bgs span to the bottom of the page
    resizeBody() {

        var sidebarH = $('#sidebar_left').outerHeight();
        var cHeight = (this.topbarH + this.navbarH + sidebarH);

        $('body').css('min-height', cHeight);
    };

    // Most CSS menu animations are set to 300ms. After this time
    // we trigger a single global window resize to help catch any 3rd
    // party plugins which need the event to resize their given elements
    triggerResize() {
        setTimeout(function() {
            $(window).trigger('resize');

            if($('body').hasClass('sb-l-m')) {
                $('body').addClass('sb-l-disable-animation');
            }
            else {
                $('body').removeClass('sb-l-disable-animation');
            }
        }, 300)
    };

    // Attach debounced resize handler
    rescale() {
        console.log("rescale");
        // this.sbOnResize();
    }

    toggleSidebarSubMenu() {
        // 3. LEFT MENU LINKS TOGGLE
        $('.sidebar-menu').on('click', 'li a.accordion-toggle', (e) => {

            e.preventDefault();

            // If the clicked menu item is minified and is a submenu (has sub-nav parent) we do nothing
            if ($('body').hasClass('sb-l-m') && !$(e.currentTarget).parents('ul.sub-nav').length) { return; }

            // If the clicked menu item is a dropdown we open its menu
            if (!$(e.currentTarget).parents('ul.sub-nav').length) {

                // If sidebar menu is set to Horizontal mode we return
                // as the menu operates using pure CSS
                if ($(window).width() > 900) {
                    if ($('body.sb-top').length) { return; }
                }

                $('a.accordion-toggle.menu-open').next('ul').slideUp('fast', 'swing', function() {
                    $(this).attr('style', '').prev().removeClass('menu-open');
                });
            }
            // If the clicked menu item is a dropdown inside of a dropdown (sublevel menu)
            // we only close menu items which are not a child of the uppermost top level menu
            else {
                var activeMenu = $(e.currentTarget).next('ul.sub-nav');
                var siblingMenu = $(e.currentTarget).parent().siblings('li').children('a.accordion-toggle.menu-open').next('ul.sub-nav')

                activeMenu.slideUp('fast', 'swing', function() {
                    $(this).attr('style', '').prev().removeClass('menu-open');
                });
                siblingMenu.slideUp('fast', 'swing', function() {
                    $(this).attr('style', '').prev().removeClass('menu-open');
                });
            }

            // Now we expand targeted menu item, add the ".open-menu" class
            // and remove any left over inline jQuery animation styles
            if (!$(e.currentTarget).hasClass('menu-open')) {
                $(e.currentTarget).next('ul').slideToggle('fast', 'swing', function() {
                    $(this).attr('style', '').prev().toggleClass('menu-open');
                });
            }

            this.initNanoScroller();
        });
    }


    fetchMenuData(params) {
        return this.utilityService.asyncPost(this.sysUrl+'/menuresources/system', params);
    }


    initNanoScroller() {
        this.$timeout(() => {
            // If Nano scrollbar exist and element is fixed, init plugin
            if ($('.nano.affix').length) {
                $(".nano.affix").nanoScroller({
                    preventPageScrolling: true
                });
            }
        }, 200);
    }

}

SidebarService.$inject = ['$http', '$timeout', 'SYS_URL', 'ALIMS_URL', 'UtilityService'];