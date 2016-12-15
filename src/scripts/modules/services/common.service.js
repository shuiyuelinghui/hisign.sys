import cookie from 'js-cookie';
export default class CommonService {

    constructor(
    	ALIMS_URL,
        UtilityService,
        PAGE_ID_MAPPING

    ) {

    	this.docType = {
    		bookProxy : "1",              //委托书
        	bookAppraisal : "2",          //鉴定书
            bookAttachment: "3",          //鉴定书附件
        	bookConfirmation : "4",       //确认事项书
        	bookRefusedAcceptance : "5",  //拒绝受理回执单
        	bookInspection : "6",         //检验记录单
        	bookApproval : "7",           //鉴定文书审批表
        	bookCorrection : "8",         //鉴定文书更正函
        	bookSatisfaction : "9",       //满意度调查表
        	bookCover : "10",             //封面
        	bookDirectory : "11",         //目录
            bookDraft : "12",             //鉴定文书草稿
        	examineRecord : "100",        //检验记录
        	sampleInfo : "101",           //检材人员
            acceptCode: "102",            //受理回执编号
            sampleTag: "103",             //检材样本标签
            registration: "104",          //流转登记表
            sampleTransfer: "105",        //检材样本移交清单
            picture: "106"                //图谱
    	};


        this.defaultDocuments = {
            bookProxy : "1",       //委托书（介绍信）
            bookAccept : "2",      //鉴定受理登记表
            bookRecord : "3",      //鉴定记录
            examinePictures : "4", //检验照片
            sampleCopy : "5",      //检材/样本复制件
            examineImages : "6",   //检验图表
            other: "7"
        };

        this.bookApproval = "900";

        this.panelType = ["bookAppraisal", "bookHistory", "bookApproval", "caseAttachment", "bookAttachment", "attachment"];       

        this.utilityService = UtilityService;
        this.userId = cookie.get('userId');
        this.alimsUrl = ALIMS_URL;
        this.pageIdMapping = PAGE_ID_MAPPING;
    }

    isNeedMenu(stateName) {
        if (stateName == "app.task.todo.personal" || stateName == "app.task.todo.departments") {
            return true;
        } else {
           return false;
        }
    }

    getTitleNameByKey(titleMapping, key, pageId){

        let tmpTitleMapping = Object.assign({},titleMapping),
            pageObj = {},
            titleObj = {};

        if (!this.utilityService.isEmpty(tmpTitleMapping[pageId])) {
            pageObj = tmpTitleMapping[pageId];
        }

        titleObj = $.extend({},tmpTitleMapping['default'], pageObj);

        return titleObj[key];
    }

    //获取title object 
    getTitleObj(titleMapping, pageId){

        let tmpTitleMapping = Object.assign({},titleMapping),
            pageObj = {},
            titleObj = {};

        if (!this.utilityService.isEmpty(tmpTitleMapping[pageId])) {
            pageObj = tmpTitleMapping[pageId];
        }

        titleObj = $.extend({},tmpTitleMapping['default'], pageObj);

        return titleObj;
    }

    //判断节点名是否有testcount
    //弹窗，判断当前的url上的nodecode，判断进行跳转的路径
   	skipUrl (result) {
   		if (!this.utilityService.isEmpty(result)) {
	 		let nodeCode = result.substr(0,3)+'0';
	 		let returnStatus = 'app.task.todo.personal';
	 		this.getNodeData ()
	 			.then((response) => {
	                let nodeDatatLists = response;
	                this.isTestCount(nodeCode, nodeDatatLists, returnStatus);
	        });
   		} else {
   			console.log("result is null");
   		}
   	}
   	//获取nodedata接口
   	getNodeData () {
   		return this.utilityService.asyncGet(this.alimsUrl+'/submissions/taskMenus/' + this.userId);
   	}
   	//根据nodeCode循环nodeData,判断是否还有testcount
   	isTestCount (curentNode, nodeDataList, status) {
   		let nodeTaskCount = 0;
   		if (!this.utilityService.isEmpty(nodeDataList)) {
			for (let key=0; key < nodeDataList.nodeDatas.length; key++) {
				if (nodeDataList.nodeDatas[key].nodeCode === curentNode) {
					this.goBacks(status,nodeDataList.nodeDatas[key].nodeCode);
					break;
				} else {
					if (key == nodeDataList.nodeDatas.length-1) {
						this.goBacks(status,'0300');
					} else {
					}
				}
			}
		} else {
			console.log("nodeDataList is null");
		}
   	}
   	//点击返回的位置
   	goBacks (status, nodeCode) {
   		let pageId = this.pageIdMapping[nodeCode];
   		this.utilityService.goState(status, {pageId:pageId});
   	}
}

CommonService.$inject = ['ALIMS_URL','UtilityService','PAGE_ID_MAPPING'];