export default class EntrustAcceptRenderService {

    constructor(
        UtilityService,
        DataTableService,
        EntrustAcceptDataCenterService,
        EntrustAcceptUtilService
    ) {

        this.utilityService = UtilityService;
        this.dtService = DataTableService;
        this.dcService = EntrustAcceptDataCenterService;
        this.entrustAcceptUtilService = EntrustAcceptUtilService;

        this.dtConfig;
    }

    addSampleList(scope) {
        let key = this.dtConfig.dtSampleListKey,
            title = this.dtConfig.dtSampleListTitle;

        for(let i = 0, len = this.dcService.evidenceList.length; i < len; i++) {
            let dtData,
                dtSampleData,
                dtSampleDNAData;

            if(
                this.utilityService.isEmpty(this.dcService.evidenceList[i].sampleList) &&
                this.utilityService.isEmpty(this.dcService.evidenceList[i].sampleDNAList)
            ) {
                continue;
            }

            dtSampleData = this.dcService.evidenceList[i].sampleList || [];
            dtSampleDNAData = this.dcService.evidenceList[i].sampleDNAList || [];
            dtData = dtSampleData.concat(dtSampleDNAData);

            if(!dtData.length) {
                // $('#dt_evidence_'+i).detach();
                continue;
            }

            dtData = this.dtService.transformData(key, dtData, this.dcService.dictMapping, 'evidenceList', i);
            this.dtService.renderDt('dt_evidence_'+i, title, dtData, scope);
        }
    }

    addSampleListItem(index, scope) {
        let key = this.dtConfig.dtSampleListKey,
            title = this.dtConfig.dtSampleListTitle,
            evidenceListItem = this.dcService.evidenceList[index],
            dtData,
            dtSampleData,
            dtSampleDNAData;

        dtSampleData = evidenceListItem.sampleList || [];
        dtSampleDNAData = evidenceListItem.sampleDNAList || [];
        dtData = dtSampleData.concat(dtSampleDNAData);

        // if(!dtData.length) return;

        dtData = this.dtService.transformData(key, dtData, this.dcService.dictMapping, 'evidenceList', index);
        this.dtService.renderDt('dt_evidence_'+index, title, dtData, scope);
    }

    addMemberList(scope) {
        if(!this.dcService.memberList.length) return;
        let key = this.dtConfig.dtMemberListKey,
            title = this.dtConfig.dtMemberListTitle,
            dtData = this.dtService.transformData(key, this.dcService.memberList, this.dcService.dictMapping, 'memberList');

        // if(!dtData.length) return;

        this.dtService.renderDt('dt_member', title, dtData, scope);
    }

    addMemberDNAList(scope) {
        if(!this.dcService.memberDNAList.length) return;
        let key = this.dtConfig.dtMemberDNAListKey,
            title = this.dtConfig.dtMemberDNAListTitle,
            dtData = this.dtService.transformData(key, this.dcService.memberDNAList, this.dcService.dictMapping, 'memberDNAList');

        // if(!dtData.length) return;

        this.dtService.renderDt('dt_member_dna', title, dtData, scope);
    }

    addRelativesRelationList(scope) {
        if(!this.dcService.relativesRelationList.length) return;
        let key = this.dtConfig.dtRelativesRelationListKey,
            title = this.dtConfig.dtRelativesRelationListTitle,
            dtData = [],
            i, len;

        for(i = 0, len = this.dcService.relativesRelationList.length; i < len; i++) {
            dtData = dtData.concat(this.dcService.relativesRelationList[i]['relativesList']);
        }

        // if(!dtData.length) return;

        dtData = this.dtService.transformData(key, dtData, this.dcService.dictMapping, 'relativesRelationList');
        this.dtService.renderDt('dt_member_relative', title, dtData, scope);
    }

    addNameLessCorpseList(scope) {
        if(!this.dcService.nameLessCorpseList.length) return;
        let key = this.dtConfig.dtNameLessCorpseListKey,
            title = this.dtConfig.dtNameLessCorpseListTitle,
            dtData = this.dtService.transformData(key, this.dcService.nameLessCorpseList, this.dcService.dictMapping, 'nameLessCorpseList');

        // if(!dtData.length) return;

        this.dtService.renderDt('dt_member_nameless', title, dtData, scope);
    }

    render(scope, nodeCode) {
        let dcs = this.dcService;
        this.dtConfig = $.extend(true, {}, this.entrustAcceptUtilService.getDtConfig(nodeCode));
        if(dcs.activeState === 'app.accept' && dcs.submission.section === '3') {
            this.dtConfig.dtSampleListTitle.splice(4, 1);
            this.dtConfig.dtSampleListKey.splice(3, 1);
        }
        this.addSampleList(scope);
        this.addMemberList(scope);
        this.addMemberDNAList(scope);
        this.addRelativesRelationList(scope);
        this.addNameLessCorpseList(scope);
    }

    renderAction(key, index, scope) {
        switch(key) {
            case 'evidenceList':
                this.addSampleListItem(index, scope);
                break;

            case 'memberList':
                this.addMemberList(scope);
                break;

            case 'memberDNAList':
                this.addMemberDNAList(scope);
                break;

            case 'relativesRelationList':
                this.addRelativesRelationList(scope);
                break;

            case 'nameLessCorpseList':
                this.addNameLessCorpseList(scope);
                break;
        }
    }
}

EntrustAcceptRenderService.$inject = [
    'UtilityService',
    'DataTableService',
    'EntrustAcceptDataCenterService',
    'EntrustAcceptUtilService'
];
