const FormErrorMsgComponent = {
    bindings: {
        'field': '<',
        'required': '@',
        'async': '@',
        'pattern': '@'
    },
    template: `
        <div
            class="col-md-3 form-error-msg"
            ng-messages="$ctrl.field.$dirty && $ctrl.field.$error"
        >
            <span ng-message="required">{{$ctrl.required}}</span>
            <span ng-message="asyncvalid">{{$ctrl.async}}</span>
            <span ng-message="pattern">{{$ctrl.pattern}}</span>
        </div>
    `
};

export default FormErrorMsgComponent;
