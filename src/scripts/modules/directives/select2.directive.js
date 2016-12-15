const Select2 = (
    $timeout,
    AdmindesignsService
) => ({
    restrict: 'A',
    scope: {
        list: '=',
        options: '=',
        default: '='
    },
    link($scope, $element, $attrs) {
        AdmindesignsService.initSelect2($element, $scope.options);
        $timeout(() => {
            let defaultData = [],
                data = $scope.default || [];

            for(let i = 0, len = data.length; i < len; i++) {
                if(typeof data[i] === 'object') {
                    defaultData.push(JSON.stringify(data[i]));
                } else {
                    defaultData.push(data[i]);
                }
            }
            $element.select2('val', defaultData);
        }, 500);
        $scope.$watch('list', function(newVal) {
            let source = [];
            if(newVal && newVal.length) {
                newVal.forEach((item) => {
                    source.push(item.value1);
                });
                $element.select2('data', source);
            }
        });
    }
});

Select2.$inject = [
    '$timeout',
    'AdmindesignsService'
];

export default Select2;