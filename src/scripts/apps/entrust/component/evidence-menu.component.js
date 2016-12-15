const EvidenceMenuComponent = {
    template: `
        <div class="evidence-action-menu">
            <span class="operate"  ng-class="{'operatehide':$ctrl.status === 'expand','operatedisplay':$ctrl.status === 'shrink'}">操作：</span>
            <ul>
                <li 
                    ng-click="$ctrl.pickup($ctrl.index)"
                ><span class="fa fa-eyedropper mr5"></span>提取</li>
                <li 
                    ng-click="$ctrl.edit()"
                    ng-show="$ctrl.status === 'expand'"
                ><span class="fa fa-edit mr5"></span>编辑</li>
                <li 
                    ng-click="$ctrl.copy()"
                    ng-show="$ctrl.status === 'expand'"
                ><span class="fa fa-copy mr5"></span>复制</li>
                <li 
                	ng-click="$ctrl.delete()"
                    ng-show="$ctrl.status === 'expand'"
                    ng-if="$ctrl.dcs.activeState !== 'app.accept'"
                ><span class="fa fa-trash-o mr5"></span>删除</li>
                <li 
                    ng-click="$ctrl.moveUp()"
                    ng-show="$ctrl.status === 'expand'"
                ><span class="fa fa-level-up mr5"></span>上移</li>
                <li 
                    ng-click="$ctrl.moveDown()"
                    ng-show="$ctrl.status === 'expand'"
                ><span class="fa fa-level-down mr5"></span>下移</li>
                <li
                    ng-click="$ctrl.toggle()"
                >
                    <span 
                        class="fa" 
                        ng-class="{'fa-caret-right':$ctrl.status === 'expand','fa-caret-left':$ctrl.status === 'shrink'}"
                    ></span>
                </li>
            </ul> 
        </div>    
    `,
    bindings: {
        context: '<',
        index: '<'
    },
    controller: function(EntrustAcceptDataCenterService) {
        this.dcs = EntrustAcceptDataCenterService;
        this.status = 'shrink';

        this.expand = () => {
            this.status = 'expand';
        };

        this.shrink = () => {
            this.status = 'shrink';
        };

        this.toggle = () => {
            if(this.status === 'expand') {
                this.status = 'shrink';
            } else if(this.status === 'shrink') {
                this.status = 'expand';
            }
        };

        this.pickup = () => {
            this.context.openPickupModal(this.index);
            this.status = 'shrink';
        };

        this.edit = () => {
            this.context.editEvidence(this.index);
            this.status = 'shrink';
        };

        this.copy = () => {
            this.context.copyEvidence(this.index);
            this.status = 'shrink';
        };

        this.delete = () => {
            this.context.deleteEvidence(this.index);
            this.status = 'shrink';
        };

        this.moveUp = () => {
            this.context.moveUpEvidence(this.index);
            this.status = 'shrink';
        };

        this.moveDown = () => {
            this.context.moveDownEvidence(this.index);
            this.status = 'shrink';
        };
    }
};

EvidenceMenuComponent.$inject = [
	'EntrustAcceptDataCenterService'
];


export default EvidenceMenuComponent;
