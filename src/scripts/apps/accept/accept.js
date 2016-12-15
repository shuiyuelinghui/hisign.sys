import cookie from 'js-cookie';
export default class AcceptController {
    constructor(
        $scope,
        $state,
        $timeout,
        $stateParams,
        toaster,
        UtilityService,
        AdmindesignsService,
        EntrustAcceptDataCenterService,
        EntrustAcceptRenderService,
        EntrustAcceptActionService,
        EntrustAcceptUtilService,
        AcceptDataService,
        CommonService
    ) {
        this.$scope = $scope;
        this.$state = $state;
        this.$timeout = $timeout;
        this.$stateParams = $stateParams;
        this.toaster = toaster;
        this.utilityService = UtilityService;
        this.admindesignsService = AdmindesignsService;
        this.commonService = CommonService;
        this.dcService = EntrustAcceptDataCenterService;
        this.renderService = EntrustAcceptRenderService;
        this.actionService = EntrustAcceptActionService;
        this.utilService = EntrustAcceptUtilService;
        this.dataService = AcceptDataService;
        
        this.acceptData = {};
        this.approveData = {};

        this.acceptId = $stateParams.id;
        this.result = this.$stateParams.result;
        this.userId = cookie.get('userId');

        this.counter = 5;
        this.timer = null;
        this.submitResult = {};
        //传入submitComp的数据
        this.configData = {
            //路径地址：
            tplUrl:  './templates/apps/accept/submitCompTpl.html',
            //组件文案配置：
            dcService: this.dcService,
            allReject: false,
            submitName: '提交',
            approveName: '受理',
            imageUrl: './assets/images/add_accept_opinion.png',
            goBack: ($event)=>{
                if ($event) {$event.stopPropagation();}
                this.goBack();
            }
        }
    }

    $onInit() {
        let con = $('#entrust_container');
        this.dcService.activeState = this.$state.current.name;
        this.actionService.delegateDateTimePickerAction();
        this.actionService.delegateDtRowAction(con, this.$scope);

        this.getAcceptData();

        this.$scope.$on('approveSubmitSuccess', (e, params) => {
            this.approveData = params;
            this.openMagnificPopup('pre-submit-info.html');
//          this.openMagnificPopup('re-appointed-person.html');
        });

        this.utilService.resetData(this.$scope);

    }

    openMagnificPopup(url,loaded, close) {
        let baseUrl = './templates/apps/accept/modal/';
        this.admindesignsService.openMagnificPopup(baseUrl+url, this,{}, loaded, close);
    }

    // 被鉴定人acceptState置成1
    handleMemberListData() {
        let data = this.dcService.memberList;
        for(let i = 0, len = data.length; i < len; i++) {
            data[i]['acceptState'] = '1';
        }
    }

    getAcceptData() {
        this.dataService.getAcceptData(this.acceptId)
            .then((response) => {
                this.acceptData = response;
                this.dcService.submissionId = response.submission.id;
                this.dcService.buildData(this.acceptData);
                this.dcService.setData(this.acceptData);
                this.dcService.splitFileData(this.$scope);
                this.handleMemberListData();
                this.dcService.prepareDictMapping()
                    .then(() => {
                        this.renderService.render(this.$scope);
                        this.$scope.$broadcast('dictFetchSuccess');
                        this.dcService.watchChange(this.$scope);
                    });
            });
    }

    submitAccept() {
        let params;

        this.dcService.submission.agreedDay = this.approveData.agreedDay;
        this.dcService.submission.agreedDateStr = this.approveData.agreedDateStr;
        delete this.approveData.agreedDay;
        delete this.approveData.agreedDateStr;

        params = Object.assign({}, this.dcService.getData(), this.approveData);

        this.dataService.submitAccept(params)
            .then((response) => {
                this.submitResult = response;
                this.openMagnificPopup('count-down.html', ()=> {
                    this.countDown();
                }, ()=> {
                    this.cancelTimeout();
                });
            });
    }
    
     //重新指定收检人
    reoppintedPerson() {
    	this.admindesignsService.closeMagnificPopup();
    	this.$timeout(() => {
    		this.openMagnificPopup('re-appointed-person.html');
    	});
    }

/************结果弹窗相关代码*********************/
    //开启倒计时
    countDown() {
        this.timer = this.$timeout(() => {
            if (this.counter > 1) {
                this.counter--;
                this.countDown();
            } else {
//              this.admindesignsService.closeMagnificPopup();
                //自动打开打印页面
                this.doPrint();
//				this.commonService.skipUrl(this.result);
            }
        }, 1000);
    }
    //打印相关动作
    doPrint(type) {
        this.utilityService.goState("doc", {id: this.acceptId, type:this.commonService.docType.bookConfirmation, nodeCode: this.acceptData.submission.submState, flag: 1}, true);
        this.cancelTimeout();
    }
    //取消计时器
    cancelTimeout () {
        if (this.timer) {
            this.$timeout.cancel(this.timer);
            this.timer = null;
            this.hideTime = true;
        }
    }
    goBack() {
        this.admindesignsService.closeMagnificPopup();
        this.utilityService.goState('app.task.todo.personal',{pageId: 'ap1040'});
    }
}

AcceptController.$inject = [
    '$scope',
    '$state',
    '$timeout',
    '$stateParams',
    'toaster',
    'UtilityService',
    'AdmindesignsService',
    'EntrustAcceptDataCenterService',
    'EntrustAcceptRenderService',
    'EntrustAcceptActionService',
    'EntrustAcceptUtilService',
    'AcceptDataService',
    'CommonService'
];
