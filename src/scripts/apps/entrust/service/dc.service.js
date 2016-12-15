import cookie from 'js-cookie';
import store from 'store';

import _ from 'lodash';

export default class EntrustAcceptDataCenterService {

    constructor(
        $q,
        UtilityService,
        CommonDataService,
        EntrustDataService,
        ProfessionDataService,
        EntrustAcceptDtRenderService
    ) {

        // let ctd = store.get('entrustTemporaryData');
        this.$q = $q;
        this.utilityService = UtilityService;
        this.commonDataService = CommonDataService;
        this.entrustDataService = EntrustDataService;
        this.professionDataService = ProfessionDataService;
        this.dtRenderService = EntrustAcceptDtRenderService;

        this.userInfo = store.get("userInfo");

        this.resetData();

        this.isAppend = false;
    }
    
    updateSummary() {

        this.summary.evidenceCount = this.evidenceList.length;
        this.summary.memberCount = this.memberList.length;
        this.summary.memberDNACount = this.memberDNAList.length;
        this.summary.relativesRelationCount = 0;
        this.summary.nameLessCorpseCount = this.nameLessCorpseList.length;
        this.summary.sectionSummary = [];
        this.summary.sampleList1Count = 0;
        this.summary.sampleList2Count = 0;
        this.summary.sampleList1AcceptCount = 0;
        this.summary.sampleList1RejectCount = 0;
        this.summary.sampleList2AcceptCount = 0;
        this.summary.sampleList2RejectCount = 0;

        //循环处理专业和鉴定类别
        for(let i = 0; i < this.memberList.length; i++) {

            this._updateSectionSummary(this.memberList[i].sections, this.memberList[i].identifyCategorys, {"memberCount": 1});
        }

        //DNA案件人员, 收据
        let acceptMemberDNAObjs = _.filter(this.memberDNAList, {'acceptState' : "1"});
        this.summary.sampleList2AcceptCount = this.summary.sampleList2AcceptCount + acceptMemberDNAObjs.length;
        this.summary.sampleList2RejectCount = this.summary.sampleList2RejectCount + this.memberDNAList.length - acceptMemberDNAObjs.length;

        //如果包含DNA,增加DNA
        if (this.summary.memberDNACount) {
            this._updateSectionSummary(3, '', {"sampleList2Count": this.summary.memberDNACount});
        }


        //DNA案件人员亲属
        for(let i = 0; i < this.relativesRelationList.length; i++) {
            this.summary.relativesRelationCount = this.summary.relativesRelationCount + this.relativesRelationList[i].relativesList.length;

            //DNA案件人员亲属, 收据
            let acceptRelativesObjs = _.filter(this.relativesRelationList[i].relativesList, {'acceptState' : "1"});
            this.summary.sampleList2AcceptCount = this.summary.sampleList2AcceptCount + acceptRelativesObjs.length;
            this.summary.sampleList2RejectCount = this.summary.sampleList2RejectCount + this.relativesRelationList[i].relativesList.length - acceptRelativesObjs.length;

        }

        if (this.summary.relativesRelationCount) {
            this._updateSectionSummary(3, '', {"sampleList2Count": this.summary.relativesRelationCount});
        }

        //无名尸
        let acceptnameLessCorpseObjs = _.filter(this.nameLessCorpseList, {'acceptState' : "1"});
        this.summary.sampleList2AcceptCount = this.summary.sampleList2AcceptCount + acceptnameLessCorpseObjs.length;
        this.summary.sampleList2RejectCount = this.summary.sampleList2RejectCount + this.nameLessCorpseList.length - acceptnameLessCorpseObjs.length;

        if (this.summary.nameLessCorpseCount) {
            this._updateSectionSummary(3, '', {"sampleList2Count": this.summary.nameLessCorpseCount});
        }

        for(let i = 0; i < this.evidenceList.length; i++) {

            //非DNA检材样本
            let sampleList = this.evidenceList[i].sampleList;
            sampleList = sampleList ? sampleList : [];
            for(let j = 0; j < sampleList.length; j++) {
                if(sampleList[j].sampleFlag == 1) {
                    this.summary.sampleList1Count++;
                    this._updateSectionSummary(sampleList[j].sections, sampleList[j].identifyCategorys, {"sampleList1Count": 1});
                }
                else {
                    this.summary.sampleList2Count++;
                    this._updateSectionSummary(sampleList[j].sections, sampleList[j].identifyCategorys, {"sampleList2Count": 1});
                }

            }

            let sampleList1AcceptObjs = _.filter(sampleList, {'acceptState' : "1", 'sampleFlag' : "1"});
            this.summary.sampleList1AcceptCount = this.summary.sampleList1AcceptCount + sampleList1AcceptObjs.length;

            let sampleList1RejectObjs = _.filter(sampleList, {'acceptState' : "2", 'sampleFlag' : "1"});
            this.summary.sampleList1RejectCount = this.summary.sampleList1RejectCount + sampleList1RejectObjs.length;

            let sampleList2AcceptObjs = _.filter(sampleList, {'acceptState' : "1", 'sampleFlag' : "2"});
            this.summary.sampleList2AcceptCount = this.summary.sampleList2AcceptCount + sampleList2AcceptObjs.length;

            let sampleList2RejectObjs = _.filter(sampleList, {'acceptState' : "2", 'sampleFlag' : "2"});
            this.summary.sampleList2RejectCount = this.summary.sampleList2RejectCount + sampleList2RejectObjs.length;


            //DNA检材样本
            let sampleDNAList = this.evidenceList[i].sampleDNAList;

            if(!this.utilityService.isEmpty(sampleDNAList) && sampleDNAList.length) {
                //DNA全部为样本
                this.summary.sampleList2Count = this.summary.sampleList2Count + sampleDNAList.length;
                this._updateSectionSummary(3, '', {"sampleList2Count": sampleDNAList.length});

                let sampleDNAAcceptObjs = _.filter(sampleDNAList, {'acceptState' : "1"});
                this.summary.sampleList2AcceptCount = this.summary.sampleList2AcceptCount + sampleDNAAcceptObjs.length;
                this.summary.sampleList2RejectCount = this.summary.sampleList2RejectCount + sampleDNAList.length - sampleDNAAcceptObjs.length;
            }

        }

    }

