export default class DocDraftController {

    constructor(
        $scope,
        $stateParams,
        $timeout,
        toaster,
        UtilityService,
        AdmindesignsService,
        CommonDataService,
        DocDratDataService,
        DocDataCenterService,
        CommonService,
        SubmitCompService,
        PDF_URL
    ) {
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.toaster = toaster;
        this.utilityService =  UtilityService;
        this.admindesignsService = AdmindesignsService;
        this.docDratDataService = DocDratDataService;
        this.dcService = DocDataCenterService;
        this.dataService = CommonDataService;
        this.commonService = CommonService;
        this.submitCompService = SubmitCompService;
        this.docListData = [];
        this.testgroupsName = "";
        this.submId = this.$stateParams.id;
        this.result = this.$stateParams.result;
        this.pdfUrl = PDF_URL;
        this.isCreate = false;

        this.idArrayModel = [];

        this.docSubmitData = {
            submId: this.submId,
            process: "",
            argument: "",
            result: ""
        }
        this.dataService.archiveInfo = {};

        /***************submitComp代码************/
        this.fileBaseUrl = './templates/apps/doc/';
        this.$scope.confirmUrl = this.fileBaseUrl + 'confirm.html';
        this.$scope.resultUrl = this.fileBaseUrl + 'result.html';
        this.$scope.resultTitle = '鉴定文书拟稿结果';
        this.configData = {};
        this.submitParams = {};
        this.counter = 5;
        this.JSON = JSON;

        this.$scope.submitData = ()=>{
            this.submitData()
        };
        this.$scope.closePopup = ()=>{
            this.closePopup();
        };


        this.dcService.fileSlideDataItem = [];
        this.dcService.fileSlideMappingDataItem = [];
        this.dcService.fileSlideDataReuseItem = [];
        this.dcService.fileSlideOtherItem = [];
        this.attachmentData = [];

        //docuemntType 对应的上传flag
        this.flagMapping = {
            4: "4",
            6: "5",
            5: "6",
            7: "7"
        };

    }

    $onInit() {
        this.buildConfigData();
        this.fetchDictionary();
        this.fetchTestRecordListData();

        this.fetchSubmissionData()
            .then(()=>{
                //是否需要获取意见模板？？
                /*this.fetchApproveTpl(0);*/
                this.getServerInfo();
                this.getNextNode();
            });

        this.listenConfirmEvent()

        //监听图片选中。 选中时,构建提交数据。
        $("#docDraft").on("click", ".ui-slide-file input", (e)=>{
            let t = $(e.target),
                con = t.parents('[data-flag]'),
                index = t.parent().parent().attr('index'),
                flag = con.attr('data-flag'),
                imageData = this.dcService[this.getFileDcService(flag)],
                isChecked = t.prop("checked"),
                type = this.utilityService.findObjKeyByValue(this.flagMapping, flag),   //根据flag获取type;
                objectId = imageData[index].objectId,
                k = "";

            //根据选中的index的图片，找到相应的数据
            for (let key in this.dictData.DocumentTypeModel) {
                if (type == this.dictData.DocumentTypeModel[key].dictKey) {
                    k = key;
                    break;
                }
            }
            
            this.isAllChecked(e, type, k);
            this.buildData(type, objectId, k, isChecked);
          
        });

        //监听图片上传成功, 图片上传成功。需要调用接口
        this.$scope.$on('fileUploadDataDocDraft', (e, resultData, fileData, flag) => {

            let submitParams = [];

            for(let key in resultData) {
                 //调用插入附件方法
                let params = {
                    type: fileData[key].imgType ? '2' : '1',
                    objectId: this.submId,
                    name: fileData[key].name,
                    path: resultData[key].id,
                    flag: flag,
                    description: '',
                    filesPrefixUuid: ''
                };

                submitParams.push(params);
            }

        
            this.insDocuments(submitParams, flag);
           
        });

        //监听删除图片
        this.$scope.$on('imagesDel', (e, resultData) => {

            //调用删除文件接口
            let params = [];
            params.push(resultData);
            if (!this.utilityService.isEmpty(params)) {
                this.delDocument(params);
            }
        });
    }

