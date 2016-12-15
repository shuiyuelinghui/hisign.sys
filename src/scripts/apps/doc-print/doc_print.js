var moment = require('moment');
export default class ExamineController {

    constructor(
        $scope,
        $timeout,
        $stateParams,
        toaster,
        AdmindesignsService,
        UtilityService,
        CommonDataService,
        CommonService
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$stateParams = $stateParams;
        this.toaster = toaster;
        this.admindesignsService = AdmindesignsService;
        this.utilityService = UtilityService;
        this.commomDataService = CommonDataService;
        this.commonService = CommonService;
        this.counter = 5;
        this.timer = null;
        this.submId = this.$stateParams.id;
        this.resultId = this.$stateParams.result;

        this.docListData = {};
        this.submissionData = {};
        this.modalBaseUrl = './templates/apps/doc_print/';
    }

    $onInit() {
        this.fetchSubmissionData();
        this.fetchDocListData();
        this.fetchHistoryList();
    }


    //获取委托信息
    fetchSubmissionData() {
        this.commomDataService.fetchSubmissionData(this.submId)
            .then((response) => {
                this.submissionData = response;
            });
    }

    fetchHistoryList () {
        this.commomDataService.fetchHistoryList(this.submId)
            .then((response) => {
                this.historyList = response;
            });
    }

    fetchDocListData() {
        this.commomDataService.fetchDocListData(this.submId)
            .then((response) => {
                this.docListData = response;
                this.count = this.docListData.length;

                this.$timeout(()=>{
                    this.admindesignsService.initTooltip();
                }, 100);
            });
    }


    finishPrint () {
        this.popupConfirm();
    }

    popupConfirm($event) {
        this.admindesignsService.openMagnificPopup(this.modalBaseUrl + 'print_confirm.html', this, {}, () => {
            this.commomDataService.fetchApprovalDetail(this.submId)
                .then((response) => {
                    /*所有审批 获取：委托单位|| 鉴定机构|| 案（事）件名称|| 专业|| 鉴定类别|| 送检材料*/
                    this.docPrintDetailData = response;
                });
        });
    }
    popupResult(url) {
        this.admindesignsService.openMagnificPopup(this.modalBaseUrl + url , this, {}, () => {
            this.countDown();
        }, ()=> {
            if (this.timer) {
                this.$timeout.cancel(this.timer);
                this.timer = null;
                this.counter = 5;
            }
        });
    }

    printSubmit() {
        let params = {
            submId: this.submId,
            section: this.submissionData.section,
            nodeCode: this.submissionData.submState,
            result: this.resultId,
            auditor: '',
            auditorType: '',
            cnasFlag: '',
            opinion:''
        };
        this.commomDataService.docRelaSubmit(params)
            .then((response) => {
                this.resultTittle = "鉴定文书打印结果";
                this.popupResult('print_result.html');
            });
    }

    bulidIframeData(type, nodeCode) {

        if (typeof nodeCode === 'undefined') {
            nodeCode = this.submissionData.submState;
        }

        this.utilityService.goState("doc", {id: this.submId, type: type, nodeCode: nodeCode, flag: 1}, true);
    }

    closePopup() {
        this.admindesignsService.closeMagnificPopup();
    }

    countDown() {
        this.timer = this.$timeout(() => {
            if (this.counter > 1) {
                this.counter--;
                this.countDown();
            } else {
                this.admindesignsService.closeMagnificPopup();
                this.commonService.skipUrl(this.resultId)
//              this.utilityService.goState('app.task.todo.personal',({pageId:'ap1400'}));
            }
        }, 1000);
    }

    transformData(array) {
        let i, len = array.length;
        for( i = 0; i < len; i++) {
            if (array && array[i].insDate) {
                var val = array[i].insDate;
                array[i].insDate = moment(val).format("YYYY-MM-DD HH:mm:ss");
            }
        }
    }

    openFootPrintPopup() {
        this.$scope.submId = this.submId;
        this.admindesignsService.openMagnificPopup("footprint.html", this, {});
    }
   
}

ExamineController.$inject = [
    '$scope',
    '$timeout',
    '$stateParams',
    'toaster',
    'AdmindesignsService',
    'UtilityService',
    'CommonDataService',
    'CommonService'
];
