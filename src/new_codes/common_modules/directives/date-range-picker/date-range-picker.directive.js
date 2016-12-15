(function() {
    angular.module('common_modules')
            .directive('dateRangePicker', dateRangePicker);

    function dateRangePicker () {
        var directive = {
            restrict: 'EA',
            scope: {
                searchItem: '=',
                placeholder: '@ '
            },
            template: '<div class="fl">' +
                            '<input type="text" class="datetimepicker form-control input-sm w200" placeholder="{{placeholder}}" readonly/>' +
                            '<span class="daterange-icon" ng-click="initDateRang()">' +
                                '<i class="fa fa-calendar"></i>' +
                            '</span>' +
                      '</div>',
            replace: true,
            link: dateLink
        };
        return directive;
    }

    function dateLink (scope, element, attrs ) {
        var t = element.find('.datetimepicker');
        //启动daterangepicker，并调用回调设置控件点击后activeCondition selectedCondition 的跟新
        t.daterangepicker({
            autoUpdateInput: false,
            autoApply: true,
            locale: {
                 format: 'YYYY-MM-DD',
                applyLabel: '提交',
                cancelLabel: '取消',
                fromLabel: '开始时间',
                toLabel: '截止时间',
                customRangeLabel: '定制',
                daysOfWeek: ['日', '一', '二', '三', '四', '五','六'],
                monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                firstDay: 1
            }
        }, function (start, end, label){
            var dateDate = {
                start: start,
                end: end,
            };
            t.val(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'));
            scope.$emit('dateSelected', scope.searchItem, dateDate);
        });
        //监听一条查询项点击发出的事件，设置activeCondition
        scope.$on(scope.searchItem.eventName, function (e, value) {
            if (value) {
                var start = value[0],
                    end = value[1];
                t.data('daterangepicker').setStartDate(start);
                t.data('daterangepicker').setEndDate(end);
                t.val(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'));
            } else {
                t.val('');
            }
        })
        scope.initDateRang = function() {
            element.find('input').trigger("click");
        }
    }
})();