// import echarts from 'echarts';

import echarts from 'echarts/lib/echarts';

// 图表类型
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';

// 图表组件
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


export default class IndexController {

    constructor(
        $scope,
        AdmindesignsService,
        EchartsService
    ) {
        this.$scope = $scope;
        this.admindesignsService = AdmindesignsService;
        this.echartsService = EchartsService;
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
            this.chartList[i].resize();
        }
    }
    
    // 堆叠柱状图(专业工作量)
    initChartProfessionWorking() {
        let type = 'bar',
            id = 'chart_profession_working',
            option = {
                legend: {
                    data: ['已受理案件数','已检验数','文书已发放数']
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['足迹鉴定','手印鉴定','毒品','毒物']
                    }
                ],
                series : [
                    {
                        name:'已受理案件数',
                        type:'bar',
                        data:[320, 332, 301, 334]
                    },
                    {
                        name:'已检验数',
                        type:'bar',
                        data:[120, 132, 101, 134]
                    },
                    {
                        name:'文书已发放数',
                        type:'bar',
                        data:[220, 182, 191, 234]
                    }
                ]
            },
            chart = echarts.init(document.getElementById(id));

        this.chartList.push(chart);
        chart.setOption(this.echartsService.getOption(type, option));
    }

    // 普通柱状图(鉴定类别)
    initChartIdentifyCategory() {
        let type = 'bar',
            id = 'chart_identify_category',
            option = {
                xAxis : [
                    {
                        type : 'category',
                        data : ['足迹检验', '手印检验', '工具检验', '枪支弹药', '特殊痕迹', '毒品检验', '毒物检验'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                series : [
                    {
                        type:'bar',
                        barWidth: '50%',
                        data:[10, 52, 200, 334, 390, 330, 220]
                    }
                ]
            },
            chart = echarts.init(document.getElementById(id));

        this.chartList.push(chart);
        chart.setOption(this.echartsService.getOption(type, option));
    }

    // 嵌套环形图(工作延期情况)
    initChartWorkingDelay() {
        let type = 'pie',
            id = 'chart_working_delay',
            option = {
                legend: {
                    data: ['延期后工作进行中', '延期后工作已完成']
                },
                series: [
                    {
                        data: [
                            {value:335, name:'延期审批通过', selected:true},
                            {value:679, name:'申请中'},
                            {value:1548, name:'未申请'}
                        ]
                    },
                    {
                        data: [
                            {value:335, name:'延期后工作进行中'},
                            {value:310, name:'延期后工作已完成'}
                        ]
                    }
                ]
            },
            chart = echarts.init(document.getElementById(id));

        this.chartList.push(chart);
        chart.setOption(this.echartsService.getOption(type, option));
    }

    // 普通柱状图(日常工作效率)
    initChartDailyEffiency() {
        let type = 'bar',
            id = 'chart_daily_effiency',
            option = {
                xAxis : [
                    {
                        type : 'category',
                        data : ['0-1天', '1-3天', '3-7天', '7天以后'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                series : [
                    {
                        type:'bar',
                        barWidth: '50%',
                        data:[10, 52, 200, 334]
                    }
                ]
            },
            chart = echarts.init(document.getElementById(id));

        this.chartList.push(chart);
        chart.setOption(this.echartsService.getOption(type, option));
    }

    // 普通柱状图(文书拟稿成功率)
    initChartDocDraftSuccessRate() {
        let type = 'bar',
            id = 'chart_doc_draft_success_rate',
            option = {
                xAxis : [
                    {
                        type : 'category',
                        data : ['拟稿案件数', '文书提交审批次数', '文书审批退回次数'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                series : [
                    {
                        type:'bar',
                        barWidth: '50%',
                        data:[10, 52, 200]
                    }
                ]
            },
            chart = echarts.init(document.getElementById(id));

        this.chartList.push(chart);
        chart.setOption(this.echartsService.getOption(type, option));
    }
}

IndexController.$inject = [
    '$scope',
    'AdmindesignsService',
    'EchartsService'
];
