/**
 * Created by Administrator on 2016/11/2 0002.
 */
export default class ExamineMapController {

    constructor(
        $scope,
        $timeout,
        $stateParams,
        toaster,
        AdmindesignsService,
        UtilityService,
        CommonDataService,
        ExamineMapDataService,
        CommonService
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$stateParams = $stateParams;
        this.toaster = toaster;
        this.admindesignsService = AdmindesignsService;
        this.utilityService = UtilityService;
        this.commomDataService = CommonDataService;
        this.dataService = ExamineMapDataService;
		this.commonService=CommonService
        this.submId = this.$stateParams.id;
        this.resultId = this.$stateParams.result;
        this.modalBaseUrl = './templates/apps/examine_map/modal/';
        this.counter = 5;
        this.timer = null;
    }

    $onInit() {
        this.getSubmissionData();

        //清空service数据
        this.dataService.submissionData = {};
        this.dataService.fileSlideSampleList = []; //检材列表
        this.dataService.fileSlideMappingDataItem = []; //案件图片列表
        this.dataService.fileSlideDataItem = {}; //根据sampleId分类重构检材图片数据对象 {sampleId: [response]}
        this.dataService.submitData = [];
    }


    //获取委托基本信息
    getSubmissionData() {
        this.submId = this.$stateParams.id;  //url上绑定了 id result;
        this.commomDataService.fetchSubmissionData(this.submId)
            .then((response) => {
                this.dataService.submissionData = response;
                //获取案件图片列表
                this.fetchPicturesList(this.submId, this.dataService.fileSlideMappingDataItem);
                //获取检材样本列表
                this.fetchSampleList();
            });
    }
    //获取图片数据
    fetchPicturesList (objectId, targetObj, flag) {
        let params = {
            objectId: objectId,
            type: '2',
            flag: '5',   //案件
            noUserId: true
        };
        if (flag) {
            params.flag = '4';
        }
        this.dataService.fetchPicturesList(params)
            .then((res) => {
                let arr = [];
                if (flag) {
                    arr = targetObj[objectId] = res || [];
                } else {
                    for (let item of res) {
                        targetObj.push(item);
                    }
                    arr = targetObj;
                }
                //重构返回数组
                if (arr) {
                    for (let i = 0, len = arr.length; i < len;  i++) {
                        arr[i].type = '2';
                        arr[i].objectId = params.objectId;
                        arr[i].description = '';
                        arr[i].flag = params.flag;
                        arr[i].filesPrefixUuid = '';

                        delete arr[i].id;
                    }
                }

                this.$scope.$broadcast('fileSlideDataPrepared');
            })
    }
    //获取检材样本列表
    fetchSampleList () {
        let params = {
            submCode: this.dataService.submissionData.submCode,
            serverCode: this.dataService.submissionData.serverCode
        }
        this.commomDataService.fetchSampleList(params)
            .then((res) => {
                this.dataService.fileSlideSampleList = res;

                for (let i = 0, len = res.length; i < len ; i++) {
                    //获取检材图片列表
                    let sampleId = res[i].sampleId;
                    this.fetchPicturesList(sampleId, this.dataService.fileSlideDataItem, true);
                }
            })
    }

    goBack () {
        this.admindesignsService.closeMagnificPopup();
        window.history.back();
    }


    popupConfirm(url) {
        this.admindesignsService.openMagnificPopup(this.modalBaseUrl + url, this, {})
        this.dataService.buildSubmitData();
    }

    popupResult(url) {
        this.admindesignsService.openMagnificPopup(this.modalBaseUrl + url, this, {}, () => {
            this.countDown();
        }, ()=> {
            if (this.timer) {
                this.$timeout.cancel(this.timer);
                this.timer = null;
                this.counter = 5;
            }
        });
    }

    submitMap () {

        let params = this.dataService.submitData;
        this.dataService.submitMap(params)
            .then(() => {
                this.goBack();
            });
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
                window.history.back();
            }
        }, 1000);
    }

    //验证
    verifyEmpty() {
        let isEmpty = true;
        for (let key in this.dataService.fileSlideDataItem) {
            if (this.dataService.fileSlideDataItem[key].length) {
                isEmpty = false;
                break;
            }
        }
        return  isEmpty && this.dataService.fileSlideMappingDataItem == false;
    }




}

ExamineMapController.$inject = [
    '$scope',
    '$timeout',
    '$stateParams',
    'toaster',
    'AdmindesignsService',
    'UtilityService',
    'CommonDataService',
    'ExamineMapDataService',
    'CommonService'
];
