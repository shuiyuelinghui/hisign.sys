
export default class AddDNAController {

    constructor(
        $scope,
        $compile,
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
        this.toaster = toaster;
        this.admindesignsService = AdmindesignsService;
        this.dcService = EntrustAcceptDataCenterService;
        this.actionService = EntrustAcceptActionService;
        this.dtService = DataTableService;
        
        this.utilityService = UtilityService;
        this.entrustAcceptUtilService = EntrustAcceptUtilService;
        this.patterIsPositiveFloat = PatternService.isPositiveFloat(); 
        this.patterisPositiveInteger = PatternService.isPositiveInteger();
        
        this.dtConfig;
        this.dictData = {};
        this.typeModelNameMap = {
            memberDNA: 'memberDNAListItem',
            relativesRelation: 'relativesListItem',
            nameLessCorpse: 'nameLessCorpseListItem'
        };
        this.activeType = 'memberDNA';
    }

    $onInit() {
        let dcs = this.dcService;
        if(!this.utilityService.isEmpty(dcs.activeMemberType)) {
            this.setActiveType(dcs.activeMemberType.substring(0, dcs.activeMemberType.length-4));
        }
        this.dtConfig = this.entrustAcceptUtilService.getDtConfig();
    }

    getModelName() {
        return this.typeModelNameMap[this.activeType];
    }
    
    setActiveType(type) {
        this.activeType = type;
        // this.dcService.professionList = [];
    }

    addMemberDNA(addNew) {
        let dtData,
            modelName = this.getModelName();

        modelName = modelName.substring(0, modelName.length-4);

        this.dtService.addToSubmitData(modelName);
        dtData = this.dtService.transformData(this.dtConfig.dtMemberDNAListKey, this.dcService.memberDNAList, this.dcService.dictMapping, 'memberDNAList');
        this.dtService.renderDt('dt_member_dna', this.dtConfig.dtMemberDNAListTitle, dtData, this.$scope, 2);

        if(!addNew) {
            this.closeMagnificPopup();
        }
    }

    addRelativesRelation(addNew) {
        let i, len,
            dtData = [],
            modelName = this.getModelName();

        modelName = modelName.substring(0, modelName.length-4);
        this.dtService.addToSubmitDataDeep('relativesRelationList', modelName);

        for(i = 0, len = this.dcService.relativesRelationList.length; i < len; i++) {
            dtData = dtData.concat(this.dcService.relativesRelationList[i]['relativesList']);
        }
        dtData = this.dtService.transformData(this.dtConfig.dtRelativesRelationListKey, dtData, this.dcService.dictMapping, 'relativesRelationList');
        this.dtService.renderDt('dt_member_relative', this.dtConfig.dtRelativesRelationListTitle, dtData, this.$scope);
        if(!addNew) {
            this.closeMagnificPopup();
        }   
    }

    addNameLessCorpse(addNew) {
        let dtData,
            modelName = this.getModelName();

        modelName = modelName.substring(0, modelName.length-4);

        this.dtService.addToSubmitData(modelName);
        dtData = this.dtService.transformData(this.dtConfig.dtNameLessCorpseListKey, this.dcService.nameLessCorpseList, this.dcService.dictMapping, 'nameLessCorpseList');
        this.dtService.renderDt('dt_member_nameless', this.dtConfig.dtNameLessCorpseListTitle, dtData, this.$scope);
        if(!addNew) {
            this.closeMagnificPopup();
        }   
    }

    addDNA(addNew) {
        switch(this.activeType) {
            case 'memberDNA':
                this.addMemberDNA(addNew);
                break;

            case 'relativesRelation':
                this.addRelativesRelation(addNew);
                break;

            case 'nameLessCorpse':
                this.addNameLessCorpse(addNew);
                break;

            default:
                break;
        }
        this.toaster.pop('success', null, '添加DNA人员信息成功');

        this.dcService[this.getModelName()] = [];

        if (!addNew) {
            this.closeMagnificPopup();
        }        
    }

    closeMagnificPopup() {
        this.admindesignsService.closeMagnificPopup();
    }
}

AddDNAController.$inject = [
    '$scope',
    '$compile',
    'toaster',
    'AdmindesignsService',
    'EntrustAcceptDataCenterService',
    'EntrustAcceptActionService',
    'DataTableService',
    'PatternService',
    'UtilityService',
    'EntrustAcceptUtilService'
];
