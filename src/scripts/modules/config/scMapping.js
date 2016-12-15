const scMapping = (pageId) => {
    switch(pageId) {
        case 'ap1010':
            return [
                'submCode',                 // 委托编号
                'submDate',                 // 委托时间
                'serverCode',               // 鉴定机构
                'section',                  // 专业
                'caseName',                 // 案件名称
                'orgName'                   // 委托单位
            ];

        case 'ap1020':
        case 'ap1030':
        case 'ap1040':
            return [
                'submCode',                 // 委托编号
                'submDate',                 // 委托时间
                'section',                  // 专业
                'caseName',                 // 案件名称
                'orgName'                   // 委托单位
            ];
        case 'ap1800':
        case 'ap1803':
            return [
                'applyCode',                // 申请编号
                'applyDate',                // 申请日期
                'acceptCode',               // 受理编号
                'caseName',                 // 案件名称
                'actionCode'                // 申请类型
            ];
        case 'ap2000':
        case 'ap2100':
            return [
                'submCode',                 // 委托编号
                'submDate',                 // 委托时间
                'acceptCode',               // 受理编号
                'acceptDate',               // 受理时间
                'section',                  // 专业
                'submState',                // 状态
                'orgName',                  // 委托单位
                'caseName',                 // 案件名称
            ];
        case 'en3100':
        case 'en3400':
            return [
                'submCode',                 // 委托编号
                'submDate',                 // 委托时间
                'serverCode',               // 鉴定机构
                'section',                  // 专业
                'identifyCategory',         // 鉴定类别
                'submState',                // 状态
                'investigationCode',        // 现勘编号
                'caseName'                  // 案件名称
            ];
        case 'en4200':
            return [
                'submDate',                 // 委托时间
                'serverCode',               // 鉴定机构
                'investigationCode',        // 现勘编号
                'caseName'                  // 案件名称
            ];
        default:
            return [
                'submCode',                 // 委托编号
                'acceptCode',               // 受理编号
                'acceptDate',               // 受理时间
                'caseName',                 // 案件名称
                'urgentLevel',              // 紧急程度
                'expireState',              // 到期情况
                'orgName'                   // 委托单位
            ];
    }
};

export default scMapping;
