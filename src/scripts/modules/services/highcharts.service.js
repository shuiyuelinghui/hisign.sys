export default class HighchartsService {
    constructor(
        HIGHCHARTS_OPTION_CONFIG
    ) {
        this.highchartsOptionConfig = HIGHCHARTS_OPTION_CONFIG;
    }

    getOption(type, option) {
        let defaultOption = this.highchartsOptionConfig[type];
        return $.extend(true, {}, defaultOption, option);
    }

}

HighchartsService.$inject = [
    'HIGHCHARTS_OPTION_CONFIG'
];
