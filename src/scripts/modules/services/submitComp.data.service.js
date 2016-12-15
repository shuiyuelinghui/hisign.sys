import cookie from 'js-cookie';

export default class SubmitCompDataService {
    constructor(SYS_URL, ALIMS_URL, UtilityService) {
        this.utilityService = UtilityService;
        this.alimsUrl = ALIMS_URL;
        this.sysUrl = SYS_URL;
        this.basicInfo = {};
        this.extralInfo = {};
        this.resultData = {};
        this.userId = cookie.get('userId');

        //初始化数据
        let comApprove = {
                result: '审批结果：',
                agree: '审批通过',
                reject: '审批不通过',
                time: '审批时间：',
                opinion: '审批意见：',
                imageUrl: './assets/images/add_approve_opinion.png',
                approveName: '审核',
                submitName: '提交'
            },
            comDelay = {
                opinion: '延期原因：',
                delayDate: '延期天数：',
                approvePerson: '科长审核人：',
                imageUrl: './assets/images/add_apply_reason.png',
                approveName: '申请',
                submitName: '提交'
            },
            comHalf = {
                opinion: '中止原因：',
                approvePerson: '授权签字人：',
                imageUrl: './assets/images/add_apply_reason.png',
                approveName: '申请',
                submitName: '提交'
            },
            comStop = {
                opinion: '终止原因：',
                approvePerson: '技术负责人：',
                imageUrl: './assets/images/add_apply_reason.png',
                approveName: '申请',
                submitName: '提交'
            },
            comDoc = {
                projectResult: '是否认可项目：',
                agreeProject: '是',
                rejectProject: '否',
                result: '审批结果：',
                agree: '审批通过',
                reject: '审批不通过',
                opinion: '审批意见：',
                imageUrl: './assets/images/add_approve_opinion.png',
                approveName: '审核',
                submitName: '提交'
            };
        this.submitCompData = {
            //staticFieldData: 静态字段数据
            //dynamicData:通过接口取得的数据
            //跨级审批
            '0201': {
                staticFieldData: comApprove,
                dynamicData: {
                    submissionData: null,
                    opinion: null,
                }
            },
            //预受理
            '0301': {
                staticFieldData:  Object.assign({},comApprove,{
                    agree: '同意预受理',
                    reject: '不予预受理'
                })
            },
            //预受理审核
            '0401': {
                staticFieldData:  Object.assign({},comApprove,{
                    agree: '同意预受理意见，不予受理此案件',
                    reject: '不同意预受理意见，受理此案件'
                })
            },
            //受理登记
            '0501': {
                staticFieldData: {
                    result: '受理结果：',
                    agree: '受理通过',
                    reject: '受理不通过',
                    time: '审批时间：',
                    appointTime: '约定期限：',
                    pickupPerson: '收检人：',
                    opinion: '受理意见',
                    imageUrl: './assets/images/add_accept_opinion.png',
                    approveName: '受理',
                    submitName: '提交'
                }
            },
            //收检延期
            '0602': {
                staticFieldData:  comDelay
            },
            //检验延期
            '0704': {
                staticFieldData:  comDelay
            },
            //检验中止
            '0705': {
                staticFieldData:  comHalf
            },
            //检验终止
            '0706': {
                staticFieldData:  comStop
            },
            //文书拟稿
            '0802': {
                staticFieldData:  {
                    projectResult: '是否认可项目：',
                    agreeProject: '是',
                    rejectProject: '否',
                    approvePerson: '鉴定复核人：',
                    imageUrl: './assets/images/add_doc_opinion.png',
                    approveName: '呈批',
                    submitName: '提交'
                }

            },
            //文书延期
            '0804': {
                staticFieldData:  comDelay
            },
            aaa
            //文书终止
            '0805': {
                staticFieldData: Object.assign({}, comStop, {
                    approvePerson: '审批人：'
                })
            },
            //鉴定复核
            '0901': {
                staticFieldData: Object.assign({}, comDoc, {
                    handWork: '工作转向：',
                    authorPerson: '指定授权人签字',
                    techPerson: '指定技术负责人'
                }),
                function:{
                    fetchSubmissionData: function() {
                    this.bbbb= res;
                    },
                    fetchSubmissionData1: function () {
                        this.aaa= res;

                    }
                }
            },
            //授权审批
            '1001': {
                staticFieldData:  comDoc
            },
            //技术审批
            '1003': {
                staticFieldData:  comDoc
            },
            //程序审批
            '1101': {
                staticFieldData: Object.assign({}, comDoc, {
                    leaderApprove: '是否领导审批：',
                    agreeLeader: '是',
                    rejectLeader: '否'
                })
            },
            //领导审批
            '1201': {
                staticFieldData: comDoc
            },
            //提交归档
            '1401': {
                staticFieldData:{
                    publishResult: '是否发放:',
                    agree: '发放',
                    reject: '暂不发放',
                    time: '归档日期:',
                    imageUrl: './assets/images/add_approve_opinion.png',
                    approveName: '审核',
                    submitName: '提交'
                }
            },
            //确认归档
            '1501': {
                staticFieldData:{
                    opinion: '确认归档意见：',
                    place: '档案归档位置：',
                    imageUrl: './assets/images/add_approve_opinion.png',
                    approveName: '审核',
                    submitName: '提交'
                }
            },
            //确认归档
            '1501': {
                staticFieldData:{
                    opinion: '确认归档意见：',
                    place: '档案归档位置：',
                    imageUrl: './assets/images/add_approve_opinion.png',
                    approveName: '审核',
                    submitName: '提交'
                }
            },



            '1700': 'ap1800',//业务科长审核
            '1800': 'ap1803' //业务主任审批
        };

    }


