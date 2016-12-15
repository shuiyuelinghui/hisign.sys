export default class BookController {
    constructor(
        $scope,
        $timeout,
        $state,
        $stateParams,
        $sce,
        FILE_URL,
        PDF_URL,
        PdfJsService,
        DocDratDataService,
        CommonDataService,
        AdmindesignsService,
        UtilityService,
        CommonService,
        BOOK_MAPPING,
        BookDataCenterService
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$sce = $sce;

        this.fileUrl = FILE_URL;
        this.pdfUrl = PDF_URL;
        this.dataService = CommonDataService;
        this.docDataService = DocDratDataService;
        this.dcService = BookDataCenterService;
        this.PdfJsService = PdfJsService;
        this.commonService = CommonService;
        this.utilityService = UtilityService;
        this.adminDesignsService = AdmindesignsService;

        this.stateName = this.$state.current.name;
        this.bookMapping = BOOK_MAPPING;

        this.docListData = [];    
        this.currentType = "";

        //控制显示、隐藏 ,点击的时候与点击事件绑定的值
        this.docMenuShow = true;
        this.resourceMenuShow = false;
        this.timestamp = Date.now();

        this.dcService.fileSlideDataItem = [];
        this.dcService.fileSlideMappingDataItem = [];
        this.dcService.fileSlideDataReuseItem = [];
        this.dcService.fileSlideOtherItem = [];

    }

    $onInit() {

        //默认情况, 选择第一个鉴定文书panel
        if (typeof this.panelType == 'undefined') {
            this.panelType = this.commonService.panelType[0];
        }

        //根据panel获取构建doc的type参数
        this.type = this.getTypeByPanelType();

        //延迟初始化， panel、tooltip
    	this.$timeout(() =>{
    		this.adminDesignsService.initAdminPanel();
            //this.adminDesignsService.initTooltipster();
    	}, 5000);
    	   
        //判断页面展示数据类型 pdf or doc
        this.getPageStatus(this.panelType);

        //获取基本数据
        this.fetchSubmissionData();

        //获取附件信息
        this.getDocuments();

        this.$scope.$on('rightSidebarChange', (e, status) => {
            if(status === 'shrink') {
                this.$timeout(() => this.$scope.$apply(() => {
                    this.docMenuShow = true;
                    this.resourceMenuShow = false;
                }));
            } else if(status === 'expand') {
                this.$timeout(() => this.$scope.$apply(() => {
                    this.docMenuShow = false;
                    this.resourceMenuShow = true;
                }));
            }
        });
    }

    fetchSubmissionData() {
        return this.dataService.fetchSubmissionData(this.id)
            .then(response => {
                this.submInfo = response;

                //鉴定文书信息
                this.fetchDocListData();

                //文书审批记录
                this.fetchBookCircualtionData();
            });
    }

    //获取鉴定文书信息
    fetchDocListData() {
        return this.docDataService.fetchDocListData(this.id)
            .then(response => {
                this.docListData = response;

                if (response.length != 0) {
                    
                    this.fetchBookHistory(response[0].id, this.type);

                    //默认选中的时候，调用获取content信息
                    if (this.panelType == "bookAppraisal" || this.panelType == "bookAttachment") {
                        this.currentDocId = response[0].id;
                        this.getPageContent(this.panelType, this.type, this.currentDocId, response[0].path, response[0].type);
                    }
                }
            });
    }


    getTypeByPanelType() {

        let type = "";
        if (this.panelType == "bookAppraisal" || this.panelType == "bookHistory") {
            type = this.commonService.docType.bookAppraisal;
        } else if (this.panelType == "bookApproval") {
            type = this.commonService.docType.bookApproval;
        } else if (this.panelType == "bookAttachment") {
            type = this.commonService.docType.bookAttachment;
        }

        return type;
    }

    fetchBookHistory(bookId) {
        return this.docDataService.fetchBookHistoryData(bookId)
            .then(response => {
                this.docHistoryData = response;

                if (this.panelType == "bookHistory") {
                    this.currentDocId = response[0].id;
                    this.getPageContent(this.panelType, this.type, response[0].id, response[0].path, response[0].type);
                }
            });
    }

    fetchBookCircualtionData() {
        return this.docDataService.fetchBookCircualtionData(this.id)
            .then(response => {
                this.recordsData = response;
            });
    }

    toggleDocMenu() {
		this.docMenuShow = !this.docMenuShow;
    }

    //构建pageoffice 方法
    bulidIframeSource(id, type, bookType) {
        let params = {
                    filter: id,
                    type: type,
                    tempalteId: this.tempalteId,
                    bookType: bookType,
                    identifyCategoryCode: this.submInfo.identifyCategory,
                    serverCode: this.submInfo.serverCode,
                    section: this.submInfo.section,
                    uuid: "",
                    flag: "1"
                };

        this.source = this.$sce.trustAsResourceUrl(this.pdfUrl+'/bookUpload/uploadFile.html?' + $.param(params));
    }


    createPdf(id, type, path) {
                
        this.currentType = type;
        this.currentDocId = id;

        let params =
            {
                "objectId": id,
                "type": type,
                "path": path
            },
            url = "";

        if (type == this.commonService.defaultDocuments.bookProxy) {
            //延迟初始化
            this.$timeout(() =>{
                url = this.getFileUrl(path);
                this.PdfJsService.showPdf(url);
            });
           
            return ;
        }

        params.noUserId = true;
        this.dataService.createPdf(params)
            .then((response) => {
                url = this.getFileUrl(response.path);
                this.PdfJsService.showPdf(url);
            });
    }

    //获取案件附件
    getDocuments() {
        return this.dataService.getDocuments(this.id)
            .then(response => {
                this.documentList = response;

                //审批单
                this.getDefaultDocuments(this.commonService.bookApproval);

                //如果没有上传案件附件、获取默认档案
                if (this.utilityService.isEmpty(this.documentList.documentTypeList)) {
                    let defaultDocuments = this.commonService.defaultDocuments;

                    for(let key in defaultDocuments) {
                        this.getDefaultDocuments(defaultDocuments[key]);
                    }
                }

            });
    }


    getDefaultDocuments(type) {
        this.defaultDocuments = [];

        let params = {
            submId: this.id,
            documentType: type
        };
        params.noUserId = true;
        return this.dataService.getDefaultDocuments(params)
            .then(response => {
                this.defaultDocuments[type] = response;

                //如果默认是审批单、获取内容
                if (this.panelType == this.commonService.bookApproval) {
                    this.getPageContent(this.panelType, this.commonService.docType.bookApproval, this.id);
                }
            });
    }

    getImage(type) {
        this.type = type;
    }
    
    getPageStatus(panelType) {

        let currentState = this.$state.current.name;
        
        if (currentState == "book") {
            this.noMenu = true;
        } else {
            this.noMenu = false;
        }

        this.pageType = this.bookMapping(this.noMenu, panelType);

    }

    //构建页面需要的数据
    getPageContent(panelType, type, id, path, bookType, flag) {

        this.currentDocId = id;
        this.currentDocType = type;
        this.panelType = panelType;

        if (panelType == "bookAppraisal") {
            this.tooltipName = "鉴定文书";
        } else if (panelType == "bookApproval") {
            this.tooltipName = "鉴定文书审批单";
        } else if (panelType == "bookAttachment") {
            this.tooltipName = "附件";
        } else if (panelType == "bookHistory") {
            this.tooltipName = "审批稿";
        }

        //案件附件的时候, 图片
        if (panelType == "attachment" && (type == "4" || type == "5" || type == "6"|| type == "7")) {
            return;
        }

        this.getPageStatus(panelType);

        if (this.pageType == "doc") {
            this.currentType = "";
            this.bulidIframeSource(id, type, bookType);
        } else if (this.pageType == "pdf") {
            if (this.utilityService.isEmpty(path)) {
                this.noPath = true;
            } else {
                this.createPdf(id, type, path);
                this.noPath = false;
            }
        }

        this.adminDesignsService.scrollTop();
    }

    openFootPrintPopup() {
        this.$scope.submId = this.id;
        this.adminDesignsService.openMagnificPopup("footprint.html", this, {});
    }

    getImageData(images) {

        //非图片 不做处理
        if (this.utilityService.isEmpty(images[0].flag)) {
            return;
        }

        this.noPath = false;

        this.panelType = this.commonService.panelType[5];

      
        let imageArr = [];

        this.getPageStatus("5");

        this.flag = images[0].flag;

        for (let image of images) {

            let item = {
                type: image.type,
                objectId: image.objectId,
                id: image.id,
                name: image.name,
                path: image.path,
                flag: image.flag
            };
            imageArr.push(item);
            switch(image.flag) {
                case '4':
                    this.title = "检验照片";
                    this.dcService.fileSlideDataItem = imageArr;
                    
                    break;
                case '5':
                    this.title = "检验图表";
                    this.dcService.fileSlideMappingDataItem = imageArr;
                    break;
                case '6':
                    this.title = "检材/样本复制件";
                    this.dcService.fileSlideDataReuseItem = imageArr;
                    break;
                case '7':
                    this.title = "其他";
                    this.dcService.fileSlideOtherItem = imageArr;
                    break;
             }
        }

        imageArr = [];

        this.$scope.$broadcast('fileSlideDataPreparedRo');

        this.adminDesignsService.scrollTop();
    }

    getFileUrl(id) {
        return this.fileUrl+'/'+id+'/download';
    }

    goBack() {
        history.back(-1);
    }

    edit() {
        this.utilityService.goState("book", {id: this.id, panelType: this.panelType});
    }

}

BookController.$inject = [
    '$scope',
    '$timeout',
    '$state',
    '$stateParams',
    '$sce',
    'FILE_URL',
    'PDF_URL',
    'PdfJsService',
    'DocDratDataService',
    'CommonDataService',
    'AdmindesignsService',
    'UtilityService',
    'CommonService',
    'BOOK_MAPPING',
    'BookDataCenterService'
];