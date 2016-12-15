/**
 * Created by lilang on 2016/12/14.
 */
/**
 * Created by lilang on 2016/12/7.
 */
(function() {
    angular.module('common_modules')
        .component('searchResultComp', {
            templateUrl: './templates/common_modules/components/search-result-comp/search-result-comp.html',
            bindings: {
                resultData: '<'
            },
            controller: SearchResultController,
            controllerAs: 'searchResult'
        });
    // SearchController.$inject = [];

    function SearchResultController ($scope) {
        var vm = this;

    }
})();
