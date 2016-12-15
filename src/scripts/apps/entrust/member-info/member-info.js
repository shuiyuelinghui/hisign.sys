
export default class MemberInfoController {

    constructor(
        $scope,
        $timeout,
        toaster,
        AdmindesignsService,
        EntrustAcceptDataCenterService
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.toaster = toaster;
        this.admindesignsService = AdmindesignsService;
        this.dcService = EntrustAcceptDataCenterService;

        this.baseTplUrl = './templates/apps/entrust/modal/';
    }

    $onInit() {
        this.$scope.$on('magnificPopupReopen', (e, type) => {
            let fn;
            if(type === 'add-member') {
                fn = this.openAddMemberModal;
            } else if(type === 'add-dna') {
                fn = this.openAddDNAMemberModal;
            }
            this.$timeout(() => {
                fn.bind(this)();
            });
        });
    }

    openAddMemberModal() {
        this.admindesignsService.openMagnificPopup(
            this.baseTplUrl+'add-member.html',
            this,
            {},
            null,
            this.handlePopupClosed
        );
    }

    openAddDNAMemberModal(memberType) {
        this.admindesignsService.openMagnificPopup(
            this.baseTplUrl+'add-dna.html',
            this,
            {},
            null,
            this.handlePopupClosed
        );
        this.dcService.activeMemberType = memberType;
    }

    handlePopupClosed() {
        let dcs = this.dcService;

        dcs.professionList = [];
        dcs.mode = 'display';
        dcs.editKey = null;
        dcs.editSubKey = null;
        dcs.editOuterIndex = null;

        dcs.evidenceListItem = {};
        dcs.sampleListItem = {};
        dcs.sampleDNAListItem = {};
        dcs.memberListItem = {};
        dcs.memberDNAListItem = {};
        dcs.relativesRelationListItem = {};
        dcs.relativesListItem = {};
        dcs.nameLessCorpseListItem = {};
        dcs.fileSlideDataItem = [];
        dcs.sampleId = null;
        dcs.activeMemberType = null;
    }

    deleteMember(tableId, key) {
        this.admindesignsService.openConfirmDeleteMagnificPopup(this, {}, () => {
            let t = $('#'+tableId);
            t.DataTable().destroy();
            t.html('');

            this.$scope.$apply(() => {
                this.dcService[key] = [];
            });

            this.toaster.pop('success', null, '删除人员信息成功');
        });
    }
}

MemberInfoController.$inject = [
    '$scope',
    '$timeout',
    'toaster',
    'AdmindesignsService',
    'EntrustAcceptDataCenterService'
];