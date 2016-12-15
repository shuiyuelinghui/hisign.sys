/**
 * Created by lilang on 2016/12/5.
 */
(function(){
    angular.module('sampleSave')
            .controller('SampleTurnoverCaseController', SampleTurnoverCaseController);
    // SampleSearchController.$inject = ['$scope'];

    function SampleTurnoverCaseController ($scope) {
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
                name: '专业：',
                category: 'section',
                index: 0,
                textOption: [{name: '不限', value: 'aaaa'},
                             {name: '心理测试检验', value: 'bbbb'},
                             {name: '法医物证(DNA)', value: 'cccc'},
                             {name: '电子物证检验', value: 'dddd'},
                             {name: '声像资料检验', value: 'eeee'},
                             {name: '文件检验', value: 'ffff'},
                             {name: '痕迹检验', value: 'gggg'},
                             {name: '理化检验', value: 'hhhhh'},
                             {name: '法医临床', value: 'iiiii'}]
            },
            {
                type: 'text',
                multi: true, //是否支持多选
                name: '鉴定类别：',
                category: 'category',
                index: 0,
                textOption: [{name: '不限', value: 'aaaa'},
                    {name: '鉴定类别1', value: 'bbbb'},
                    {name: '鉴定类别2', value: 'cccc'},
                    {name: '鉴定类别3', value: 'dddd'},
                    {name: '鉴定类别4', value: 'eeee'},
                    {name: '鉴定类别5', value: 'ffff'}]
            },
            {
                type: 'text',
                multi: true, //是否支持多选
                name: '状态/鉴定进度：',
                category: 'progress',
                index: 0,
                textOption: [{name: '不限', value: 'aaaa'},
                    {name: '状态1', value: 'bbbb'},
                    {name: '状态2', value: 'cccc'},
                    {name: '状态3', value: 'dddd'},
                    {name: '状态4', value: 'eeee'},
                    {name: '状态5', value: 'ffff'}]
            }
        ];

        search();
        //访问后台API，提交查询条件， 获取查询结果
        function search() {
            $scope.$on('doSearch', function (e, activeCondition) {

            })
        }
    }

})();