    //TODO:性能问题??
    watchChange(scope) {
        scope.$watch(() => {
            return JSON.stringify(this.evidenceList) + JSON.stringify(this.evidenceList.sampleList)
                + JSON.stringify(this.memberList) + JSON.stringify(this.evidenceList.sampleDNAList)
                + JSON.stringify(this.memberDNAList) + JSON.stringify(this.nameLessCorpseList)
                + JSON.stringify(this.relativesRelationList);
        }, () => {
            this.updateSummary();
        },true);
    }

    _updateSectionSummary(section, identityCategory, options) {

        let sectionName = '';
        let identifyCategoryName = '';

        if(!this.utilityService.isEmpty(section)) {
            sectionName = this.dictMapping['ProfessionList'][section];

        }

        if(!this.utilityService.isEmpty(identityCategory)) {
            identifyCategoryName = this.dictMapping['IdentifyCategorys'][identityCategory];
            if(this.utilityService.isEmpty(identifyCategoryName)) {
                identifyCategoryName = '';
            }

        }

        let sectionSummary = _.find(this.summary.sectionSummary, { 'sectionName': sectionName, 'identifyCategoryName': identifyCategoryName });

        if(_.isEmpty(sectionSummary)) {

            sectionSummary = {
                'sectionName': sectionName,
                'identifyCategoryName': identifyCategoryName,
                'memberCount' : 0,
                'memberDNACount': 0,
                'nameLessCorpse': 0,
                'sampleList1Count': 0,
                'sampleList2Count': 0,
                'relativesRelationCount': 0

            };

            this.summary.sectionSummary.push(sectionSummary);
        }

        _.each(options, function(value, key) {
            sectionSummary[key] = sectionSummary[key] + value;
        });


    }



