const IdCard = ( 
	PatternService, 
	UtilityService,
	EntrustAcceptDataCenterService
) => ({
	/*return {*/
		restrict: 'A',
		scope: {
			idVal: '@',
			keyStr: '@',
			keyObj: '='
		},
		link( $scope, $element, $attrs ) {
			let dcs = EntrustAcceptDataCenterService;
			let userInfo;
			function setValueById () {
				if($scope.idVal === '') return;
		    	userInfo = UtilityService.getUserInforById( $scope.idVal);
		    	if( !userInfo) {
		    		return false;
		    	} else {
		    		$scope.$apply(() => {
			    		dcs[$scope.keyStr || $scope.keyObj].birthStr = userInfo.birthday;
			    		dcs[$scope.keyStr || $scope.keyObj].age = userInfo.age;
				    	if( userInfo.gender == '女' ){
				    		dcs[$scope.keyStr || $scope.keyObj].sex = '2';
				    	} else {
				    		dcs[$scope.keyStr || $scope.keyObj].sex = '1';
				    	}
		    		});
		    	}
		    }
			
			function inputChange () {
				$element.on('input', function() { 
					if ( dcs[$scope.keyStr || $scope.keyObj].credentialType === "1" ) {
						setValueById();
					} else{
						return false;
					}
				});
			}
			inputChange();
		}
		
});

IdCard.$inject = [
	'PatternService',
	'UtilityService',
	'EntrustAcceptDataCenterService'
];

export default IdCard;