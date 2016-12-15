import uuid from 'uuid';

const AcceptSwitch = (
    UtilityService,
    EntrustAcceptDataCenterService
) => ({
    restrict: 'E',
    scope: {
        category: '@',
        index: '@',
        outerIndex: '@',
        required: '='
    },
    templateUrl: '/templates/apps/accept/switch.html',
    link($scope, $element, $attrs) {

        let tempData;

        $scope.uuid = uuid.v4();
        $scope.required = $scope.required || false;
        $scope.dcs = EntrustAcceptDataCenterService;

        if($scope.category === 'evidenceList') {
            tempData = $scope.dcs.restoreEvidenceListData($scope.index, $scope.outerIndex);
            $scope.modelBaseName = $scope.dcs[$scope.category][$scope.outerIndex][tempData.key][tempData.index];
        } else if($scope.category === 'relativesRelationList') {
            tempData = $scope.dcs.restoreRelativesRelationListData($scope.index);
            $scope.modelBaseName = $scope.dcs[$scope.category][tempData.outerIndex][tempData.key][tempData.index];
        } else {
            $scope.modelBaseName = $scope.dcs[$scope.category][$scope.index];
        }

        if(UtilityService.isEmpty($scope.modelBaseName['acceptState'])) {
            $scope.modelBaseName['acceptState'] = '1';
        }

        if(UtilityService.isEmpty($scope.modelBaseName['dispostMethod'])) {
            $scope.modelBaseName['dispostMethod'] = null;
        }

        $scope.resolveRejectDispostMethod = (e) => {
            let t = $(e.target),
                result;

            if(t.prop('checked')) {
                result = '1';
                $scope.modelBaseName['dispostMethod'] = null;
            } else {
                result = '2';
                $scope.modelBaseName['dispostMethod'] = -1;
            }

            $scope.modelBaseName['acceptState'] = result;
        };

        $scope.markUnderneathSame = () => {
            let list = $scope.dcs[$scope.category][$scope.outerIndex][tempData.key],
                index = parseInt(tempData.index),
                dispostMethod = list[index].dispostMethod,
                acceptState = list[index].acceptState;

            for(let i = index + 1, len = list.length; i < len; i++) {
                list[i].dispostMethod = dispostMethod;
                list[i].acceptState = acceptState;
            }
        };
    }
});

AcceptSwitch.$inject = [
    'UtilityService',
    'EntrustAcceptDataCenterService'
];

export default AcceptSwitch;