    prepareDictMapping() {
        let promises = [],
            deferred = this.$q.defer();

        // Make an asynchronous action from each arg
        //专业和鉴定类别 - 放到第一项,需要特殊处理
        let params = {
            serverCode: this.submission.serverCode,
            noUserId: true
        };
        promises.push(this.commonDataService.fetchProfessionList(params));

        promises.push(this.entrustDataService.fetchSubmitReasonModel(this.submission.serverCode));

        //送检人
        let paramsSubmittedBy = {
            orgId : this.userInfo.orgId
        };
        promises.push(this.entrustDataService.getSubmittedBy(paramsSubmittedBy));

        //字典项
        promises.push(this.entrustDataService.fetchDictionary());
        this.$q.all(promises).then((resp) => { //并行处理所有字典项和专业
            let i = 0;
            resp.forEach((item) => {
                if (i == 0) {
                    this.dictMapping['ProfessionList'] = [];
                    for (let pItem of item) {
                        this.dictMapping['ProfessionList'][pItem.section] = pItem.sectionName;
                    }
                } else if (i == 1) {
                    this.dictMapping['submitReasonList'] = [];
                    for(let sItem of item) {
                        let tItem = {};
                        tItem.dictKey = sItem.id;
                        tItem.dictValue1 = sItem.content;
                        //TODO：this.dictMapping['submitReasonList'][sItem.id] = sItem.content:取不到值
                        this.dictMapping['submitReasonList'].push(tItem);
                    }
                } else if (i == 2) {
                    this.dictMapping['submittedByInfo'] = [];
                    this.submittedByInfo = item;//选择送检人时用
                    for (let sbItem of item) {
                        let subItem = {};
                        subItem.dictKey = sbItem.userId;
                        subItem.dictValue1 = sbItem.userName;
                        this.dictMapping['submittedByInfo'].push(subItem);
                    }
                } else {
                    this.dictData = item;
                    this._generateDictMapping(item);
                }
                i++;
            });

            // Return new promise that is resolved
            return this.$q.resolve(resp);
        }).then(() => { //并行处理鉴定类别
            // Return new promise that is resolved
            return this._generateIdentifyDict();
        }, function(error) {
            console.log("处理字典mapping失败: " + error);

        }).then(() => {
            deferred.resolve();
        });

        return deferred.promise;
    }

    _generateDictMapping(dicts) {
        for (var dict in dicts) {
            this.dictMapping[dict] = [];
            dicts[dict].forEach((item) => {
                this.dictMapping[dict][item.dictKey] = item.dictValue1;
            });
        }
    }

    _generateIdentifyDict() {
        this.dictMapping['IdentifyCategorys'] = [];
        let identifyPromises = [];
        for (let pKey in this.dictMapping['ProfessionList']) {
            let paramsProfesssion = {
                serverCode: this.submission.serverCode,
                section: pKey
            };
            identifyPromises.push(this.professionDataService.fetchCategoryList(paramsProfesssion));
        }

        return this.$q.all(identifyPromises).then((resp) => { //并行处理鉴定类别
            resp.forEach((item) => {
                for (var cat of item) {
                    this.dictMapping['IdentifyCategorys'][cat.numberCode] = cat.name;
                }
            });
            // Return new promise that is resolved
            return this.$q.resolve(resp.length);

        }, function(error) {
            console.log("并行处理鉴定类别失败:" + error);
        });
    }

