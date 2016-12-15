const AsyncValidator = ($http, $q, SYS_URL) => ({
    restrict: 'A',
    require: 'ngModel',
    link($scope, $element, $attrs, ngModel) {

        ngModel.$asyncValidators.asyncvalid = (modelValue, viewValue) => {
            let val = modelValue || viewValue;

            return $http.get(SYS_URL+$attrs.url+'/'+val)
                .then((res) => {
                    if(!res.headers('Status')) {
                        return $q.reject();
                    } else {
                        return true;
                    }
                });
        };
    }
});

AsyncValidator.$inject = ['$http', '$q', 'SYS_URL'];

export default AsyncValidator;
