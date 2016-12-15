const DtSelect = () => ({
    restrict: 'E',
    scope: {
        data: '=',
        model: '=',
        required:"="
    },
    template: `
        <label class="field select">
            <select 
                ng-options="item.dictKey as item.dictValue1 for item in data"
                ng-model="model"
                ng-required="required"
            >
                <option value="">请选择</option>
            </select>
            <i class="arrow"></i>
        </label>
    `,
    link($scope, $element, $attrs) {}
});

export default DtSelect;