export default class EntrustAcceptUtilService {

    constructor(
        $state,
        EntrustAcceptDataCenterService,
        PatternService,
        entrust_DT_CONFIG,
        accept_DT_CONFIG,
        detail_DT_CONFIG
    ) {
        this.$state = $state;
        this.dcService = EntrustAcceptDataCenterService;
        this.isIdpattern = PatternService.isId();
        this.entrustDtConfig = entrust_DT_CONFIG;
        this.acceptDtConfig = accept_DT_CONFIG;
        this.detailDtConfig = detail_DT_CONFIG;
    }

    isNew() {
        let state = this.$state.params;
        //TODO: implement this function
        if(state.id == null && state.flag == null && state.result == null) {
            return true;
        } else {
            return false;
        }
    }

    resetData(scope) {
        scope.$on('$stateChangeStart', () => {
            this.dcService.resetData();
        });
    }

    getDtConfig(nodeCode) {
        if(this.$state.current.name === 'app.accept') {
            return this.acceptDtConfig;
        } else if(nodeCode >= '0500') {
            return this.detailDtConfig;
        } else {
            return this.entrustDtConfig;
        }
    }
    
    isIdType(type){
    	if ( type === '1' ) {
    		return this.isIdpattern;
    	} else{
    		return '';
    	}
    }
    
}

EntrustAcceptUtilService.$inject = [
    '$state',
    'EntrustAcceptDataCenterService',
    'PatternService',
    'entrust_DT_CONFIG',
    'accept_DT_CONFIG',
    'detail_DT_CONFIG'
];