    restoreEvidenceListData(index, outerIndex) {
        let sampleList = this.evidenceList[outerIndex]['sampleList'],
            sampleDNAList = this.evidenceList[outerIndex]['sampleDNAList'],
            sampleListLen = sampleList ? sampleList.length : -1;

        if(sampleListLen < 0) {
            return {
                key: 'sampleDNAList',
                index: index
            }
        } else {
            if(index <= sampleListLen-1) {
                return {
                    key: 'sampleList',
                    index: index
                }
            } else {
                return {
                    key: 'sampleDNAList',
                    index: index - sampleListLen
                }
            }
        }
    }

    restoreRelativesRelationListData(index) {
        let count = 0;
        for(let i = 0, len = this.relativesRelationList.length; i < len; i++) {
            let tempLen = count + this.relativesRelationList[i]['relativesList'].length;
            if(index <= tempLen-1) {
                return {
                    key: 'relativesList',
                    index: index - count,
                    outerIndex: i
                };
            }
            count = tempLen;
        }
    }

    buildSubmissionFileData() {
        this.submission.documentList = [];
        this.submission.documentList = this.fileSlideProvinceDataItem.concat(
            this.fileSlideCityDataItem,
            this.fileSlideOtherDataItem
        );
    }

    buildFileSubmitData(fileData, resultData, flag, fileDataKey) {

        let objectId;
        if(parseInt(flag) <= 3) objectId = this.submissionId;
        if(parseInt(flag) === 4) objectId = this.sampleId;

        for(let i = 0, len = fileData.length; i < len; i++) {
            this[fileDataKey].push({
                type: fileData[i].imgType ? '2' : '1',
                objectId: this.utilityService.isEmpty(objectId) ? '' : objectId,
                name: fileData[i].name,
                path: resultData[i].id,
                description: '',
                flag: flag,
                filesPrefixUuid: ''
            });
        }

        this.buildSubmissionFileData(flag);
    }

    splitFileData(scope) {
        let files = this.submission.documentList;
        for(let i = 0, len = files.length; i < len; i++) {
            if(files[i].flag === '1') {
                this.fileSlideProvinceDataItem.push(files[i]);
            } else if(files[i].flag === '2') {
                this.fileSlideCityDataItem.push(files[i]);
            } else if(files[i].flag === '3') {
                this.fileSlideOtherDataItem.push(files[i]);
            }
        }

        scope.$broadcast('fileSlideDataPrepared');
    }

    //构建compeleInfo数据
    buildData(data) {
        for (let key in data) {
            if (this.utilityService.isArray(data[key])) {
                for (let val of data[key]) {
                    for(let subkey in val) {
                        if (this.utilityService.isArray(val[subkey])) {
                            this.buildData(val[subkey]);
                        }
                    }
                    this.convertLongDateToStr(val);
                }
            } else {
                this.convertLongDateToStr(data[key]);
            }
        }
    }

    convertLongDateToStr(val) {
        for (let subKey in val) {
            if (this.utilityService.isDate(subKey)) {

                val[subKey+"Str"] = this.utilityService.formatDate(val, "YYYY-MM-DD");

            }
        }
    }

    // 关联被鉴定人
    connectMemberList(section, category) {
        let memberList = [];

        category = category === 'undefined' ? 'null': category;

        for(let i = 0, len = this.memberList.length; i < len; i++) {
            let member = this.memberList[i],
                identifyCategorys = member.identifyCategorys;

            identifyCategorys = this.utilityService.isEmpty(identifyCategorys) ? 'null' : identifyCategorys;
            if(section === member.sections && category === identifyCategorys) {
                memberList.push(member.name);
            }
        }

        return memberList;
    }

    // 检查数据完整性
    checkProfessionCategory() {
        let evidenceList = this.evidenceList,
            category = [];

        for(let i = 0, outerLen = evidenceList.length; i < outerLen; i++) {
            let sampleList = evidenceList[i].sampleList;
            for(let j = 0, innerLen = sampleList.length; j < innerLen; j++) {
                let item = sampleList[j];
                if(item.sections === '2' || item.sections === '10') {
                    category.push({
                        sections: item.sections,
                        identifyCategorys: item.identifyCategorys
                    });
                }
            }
        }

        return category;
    }

