
export default class AddEvidenceController {

    constructor(
        $scope,
        toaster,
        AdmindesignsService,
        EntrustAcceptDataCenterService,
        EntrustDataService,
        PatternService
    ) {
        this.$scope = $scope;
        this.toaster = toaster;
        this.admindesignsService = AdmindesignsService;
        this.dcService = EntrustAcceptDataCenterService;
        this.dataService = EntrustDataService;

        this.dictData = {};
        
        this.patterIsPositiveFloat=PatternService.isPositiveFloat(); 
    }

    $onInit() {}

    updateEvidence(addNew) {
        this.dcService.evidenceListItem.documentList = this.dcService.fileSlideDataItem || [];
        if(this.dcService.evidenceIndex >= 0) {
            this.dcService.evidenceList[this.dcService.evidenceIndex] = this.dcService.evidenceListItem;
        } else {
            this.dcService.evidenceList.push(this.dcService.evidenceListItem);
        }

        this.dcService.evidenceListItem = {};
        this.toaster.pop('success', null, '保存物证信息成功');

        this.closeMagnificPopup();
        if(addNew) {
            this.$scope.$emit('magnificPopupReopen', 'add-evidence');
        }
    }

    closeMagnificPopup() {
        this.admindesignsService.closeMagnificPopup();
    }

    getEviCategory() {

        this.dcService.dictData.EviTypeCategoryModel = [];
        let params = {
            parentKey : this.dcService.evidenceListItem.eviType,
            type: "0",
            parentRootKey: "EviTypeModel",
            noUserId: true
        }

        this.dataService.getEviCategory(params)
            .then((response) => {
               this.dcService.dictData.EviTypeCategoryModel = response;
            });
    }
}

AddEvidenceController.$inject = [
    '$scope',
    'toaster',
    'AdmindesignsService',
    'EntrustAcceptDataCenterService',
    'EntrustDataService',
    'PatternService'
];