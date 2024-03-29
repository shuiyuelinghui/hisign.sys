const footprintMapping = {
    //预受理通过
    '0301': [
        {
            name: '鉴定委托书',
            type: "1"
        }
    ],
    
    //预受理退回
    '0302': [
        {
            name: '不予受理通知书',
            type: '5'
        }
    ],

    //预受理意见退回
    '0401': [
        {
            name: '鉴定委托书',
            type: '1'
        }
    ],

    //预受理意见通过
    '0402': [
        {
            name: '不予受理通知书',
            type: '5'
        }
    ],

    //受理通过
    '0501': [
        {
            name: '鉴定受理登记表',
            type: '4'
        },
        {
            name: '受理编号条码',
            type: '102'
        },
        {
            name: '检材样本标签',
            type: '103'
        },
        {
            name: '流转登记表',
            type: '104'
        }
    ],

    //收检
    '0601': [
        {
            name: '流转登记表',
            type: '104'
        }
    ],

    //收检延期申请
    '0602': [
        {
            name: '延期申请审批单',
            type: 'app.approval'
        }
    ],

    //检验鉴定
    '0701': [
        {
            name: '检验记录',
            type: '100'
        }
    ],

    //检验完成
    '0702': [
        {
            name: '检验记录',
            type: '100'
        }
    ],

    //检验延期申请
    '0704': [
        {
            name: '延期申请审批单',
            type: 'app.approval'
        }
    ],

    //检验中止申请
    '0705': [
        {
            name: '鉴定中止意见书',
            type: 'app.approval'
        }
    ],

    //检验终止申请
    '0706': [
        {
            name: '鉴定终止意见书',
            type: 'app.approval'
        }
    ],

    //检验终止申请
    '0706': [
        {
            name: '鉴定终止意见书',
            type: 'app.approval'
        }
    ],

    //文书拟稿
    '0801': [
        {
            name: '鉴定文书',
            type: '2'
        }
    ],

    //文书提交审批
    '0802': [
        {
            name: '鉴定文书',
            type: '2'
        },
        {
            name: '鉴定文书审批单',
            type: '7'
        }
    ],

    //拟稿延期申请
    '0804': [
        {
            name: '延期申请审批单',
            type: 'app.approval'
        }
    ],

    //拟稿终止申请
    '0805': [
        {
            name: '鉴定终止意见书',
            type: 'app.approval'
        }
    ],

    //文书复核通过
    '0901': [
       {
            name: '鉴定文书',
            type: '2'
        },
        {
            name: '鉴定文书审批单',
            type: '7'
        }
    ],

    //授权审批通过
    '1001': [
        {
            name: '鉴定文书',
            type: '2'
        },
        {
            name: '鉴定文书审批单',
            type: '7'
        }
    ],

     //技术审批通过
    '1003': [
        {
            name: '鉴定文书',
            type: '2'
        },
        {
            name: '鉴定文书审批单',
            type: '7'
        }
    ],

    //程序审批通过
    '1101': [
        {
            name: '鉴定文书',
            type: '2'
        },
        {
            name: '鉴定文书审批单',
            type: '7'
        }
    ],

    //领导审批通过
    '1201': [
        {
            name: '鉴定文书',
            type: '2'
        },
        {
            name: '鉴定文书审批单',
            type: '7'
        }
    ],

    //文书打印
    '1301': [
        {
            name: '鉴定文书正本',
            type: '2'
        },
        {
            name: '鉴定文书草稿',
            type: '12'
        },
        {
            name: '鉴定文书审批单',
            type: '7'
        }
    ],

    //文书归档
    '1401': [
        {
            name: '案件档案',
            type: '108'
        }
    ],

    //确认归档
    '1501': [
        {
            name: '案件档案',
            type: '108'
        },
        {
            name: '归档材料移交表',
            type: '107'
        },
        {
            name: '流转登记表',
            type: '104'
        }
    ],

    //文书发放
    '1601': [
        {
            name: '流转登记表',
            type: '104'
        }
    ],
};

export default footprintMapping;