    isMemberListLegal() {
        let memberList = this.memberList,
            evidenceList = this.evidenceList;

        for(let i = 0, outerLen = memberList.length; i < outerLen; i++) {
            let item = memberList[i],
                legal = false;

            if(item.sections === '2' || item.sections === '10') continue;

            for(let j = 0, innerLen = evidenceList.length; j < innerLen; j++) {
                let index = this.utilityService.findArrayIndexByObjValue(evidenceList[j].sampleList, 'sections', item.sections);
                if(index >= 0 && item.identifyCategorys === evidenceList[j].sampleList[index].identifyCategorys) {
                    legal = true;
                    break;
                }
            }

            if(!legal) {
                this.submitErrorType = 3;
                this.submitErrorText.push(this.dtRenderService.getDisplayName('sections', item.sections, this.dictMapping));
            }
        }

        return !this.submitErrorText.length;
    }

    isProfessionLegal(category) {
        if(!category.length) return true;

        let counter = 0;

        for(let i = 0, outerLen = category.length; i < outerLen; i++) {
            let sections = category[i].sections,
                identifyCategorys = category[i].identifyCategorys;

            for(let j = 0, innerLen = this.memberList.length; j < innerLen; j++) {
                let item = this.memberList[j];
                if(item.sections === sections && item.identifyCategorys === identifyCategorys) {
                    counter++;
                    break;
                }
            }
        }

        this.submitErrorType = 2;
        return (category.length === counter);
    }

    isEvidenceLegal() {
        let evidenceList = this.evidenceList.slice(),
            result = true;

        for(let i = 0, len = evidenceList.length; i < len; i++) {
            let evi = evidenceList[i];
            if(this.utilityService.isEmpty(evi.sampleList)) evi.sampleList = [];
            if(this.utilityService.isEmpty(evi.sampleDNAList)) evi.sampleDNAList = [];

            if(evi.sampleList.length + evi.sampleDNAList <= 0) {
                this.submitErrorText.push(evi.eviName);
                this.submitErrorType = 1;
                result = false;
            }
        }

        return result;
    }

    checkDataNoEmpty() {
        return (
            this.evidenceList.length ||
            this.memberList.length ||
            this.memberDNAList.length ||
            this.relativesRelationList.length ||
            this.nameLessCorpseList.length
        );
    }

    checkDataCompleteness() {
        this.submitErrorText = [];
        if(!this.checkDataNoEmpty()) {
            this.submitErrorType = 4;
            return false;
        }
        if(!this.isEvidenceLegal()) return false;

        return (
            this.isProfessionLegal(this.checkProfessionCategory()) && this.isMemberListLegal()
        );
    }

    // 检查检材信息是否都为拒绝
    checkEvidenceSampleAllReject() {
        let evidenceList = this.evidenceList,
            memberDNAList = this.memberDNAList,
            relativesRelationList = this.relativesRelationList,
            nameLessCorpseList = this.nameLessCorpseList,
            allReject = true,
            isAllReject = (data) => {
                for(let i = 0, len = data.length; i < len; i++) {
                    if(data[i].dispostMethod !== -1) {
                        allReject = false;
                        break;
                    }
                }
            };

        if(
            !evidenceList.length &&
            !memberDNAList.length &&
            !relativesRelationList.length &&
            !nameLessCorpseList.length
        ) {
            return false;
        }

        for(let i = 0, len = evidenceList.length; i < len; i++) {
            let sampleList = evidenceList[i].sampleList,
                sampleDNAList = evidenceList[i].sampleDNAList;

            isAllReject(sampleList);
            isAllReject(sampleDNAList);
        }

        for(let i = 0, len = relativesRelationList.length; i < len; i++) {
            let relativesList = relativesRelationList[i];
            isAllReject(relativesList);
        }

        isAllReject(memberDNAList);
        isAllReject(nameLessCorpseList);

        return allReject;
    }

