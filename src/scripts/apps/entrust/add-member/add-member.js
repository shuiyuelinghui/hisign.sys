
export default class AddMemberController {

    constructor(
        $scope,
        $compile,
        $timeout,
        toaster,
        AdmindesignsService,
        EntrustAcceptDataCenterService,
        EntrustAcceptActionService,
        DataTableService,
        PatternService,
        UtilityService,
        EntrustAcceptUtilService
    ) {
        this.$scope = $scope;
        this.$compile =$compile;
        this.$timeout = $timeout;
        this.toaster = toaster;
        this.admindesignsService = AdmindesignsService;
        this.dcService = EntrustAcceptDataCenterService;
        this.actionService = EntrustAcceptActionService;
        this.dtService = DataTableService;

        this.utilityService = UtilityService;
        this.entrustAcceptUtilService = EntrustAcceptUtilService;
        this.idPattern = PatternService.isId();
        this.integerPattern = PatternService.isPositiveInteger();

        this.dtConfig;
        this.dictData = {};
        
    }

    $onInit() {
        this.dtConfig = this.entrustAcceptUtilService.getDtConfig();
    }

    addMember(addNew) {
        let dtData;
        this.dtService.addToSubmitData('memberList');
        dtData = this.dtService.transformData(this.dtConfig.dtMemberListKey, this.dcService.memberList, this.dcService.dictMapping, 'memberList');
        this.dtService.renderDt('dt_member', this.dtConfig.dtMemberListTitle, dtData, this.$scope, 2);
        this.toaster.pop('success', null, '添加被鉴定人员信息成功');
        this.dcService.memberListItem = {};

        this.$scope.$emit('memberListAdded');

        if(addNew) {
            this.$scope.$emit('magnificPopupReopen', 'add-member');
        }
        this.closeMagnificPopup();
    }

    closeMagnificPopup() {
        this.admindesignsService.closeMagnificPopup();
    }
}

AddMemberController.$inject = [
    '$scope',
    '$compile',
    '$timeout',
    'toaster',
    'AdmindesignsService',
    'EntrustAcceptDataCenterService',
    'EntrustAcceptActionService',
    'DataTableService',
    'PatternService',
    'UtilityService',
    'EntrustAcceptUtilService'
];
