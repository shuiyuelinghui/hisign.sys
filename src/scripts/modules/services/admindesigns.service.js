export default class AdmindesignsService {
    constructor($timeout, $compile, $interpolate) {
        this.$timeout = $timeout;
        this.$compile = $compile;
        this.$interpolate = $interpolate;
        this.tooltipInit = false;
    }

    fullScreen() {
        if ($.fullscreen.isFullScreen()) {
            $.fullscreen.exit();
        } else {
            $('html').fullscreen({
                overflow: 'visible'
            });
        }
    }

    initTooltip() {
        if(!this.tooltipInit) {
            $('[data-toggle="tooltip"]').tooltip();
            this.tooltipInit = true;
        }
    }

    initTooltipster(htmlContainer) {
        $('.tooltipster').tooltipster({
            theme: 'tooltipster-borderless'
        });
        if(htmlContainer) {
            $('.tooltipster-template').tooltipster({
                theme: 'tooltipster-borderless',
                content: $('#'+htmlContainer),
                contentCloning: true
            });
        }
    }

    initAdminPanel(onFinish, onDrop) {
        // Init Admin Panels on widgets inside the ".admin-panels" container

        if(!($(".admin-panels .panel-controls > a").length)) {//如果没有初始化过
            $('.admin-panels').adminpanel({
                grid: '.admin-grid',
                draggable: true,
                preserveGrid: true,
                mobile: false,
                onStart: function() {},
                onFinish: function() {
                    $('.admin-panels').removeClass('fade-onload');
                    if(onFinish) onFinish();
                },
                onDrop: function() {
                    if(onDrop) onDrop();
                },
                onSave: function() {
                    $(window).trigger('resize');
                }
            });
        }

    }

    initBsModal(id, onShown = $.noop, onHidden = $.noop, options = {}) {
        let trigger = $('#'+id);

        return trigger
            .modal(options)
            .on('shown.bs.modal', onShown)
            .on('hidden.bs.modal', onHidden);
    }

    initBsPopover(elem, options = {}) {
        elem.popover(Object.assign({}, options));
        return elem;
    }

    closeBsPopover(elem) {
        elem.popover('hide');
    }

    initZTree(id, data, options = {}) {
        return $.fn.zTree.init($('#'+id), $.extend({}, {
            check: {
                enable: true,
                chkStyle: 'radio',
                radioType: 'all'
            }
        }, options), data);
    }

    toggleSystem() {
        // Sliding Topbar Metro Menu
        var menu = $('#topbar-dropmenu');
        var items = menu.find('.metro-tile');
        var metroBG = $('.metro-modal');

        // If dropmenu is using alternate style we don't show modal
        if (menu.hasClass('alt')) {
            // Toggle menu and active class on icon click
            menu.slideToggle(230).toggleClass('topbar-menu-open');
            metroBG.fadeIn();
        }
        else {
            menu.slideToggle(230).toggleClass('topbar-menu-open');
            $(items).addClass('animated animated-short fadeInDown').css('opacity', 1);

            // Create Modal for hover effect
            if (!metroBG.length) {
                metroBG = $('<div class="metro-modal"></div>').appendTo('body');

                // If modal is clicked close menu
                $('body').on('click', '.metro-modal', function() {
                    metroBG.fadeOut('fast');
                    setTimeout(function() {
                        menu.slideToggle(150).toggleClass('topbar-menu-open');
                    }, 250);
                });
            }
            setTimeout(function() {
                metroBG.fadeIn();
            }, 380);
        }
    }

    initDataTable(table, options) {
        let params = $.extend({
                scrollX: true,
                scrollCollapse: true,
                paging: false,
                info: false,
                searching: false,
                ordering: false,
                dom: '<<t><"datatable-bottom-bar"lp>>',
                bDestroy: true,
                language: {
                    sProcessing: "处理中...",
                    sLengthMenu: "显示 _MENU_ 项结果",
                    sZeroRecords: "",
                    sInfo: "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                    sInfoEmpty: "显示第 0 至 0 项结果，共 0 项",
                    sInfoFiltered: "(由 _MAX_ 项结果过滤)",
                    sInfoPostFix: "",
                    sSearch: "搜索:",
                    sUrl: "",
                    sEmptyTable: "",
                    sLoadingRecords: "载入中...",
                    sInfoThousands: ",",
                    oPaginate: {
                        "sFirst": "首页",
                        "sPrevious": "上页",
                        "sNext": "下页",
                        "sLast": "末页"
                    },
                    oAria: {
                        "sSortAscending": ": 以升序排列此列",
                        "sSortDescending": ": 以降序排列此列"
                    }
                }
            }, options),
            dt;

        dt = $('#'+table).DataTable(params);

        return dt;
    }

    initSelect2(selector, options = {}) {
        if(typeof selector === 'string') selector = $('.'+selector);
        selector.select2(Object.assign({}, {
            theme: 'classic',
            tags: true
        }, options));
    }
    
    initDateTimePicker(selector, options = {}) {
        if(typeof selector === 'string') selector = $('.'+selector);
        selector.datetimepicker(Object.assign({
            pickTime: false,
            format: 'YYYY-MM-DD',
            language: 'zh-cn',
            autoclose: true,
            widgetPositioning: {
                vertical: 'bottom'
            },
            prevText: '<i class="fa fa-chevron-left"></i>',
            nextText: '<i class="fa fa-chevron-right"></i>',
            showButtonPanel: false,
            beforeShow: function(input, inst) {
                var newclass = 'admin-form';
                var themeClass = $(this).parents('.admin-form').attr('class');
                var smartpikr = inst.dpDiv.parent();
                if (!smartpikr.hasClass(themeClass)) {
                    inst.dpDiv.wrap('<div class="' + themeClass + '"></div>');
                }
            }
        }, options));
    }

    initDateRangePicker(id, options) {
        var t = $('#'+id);
        t.daterangepicker($.extend({}, {
            autoUpdateInput: false,
            autoApply: true,
            // format:"YYYY/MM/DD",
            locale: {
                applyLabel: '提交',
                cancelLabel: '取消',
                fromLabel: '开始时间',
                toLabel: '截止时间',
                customRangeLabel: '定制',
                daysOfWeek: ['日', '一', '二', '三', '四', '五','六'],
                monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                firstDay: 1
            }
        }, options));


        return t;
    }

    delegateDateTimePickerAction() {
        let _self = this;

        $('body').on('focusin', '.bs-datetimepicker', function() {
            if($(this).data('initialize')) return;

            $(this).data('initialize', true);

            let options = $(this).data('options');

            if (typeof options != 'undefined') {
                if (options.minDate) {
                    options = {
                        minDate: new Date()
                    };
                }

                if (options.maxDate) {
                    options = {
                        maxDate: new Date()
                    };
                }
            }

            _self.initDateTimePicker($(this), options);
        });
    }

    setDRPStartDate(id, date) {
        console.log("======setDRPStartDate"  + date);

        $('#'+id).data('daterangepicker').setStartDate(date);
    }

    setDRPEndDate(id, date) {
        console.log("======setDRPEndDate"  + date);
        $('#'+id).data('daterangepicker').setEndDate(date);
    }

    initSlickSlide(ss, options) {
        if($('.'+ss).length) ss = $('.'+ss);
        else if($('#'+ss).length) ss = $('#'+ss);

        return ss.slick($.extend({}, {
            infinite: false
        }, options));
    }

    buildSlickSlideTip(node, index, data) {
        let start = index * 4,
            end = Math.min(start + 4, data.length),
            content = '',
            i;

        for(i = start; i < end; i++) {
            let count;
            if(typeof data[i].taskCount !== 'undefined') {
                count = data[i].taskCount;
            } else {
                count = data[i].soonCount + data[i].expireCount;
            }

            content += data[i].nodeName + '<span>(' + count + ')</span><br />'
        }
        node.append($('<p class="slick-slide-tip">'+content+'</p>'));
    }
    
    initSlickSlideTip(slideData) {
        let self = this;
        $('.slick-pagination li')
            .on('mouseover', function() {
                let t = $(this),
                    index = t.index(),
                    tip = t.find('.slick-slide-tip');

                if(tip.length) tip.show();
                else self.buildSlickSlideTip(t, index, slideData);
            })
            .on('mouseout', function() {
                $(this).find('.slick-slide-tip').hide();
            });
    }
	
    openMagnificPopup(url, context, options, onLoaded, closed, deleteAction) {
        let _self = this,
        	deleteConfirms,
            scope = typeof context.$scope === 'undefined' ? context : context.$scope;

        $.magnificPopup.close();
        $.magnificPopup.open($.extend({}, {
            items: {
                src: url.indexOf('/') >= 0 ? url : './templates/modal/'+url
            },
            type: 'ajax',
            ajax: {
                cursor: 'mfp-ajax-cur'
            },
            tLoading: '加载中...',
            closeOnBgClick: false,
            fixedContentPos: false,
            fixedBgPos: true,
            callbacks: {
                ajaxContentAdded: function() {

                    this.container.parent().removeAttr('tabIndex'); // 与select2 plugins冲突

                    let container = this.content.parent(),
                        content = container.html(),
                        // interpolatedContent = _self.$interpolate(content)(scope),
                        compiledContent = _self.$compile(content)(scope);

                    _self.$timeout(() => {
                        compiledContent.appendTo(container.html(''));

                        if(deleteAction) {
                            $('#btn_delete_confirm', container).on('click', () => {
                                $.magnificPopup.close();
                                deleteAction.bind(context)();
                            });
                            $('#btn_delete_cancel', container).on('click', () => {
                                $.magnificPopup.close();
                            });
                        }
                    });
                    if(onLoaded) onLoaded.bind(context)();
                },

                close: function() {
                    if(closed) {
                        closed.bind(context)();
                    }
                }
            }
        }, options));
    }

    //删除弹框
    openConfirmDeleteMagnificPopup(context, options, action){
    	this.openMagnificPopup('delete-confirm.html', context, options, null, null, action);
    }

    closeMagnificPopup() {
        $.magnificPopup.close();
    }

    toggleDocMenu() {

        if ($('body.left-col-hidden').length) {
            $('body').removeClass('left-col-hidden');
        } else {
            $('body').addClass('left-col-hidden');
        }
    }

    setDocMenu(status) {
        if (status === 'show') {
            $('body').removeClass('left-col-hidden');
        } else if(status === 'hide') {
            $('body').addClass('left-col-hidden');
        }
    }

    initNProgress(parent) {

        let opts = {
            minimum: 0.4,
            trickleRate: .1,
            trickleSpeed: 360,
            ease: 'ease',
            speed: 500,
            showSpinner: false,
            barColor: 'npr-primary', // npr-warning, npr-success, npr-primary, etc (all contextuals available)
            // barPos: pos, // 'null' - (default) - bar position: top of page
            // 'npr-bottom' -  bar position: bottom of page header
            // 'npr-header' -  bar position: below header
        };

        if(parent) {
            opts = $.extend({}, opts, {parent: parent});
        }
        // Configure Progress Loader
        NProgress.configure(opts);
    }

    initJqUiSortable(target, options)  {
        target.sortable(options);
        return target;
    }

    initTwbsPagination(id, options) {
        $('#'+id).twbsPagination(Object.assign({}, {
            initiateStartPageClick: false,
            visiblePages: 7,
            first: '首页',
            last: '末页',
            prev: '前一页',
            next: '后一页',
        }, options));
    }

    initPanelScroller() {
        // If a panel element has the ".panel-scroller" class we init
        // custom fixed height content scroller. An optional delay data attr
        // may be set. This is useful when you expect the panels height to
        // change due to a plugin or other dynamic modification.
        var panelScroller = $('.panel-scroller');
        if (panelScroller.length) {
            panelScroller.each(function(i, e) {
                var This = $(e);
                var Delay = This.data('scroller-delay');
                var Margin = 5;

                // Check if scroller bar margin is required
                if (This.hasClass('scroller-thick')) { Margin = 0; }

                // Check if scroller bar is in a dropdown, if so
                // we initilize scroller after dropdown is visible
                var DropMenuParent = This.parents('.dropdown-menu');
                if (DropMenuParent.length) {
                    DropMenuParent.prev('.dropdown-toggle').on('click', function() {
                        setTimeout(function() {
                            This.scroller();
                            $('.navbar').scrollLock('on', 'div');
                        },50);
                    });
                    return;
                }

                if (Delay) {
                    var Timer = setTimeout(function() {
                        This.scroller({ trackMargin: Margin, });
                        $('#content').scrollLock('on', 'div');
                    }, Delay);
                }
                else {
                    This.scroller({ trackMargin: Margin, });
                    $('#content').scrollLock('on', 'div');
                }

            });
        }
    }

    scrollTop() {
        $(window).scrollTop(0);
    }

    scrollBottom() {
        $(window).scrollTop(9999);
    }
}

AdmindesignsService.$inject = [
    '$timeout',
    '$compile',
    '$interpolate'
];
