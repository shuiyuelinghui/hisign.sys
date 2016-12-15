import _ from 'underscore';

export default class ExtractEvidenceController {

    constructor(
        $scope,
        toaster,
        AdmindesignsService,
        UtilityService,
        EntrustAcceptDataCenterService,
        EntrustAcceptActionService,
        DataTableService,
        EntrustAcceptUtilService,
        PatternService
    ) {
        this.$scope = $scope;
        this.toaster = toaster;
        this.admindesignsService = AdmindesignsService;
        this.utilityService = UtilityService;
        this.dcService = EntrustAcceptDataCenterService;
        this.actionService = EntrustAcceptActionService;
        this.dtService = DataTableService;
        this.entrustAcceptUtilService = EntrustAcceptUtilService;
        this.dictData = {};
        this.dt;
        this.dtConfig;

        this.activePickupIndex = this.$scope.$parent.evidenceInfo.activePickupIndex;
        this.patterIsPositiveFloat = PatternService.isPositiveFloat();
        //placeholder
        this.placeholderModel = '示例：标记“......”字样的物证袋1个，内装滤纸/棉签一张/一根';
        this.dnaPlaceholder = '';
    }

    $onInit() {
        let dcs = this.dcService;
        if(this.dcService.mode === 'display') {
            this.copyEvidenceInfo();
        }

        this.dtConfig = $.extend(true, {}, this.entrustAcceptUtilService.getDtConfig());
        if(dcs.activeState === 'app.accept' && dcs.submission.section === '3') {
            this.dtConfig.dtSampleListTitle.splice(4, 1);
            this.dtConfig.dtSampleListKey.splice(3, 1);
        }
    }

    closeMagnificPopup() {
        this.admindesignsService.closeMagnificPopup();
        this.dcService.professionList = [];
    }

    findDNAProfession() {
        for(let i = 0, len = this.dcService.professionList.length; i < len; i++) {
            let item = this.dcService.professionList[i];
            if(item.profession.code === '3') return true;
        }

        return false;
    }

    addExtract(index = 0, addNew) {
        let dtData,
            dtSampleData,
            dtSampleDNAData;

        this.dtService.addToSubmitDataDeep('evidenceList', 'sampleList', index, false);
        this.dtService.addToSubmitDataDeep('evidenceList', 'sampleDNAList', index);

        dtSampleData = this.dcService.evidenceList[index].sampleList || [];
        dtSampleDNAData = this.dcService.evidenceList[index].sampleDNAList || [];
        dtData = dtSampleData.concat(dtSampleDNAData);
        dtData = this.dtService.transformData(this.dtConfig.dtSampleListKey, dtData, this.dcService.dictMapping, 'evidenceList', index);
        this.dtService.renderDt('dt_evidence_'+index, this.dtConfig.dtSampleListTitle, dtData, this.$scope, 2);

        this.toaster.pop('success', null, '提取信息成功');

        this.dcService.sampleListItem = {};
        this.dcService.sampleDNAListItem = {};

        this.closeMagnificPopup();
        if(addNew) {
            this.$scope.$emit('magnificPopupReopen', 'add-extract', index);
        }
    }

    copyEvidenceInfo() {
        let index = this.activePickupIndex,
            evidenceList = this.dcService.evidenceList[index],
            sampleListItem = this.dcService.sampleListItem,
            copyList = [
                'amount',
                'measuringUnit',
                'collector',
                'collectTimeStr',
                'collectPart',
                'collectMethod',
                'characters',
                'packing',
                'eviName',
                'mainFeatures'
            ];

        for(let i = 0, len = copyList.length; i < len; i++) {
            let item = evidenceList[copyList[i]];
            if(typeof item !== 'undefined') {
                if(copyList[i] === 'eviName') {
                    sampleListItem['sampleName'] = item;
                } else if (copyList[i] === 'packing') {
                    sampleListItem['packingSituation'] = item;
                } else if (copyList[i] === 'mainFeatures') {
                    sampleListItem['sampleDesc'] = item;
                } else {
                    sampleListItem[copyList[i]] = item;
                }
            }
        }
    }
    
    //通过点击 检材/样本 改变不同的placeholder值
    changePlaceholder(radioModel) {
    	if (radioModel == '1') {
    		this.placeholderModel = '示例：标记“......”字样的物证袋1个，内装滤纸/棉签一张/一根';
    		this.dnaPlaceholder = '';
    	} else {
    		this.placeholderModel = '示例：标记“......血样”字样的物证袋1个，内装“...”1个';
    		this.dnaPlaceholder = '示例：张三的血样';
    	}
    }
}

ExtractEvidenceController.$inject = [
    '$scope',
    'toaster',
    'AdmindesignsService',
    'UtilityService',
    'EntrustAcceptDataCenterService',
    'EntrustAcceptActionService',
    'DataTableService',
    'EntrustAcceptUtilService',
    'PatternService'
];