    //获取预受弹窗理数据
    fetchOpinionData (id) {
        return this.utilityService.asyncGet(this.alimsUrl+'/circualtions/'+id +'/latest');
    }

    fetchApproveTpl(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysopinions/selectlist',params);
    }

    submitApprove(params, urlIndex) {
        var targetUrl = ['examineSubmit','postponeSubmit', 'abortendSubmit'];
        return this.utilityService.asyncPost(this.alimsUrl+'/submissions/' + targetUrl[urlIndex], params);
    }

    submitSection(params, index) {
        var targetUrl = ['','/postpones', '/abortends'];
        return this.utilityService.asyncPost(this.alimsUrl + targetUrl[index] + '/examineSubmit', params);
    }


    fetchApprovalDetail(id) {
        return this.utilityService.asyncGet(this.alimsUrl+'/submissions/'+id+'/promptinfo');
    }

    fetchPersonbusiness(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/personbusiness/selectlist', params);
    }

    //获取收检人
    fetchPickupPerson (params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysusers/testuserbyserver', params);
    }
    // 获取中止/终止信息
    fetchAbortendsInfo (params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/abortends/getbysubm', params);
    }
    // 获取延期信息
    fetchPostponesInfo  (params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/postpones/getbysubm', params);
    }
    fetchApplyId (params, urlIndex) {
        var targetUrl = ['','/postpones', '/abortends'];
        return this.utilityService.asyncPost(this.alimsUrl + targetUrl[urlIndex] + '/getbysubm', params);
    }

    // 提交文书相关数据
    docRelaSubmit (params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/appraisalbooks/examineSubmit', params);
    }



    getResultIndex(result) {
        let isApprove = ['0201','0301','0401','0501','0701','0901','1001','1003','1101','1201','1701','1703','1705','1707','1709','1711','1801','1803','1805','1807','1809','1811'],
            isApply = ['0602','0704','0804','0705','0706','0805'],
            isPickup = ['1701','1801','0602'],
            isExamine = ['1703', '1707', '1709', '1803', '1807', '1809','0704', '0705', '0706'],
            isDoc = ['0802','0804','0805','1705', '1711', '1805', '1811'],
            isDocRela = ['0901','1001','1003','1101','1201'],      //鉴定文书相关
            isDelay = ['1701','1703','1705', '1801','1803','1805','0602', '0704', '0804'],
            isHalt = ['1707','1807' ,'0705'],
            isStop = ['1709','1711', '1809', '1811', '0706', '0805'],
            approveIndex = Array.indexOf(isApprove,result),
            applyIndex = Array.indexOf(isApply,result),
            resultIndex = {
                'index': 0,            //1：审批   2：申请
                'approveType': 0,     //1：跨级 2：预受理 3：预受理审核 4：受理  5：科长 6：主任
                'nodeType': 0,        //1：收检 2：检验 3：文书 4:文书相关
                'actionType': 0,     //1：延期 2：中止 3：终止
                'docRelaType': 0    // 1：鉴定复核 2：授权人审批 3：技术人审批 4：程序审批 5：领导审批
            };

        if (approveIndex !== -1) {
            resultIndex.index = 1;
            if(result.slice(0,2) < 6) {
                resultIndex.approveType = approveIndex + 1;
            } else if (result.slice(0,2) == '17') {
                resultIndex.approveType = 5;
            } else if (result.slice(0,2) == '18'){
                resultIndex.approveType = 6;
            }
        } else if (applyIndex !== -1) {
            resultIndex.index = 2;
            resultIndex.approveType = 0;
        }
        if ( Array.indexOf(isPickup,result) !== -1) {
            resultIndex.nodeType = 1;
        }
        if ( Array.indexOf(isExamine,result) !== -1) {
            resultIndex.nodeType = 2;
        }
        if ( Array.indexOf(isDoc,result) !== -1) {
            resultIndex.nodeType = 3;
        }
        if ( Array.indexOf(isDocRela, result) !== -1) {
            resultIndex.nodeType = 4;
            resultIndex.docRelaType = Array.indexOf(isDocRela, result) +1;
        }
        if ( Array.indexOf(isDelay,result) !== -1) {
            resultIndex.actionType = 1;
        }
        if ( Array.indexOf(isHalt,result) !== -1) {
            resultIndex.actionType = 2;
        }
        if ( Array.indexOf(isStop,result) !== -1) {
            resultIndex.actionType = 3;
        }
        return resultIndex;
    }

    calcDueDate(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysholidays/calcduedate', params);
    }

    //提交文书拟稿审批
    docSubmit(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/appraisalbooks/appraisalbookSubmit', params);

    }
    //提交文书相关审批
    docRelaSubmit(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/appraisalbooks/examineSubmit', params);
    }
    /*重新文书复核提交*/
    repeatRecheckedSubmit(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/appraisalbooks/repeatRecheckedSubmit', params);
    }
    //获取约定期限
    fetchAgreedDay(params) {
       return this.utilityService.asyncPost(this.alimsUrl+'/sections/infobycode', params);
   }
    //提交确认文档
    confirmArchiveSubmit(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/fileds/filedAck', params);
    }

    // 获取鉴定文书列表
    fetchDocListData(submId) {
        return this.utilityService.asyncGet(this.alimsUrl+'/appraisalbooks/'+submId+'/listbysubm');
    }

    //提交档案
    filedSubmit(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/fileds/filedSubmit', params);
    }
    //获取字典项
    fetchDictionary(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysdicts/rootkeybylist', params);
    }
    //获取重新复核人员
    fetchRecheckeduser(params) {
        return this.utilityService.asyncPost(this.alimsUrl+'/sysusers/recheckeduser', params);
    }
}

SubmitCompDataService.$inject = ['SYS_URL', 'ALIMS_URL', 'UtilityService'];