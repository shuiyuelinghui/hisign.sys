import Highcharts from 'highcharts';

export default class IndexHcController {

    constructor(
        $scope,
        AdmindesignsService,
        HighchartsService
    ) {
        this.$scope = $scope;
        this.admindesignsService = AdmindesignsService;
        this.highchartsService = HighchartsService;
        this.chartList = [];
    }

    $onInit() {
        this.admindesignsService.initAdminPanel();
        this.initChartProfessionWorking();
        this.initChartIdentifyCategory();
        this.initChartWorkingDelay();
        this.initChartDailyEffiency();
        this.initChartDocDraftSuccessRate();

        $(window).on('resize', () => {
            this.reflowChart();
        });
    }

    reflowChart() {
        for(let i = 0, len = this.chartList.length; i < len; i++) {
            this.chartList[i].reflow();
        }
    }

    // 柱状图(专业工作量)
    initChartProfessionWorking() {
        let chart,
            type = 'column',
            id = 'chart_profession_working',
            option = {
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['足迹鉴定','手印鉴定','毒品','毒物']
                },
                series: [
                    {
                        name:'已受理案件数',
                        data:[320, 332, 301, 334]
                    },
                    {
                        name:'已检验数',
                        data:[120, 132, 101, 134]
                    },
                    {
                        name:'文书已发放数',
                        data:[220, 182, 191, 234]
                    }
                ]
            };

        chart = Highcharts.chart(id, this.highchartsService.getOption(type, option));
        this.chartList.push(chart);
    }

    // 柱状图(鉴定类别)
    initChartIdentifyCategory() {
        let chart,
            type = 'column',
            id = 'chart_identify_category',
            option = {
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['足迹检验', '手印检验', '工具检验', '枪支弹药', '特殊痕迹', '毒品检验', '毒物检验']
                },
                series: [
                    {
                        name: '数量',
                        data:[10, 52, 200, 334, 390, 330, 220]
                    }
                ]
            };

        chart = Highcharts.chart(id, this.highchartsService.getOption(type, option));
        this.chartList.push(chart);
    }

    // 饼状图(工作延期情况)
    initChartWorkingDelay() {
        let chart,
            type = 'pie',
            id = 'chart_working_delay',
            option = {
                title: {
                    text: ''
                },
                series: [
                    {
                        data: [
                            {
                                name:'延期审批通过',
                                y: 335,
                                sliced: true,
                                selected: true
                            },
                            {
                                name:'申请中',
                                y: 679
                            },
                            {
                                name:'未申请',
                                y: 1548
                            }
                        ]
                    }
                ]
            };

        chart = Highcharts.chart(id, this.highchartsService.getOption(type, option));
        this.chartList.push(chart);
    }

    // 柱状图(日常工作效率)
    initChartDailyEffiency() {
        let chart,
            type = 'column',
            id = 'chart_daily_effiency',
            option = {
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['0-1天', '1-3天', '3-7天', '7天以后']
                },
                series: [
                    {
                        name: '数量',
                        data:[10, 52, 200, 334]
                    }
                ]
            };

        chart = Highcharts.chart(id, this.highchartsService.getOption(type, option));
        this.chartList.push(chart);
    }

    // 柱状图(文书拟稿成功率)
    initChartDocDraftSuccessRate() {
        let chart,
            type = 'column',
            id = 'chart_doc_draft_success_rate',
            option = {
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['拟稿案件数', '文书提交审批次数', '文书审批退回次数']
                },
                series: [
                    {
                        name: '数量',
                        data:[10, 52, 200]
                    }
                ]
            };

        chart = Highcharts.chart(id, this.highchartsService.getOption(type, option));
        this.chartList.push(chart);
    }
}

IndexHcController.$inject = [
    '$scope',
    'AdmindesignsService',
    'HighchartsService'
];
