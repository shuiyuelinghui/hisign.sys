const Counter = ($timeout, $state) => ({
    restrict: 'E',
    scope: {
        time: '@',
        state: '@',
        params: '='
    },
    template: '<span style="color: #f00" class="fs16">{{time}}</span>',
    link($scope, $element, $attrs) {
        let params = $scope.params || {};
        $scope.time = $scope.time || 5;
        $scope.timer = null;

        function counterDown() {
            if($scope.time > 0) {
               $scope.timer = $timeout(() => {
                    $scope.$apply(() => {
                        --$scope.time;
                    });
                    counterDown();
                }, 1000);
            } else {
                $state.go($scope.state, params);
            }
        }
        $scope.$on('$stateChangeStart', () => {
            if ($scope.timer) {
                $timeout.cancel($scope.timer);
            }
        });
        $scope.$on('cancelTimeout', () => {
            if ($scope.timer) {
                $timeout.cancel($scope.timer);
            }
        });
        counterDown();
    }
});

Counter.$inject = [
    '$timeout',
    '$state'
];

export default Counter;