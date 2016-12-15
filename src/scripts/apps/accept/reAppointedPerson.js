import cookie from 'js-cookie';

export default class reAppointedPersonController {
	
	constructor(
		SYS_URL,
		ALIMS_URL,
		UtilityService,
		$scope,
        $state,
        $timeout,
        $stateParams,
        toaster,
		AdmindesignsService,
		CommonDataService,
		EntrustAcceptDataCenterService
	) {
		this.utilityService = UtilityService;
        this.alimsUrl = ALIMS_URL;
        this.sysurl = SYS_URL;
		this.$scope = $scope;
		this.$state = $state;
		this.$timeout = $timeout;
		this.$stateParams = $stateParams;
		this.toaster = toaster;
		this.admindesignsService = AdmindesignsService;
		this.commonDataService = CommonDataService;
		
        this.submId = this.$stateParams.id;
        this.submissionData = [];
        this.personModel = [];
        this.selectModel = '';
	}
	
	$onInit() {
		this.getSubmissionData()
			.then(()=>{
				this.fetchreAppointedPerson();
          });
	}
	
	fetchPickupPerson (params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysusers/testuserbyserver', params);
    }
	
	getSubmissionData() {
        return this.commonDataService.fetchSubmissionData(this.submId)
            .then((response) => {
                this.submissionData = response;
            });
    }
	
	//获取从重新指定收检人，和显示当前的收检人
	fetchreAppointedPerson() {
		let params = {
            serverCode: this.submissionData.serverCode,
            section: this.submissionData.section,
            noUserId: true
        };
        this.fetchPickupPerson(params)
            .then((response) => {
                this.personModel = response;
            });
	}
	openMagnificPopup(url,loaded, close) {
        let baseUrl = './templates/apps/accept/modal/';
        console.log(close);
        this.admindesignsService.openMagnificPopup(baseUrl+url, this,{}, loaded, close);
    }
	//保存
	saveWork(params){
		return this.utilityService.asyncPost(this.alimsUrl+'/submissions/recastUser',params);
	}
	save() {
		let params = {
            submId: this.submId,
            auditor:this.selectModel
        };
		this.saveWork(params)
			.then((response) => {
				this.openCount();
            });
	}
	//关闭
	personClose() {
        this.openCount();
	}
	//弹出count-down.html
	openCount () {
		this.admindesignsService.closeMagnificPopup();
		this.$timeout(() => {
    		this.openMagnificPopup('count-down.html');
    	});
	}
}

reAppointedPersonController.$inject = [
    'SYS_URL',
	'ALIMS_URL',
	'UtilityService',
	'$scope',
    '$state',
    '$timeout',
    '$stateParams',
    'toaster',
	'AdmindesignsService',
	'CommonDataService',
	'EntrustAcceptDataCenterService'
];
