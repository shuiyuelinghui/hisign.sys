const DtSelectAry = (EntrustAcceptDataCenterService) => ({
    restrict: 'E',
    scope: {
        section: '@',
        category: '@',
        outerIndex: '@',
        innerIndex: '@',
        required: '=',
        disabled: '='
    },
    template: `
        <label class="field select">
            <select 
                ng-options="item as item for item in memberList"
                ng-model="dcs.evidenceList[outerIndex].sampleList[innerIndex].memberName"
                ng-required="required"
                ng-disabled="section === '3' || disabled"
            >
                <option value="">请选择</option>
            </select>
            <i class="arrow"></i>
        </label>
    `,
    link($scope, $element, $attrs) {
        $scope.dcs = EntrustAcceptDataCenterService;
        $scope.memberList = $scope.dcs.connectMemberList($scope.section, $scope.category);
    }
});

DtSelectAry.$inject = ['EntrustAcceptDataCenterService'];

export default DtSelectAry;