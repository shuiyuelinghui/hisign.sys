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
        ExamineDataService,
        CommonService
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$stateParams = $stateParams;
        this.toaster = toaster;
        this.admindesignsService = AdmindesignsService;
        this.utilityService = UtilityService;
        this.commonDataService = CommonDataService;
        this.commonService = CommonService;
        this.dataService = ExamineDataService;
        this.counter = 5;
        this.timer = null;
        this.recordIndex = -1
        this.submId = this.$stateParams.id;
        this.resultId = this.$stateParams.result;
        this.flag = this.$stateParams.flag
        this.id = '';
        this.recordList = {};
        this.sampleList = {};
        this.resultSelect = [];
        this.submissionData = {};
        this.addRecordDictionary = {};
        this.addRecordData = {};
        this.modalBaseUrl = './templates/apps/examine/modal/';
        this.JSON = JSON;
        this.initAddRecordData = {
            "category": "",
            "analystAssigned": "",
            "analystAssociate": "",
            "analystThird": "",
            "analystFourth": "",
            "analystFifth": "",
            "startDateStr": 0,
            "place": "",
            "type": "",
            "protocolId": "",
            "protocols": "",
            "deviceId": "",
            "devices": "",
            "labRoom": "",
            "labTemp": "",
            "labHumidity": "",
            "sampleId": "",
            "process": "",
            "argument": "",
            "result": "",
            "path": ""
        };
        this.analystAssignedNameList = '';
        this.modifyData = {};
        this.modifyData.devicesData = [];
        this.modifyData.sampleData = [];
        this.modifyData.protocolData = [];
    }

    $onInit() {
        this.getSubmissionData();
        this.fetchRecordList();
//      this.delegateDateTimePickerAction();
    }


    //获取委托基本信息
    getSubmissionData() {
        this.submId = this.$stateParams.id;  //url上绑定了 id result;
        this.commonDataService.fetchSubmissionData(this.submId)
            .then((response) => {
                this.submissionData = response;
                this.fetchResultSelect();
                //获取验证接口
                this.fetchValidate();

                this.getOutputMaterials();

            });
    }
    //获取验证接口
    fetchValidate() {
        let params = {
            serverCode: this.submissionData.serverCode,
            section: this.submissionData.section,
            noUserId: true
        };
        this.dataService.fetchValidate(params)
            .then((response) => {
                this.validate = response.fillInRecord;
            });

    }

    //获取检验记录列表
    fetchRecordList () {
        this.dataService.fetchRecordList(this.submId)
            .then((response) => {
                this.transformData(response);
                this.recordList = response;
                //TODO: 未去重
                if (response[0]) {
                    this.analystAssignedNameList = response[0].analystAssignedName + ',' + response[0].analystAssociateName;
                }
            })
    }


     //获取文书类型
    getOutputMaterials() {
        let params = {
            "result": this.resultId,
            "nodeCode": this.submissionData.submState,
            "section": this.submissionData.section,
            "submId": this.submId
        };

        this.commonDataService.getOutputMaterials(params)
            .then((response) => {
               console.log(response);
            });
    }




    transformData(array) {
        let i, len = array.length;
        for( i = 0; i < len; i++) {
            if (array && array[i].insDate) {
                var val = array[i].insDate;
                array[i].insDate = moment(val).format("YYYY-MM-DD HH:mm");
            }
        }
    }
    
    //获取检材样本列表
    fetchSampleResultList() {
        this.dataService.fetchSampleResultList(this.submId)
            .then((response) => {
                this.sampleResultList = response.samples;

                for (let key in this.sampleResultList) {

                    let obj = {
                        name: this.sampleResultList[key].result
                    };

                    let resultArr = [];
                    resultArr.push(this.sampleResultList[key].result);

                    this.resultSelect.push(obj);

                    this.sampleResultList[key]["result"] = resultArr;
                }

                console.log(this.resultSelect);
            })
    }

    //获取鉴定结果下拉字典
    fetchResultSelect() {
        let params = {
            serverCode: this.submissionData.serverCode,
            section: this.submissionData.section,
            identifyCategoryCode: this.submissionData.identifyCategory
        };
        this.dataService.fetchResultSelect(params)
            .then((response) => {
                this.resultSelect = response;
                this.fetchSampleResultList();
            })
    }

    //添加记录表单信息
    fetchRecordFormData () {
        //获取检验人
        let params = {
            serverCode: this.submissionData.serverCode,
            section: this.submissionData.section,
            noUserId: true
        };
        this.dataService.fetchTestUser(params)
            .then((response) => {
                this.addRecordDictionary.testUser = response;
            });
        //获取模板记录
        let tplParams = {
            serverCode: this.submissionData.serverCode,
            section: this.submissionData.section,
            identifyCategory: this.submissionData.identifyCategory,
            type: "6"
        };
        this.dataService.fetchTplList (tplParams)
            .then((response) => {
                this.addRecordDictionary.tplList = response;
            });
        //获取检验方法
        let comParams = {
            serverCode: this.submissionData.serverCode,
            section: this.submissionData.section,
            identifyCategory: this.submissionData.identifyCategory
        };
        this.dataService.fetchMethodList (comParams)
            .then((response) => {
                this.addRecordDictionary.protocolsList = response;
            });
        //获取检材样本
        let samplesParams = {
            serverCode: this.submissionData.serverCode,
            submCode: this.submissionData.submCode
        }
        this.commonDataService.fetchSampleList(samplesParams)
            .then((response) => {
                this.addRecordDictionary.sampleList = response;
            });
        //获取仪器列表
        this.dataService.fetchDevicesList (comParams)
            .then((response) => {
                this.addRecordDictionary.devicesList = response;
            });

    }

    openFootPrintPopup() {
        this.$scope.submId = this.submId;
        this.admindesignsService.openMagnificPopup("footprint.html", this, {});
    }

    addRecord () {
        this.addRecordData = {};
        //初始化非提交数据
        this.protocolsArray = [];
        this.rangeDate = '';
        this.protocols = '';
        this.sampleId = '';
        this.devicesObj = '';
        this.addRecordDictionary.protocolsList = [];
        this.addRecordDictionary.sampleList = [];
        this.addRecordDictionary.devicesList = [];
        this.modifyData.devicesData = [];
        this.modifyData.sampleData = [];
        this.modifyData.protocolData = [];
        this.openAddRecordModal();
        //获取添加表单数据
        this.fetchRecordFormData();
        this.$timeout(() => {
        	console.log("dufhdhf");
        	this.initDateTimePicker();
        },1000);
    }

    openAddRecordModal() {
        this.admindesignsService.openMagnificPopup(this.modalBaseUrl + 'examine-add.html', this, {},undefined ,()=>{
                this.closePopup();
            }
        );
    }

    //select2 手动输入、下拉框点击获得数据处理
    multipleSelectTransform (bindObject, selectAttr,manualAttr, submitObject) {
        let selectArr = [], manualArr = [];
        if (this.utilityService.isArray(bindObject)) {
            for (let val of bindObject) {
                if (!val.match("^\{(.+:.+,*){1,}\}$")) {
                    //普通字符串
                    manualArr.push(val);
                } else {
                    //json格式
                    val = this.JSON.parse(val);
                    selectArr.push(val[selectAttr]);
                }
            }
        }
        submitObject[selectAttr] =  selectArr.join(',');
        if (manualAttr) {
            submitObject[manualAttr] =  manualArr.join(',');
        }

    }
    //生成记录
    makeRecord() {
        this.multipleSelectTransform(this.protocols, 'protocolId',  'protocols', this.addRecordData );
        this.multipleSelectTransform(this.devicesObj, 'deviceId', 'devices', this.addRecordData );
        this.addRecordData.sampleId = this.utilityService.isArray(this.sampleId) ? this.sampleId.join(',') : '';
        let params = Object.assign({}, {
            submId: this.submId,
            submCode: this.submissionData.submCode,
            section: this.submissionData.section,
            category: this.submissionData.identifyCategory,
            path: this.addRecordDictionary.tplList.path
        }, this.addRecordData);

        //将数字型转化为字符型 type='number'
        params.labTemp = typeof params.labTemp == 'number' ? String(params.labTemp) :  '';
        params.labHumidity = typeof params.labHumidity == 'number' ? String(params.labHumidity) : '';
        //有ID为修改生成记录
        if (this.addRecordData.id)  {
			console.log(params);
            this.dataService.modifyRecord(params)
                .then(() => {
                    this.fetchRecordList();
                    this.fetchSampleResultList();
                    this.closePopup();
                });
            //无ID为新建生成记录
        }else {
            console.log(params);
            this.dataService.makeRecord(params)
                .then((res) => {
                    this.fetchRecordList();
                    this.fetchSampleResultList();
                    this.closePopup();
                })
        }
    }
    //修改记录前获取记录详细信息
    fetchRecordDetail(testId) {
        this.dataService.fetchRecordDetail (testId)
            .then((res)=>{
            	console.log(res);
                this.openAddRecordModal();
				this.$timeout(() => {
		        	this.initDateTimePicker();
		        },1000);
                //将字符型转化为数字型 type='number'
                res.labTemp = typeof res.labTemp == 'string' ? parseFloat(res.labTemp)  : '';
                res.labHumidity = typeof res.labHumidity == 'string' ? parseFloat(res.labHumidity) : '';
                //构建提交数据
                for (let key in this.addRecordData) {
                    this.addRecordData[key] = res[key];
                }
                this.addRecordData.id = res.id;

                //处理select2 修改功能
                //检验方法
                let protoArr = [],
                    protocolId  = res.protocolId.split(',') || [];
                this.protocolsArray  = res.protocols ? res.protocols.split(',') : [];
                for (let i = 0; i < protocolId.length; i++) {
                    protoArr.push({'protocolId': protocolId[i]});
                }
                this.modifyData.protocolData = protoArr.concat(this.protocolsArray);
                // 样本检材
                this.modifyData.sampleData = res.sampleId ? res.sampleId.split(',') : [];
                //  检验仪器
                let deviceArr = [],
                    deviceId  = res.deviceId ? res.deviceId.split(',') : [];
                this.deviceArray  = res.devices ? res.devices.split(',') : [];
                for (let i = 0; i < deviceId.length; i++) {
                    deviceArr.push({'deviceId': deviceId[i]});
                }
                this.modifyData.devicesData = deviceArr.concat(this.deviceArray);


                //处理检验时间
                this.addRecordData.startDateStr = moment(res.startDate).format('YYYY-MM-DD hh:mm');
                this.addRecordData.completeDateStr = moment(res.completeDate).format('YYYY-MM-DD hh:mm');
                /*console.log(res.startDate +("dd="+new Date(res.startDate)));
                console.log(this.addRecordData.startDateStr);
                console.log(res.completeDate+("dd="+new Date(res.completeDate)));
                console.log(this.addRecordData.completeDateStr);*/
            })
    }


    //修改记录
    modifyRecord(testId) {
        //初始化非提交数据
        this.protocolsArray = [];
        this.deviceArray = [];
        this.addRecordData = this.initAddRecordData;
        //获取添加表单数据
        this.fetchRecordFormData();
        this.fetchRecordDetail(testId);
    }

    //删除记录
    deleteRecord(id, index) {
        this.admindesignsService.openConfirmDeleteMagnificPopup(this, {}, () => {
            this.dataService.deleteRecord(id)
                .then(()=>{
                    this.fetchRecordList();
                    this.fetchSampleResultList();
                    this.toaster.pop("success", "", "删除成功");
                })

        });
    }


    popupConfirm(url) {
        this.admindesignsService.openMagnificPopup(this.modalBaseUrl + url, this, {});
    }

    popupResult(url) {
        this.admindesignsService.openMagnificPopup(this.modalBaseUrl + url, this, {}, () => {
            this.countDown();
        }, ()=> {
            this.cancelTimeout();
        });
    }

    doPrint(type) {
        this.utilityService.goState("doc", {id: this.submId, type:type, nodeCode: this.submissionData.submState}, true);
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

    closePopup() {
        this.admindesignsService.closeMagnificPopup();
    }

    finishExamine () {
        this.popupConfirm('examine-confirm.html');

        this.dataService.fetchExamineDetail(this.submId)
            .then((response) => {
                this.examineDetailData = response;
                this.testName = this.analystAssignedNameList;
            });
    }

    submitExamine () {
        let params = {
            submId: this.submId,
            result: this.resultId,
            section: this.submissionData.section,
            nodeCode: this.submissionData.submState,
            sampleTestResult: []
        };
        this.sampleResultList = this.sampleResultList || [];
        for (let i = 0; i < this.sampleResultList.length; i++) {
            params.sampleTestResult[i] = params. sampleTestResult[i] || {};
            params.sampleTestResult[i].sampleId = this.sampleResultList[i].sampleId;
            let resultStr = this.sampleTestResult[i].result.join(',');
            params.sampleTestResult[i].result = resultStr;
        }

        this.dataService.submitExamine(params)
            .then(() => {
                this.popupResult('examine-result.html');
            });

    }


    edit() {
        let params = {
            submId: this.submId,
            section: this.submissionData.section,
            sampleTestResult: []
        };
        this.sampleResultList = this.sampleResultList || [];
        for (let i = 0; i < this.sampleResultList.length; i++) {
            params.sampleTestResult[i] = params. sampleTestResult[i] || {};
            params.sampleTestResult[i].sampleId = this.sampleResultList[i].sampleId;
            let resultStr = this.sampleTestResult[i].result.join(',');
            params.sampleTestResult[i].result = resultStr;
        }

        this.dataService.editTest(params)
            .then(() => {
                this.popupResult('examine-result.html');
            });

    }

    countDown() {
        this.timer = this.$timeout(() => {
            if (this.counter > 1) {
                this.counter--;
                this.countDown();
            } else {
                this.admindesignsService.closeMagnificPopup();
                this.utilityService.goState('app.task.todo.personal', {pageId: 'ap1060'});
            }
        }, 1000);
    }
	
	initDateTimePicker() {
		this.admindesignsService.initDateTimePicker('bs-datetimepickers',{pickTime:true,format: 'YYYY-MM-DD HH:mm'});
	}
	/*delegateDateTimePickerAction() {
        let _self = this;
        $('body').on('focusin', '.bs-datetimepickers', function() {
            if($(this).data('initialize')) return;

            $(this).data('initialize', true);
            _self.admindesignsService.initDateTimePicker($(this),{pickTime:true,format: 'YYYY-MM-DD HH:mm'});
        });
    }*/
	
    triggerDateRang(id) {
        $("#" + id).trigger("click");
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
    'ExamineDataService',
    'CommonService'
];
