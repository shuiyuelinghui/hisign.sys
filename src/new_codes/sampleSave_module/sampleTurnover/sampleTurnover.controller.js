/**
 * Created by lilang on 2016/12/5.
 */
(function(){
    angular.module('sampleSave')
            .controller('SampleTurnoverController', SampleTurnoverController);
    // SampleSearchController.$inject = ['$scope'];

    function SampleTurnoverController ($scope) {
        var dateRange = [
                            {name:'不限', value: ''},
                            {name:'今天', value: [moment(), moment()]},
                            {name:'本周', value: [moment().startOf('week'), moment().endOf('week')]},
                            {name:'本月', value: [moment().startOf('month'), moment().endOf('month')]},
                            {name:'本季度', value: [moment().startOf('quarter'), moment().endOf('quarter')]},
                            {name:'本年', value: [moment().startOf('year'), moment().endOf('year')]}
                          ];
        var vm = this;
        vm.searchData = [
            {
                type: 'input',
                name: '受理编号：',
                category: 'acceptCode',
                placeholder: '请填写受理编号'
            },
            {
                type: 'time',
                name: '受理时间：',
                eventName: 'setAcceptDatePrepared',
                startDate: 'acceptDateStart',
                endDate: 'acceptDateEnd',
                index: 0,
                dateRange: dateRange,
                placeholder: "请选择时间范围",
            },
            {
                type: 'text',
                multi: true, //是否支持多选
                name: '移交方式：',
                category: 'turnOverWay',
                index: 0,
                textOption: [{name: '不限', value: 'aaaa'},
                             {name: '入库登记', value: 'bbbb'},
                             {name: '出库登记', value: 'cccc'},
                             {name: '内部流转登记', value: 'dddd'}]
            },
            {
                type: 'time',
                name: '移交时间：',
                eventName: 'seteTurnOvrPrepared',
                startDate: 'turnOverStart',
                endDate: 'turnOverEnd',
                index: 0,
                dateRange: dateRange,
                placeholder: "请选择时间范围",
            },
            {
                type: 'text',
                multi: true, //是否支持多选
                name: '数据范围：',
                category: 'dataRange',
                index: 0,
                textOption: [{name: '不限', value: '001'},
                             {name: '本人移交的', value: '002'},
                             {name: '本人接收的', value: '003'},
                             {name: '本科室移交的', value: '004'},
                             {name: '本科室接收的', value: '005'}]
            },
            {
                type: 'select',
                name: '移交人：',
                category: 'turnOverPerson',
                textOption: [{name: '李明', value: 's001'},
                             {name: '小刚', value: 's002'},
                             {name: '刘志伟', value: 's003'},
                             {name: '钱红', value: 's004'},
                             {name: '张工', value: 's005'}]
            },
            {
                type: 'select',
                name: '接收人：',
                category: 'recipient',
                textOption: [{name: '李明', value: 's001'},
                    {name: '小刚', value: 's002'},
                    {name: '刘志伟', value: 's003'},
                    {name: '钱红', value: 's004'},
                    {name: '张工', value: 's005'}]
            },
        ];

        search();
        //访问后台API，提交查询条件， 获取查询结果
        function search() {
            $scope.$on('doSearch', function (e, activeCondition) {

            })
        }
        vm.resultData = {
            pagination: {
                totalPages: 10
            },
            headConf: ['序号','移交时间','案(事)件名称', '移交方式', '移交人', '移交单位/科室', '接收人', '接收单位/科室', '检材样本条数', '受理时间', '操作']
        }
    }

})();