const IdUserinfor = ( 
	PatternService, 
	UtilityService,
	EntrustAcceptDataCenterService
) => ({
	/*return {*/
		restrict: 'A',
		scope: {
			idVale: '@',
			idType: '@',
			keyStr: '@',
			keyObj: '='
		},
		link( $scope, $element, $attrs ) {
			let dcs = EntrustAcceptDataCenterService;
			let getUserInfor;
			function setValueById () {
		    	getUserInfor = UtilityService.getUserInforById( $scope.idVale );
		    	if( !getUserInfor) {
		    		$element.css("border-color",'#ed7764');
		    		return false;
		    	} else {
		    		$scope.$apply(() => {
			    		dcs[$scope.keyStr || $scope.keyObj].birthStr = getUserInfor.birthday;
			    		dcs[$scope.keyStr || $scope.keyObj].age = getUserInfor.age;
				    	if( getUserInfor.gender == '女' ){
				    		dcs[$scope.keyStr || $scope.keyObj].sex = '2';
				    	} else {
				    		dcs[$scope.keyStr || $scope.keyObj].sex = '1';
				    	}
		    		});
		    		$element.css("border-color",'#ddd');
		    	}
		    	
		    }
			
			function inputChange () {
				$element.on('input', function() { 
					if ( dcs[$scope.keyStr || $scope.keyObj].credentialType === undefined || dcs[$scope.keyStr || $scope.keyObj].credentialType === "1" ) {
						setValueById();
					} else{
						$element.css("border-color",'#ddd');
						return false;
					}
				});
			}
			inputChange();
		}
		
});

IdUserinfor.$inject = [
	'PatternService',
	'UtilityService',
	'EntrustAcceptDataCenterService'
];

export default IdUserinfor;