    //构建图片数据
    getFileDcService(flag) {
        switch(flag) {
            case '4':
                return 'fileSlideDataItem';
            case '5':
                return 'fileSlideMappingDataItem';
            case '6':
                return 'fileSlideDataReuseItem';
            case '7':
                return 'fileSlideOtherItem';
        }
    }

    //文书拟稿 从检验鉴定中带回的检验过程、论证、鉴定意见
    recordGt(responseObj, propertyName) {

        for (let key in responseObj) {
            if (propertyName !== 'id') {
                if (!this.utilityService.isEmpty(responseObj[key][propertyName])) {
                    this.docSubmitData[propertyName] += responseObj[key][propertyName] + ",\n";
                }
            } else {
                this.idArrayModel.push(responseObj[key][propertyName]);
            }
        }

        if (propertyName !== 'id') {
            this.docSubmitData[propertyName] = this.docSubmitData[propertyName].substring(0, this.docSubmitData[propertyName].length - 3);
        }
    }

    //获取鉴定文书列表
    fetchDocListData() {
        this.docDratDataService.fetchDocListData(this.submId)
            .then((response) => {
                this.docListData = response;
                this.count = this.docListData.length;

                if (this.serverInfo.identifyBookRule == "1") {
                    if (this.count > 0) {
                        this.isCreate = true;
                    } else {
                        this.isCreate = false;
                    }
                }
                this.configData.archiveInfo = response[0] || {};

                this.$timeout(()=>{
                    this.admindesignsService.initTooltip();
                }, 100);
            });
    }

    //获取文书类型
    fetchDictionary() {
        let params = ['BookTypeModel', 'DocumentTypeModel']
        this.docDratDataService.fetchDictionary(params)
            .then((response) => {
                this.dictData = response;
                this.getDocuments();
            });
    }

    //获取检验记录
    fetchTestRecordListData() {

        let propertyName = '',
            objPropertys= ['process', 'argument', 'result','id']; //鉴定文书拟稿页面，检验过程、论证、鉴定意见 调用接口返回数据变量

        this.docDratDataService.fetchTestRecordListData(this.submId)
            .then((response) => {
                this.testRecordListData= response;
                for (let properties in objPropertys) {
                    propertyName= objPropertys[properties];
                    this.recordGt(this.testRecordListData, propertyName);
                }
            });
    }

    //生成文书
    docSubmit() {

        for (let subKey in this.docSubmitData) {
            if (this.utilityService.isArray(this.docSubmitData[subKey])) {
                this.docSubmitData[subKey] = this.docSubmitData[subKey].join(',');
            }
        }

        let params = this.docSubmitData;
        this.docDratDataService.docSubmit(params)
            .then((response) => {
                this.fetchDocListData();
                this.bulidIframeData(this.commonService.docType.bookAppraisal);
            });
    }

    bulidIframeData(type) {
        this.utilityService.goState("book", {id: this.submId, panelType: this.commonService.panelType[0]});
    }

    bulidWordData(type) {
        this.utilityService.goState("doc", {id: this.submId, type:type, nodeCode: this.submissionData.submState, flag: 1}, true);
    }

    //提交审批
    examineSubmit() {
        let params = this.examineSubmitData;
        this.docDratDataService.examineSubmit(params)
            .then((response) => {
                this.fetchDocListData();
            });
    }

    //根据id删除鉴定文书
    docDel(docId) {
        this.admindesignsService.openConfirmDeleteMagnificPopup(this, {}, () => {
            this.docDratDataService.docDel(docId)
                .then((response) => {
                    this.toaster.pop("success", "", "删除成功");
                    this.fetchDocListData();
                });
        });
    }

    //获取委托信息
    fetchSubmissionData() {
        return this.dataService.fetchSubmissionData(this.submId)
            .then((response) => {
                this.submissionData = response;
                //this.getServerInfo();
            });
    }

    openBookPopup(url, options) {
        this.admindesignsService.openMagnificPopup("doc-draft.html", this, {});
    }

    closeMagnificPopup() {
        this.admindesignsService.closeMagnificPopup();
    }

