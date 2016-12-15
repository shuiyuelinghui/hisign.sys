
export default class EvidenceInfoController {

    constructor(
        $scope,
        $timeout,
        AdmindesignsService,
        EntrustAcceptDataCenterService,
        EntrustAcceptRenderService
    ) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.admindesignsService = AdmindesignsService;
        this.dcService = EntrustAcceptDataCenterService;
        this.renderService = EntrustAcceptRenderService;

        this.baseTplUrl = './templates/apps/entrust/modal/';
        this.activePickupIndex = 0;
    }

    $onInit() {
        this.$scope.$on('magnificPopupReopen', (e, type, index) => {
            let fn;
            if(type === 'add-evidence') {
                fn = this.openAddEvidenceModal;
            } else if(type === 'add-extract') {
                fn = this.openPickupModal;
            }
            this.$timeout(() => {
                fn.bind(this)(index);
            });
        });
        this.$timeout(() => {
            this.dcService.evidenceForm = this.form;
        });
    }

    openPickupModal(index) {
        this.activePickupIndex = index;
        this.admindesignsService.openMagnificPopup(
            this.baseTplUrl+'extract-evidence.html',
            this,
            {},
            null,
            this.handlePopupClosed
        );
    }

    openAddEvidenceModal() {
        this.admindesignsService.openMagnificPopup(
            this.baseTplUrl+'add-evidence.html',
            this,
            {},
            null,
            this.handlePopupClosed
        );
    }

    destroyDt(index) {
        let dt = $('#dt_evidence_'+index),
            dtWrapper = $('#dt_evidence_'+index+'_wrapper');

        if(dtWrapper.length) {
            dt.DataTable().destroy();
            dt.html('');
        }
    }

    addEvidence() {
        this.dcService.evidenceListItem = {};
        this.dcService.evidenceIndex = -1;
        this.openAddEvidenceModal();
    }

    editEvidence(index) {
        let dcs = this.dcService;
        dcs.mode = 'edit';
        dcs.evidenceIndex = index;
        dcs.evidenceListItem = Object.assign({}, this.dcService.evidenceList[index]);
        dcs.sampleId = this.dcService.evidenceList[index].id;
        dcs.fileSlideDataItem = this.dcService.evidenceList[index].documentList;
        this.openAddEvidenceModal();
    }

    copyEvidence(index) {

        this.dcService.evidenceList.splice(index, 0, Object.assign({}, this.dcService.evidenceList[index]));

        this.renderService.addSampleList(this.$scope);
    }

    deleteEvidence(index) {
        this.admindesignsService.openConfirmDeleteMagnificPopup(this, {}, () => {
            this.$scope.$apply(() => {
                this.dcService.evidenceList.splice(index, 1);
            });
            this.renderService.addSampleList(this.$scope);
        });
    }

    moveUpEvidence(index) {
        if(index <= 0) return;
        let eviList = this.dcService.evidenceList,
            t = Object.assign({}, eviList[index]);

        this.destroyDt(index-1);
        this.destroyDt(index);

        eviList.splice(index, 1);
        eviList.splice(index-1, 0, t);

        this.renderService.addSampleList(this.$scope);
    }

    moveDownEvidence(index) {
        let eviList = this.dcService.evidenceList,
            t = Object.assign({}, eviList[index+1]);

        if(index >= eviList.length-1) return;
        
        this.destroyDt(index);
        this.destroyDt(index+1);

        eviList.splice(index+1, 1);
        eviList.splice(index, 0, t);

        this.renderService.addSampleList(this.$scope);
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
    }
}

EvidenceInfoController.$inject = [
    '$scope',
    '$timeout',
    'AdmindesignsService',
    'EntrustAcceptDataCenterService',
    'EntrustAcceptRenderService'
];