    buildAcceptProfessionList() {
        let data = this.submission;

        this.professionList.push({
            profession: {
                name: data.sectionName,
                code: data.section
            },
            category: {
                name: data.identifyCategoryName,
                code: data.identifyCategory
            },
            require: {
                name: '',
                code: ''
            }
        });
    }

    setData(data) {
        this.submission = data && data.submission ? data.submission : {};
        this.caseInfo = data && data.caseInfo ? data.caseInfo : {};
        this.evidenceList = data ? data.evidenceList : [];
        this.memberList = data ? data.memberList : [];
        this.memberDNAList = data ? data.memberDNAList : [];
        this.relativesRelationList = data ? data.relativesRelationList : [];
        this.nameLessCorpseList = data ? data.nameLessCorpseList : [];
    }

    getData() {
        let submission = this.submission,
            caseInfo = this.caseInfo,
            evidenceList = this.evidenceList,
            memberList = this.memberList,
            memberDNAList = this.memberDNAList,
            relativesRelationList = this.relativesRelationList,
            parentAlrightList = this.parentAlrightList,
            nameLessCorpseList = this.nameLessCorpseList,
            userId = this.userId;

        return {
            userId,
            submission,
            caseInfo,
            evidenceList,
            memberList,
            memberDNAList,
            relativesRelationList,
            parentAlrightList,
            nameLessCorpseList
        };
    }

    resetData() {
        // 委托信息
        this.submission = {};

        // 案件信息
        this.caseInfo = {};

        // 物证信息
        this.evidenceList = [];
        this.evidenceListItem = {};
        this.sampleListItem = {};
        this.sampleDNAListItem = {};

        // 被鉴定人
        this.memberList = [];
        this.memberListItem = {};

        // DNA案件人员
        this.memberDNAList = [];
        this.memberDNAListItem = {};

        // DNA案件人员亲属
        this.relativesRelationList = [];
        this.relativesRelationListItem = {};
        this.relativesListItem = {};
        this.relativesList2ndItem = {};

        this.parentAlrightList = [];
        this.parentAlrightListItem = {};

        // DNA无名尸
        this.nameLessCorpseList = [];
        this.nameLessCorpseListItem = {};

        this.professionList = [];
        this.evidenceIndex = -1;
        this.dictMapping = {};

        // 字典项
        this.dictData = {};

        // 编辑信息
        this.mode = 'display';
        this.editOuterIndex;
        this.editIndex;
        this.editKey;
        this.editSubKey;

        this.summary = {
            evidenceCount: 0, //物证数
            sampleList1Count: 0, //检材数
            sampleList2Count: 0, //样本数
            memberCount: 0,     //被鉴定人
            memberDNACount: 0,    //DNA案件人员
            relativesRelationCount: 0, //DNA案件人员亲属
            nameLessCorpse: 0 //无名尸
        };

        // 机构信息
        this.insName = '';
        // 当前state
        this.activeState = '';

        // 委托信息附件slide数据
        this.fileSlideDataItem = [];
        this.fileSlideProvinceDataItem = [];
        this.fileSlideCityDataItem = [];
        this.fileSlideOtherDataItem = [];

        this.submitReasonList = [];

        this.submitErrorType = -1;
        this.submitErrorText = [];
        this.flag;
        this.dtActionReadonly = false;

        // 上传附件objectId
        this.submissionId;
        this.sampleId;

        // 当前添加|编辑人员类型
        this.activeMemberType;

        this.userId = cookie.get('userId');
    }
}

EntrustAcceptDataCenterService.$inject = [
    '$q',
    'UtilityService',
    'CommonDataService',
    'EntrustDataService',
    'ProfessionDataService',
    'EntrustAcceptDtRenderService'
];