    openFootPrintPopup() {
        this.$scope.submId = this.submId;
        this.admindesignsService.openMagnificPopup("footprint.html", this, {});
    }
    /*******************submitComp组件代码**************************/
    //构建传入组件的数据
    buildConfigData () {
        this.configData = {
            //路径地址：
            tplUrl: this.fileBaseUrl + 'submitCompTpl.html',
            //组件文案配置：
            submitName: '提交',
            approveName: '呈批',
            imageUrl: './assets/images/add_doc_opinion.png',
            tplIndex: 0,
            personTypeName: '', //人员类型
            reviewPerson: '', //鉴定复核人
            grantPerson: '', //授权人
            techPerson: '', //技术负责人
            //需要外部调接口传入组件的数据
            archiveInfo: {}, //验证组件提交
            showReviewer: true, //true:显示复核人  false:显示工作转向
            tplData: {},//意见模板数据
            testUsersData: {},//文书拟稿复核人
            grantPersonnelData: {},//授权签字人
            techPersonnelData: {},//技术负责人
            //组件需要提交的数据
            formData: {
                cnasFlag: '1',
                cmaFlag : '1'
            },
            //组件内部需要调的方法：
            goBack: ($event)=>{
                if ($event) {$event.stopPropagation();}
                this.goBack();
            }
        }
    }
    //根据nodeCode判断显示不同内容
    getNextNode() {
        let params = {
            "serverCode": this.submissionData.serverCode,
            "section": this.submissionData.section,
            "nodeCode": this.submissionData.submState,
            "noUserId": true
        };
        this.dataService.getNextNode(params)
            .then((response) => {
                let nextNodeCode = response.nodeCode;
                //nextNodeCode = '0001';
                if (nextNodeCode == '0900') {
                    this.configData.showReviewer = true;
                    this.configData.formData.auditorType = '';
                    this.fetchTestUsers();
                } else {
                    this.configData.formData.opinion = '';
                    this.configData.showReviewer = false;
                    this.configData.formData.auditorType = '1';
                    this.getBusinessPersonnel(1);
                    this.getBusinessPersonnel(2);
                }
            });
    }
    //文书拟稿复核人
    fetchTestUsers() {
        this.dataService.fetchTestUsers()
            .then((response) => {
                this.configData.testUsersData = response;
            });
    }
    //获取业务审批人员
    //type：1、授权签字人 2、技术负责人
    getBusinessPersonnel(type) {
        let params = {
            "serverCode": this.submissionData.serverCode,
            "section": this.submissionData.section,
            "type": type,
            "noUserId": true
        };
        this.dataService.getBusinessPersonnel(params)
            .then((response) => {
                if (type == 1) {
                    this.configData.grantPersonnelData = response;
                } else if (type == 2) {
                    this.configData.techPersonnelData = response;
                }
            });
    }

