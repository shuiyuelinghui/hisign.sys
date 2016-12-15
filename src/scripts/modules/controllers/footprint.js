export default class FootPrintController {
    constructor(
        $scope,
        $timeout,
        $filter,
        CommonDataService,
        UtilityService,
        AdmindesignsService,
        FOOT_PRINT_MAPPING,
        FILE_URL
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.dataService = CommonDataService;
        this.utilityService = UtilityService;
        this.admindesignsService = AdmindesignsService;
        this.footprintMapping = FOOT_PRINT_MAPPING;
        this.fileUrl = FILE_URL;
    }

    $onInit() {
        this.fetchFootPrintData(this.id);

    }

   
    fetchFootPrintData(submId) {
        return this.dataService.fetchFootPrintData(submId)
            .then(response => {
                this.footPrintData = response;
				
				
				for (var j=0; j<this.footPrintData.length; j++) {
					
					var obj = this.footPrintData[j];
					for (let key in obj) {
						if (this.utilityService.isDate(key)) {
		                    obj[key]
		                    = this.utilityService.formatDate(obj[key],"YYYY-MM-DD HH:mm:ss");
		               }
					}
                    this.footPrintData[j] = obj;
				}
                this.renderMaterial();
                this.$timeout(() => {
                    this.admindesignsService.initPanelScroller();
                }, 200);

            });
    }

    renderMaterial() {
        this.footPrintData.forEach((item) => {
            let material = this.footprintMapping[item.submState];
            item.material = material
        });
    }

    goToState(type, result) {

        this.utilityService.goState("doc", {id: this.id, type:type, nodeCode: result, flag: 1}, true);
    }

    //根据节点 执行不同动作
    goAction(state) {
        //跳转
        if(true) {
            this.goToState(state);
        }
        //打印委托书
        if(true) {
            this.printSubmBook(e);
        }
    }

    //打印委托书
    printSubmBook() {
        let params =
            {
                "submId": this.id,
                "type": "1",
                "fileFormat":"PDF"
            },
            url = "";
        this.dataService.getPdfPath(params)
            .then((response) => {

                let pdfFilePath = this.fileUrl + "/" + response.path + "/download";
                window.open("pdf_viewer.html?file=" + pdfFilePath + '&title=鉴定委托书','_blank');

            });
    }


}

FootPrintController.$inject = [
    '$scope',
    '$timeout',
    '$filter',
    'CommonDataService',
    'UtilityService',
    'AdmindesignsService',
    'FOOT_PRINT_MAPPING',
    'FILE_URL'
];