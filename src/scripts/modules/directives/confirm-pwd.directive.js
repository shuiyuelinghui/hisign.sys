const ConfirmPassword = () => ({
    restrict: 'A',
    require: 'ngModel',
    scope: {
        pwd: '='
    },
    link($scope, $element, $attrs, $ctrl) {
        $ctrl.$validators.confirmPwd = (modelValue, viewValue) => {
            if($scope.pwd === viewValue) return true;
            else return false;
        }
    }
});

export default ConfirmPassword;