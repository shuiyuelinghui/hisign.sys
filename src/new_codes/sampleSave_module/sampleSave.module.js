(function () {
    angular.module('sampleSave',['common_modules'])
            .config(config);
    // config.$inject = '$stateProvider, $location, $window'.split(',').map(function(s){return s.trim()});

    function config($stateProvider) {
        $stateProvider
            //检材样本保管
            .state('app.sampleSave', {
            abstract: true,
            url: '/sampleSave',
            template: '<div ui-view></div>'
        })
            //检材样本查询
            .state('app.sampleSave.sampleSearch', {
            url: '/sampleSearch',
            templateUrl: './templates/sampleSave_module/sampleSearch/sampleSearch.html',
            controller: 'SampleSearchController',
            controllerAs: 'sampleSearch'
        })
            //检材样本流转登记一揽
            .state('app.sampleSave.sampleTurnover', {
                url: '/sampleTurnover',
                templateUrl: './templates/sampleSave_module/sampleTurnover/sampleTurnover.html',
                controller: 'SampleTurnoverController',
                controllerAs: 'sampleTurnover'
            })
            //检材样本流转登记一揽（根据案件合）
            .state('app.sampleSave.sampleTurnoverCase', {
                url: '/sampleTurnoverCase',
                templateUrl: './templates/sampleSave_module/sampleTurnoverCase/sampleTurnoverCase.html',
                controller: 'SampleTurnoverCaseController',
                controllerAs: 'sampleTurnoverCase'
            })
            //检材样本内部流转登记一揽
            .state('app.sampleSave.sampleInnerTurnover', {
                url: '/sampleInnerTurnover',
                templateUrl: './templates/sampleSave_module/sampleInnerTurnover/sampleInnerTurnover.html',
                controller: 'SampleInnerTurnoverController',
                controllerAs: 'sampleInnerTurnover'
            })

    }
})();
