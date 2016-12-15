const docMapping = (nodeCode) => {
    switch(nodeCode) {

        case '0301':
            return [
                'bookProxy'                 //委托书
            ];

        case '0302':
            return [
                'bookRefusedAcceptance'    //拒绝受理回执单
            ];

        case '0400':
            return [
                'bookRefusedAcceptance'     //拒绝受理回执单
            ];

        case '0401':
            return [
                'bookProxy'                 //委托书
            ];

        case '0402':
            return [
                'bookRefusedAcceptance'    //拒绝受理回执单
            ];

      
        case '0500':
            return [
                'bookConfirmation',        // 鉴定受理登记表
                'acceptCode',              // 受理编号条码
                'sampleTag',               // 检材样本标签
                'registration'             // 流转登记表
            ];

        case '0501':
            return [
                'bookConfirmation',        // 鉴定受理登记表
                'acceptCode',              // 受理编号条码
                'sampleTag',               // 检材样本标签
                'registration'             // 流转登记表
            ];

        case '0502':
            return [
                'bookRefusedAcceptance'    //拒绝受理回执单
            ];

        case '0600':
            return [
                'registration'             // 流转登记表
            ];

        case '0601':
            return [
                'registration'             // 流转登记表
            ];

        case '0602':
            return [
                'registration'             // 延期申请审批单
            ];

        case '0700':
            return [
                'bookProxy',                // 委托书
                'bookInspection',
                'bookConfirmation',         // 鉴定受理登记表
                'sampleInfo',               // 检材样本
                'picture',                  // 图谱
                'footprint'                 // 留痕
            ];
         case '0800':
            return [
                'examineRecord',            // 检验记录
                'bookConfirmation',         // 鉴定受理登记表
                'bookProxy',                // 委托书
                'sampleInfo',               // 检材样本
                'picture',                  // 图谱
                'footprint'                 // 留痕
            ];
        case '1300':
            return [
                'examineRecord',            // 检验记录
                'bookProxy',                // 委托书
                'bookConfirmation',         // 鉴定受理登记表
                'picture',                  // 图谱
                'footprint'                 // 留痕
            ];
        case '1390':
            return [
                'bookAppraisal'            // 鉴定文书
            ];
        case '1391':
            return [
                'bookDraft'            // 鉴定文书
            ];
        case '1392':
            return [
                'bookApproval'            // 鉴定文书
            ];
        case '1400':
            return [
                'bookCover',               // 目录
                'bookDirectory',           // 封面
                'bookApproval',
                'bookProxy',
                'bookConfirmation',        // 鉴定受理登记表
                'examineRecord',           // 检验记录
                'picture',                 // 图谱
                'footprint'                // 留痕
            ];
        default :
            return [
                'bookAppraisal',            // 鉴定文书
                'bookApproval',             // 审批单
                'examineRecord',            // 检验记录
                'bookConfirmation',         // 鉴定受理登记表
                'bookProxy',                // 委托申请书
                'sampleInfo',               // 检材人员
                'picture',                  // 图谱
                'footprint'                 // 留痕
            ];
    }
};

export default docMapping;
