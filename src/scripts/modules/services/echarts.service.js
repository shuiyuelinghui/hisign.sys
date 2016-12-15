export default class EchartsService {
    constructor(
        ECHARTS_OPTION_CONFIG
    ) {
        this.echartsOptionConfig = ECHARTS_OPTION_CONFIG;
    }

    getOption(type, option) {
        let defaultOption = this.echartsOptionConfig[type];
        return $.extend(true, {}, defaultOption, option);
    }

}

EchartsService.$inject = [
    'ECHARTS_OPTION_CONFIG'
];
