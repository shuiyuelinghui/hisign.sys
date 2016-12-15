const detailDtConfig = {

    dtSampleListTitle: [
        {title:'序号', 'defaultContent': ''},
        {title:'类别', 'defaultContent': ''},
        {title:'处置方法', 'defaultContent': ''},
        {title:'受理编号', 'defaultContent': ''},
        {title:'检材样本名称', 'defaultContent': ''},
        {title:'关联被鉴定人', 'defaultContent': ''},
        {title:'鉴定要求', 'defaultContent': ''},
        {title:'数量', 'defaultContent': ''},
        {title:'单位', 'defaultContent': ''},
        {title:'提取部位', 'defaultContent': ''},
        {title:'提取方法', 'defaultContent': ''},
        {title:'性状/属性', 'defaultContent': ''},
        {title:'包装情况', 'defaultContent': ''},
        {title:'提取人', 'defaultContent': ''},
        {title:'提取时间', 'defaultContent': ''},
        {title:'操作', 'defaultContent': ''}
    ],
    dtSampleListKey: [
        'sampleFlag',
        'dispostMethod',
        'sampleAcceptCode',
        'sampleName',
        'memberName',
        'requestProjects',
        'amount',
        'measuringUnit',
        'collectPart',
        'collectMethod',
        'characters',
        'packingSituation',
        'collector',
        'collectTimeStr'
    ],

    dtMemberListTitle: [
        {title:'序号', 'defaultContent': ''},
        {title:'被鉴定人编号', 'defaultContent': ''},
        {title:'姓名', 'defaultContent': ''},
        {title:'鉴定要求', 'defaultContent': ''},
        {title:'国籍', 'defaultContent': ''},
        {title:'证件类型', 'defaultContent': ''},
        {title:'性别', 'defaultContent': ''},
        {title:'证件号码', 'defaultContent': ''},
        {title:'出生日期', 'defaultContent': ''},
        {title:'年龄', 'defaultContent': ''},
        {title:'籍贯', 'defaultContent': ''},
        {title:'民族', 'defaultContent': ''},
        {title:'文化程度', 'defaultContent': ''},
        {title:'电话', 'defaultContent': ''},
        {title:'职业', 'defaultContent': ''},
        {title:'工作单位', 'defaultContent': ''},
        {title:'现住址', 'defaultContent': ''},
        {title:'操作', 'defaultContent': ''}
    ],
    dtMemberListKey: [
        'memberAcceptCode',
        'name',
        'requestProjects',
        'nationality',
        'credentialType',
        'sex',
        'identityCardNumber',
        'birthStr',
        'age',
        'pob',
        'race',
        'education',
        'telephone',
        'career',
        'department',
        'addressDetail'
    ],

    dtMemberDNAListTitle: [
        {title:'序号', 'defaultContent': ''},
        {title:'受理编号', 'defaultContent': ''},
        {title:'姓名', 'defaultContent': ''},
        {title:'处置方法', 'defaultContent': ''},
        {title:'鉴定要求', 'defaultContent': ''},
        {title: '类别', 'defaultContent': ''},
        {title:'人员类型', 'defaultContent': ''},
        {title:'国籍', 'defaultContent': ''},
        {title:'证件类型', 'defaultContent': ''},
        {title:'证件号码', 'defaultContent': ''},
        {title:'出生日期', 'defaultContent': ''},
        {title:'年龄', 'defaultContent': ''},
        {title:'性别', 'defaultContent': ''},
        {title:'民族', 'defaultContent': ''},
        {title:'样本名称', 'defaultContent': ''},
        {title:'样本类型', 'defaultContent': ''},
        {title:'是否FTA卡', 'defaultContent': ''},
        {title:'提取时间', 'defaultContent': ''},
        {title:'提取人', 'defaultContent': ''},
        {title:'提取部位', 'defaultContent': ''},
        {title:'提取方法', 'defaultContent': ''},
        {title:'数量', 'defaultContent': ''},
        {title:'单位', 'defaultContent': ''},
        {title:'包装情况', 'defaultContent': ''},
        {title:'操作', 'defaultContent': ''}
    ],
    dtMemberDNAListKey: [
        'sampleAcceptCode',
        'name',
        'dispostMethod',
        'requestProjects',
        'involvedRelationship',
        'memberType',
        'nationality',
        'credentialType',
        'identityCardNumber',
        'birthStr',
        'age',
        'sex',
        'race',
        'sampleName',
        'sampleType',
        'isFta',
        'collectTimeStr',
        'collector',
        'collectPart',
        'collectMethod',
        'amount',
        'measuringUnit',
        'packingSituation'
    ],

    dtRelativesRelationListTitle: [
        {title:'序号', 'defaultContent': ''},
        {title:'受理编号', 'defaultContent': ''},
        {title:'姓名', 'defaultContent': ''},
        {title:'处置方法', 'defaultContent': ''},
        {title:'鉴定要求', 'defaultContent': ''},
        {title:'类别', 'defaultContent': ''},
        {title:'亲属关系', 'defaultContent': ''},
        {title:'亲属与目标关系', 'defaultContent': ''},
        {title:'人员类型', 'defaultContent': ''},
        {title:'国籍', 'defaultContent': ''},
        {title:'证件类型', 'defaultContent': ''},
        {title:'身份证号码', 'defaultContent': ''},
        {title:'出生日期', 'defaultContent': ''},
        {title:'年龄', 'defaultContent': ''},
        {title:'性别', 'defaultContent': ''},
        {title:'民族', 'defaultContent': ''},
        {title:'样本名称', 'defaultContent': ''},
        {title:'样本类型', 'defaultContent': ''},
        {title:'是否FTA卡', 'defaultContent': ''},
        {title:'提取时间', 'defaultContent': ''},
        {title:'提取人', 'defaultContent': ''},
        {title:'提取部位', 'defaultContent': ''},
        {title:'提取方法', 'defaultContent': ''},
        {title:'数量', 'defaultContent': ''},
        {title:'单位', 'defaultContent': ''},
        {title:'包装情况', 'defaultContent': ''},
        {title:'操作', 'defaultContent': ''}
    ],
    dtRelativesRelationListKey: [
        'sampleAcceptCode',
        'name',
        'dispostMethod',
        'requestProjects',
        'relativesFlag',
        'relationship',
        'targetRel',
        'memberType',
        'nationality',
        'credentialType',
        'identityCardNumber',
        'birthStr',
        'age',
        'sex',
        'race',
        'sampleName',
        'sampleType',
        'isFta',
        'collectTimeStr',
        'collector',
        'collectPart',
        'collectMethod',
        'amount',
        'measuringUnit',
        'packingSituation'
    ],

    dtNameLessCorpseListTitle: [
        {title:'序号', 'defaultContent': ''},
        {title:'受理编号', 'defaultContent': ''},
        {title:'姓名', 'defaultContent': ''},
        {title:'处置方法', 'defaultContent': ''},
        {title:'鉴定要求', 'defaultContent': ''},
        {title:'人员类型', 'defaultContent': ''},
        {title:'国籍', 'defaultContent': ''},
        {title:'身份证号码', 'defaultContent': ''},
        {title:'大致年龄', 'defaultContent': ''},
        {title:'性别', 'defaultContent': ''},
        {title:'民族', 'defaultContent': ''},
        {title:'样本名称', 'defaultContent': ''},
        {title:'样本类型', 'defaultContent': ''},
        {title:'是否FTA卡', 'defaultContent': ''},
        {title:'提取时间', 'defaultContent': ''},
        {title:'提取人', 'defaultContent': ''},
        {title:'提取部位', 'defaultContent': ''},
        {title:'提取方法', 'defaultContent': ''},
        {title:'数量', 'defaultContent': ''},
        {title:'单位', 'defaultContent': ''},
        {title:'包装情况', 'defaultContent': ''},
        {title:'操作', 'defaultContent': ''}
    ],
    dtNameLessCorpseListKey: [
        'sampleAcceptCode',
        'name',
        'dispostMethod',
        'requestProjects',
        'memberType',
        'nationality',
        'identityCardNumber',
        'age',
        'sex',
        'race',
        'sampleName',
        'sampleType',
        'isFta',
        'collectTimeStr',
        'collector',
        'collectPart',
        'collectMethod',
        'amount',
        'measuringUnit',
        'packingSituation'
    ]

};

export default detailDtConfig;