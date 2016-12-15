export default class NodeDataTableService {

    constructor(
        $timeout,
        $compile,
        AdmindesignsService,
        UtilityService,
        CommonService,
        DT_TITLE_MAPPING,
        DT_DEFAULT_SETTING
    ) {
        this.$timeout = $timeout;
        this.$compile = $compile;
        this.admindesignsService = AdmindesignsService;
        this.utilityService = UtilityService;
        this.commonService = CommonService;
        this.dtTitleMapping = DT_TITLE_MAPPING;
        this.dtDefaultSetting = DT_DEFAULT_SETTING;
    }

    transformData(raw, type, getDtFormElement) {
        let key,
            showData = this.dtDefaultSetting[type],
            outerLen = Object.keys(showData).length,
            title = [],
            data = [],
            flc = 0,
            frc = 0;

        for(let i = 0; i < outerLen; i++ ) {
            if(!showData[i].display) continue;
            key = showData[i].key;

            title.push({title:this.commonService.getTitleNameByKey(this.dtTitleMapping, key, this.pageId)});
            if(showData[i]['fixed']) {
                if(i <= outerLen / 2) flc++;
                else frc++;
            }

            for(let j = 0, innerLen = raw.length; j < innerLen; j++) {

                if(typeof data[j] === 'undefined') data[j] = [];

                let val = raw[j][key],
                    formEle;

                if (this.utilityService.isDate(key)) {
                    val = moment(val).format("YYYY-MM-DD");
                }
                if(getDtFormElement) {
                    formEle = getDtFormElement(key, j);
                    val = formEle ? formEle : val;
                }

                data[j].push(val);
            }
        }

        title.push({title:'操作'});
        if (this.stateName != 'app.entrust.select.temporarylist') {
            if(type === this.pageId) title.unshift({title:''});
        }

        title.unshift({title:'序号'});
        data.forEach((item) => {
            item.push('');
            if (this.stateName != 'app.entrust.select.temporarylist') {
                if(type === this.pageId) item.unshift('');
            }
            item.unshift('');
        });

        if(type === this.pageId) {
            this.dtData = showData;
        }

        return {title, data, flc, frc};
    }

    renderDt(scope, transData, actionContent, pageNum, formId, createdRow, pageSize, options) {

        pageSize = pageSize || 10;

        let params = Object.assign({}, {
            data: transData.data,
            columns: transData.title,
            fixedColumns: {
                leftColumns: transData.flc+1,
                rightColumns: transData.frc+1
            },
            initComplete: () => {
                this.$compile($('#'+formId))(scope);
            },
            createdRow: (row, data, index) => {
                let actionHtml = actionContent.join(''),
                    orderNum = (pageNum-1)*pageSize+index+1;

                $('td:last-child', row).append(actionHtml);
                $('td:first-child', row).append(orderNum);

                if(createdRow) createdRow();

                this.$compile(row)(scope);
            }
        }, options);

        this.admindesignsService.initDataTable('datatable', params);
    }
}

NodeDataTableService.$inject = [
    '$timeout',
    '$compile',
    'AdmindesignsService',
    'UtilityService',
    'CommonService',
    'DT_TITLE_MAPPING',
    'DT_DEFAULT_SETTING'
];
