(function() {
    angular.module('common_modules')
            .directive('datatable', datatable);


    function datatable ($compile, $timeout) {
        var directive = {
            restrict: 'EA',
            scope: {
                resultData: '<'
            },
            replace: true,
            link: link
        };
        return directive;
        function link (scope, element, attrs) {
            var tableEl = $compile('<table  class="table table-striped table-bordered display" cellspacing="0" width="100%">' +
                            '<thead><tr><th ng-repeat="item in resultData.headConf">{{item}}</th></tr></thead>'+
                        '</table>')(scope);
            element.append(tableEl);

            $timeout(function() {
                var table = element.find('table').DataTable({
                    "oLanguage" : {
                        "sLengthMenu": "每页显示 _MENU_ 条记录",
                        "sZeroRecords": "抱歉， 没有找到",
                        "sInfoEmpty": "没有数据",
                        "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
                        "sZeroRecords": "没有检索到数据",
                        "sSearch": "名称:",
                        "oPaginate": {
                            "sFirst": "首页",
                            "sPrevious": "前一页",
                            "sNext": "后一页",
                            "sLast": "尾页"
                        }
                    }, //国际化：汉化
                    "sDom": 'Rt<"dt-panelfooter clearfix"lp>',//自定义DOM布局
                    /* "serverSide": true,*/  //开启服务器排序，分页
                    "ajax": "./library/admindesigns/theme/vendor/plugins/datatables/examples/data_sources/objects.txt",
                    "sPaginationType" : "full_numbers", //分页样式
                    "stateSave": true, //刷新保存状态
                    "scrollX": true, //x方向滚动调
                    "autoWidth": true, //自动计算列宽
                    "deferRender": true, //延迟渲染
                    "columns": [
                        { "data": "index" },
                        { "data": "turnOverDate" },
                        { "data": "caseName" },
                        { "data": "turnOverWay" },
                        { "data": "turnOverPerson" },
                        { "data": "turnOverDepartment" },
                        { "data": "acceptPerson" },
                        { "data": "acceptDepartment" },
                        { "data": "sampleAcount" },
                        { "data": "acceptDate" },
                        { "data": "operate" }
                    ],
                    "fixedColumns": {
                        leftColumns: 5,
                        rightColumns: 1,
                    },
                    "order": [[1, 'asc']]
                });
                var el = $compile(
                    '<form class="goPage" name="goPage">'+
                    '<label for="_targetPage">共<span>{{resultData.pagination.totalPages}}</span>页, 跳到第'
                    +' <input id="_targetPage" type="number" class="gui-input text-center w50" ng-model="pagination.targetPage" max="{{resultData.pagination.totalPages}}" min="0"> 页' +
                    '</label> '+
                    '<button class="btn btn-primary btn-sm" ng-disabled="goPage.$invalid">跳转</button>' +
                    '</form>'
                )(scope);
                element.find('.dt-panelfooter').append(el);
            }, 100);

        }
    }


})();