    //获取意见模板
    fetchApproveTpl(resultValue) {
        this.configData.formData.opinion = '';
        let params = {
            serverCode: this.submissionData.serverCode,
            nodeCode: this.submissionData.submState,
            type: resultValue
        };
        this.submitCompService.fetchApproveTpl(params)
            .then((response) => {
                if (response && response.length) {
                    this.configData.tplData = response;
                    this.configData.formData.opinion = this.configData.tplData[0].content + '\r';
                    this.configData.tplIndex = 0;
                    //TODO: 确认正确调用tooltip的时机
                    this.$timeout(() => {
                        this.admindesignsService.initTooltipster();
                        if (resultValue == 2) {
                            $(".tplScroller").scroller();
                        } else {
                            $(".tplScroller").scroller('destroy');
                        }
                    }, 0);
                } else {
                    this.configData.tplData = [];
                }
            })
    }
    //监听发出确认框事件,并弹出确认框
    listenConfirmEvent($event) {
        this.$scope.$on('approveSubmitSuccess', ()=> {
            this.admindesignsService.openMagnificPopup( './templates/modal/confirmPopup.html',this, {}, null,this.closePopup);
            this.bulidSubmitParams();
        });
    }
    //构建组件提交数据
    bulidSubmitParams() {

        switch(this.configData.formData.auditorType) {
            case '1':
                this.configData.personTypeName = '指定授权签字人：';
                this.configData.formData.auditor = this.JSON.parse(this.configData.grantPerson).userId;
                this.configData.personName = this.JSON.parse(this.configData.grantPerson).name;
                break;
            case '2':
                this.configData.personTypeName = '指定技术负责人：';
                this.configData.formData.auditor = this.JSON.parse(this.configData.techPerson).userId;
                this.configData.personName = this.JSON.parse(this.configData.techPerson).name;
                break;
            default :
                this.configData.formData.auditorType = '';
                this.configData.personTypeName = '鉴定复核人：';
                this.configData.formData.auditor = this.JSON.parse(this.configData.reviewPerson).userId;
                this.configData.personName = this.JSON.parse(this.configData.reviewPerson).name;
        }
        
        this.formData = {
            bookDocumList : {
                serverCode: this.submissionData.serverCode,
                submId: this.submId,
                documentTypeList: []
            }
        };

        this.submitParams = Object.assign({}, {
            submId: this.submId,
            section: this.submissionData.section,
            nodeCode: this.submissionData.submState
        }, this.configData.formData, this.formData);


        for (let key = this.attachmentData.length - 1 ; key >= 0; key--) {

            if (typeof this.attachmentData[key] == 'undefined' || this.attachmentData[key].objectIds.length == 0) {
                this.attachmentData.splice(key, 1);
            }
        }

        this.submitParams.bookDocumList.documentTypeList = this.attachmentData;
        this.submitParams.result = this.result;
    }

    //构建提交的附件数据
    //k:type的当前行 
    buildData(type, objectId, k, isChecked) {

        let  objectIds= [];

        if (typeof this.attachmentData[k] != 'undefined') {
            objectIds = this.attachmentData[k].objectIds;
        }

        //选中状态
        if (isChecked) {
            objectIds.push(objectId);
        } else {

            let index = this.utilityService.findArrayIndexByValue(objectIds, objectId);
            objectIds.splice(index);
        }

        //数组过滤
        objectIds = this.utilityService.filterArr(objectIds);

        //循环页面勾选的数据
        let obj = {
            documentType: type,
            objectIds : objectIds
        }

        this.attachmentData[k] = obj;
    }


    selectAll(e, type, k) {
        let con = $(e.target).parents(".chk").eq(0),
            cb = $('input[type="checkbox"]', con);

            cb.prop("checked", $(e.target).prop("checked"));

        //构建数据
        for (let i = 0; i < this.defaultDocuments[type].length; i++) {
            this.buildData(type, this.defaultDocuments[type][i].objectId, k, $(e.target).prop("checked"));
        } 
    }

    isAllChecked(e) {

        let con = $(e.target).parents(".chk").eq(0),
            outerCb = con.find('input[type="checkbox"]').eq(0),
            cb = con.find('input[type="checkbox"]').not(':first');

        if (!con.find('input[type="checkbox"]:not(:first):not(:checked)').length) {
            outerCb.prop('checked', true);
        } else {
            outerCb.prop('checked', false);
        }
    }


    //提交数据
    submitData() {
        this.submitCompService.docSubmit(this.submitParams)
            .then((response) => {
                this.closePopup();
                this.buildDocIframe(response);
                this.admindesignsService.openMagnificPopup( './templates/modal/resultPopup.html',this, {}, this.countDown, this.cancelTimeout);
            });
    }

    //跳转不同节点
    goState(state, pageId) {
        state = state ? state : 'app.task.todo.personal';
        this.utilityService.goState(state, pageId);
    }

    goBack() {
        this.goState('app.task.todo.personal',{pageId:'ap1080'});
    }

    //关闭弹窗
    closePopup() {
        this.admindesignsService.closeMagnificPopup();
    }

    //倒计时
    countDown() {
        this.timer = this.$timeout(() => {
            if (this.counter > 1) {
                this.counter--;
                this.countDown();
            } else {
                this.closePopup();
//              this.goBack();
				this.commonService.skipUrl(this.result);
            }
        }, 1000);
    }

    //取消计时器
    cancelTimeout () {
        if (this.timer) {
            this.$timeout.cancel(this.timer);
            this.timer = null;
            this.hideTime = true;
        }
    }

