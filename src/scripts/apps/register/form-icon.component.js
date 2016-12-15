const FormIconComponent = {
    bindings: {
        field: '<'
    },
    template: `
        <span class="append-icon right">
            <i class="fa fa-check"
               ng-show="$ctrl.field.$dirty && $ctrl.field.$valid"
            ></i>
            <i class="fa fa-remove"
               ng-show="$ctrl.field.$dirty && $ctrl.field.$invalid"
            ></i>
        </span>
    `
};

export default FormIconComponent;
