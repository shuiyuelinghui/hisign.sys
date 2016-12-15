export default class OrgController {
    constructor(
        $scope,
        CommonDataService,
        AdmindesignsService
    ) {
        this.$scope = $scope;
        this.dataService = CommonDataService;
        this.admindesignsService = AdmindesignsService;

        this.searchText = '';
        this.zTreeModal;
        this.zTreeData = [];
        this.zTreeSelectedNode = {};
    }

    $onInit() {}

    openMagnificPopup(url, options) {
        this.zTreeSelectedNode = null;
        this.searchText = '';
        this.admindesignsService.openMagnificPopup(url, this, options, this.onPopUpLoaded);
    }

    closeMagnificPopup() {
        this.admindesignsService.closeMagnificPopup();
    }

    onPopUpLoaded() {
        this.admindesignsService.initNProgress("#modal_ztree .panel-body");
        this.fetchZtreeData();
    }

    handleZTreeNodeClick(event, treeId, treeNode) {

        var zTree = $.fn.zTree.getZTreeObj("ztree_container");

        zTree.checkNode(treeNode, true);

        this.$scope.$apply(() => {

            this.zTreeSelectedNode = treeNode;
        });
    }

    fetchZtreeData() {
        NProgress.start();
        return this.dataService.fetchZtreeData()
            .then(response => {
                NProgress.done(true);
                this.zTreeData = response;

                this.admindesignsService.initZTree('ztree_container', this.zTreeData, {
                    callback: {
                        onClick: this.handleZTreeNodeClick.bind(this),
                        onCheck: this.handleZTreeNodeClick.bind(this)
                    }
                });
            });
    }

    search() {
        let treeObj = $.fn.zTree.getZTreeObj('ztree_container'),
            nodes = treeObj.getNodes(),
            val = this.searchText,
            i, len;

        function filter(node) {
            let firstLetter = node.firstLetter ? node.firstLetter.indexOf(val) >= 0 : false,
                pinyin = node.pinyin ? node.pinyin.indexOf(val) >= 0 : false,
                name = node.name.indexOf(val) >= 0;

            return firstLetter || pinyin || name;
        }

        treeObj.hideNodes(nodes);
        nodes = treeObj.getNodesByFilter(filter);

        for(i = 0, len = nodes.length; i < len; i++) {
            let pNode = nodes[i].getParentNode();
            while(pNode) {
                treeObj.showNode(pNode);
                pNode = pNode.getParentNode();
            }
            treeObj.showNode(nodes[i]);
        }
    }

    onSearchEnter(e) {
        if(e.keyCode === 13) this.search();
    }

    handleConfirm() {
        this.$scope.$emit('zTreeSelectedConfirm', this.zTreeSelectedNode);
        this.closeMagnificPopup();
    }
}

OrgController.$inject = [
    '$scope',
    'CommonDataService',
    'AdmindesignsService'
];