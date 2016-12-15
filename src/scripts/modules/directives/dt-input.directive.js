const DtInput = () => ({
    restrict: 'E',
    scope: {
        model: '=',
        required: "="
    },
    template: `
        <label class="field">
            <input type="text" class="gui-input" ng-model="model" ng-required="required"/>
        </label>
    `,
    link($scope, $element, $attrs) {}
});

export default DtInput;