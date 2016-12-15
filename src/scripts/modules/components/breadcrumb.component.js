 import store from 'store';
 class BreadcrumbController {
    constructor(
        $scope,
        $state,
        $stateParams,
        UtilityService,
        CommonDataService
    ) {
        this.$scope = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.utilityService = UtilityService;
        this.commomDataService = CommonDataService;
		//获取存储到本地的节点数据
		this.storageData = '';
		//面包屑导航二三级显示对象
		this.titles= {};
		//面包屑是否显示
		this.isshow = false;
    }

    $onInit() {
		this.setBreadcrumb();
    }
	setBreadcrumb(){
		this.$scope.$on('$stateChangeSuccess',(event, toState, toParams, fromState, fromParams) =>{
			let currentUrlPageId = toParams.pageId;
			let currentUrlResult = toParams.result;
			if(this.utilityService.isEmpty(currentUrlPageId) && this.utilityService.isEmpty(currentUrlResult)) {
				this.isshow = false;
			}else if (typeof currentUrlPageId !== undefined  && this.utilityService.isEmpty(currentUrlResult)){
				this.isshow = false;
				sessionStorage.setItem('pageids',currentUrlPageId);
				sessionStorage.setItem('status',toState.name);
			} else {
				//TODO : 临时解决，只有从个人待办一览进来的有导航
				if (fromState.name == "app.task.todo.personal" || fromState.name == "") {
					this.isshow = true;
					this.storageData = store.get("nodeDatas");
					this.fornodeData(currentUrlResult.substr(0,3)+'0',this.storageData);
				}
			}
			this.commomDataService.stateData.pageId = sessionStorage.getItem('pageids');
			this.commomDataService.stateData.status = sessionStorage.getItem('status');
		});
	}
	//遍历nodedata，找到对应的节点名字
	fornodeData (nodecode,storageData) {
		if (!this.utilityService.isEmpty(storageData)) {
			for (let key=0; key<storageData.length; key++) {
				if (storageData[key].nodeCode === nodecode) {
					this.titles.thiredTitle = storageData[key].nodeName;
					this.titles.secoundTitle = storageData[key].nodeName+'一览';
				} else{
				}
			}
		} else{
			console.log(storageData);
		}
	}
	/*添加链接*/
	goback () {
		let pageid = sessionStorage.getItem('pageids');
		let status = sessionStorage.getItem('status');
		this.utilityService.goState(status, {pageId:pageid});
	}
}

 BreadcrumbController.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    'UtilityService',
    'CommonDataService'
 ];

const BreadcrumbComponent = {
    scope: {},
    template: `<div class="row ml25 mbn20 pv10" ng-if="breadcrumb.isshow">
                <ol class="breadcrumb">
                  <li><a ui-sref="app.home">首页</a></li>
                  <li><a href="#" ng-click="breadcrumb.goback()">{{breadcrumb.titles.secoundTitle}}</a></li>
                  <li class="active">{{breadcrumb.titles.thiredTitle}}</li>
                </ol>
		    </div>`,
    controller:BreadcrumbController,
    controllerAs: 'breadcrumb'
};
export default BreadcrumbComponent;
