const dtActionMapping = {
    ap1010: [
    	'<span class="fa fa-gavel fs18 text-primary tooltipster mr5" title="跨级审批" ng-click="task.actionRedirect($event, \'app.crossapproval\',\'0201\')"></span>',
        '<span class="fa fa-wpforms fs20 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
    ],

    ap1020: [
    	'<span class="fa fa-check-square-o fs18 text-primary tooltipster mr5" title="案件预受理" ng-click="task.actionRedirect($event, \'app.preaccept\',\'0301\')"></span>',
        '<span class="fa fa-wpforms fs20 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
    ],

    ap1030: [
        '<span class="fa fa-check-square-o fs18 text-primary tooltipster mr5" title="预受理审核" ng-click="task.actionRedirect($event, \'app.preacceptapproval\', \'0401\')"></span>',
        '<span class="fa fa-wpforms fs20 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
    ],

    ap1040: [
        '<span class="fa fa-pencil fs18 text-primary tooltipster mr5" title="受理登记" ng-click="task.actionRedirect($event, \'app.accept\',\'0501\')"></span>',
        '<span class="fa fa-wpforms fs20 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
    ],

    ap1050: [
    	'<span class="fa fa-check-square-o fs18 text-primary tooltipster mr5" title="任务领取" ng-click="task.actionRedirect($event, \'app.pickup\', \'0601\')"></span> ',
        '<span class="fa fa-history fs18 text-primary tooltipster mr5" title="任务领取延期" ng-click="task.actionRedirect($event, \'app.pickup_delay_apply\', \'0602\')"></span> ',
        '<span class="fa fa-exchange fs18 text-primary tooltipster mr5" title="交接" ng-click="task.openWorkHandover($event)"></span> ',
        '<span class="fa fa-wpforms fs20 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
    ],

    ap1051: [
        '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情"></span> '
    ],

    ap1060: [
    	'<span class="fa fa-check-square-o fs18 text-primary tooltipster mr5" title="检验鉴定" ng-click="task.actionRedirect($event, \'app.examine\', \'0702\')"></span> ',
        '<span class="fa fa-history fs18 text-primary tooltipster mr5" title="延期" ng-click="task.actionRedirect($event, \'app.examine_delay_apply\', \'0704\')"></span> ',
        '<span class="fa fa-exchange fs18 text-primary tooltipster mr5" title="交接" ng-click="task.openWorkHandover($event)"></span> ',
        '<span class="fa fa-pause-circle-o fs18 text-primary tooltipster mr5" title="中止" ng-click="task.actionRedirect($event, \'app.examine_halt_apply\', \'0705\')"></span> ',
        '<span class="fa fa-power-off fs18 text-primary tooltipster mr5" title="终止" ng-click="task.actionRedirect($event, \'app.examine_stop_apply\', \'0706\')"></span> ',
        '<span class="fa fa-wpforms fs20 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
    ],

    ap1080: [
        '<span class="fa fa-file-text-o fs18 text-primary tooltipster mr5" title="文书拟稿" ng-click="task.actionRedirect($event, \'app.doc_draft\', \'0802\')"></span>',
        '<span class="fa fa-history fs18 text-primary tooltipster mr5" title="延期" ng-click="task.actionRedirect($event, \'app.doc_delay_apply\', \'0804\')"></span>',
        '<span class="fa fa-exchange fs18 text-primary tooltipster mr5" title="交接" ng-click="task.openWorkHandover($event)"></span>',
        '<span class="fa fa-power-off fs18 text-primary tooltipster mr5" title="终止" ng-click="task.actionRedirect($event, \'app.doc_stop_apply\', \'0805\')"></span>',
        '<span class="fa fa-wpforms fs20 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
    ],

    ap1090: [
        '<span class="fa fa-gavel fs18 text-primary tooltipster mr5" title="鉴定复核" ng-click="task.actionRedirect($event, \'app.doc_confirm\', \'0901\')"></span>',
        '<span class="fa fa-wpforms fs20 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
    ],

    ap1100: [
        '<span class="fa fa-gavel fs18 text-primary tooltipster mr5" title="技术审批" ng-click="task.actionRedirect($event, \'app.doc_tech\', \'1003\')"></span>',
        '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
    ],

    ap1200: [
    	'<span class="fa fa-gavel fs18 text-primary tooltipster mr5" title="程序审批" ng-click="task.actionRedirect($event, \'app.doc_program\', \'1101\')"></span> ',
        '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
    ],

    ap1300: [
    	'<span class="fa fa-gavel fs18 text-primary tooltipster mr5" title="领导审批" ng-click="task.actionRedirect($event, \'app.doc_leader\', \'1201\')"></span> ',
        '<span class="fa fa-wpforms fs18 text-primary tooltipster mr5" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
    ],

    ap1400: [
    	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印报告" ng-click="task.actionRedirect($event, \'app.doc_print\', \'1301\')"></span> ',
        '<span class="fa fa-wpforms fs18 text-primary tooltipster mr5" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
    ],

    ap1500: [
    	'<span class="fa fa-check fs18 text-primary tooltipster mr5" title="提交归档" ng-click="task.actionRedirect($event, \'app.submit_archive\', \'1401\')"></span> ',
        '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
    ],

    ap1600: [
    	'<span class="fa fa-archive fs18 text-primary tooltipster mr5" title="确认归档" ng-click="task.actionRedirect($event, \'app.confirm_archive\', \'1501\')"></span> ',
        '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
    ],

    ap1700: [
    	'<span class="fa fa-telegram fs18 text-primary tooltipster" title="文书发放" ng-click="task.actionRedirect($event, \'app.doc_publish\', \'1601\')"></span> ',
        '<span class="fa fa-wpforms fs20 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
    ],

    en4200: [
        '<span class="fa fa-edit fs18 text-primary tooltipster mr5" title="修改" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.save\',\'0101\', 1)"></span>',
        '<span class="fa fa-trash-o fs18 text-primary tooltipster mr5" title="删除" ng-click="task.delSubm($event, 1)"></span>'
    ],

    ap2021: [
        '<span class="fa fa-trash-o fs18 text-primary tooltipster mr5" title="删除" ng-click="docPublish.delRow($event)"></span>',
        '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情"></span> '
    ],

    //科室待办一览
    ap5000: [
        '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
    ]
};


const dtTypeActionMapping = {
    ap1800: {
        "0602" :[
            '<span class="fa fa-history fs18 text-primary tooltipster mr5" title="任务领取延期审核" ng-click="task.actionRedirect($event, \'app.pickup_delay_section_chief\',\'1701\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        "0704" :[
            '<span class="fa fa-history fs18 text-primary tooltipster mr5" title="检验鉴定延期审核" ng-click="task.actionRedirect($event, \'app.examine_delay_section_chief\',\'1703\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        "0804" :[
            '<span class="fa fa-history fs18 text-primary tooltipster mr5" title="文书拟稿延期审核" ng-click="task.actionRedirect($event, \'app.doc_delay_section_chief\',\'1705\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        "0705" :[
            '<span class="fa fa-pause-circle-o fs18 text-primary tooltipster mr5" title="检验鉴定中止审核" ng-click="task.actionRedirect($event, \'app.examine_halt_section_chief\',\'1707\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        "0706" :[
            '<span class="fa fa-power-off fs18 text-primary tooltipster mr5" title="检验鉴定终止审核" ng-click="task.actionRedirect($event, \'app.examine_stop_section_chief\',\'1709\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        "0805" :[
            '<span class="fa fa-power-off fs18 text-primary tooltipster mr5" title="文书拟稿终止审核" ng-click="task.actionRedirect($event, \'app.doc_stop_section_chief\',\'1711\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ]
        
    },

    ap1803: {
        "0602" :[
            '<span class="fa fa-history fs18 text-primary tooltipster mr5" title="任务领取延期审核" ng-click="task.actionRedirect($event, \'app.pickup_delay_director\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        "0704" :[
            '<span class="fa fa-history fs18 text-primary tooltipster mr5" title="检验鉴定延期审核" ng-click="task.actionRedirect($event, \'app.examine_delay_director\',\'1803\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        "0804" :[
            '<span class="fa fa-history fs18 text-primary tooltipster mr5" title="文书拟稿延期审核" ng-click="task.actionRedirect($event, \'app.doc_delay_director\',\'1805\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        "0705" :[
            '<span class="fa fa-pause-circle-o fs18 text-primary tooltipster mr5" title="检验鉴定中止审核" ng-click="task.actionRedirect($event, \'app.examine_halt_director\',\'1807\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        "0706" :[
            '<span class="fa fa-power-off fs18 text-primary tooltipster mr5" title="检验鉴定终止审核" ng-click="task.actionRedirect($event, \'app.examine_stop_director\',\'1809\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        "0805" :[
            '<span class="fa fa-power-off fs18 text-primary tooltipster mr5" title="文书拟稿终止审核" ng-click="task.actionRedirect($event, \'app.doc_stop_director\',\'1811\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ]
        
    },

    en3100: {
        //跨级待审批
        "0102" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-edit fs18 text-primary tooltipster mr5" title="修改" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.edit\',\'0102\', 2)"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-trash-o fs18 text-primary tooltipster mr5" title="删除" ng-click="task.delSubm($event, 2)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> ',
        ],

        //跨级待审批
        "0103" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-edit fs18 text-primary tooltipster mr5" title="修改" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.edit\',\'0102\', 2)"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-trash-o fs18 text-primary tooltipster mr5" title="删除" ng-click="task.delSubm($event, 2)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        //预受理待审批
        "0201" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> ',
        ],
        //
        "0202" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-edit fs18 text-primary tooltipster mr5" title="修改" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.edit\',\'0102\', 2)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

            
        ],
        //预受理待审批
        "0301" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> ',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
         //预受理待审批
        "0302" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //受理待审批
        "0401" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //鉴定委托
        "0402" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-edit fs18 text-primary tooltipster mr5" title="修改" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.edit\',\'0102\', 2)"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //待收捡
        "0501" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //受理不通过
        "0502" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-edit fs18 text-primary tooltipster mr5" title="修改" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.edit\',\'0102\', 2)"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //检验鉴定中
        "0601" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0602" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
        "0603" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
        //文书拟稿中
        "0701" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0702" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0703" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
        "0704" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
        //业务科长审核
        "0705" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0706" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
        //文书审批中
        "0801" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
        "0802" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0803" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
        "0804" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
        "0805" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
        "0806" :[
            '<span class="fa fa-photo fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="octicon octicon-ruby octicon-steps fs20 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
        //文书审批中
        "0901" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0902" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
        "0903" :[
            '<span class="fa fa-photo fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="octicon octicon-ruby octicon-steps fs20 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
        //文书审批中
        "1001" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
        "1002" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
        "1003" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1004" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
        //文书审批中
        "1101" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1102" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
        //文书整理中
        "1201" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1202" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
        //文书整理中
        "1301" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书整理中
        "1401" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书待领取
        "1501" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //检验鉴定完成
        "1601" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-file-text-o fs18 text-primary tooltipster mr5" title="意见反馈表" ng-click="task.actionRedirect($event, \'app.pickup_delay_director\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        
        //审核通过
        "1701" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

            
        ],
        //审核不通过
        "1702" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
        //
        "1703" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

            
        ],
        //
        "1704" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
        //
        "1705" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '

        ],
        //
        "1706" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1707" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1708" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1709" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1710" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1711" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1712" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1801" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1802" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1803" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1804" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1805" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1806" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1807" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1808" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1809" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1810" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1811" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1812" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-copy fs18 text-primary tooltipster mr5" title="复制" ng-click="task.actionRedirect($event, \'app.entrust.apply.evidence.copy\',\'0102\', 3)"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ]
        
    },

    en3400: {
        //跨级待审批
        "0102" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        //跨级待审批
        "0103" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        //预受理待审批
        "0201" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "0202" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
            
        ],
        //预受理待审批
        "0301" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
         //预受理待审批
        "0302" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //受理待审批
        "0401" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //鉴定委托
        "0402" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //待收捡
        "0501" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //受理不通过
        "0502" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //检验鉴定中
        "0601" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0602" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0603" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书拟稿中
        "0701" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0702" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0703" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0704" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //业务科长审核
        "0705" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0706" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书审批中
        "0801" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0802" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0803" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0804" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0805" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0806" :[
            '<span class="fa fa-photo fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="octicon octicon-ruby octicon-steps fs20 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书审批中
        "0901" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0902" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0903" :[
            '<span class="fa fa-photo fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="octicon octicon-ruby octicon-steps fs20 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书审批中
        "1001" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1002" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1003" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1004" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书审批中
        "1101" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1102" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书整理中
        "1201" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1202" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书整理中
        "1301" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书整理中
        "1401" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书待领取
        "1501" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //检验鉴定完成
        "1601" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        
        //审核通过
        "1701" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
            
        ],
        //审核不通过
        "1702" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1703" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
            
        ],
        //
        "1704" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1705" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1706" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1707" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1708" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1709" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1710" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1711" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1712" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1801" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1802" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1803" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1804" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1805" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1806" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1807" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1808" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1809" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1810" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1811" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1812" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ]

    },

    ap2000: {
        
        //跨级待审批
        "0101" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        //跨级待审批
        "0102" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        //跨级待审批
        "0103" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        //重新跨级审批
        "0201" :[
            '<span class="fa fa-refresh fs18 text-primary tooltipster mr5" title="重新跨级审批" ng-click="task.actionRedirect($event, \'app.crossapproval\',\'0201\',\'1\')"></span>',
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0202" :[
        	'<span class="fa fa-refresh fs18 text-primary tooltipster mr5" title="重新跨级审批" ng-click="task.actionRedirect($event, \'app.crossapproval\',\'0201\',\'1\')"></span>',
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //预受理待审批
        "0301" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-refresh fs18 text-primary tooltipster mr5" title="重新预受理" ng-click="task.actionRedirect($event, \'app.preaccept\',\'0301\', \'1\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
         //预受理待审批
        "0302" :[
        	'<span class="fa fa-refresh fs18 text-primary tooltipster mr5" title="重新预受理" ng-click="task.actionRedirect($event, \'app.preaccept\',\'0301\', \'1\')"></span>',
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //预受理审核
        "0401" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-refresh fs18 text-primary tooltipster mr5" title="重新预受理审核" ng-click="task.actionRedirect($event, \'app.preacceptapproval\',\'0401\',\'1\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
         //鉴定委托
        "0402" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-refresh fs18 text-primary tooltipster mr5" title="重新预受理审核" ng-click="task.actionRedirect($event, \'app.preacceptapproval\',\'0401\',\'1\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //待收捡
        "0501" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-refresh fs18 text-primary tooltipster mr5" title="重新受理登记" ng-click="task.actionRedirect($event, \'app.accept\',\'0501\', \'1\')"></span>',
            '<span class="fa fa-user fs18 text-primary tooltipster mr5" title="重新指定任务领取人" ng-click="task.actionRedirect($event, \'app.pickup\',\'0601\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //受理不通过
        "0502" :[
        	'<span class="fa fa-refresh fs18 text-primary tooltipster mr5" title="重新受理登记" ng-click="task.actionRedirect($event, \'app.accept\',\'0501\', \'1\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //检验鉴定中
        "0601" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0602" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0603" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书拟稿中
        "0701" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0702" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-rotate-left fs18 text-primary tooltipster mr5" title="回撤" ng-click="task.openCancelPopup($event,\'0806\')"></span>',
            '<span class="fa fa-edit fs18 text-primary tooltipster mr5" title="修改" ng-click="task.actionRedirect($event, \'app.pickup_delay_director\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0703" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0704" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //业务科长审核
        "0705" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0706" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书审批中
        "0801" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
       	"0802" :[
       		'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-rotate-left fs18 text-primary tooltipster mr5" title="回撤" ng-click="task.openCancelPopup($event, \'0903\')"></span>',            
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0803" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0804" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0805" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        "0806" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书审批中
        "0901" :[
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0902" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0903" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书审批中
        "1001" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1002" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1003" :[
         	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1004" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书审批中
        "1101" :[
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1102" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书整理中
        "1201" :[
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1202" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书整理中
        "1301" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书整理中
        "1401" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书待领取
        "1501" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //检验鉴定完成
        "1601" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        
        //审核通过
        "1701" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //审核不通过
        "1702" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1703" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
            
        ],
        //
        "1704" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1705" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1706" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1707" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1708" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1709" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1710" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1711" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1712" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1801" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1802" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1803" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1804" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1805" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1806" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1807" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1808" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1809" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1810" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1811" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //
        "1812" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
        	'<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
        	'<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ]

    },

    ap2100: {
        //委托暂存
        "0101" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //跨级待审批
        "0102" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //跨级待审批
        "0103" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //预受理待审批
        "0201" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0202" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //预受理待审批
        "0301" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        //预受理待审批
        "0302" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        //受理待审批
        "0401" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        //鉴定委托
        "0402" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-refresh fs18 text-primary tooltipster mr5" title="重新预受理审核" ng-click="task.actionRedirect($event, \'app.preacceptapproval\',\'0401\',\'1\')"></span>',
            '<span class="fa fa-print fs18 text-primary tooltipster mr5" title="打印" ng-click="task.printSubmBook($event)"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],

        //待收捡
        "0501" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //受理不通过
        "0502" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //检验鉴定中
        "0601" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0602" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0603" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书拟稿中
        "0701" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0702" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0703" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0704" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0705" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0706" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //业务科长审核
        /*"0705" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],*/
        //文书审批中
        "0801" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0802" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0803" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0804" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0805" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0806" :[
            '<span class="fa fa-photo fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="octicon octicon-ruby octicon-steps fs20 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书审批中
        "0901" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0902" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0903" :[
            '<span class="fa fa-photo fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="octicon octicon-ruby octicon-steps fs20 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书审批中
        "1001" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1002" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1003" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1004" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书审批中
        "1101" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1102" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书整理中
        "1201" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "0202" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书整理中
        "1301" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书整理中
        "1401" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //文书待领取
        "1501" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        //检验鉴定完成
        "1601" :[
            '<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        
        "1701" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1702" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1703" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1704" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1705" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1706" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1707" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1708" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1709" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1710" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1711" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1712" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        
        "1801" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1802" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1803" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1804" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1805" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1806" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1807" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1808" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1809" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1810" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1811" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ],
        "1812" :[
        	'<span class="fa fa-file-text fs18 text-primary tooltipster mr5" title="详情" ng-click="task.actionRedirect($event, \'app.entrustpreview\',\'1801\')"></span>',
            '<span class="fa fa-wpforms fs18 text-primary tooltipster" title="留痕" ng-click="task.openFootPrintPopup($event)"></span> '
        ]

    }
};

export {dtActionMapping, dtTypeActionMapping};