    //打印相关动作
    doPrint(type) {
        this.utilityService.goState("doc", {id: this.submId, type:type, nodeCode: this.submissionData.submState, flag: 1}, true);
        this.cancelTimeout();
    }

    //获取附件
    getDocuments() {
        for(let val of this.dictData.DocumentTypeModel) {
            this.getDefaultDocuments(val.dictKey);
            this.flag = val.dictKey;
        }
    }

    //获取复制值
    getDefaultDocuments(type) {

        this.defaultDocuments = [];

        let params = {
            submId: this.submId,
            documentType: type
        };
        params.noUserId = true;
        return this.dataService.getDefaultDocuments(params)
            .then(response => {
                this.defaultDocuments[type] = response;

                if (this.isShowImage(type) != "-1") {
                    this.buildImagesData(response);
                }

            });
    }

    //根据documentType 判断是否是图片
    isShowImage(documentType) {
        let images = [this.commonService.defaultDocuments.examinePictures, 
                      this.commonService.defaultDocuments.sampleCopy, 
                      this.commonService.defaultDocuments.examineImages,
                      this.commonService.defaultDocuments.other
                      ];
        return images.indexOf(documentType);
    }

    //根据documentType 判断是否是文字
    isShowText(documentType) {
        let Text = [this.commonService.defaultDocuments.bookProxy, 
                      this.commonService.defaultDocuments.bookAccept, 
                      this.commonService.defaultDocuments.bookRecord
                      ];
        return Text.indexOf(documentType);
    }

    //构建图片的数据
    buildImagesData(images) {

        for (let image of images) {

            let item = {
                type: image.type,
                objectId: image.objectId,
                id: image.id,
                name: image.name,
                path: image.path,
                flag: image.flag
            };

            this.dcService[this.getFileDcService(image.flag)].push(item);
        }
    }


    //根据documentType 获取上传图片的flag
    getFlag(documentType) {

        let flag = this.flagMapping[documentType];

        return flag ;
    }

    //删除附件  
    delDocument(params) {
        this.dataService.delDocuments(params)
        .then((response) => {
            this.toaster.pop("success", "", "删除成功");
        });
    }

    //提交附件
    insDocuments(params, flag) {

        this.dataService.insDocuments(params)
        .then((response) => {

            let imageData = this.dcService[this.getFileDcService(flag)],
                index = imageData.length - 1;
            
            //附件提交成功后, 将相应的数据放到dcService里。文书拟稿提交时用
            imageData[index].objectId =  response[0].id;
            imageData[index].id = response[0].id;
        });
    }

    //获取鉴定机构信息
    getServerInfo() {
        this.dataService.getServerInfo(this.submissionData.serverCode)
            .then((response) => {
                this.serverInfo = response;

                if (!this.utilityService.isEmpty(this.serverInfo.aptitudes)) {
                    this.configData.isShowCnas = this.serverInfo.aptitudes.toUpperCase().indexOf("CNAS") !== -1;
                    this.configData.isShowCma = this.serverInfo.aptitudes.toUpperCase().indexOf("CMA") !== -1;
                }
               
                this.fetchDocListData();
            })
    }

    buildDocIframe(data) {
        let docFrag = $(document.createDocumentFragment()),
        idAry = []

        let params = {
                flag: '2',
                type: '7',
                bookType: '',
                tempalteId: '',
                filter: this.submId,
                identifyCategoryCode: this.submissionData.identifyCategory,
                uuid: data.approvalFileUUID,
                serverCode: this.submissionData.serverCode,
                section: this.submissionData.section
            },
            source = this.pdfUrl+'/bookUpload/uploadFile.html?'+$.param(params),
            iframe = $('<iframe width="0" height="0" src="'+source+'"></iframe>');

        docFrag.append(iframe);

        $('body').append(docFrag);
        return idAry;
    }

}

DocDraftController.$inject = [
    '$scope',
    '$stateParams',
    '$timeout',
    'toaster',
    'UtilityService',
    'AdmindesignsService',
    'CommonDataService',
    'DocDratDataService',
    'DocDataCenterService',
    'CommonService',
    'SubmitCompService',
    'PDF_URL'
];
