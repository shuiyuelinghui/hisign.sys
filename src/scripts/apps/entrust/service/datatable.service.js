import _ from 'underscore';

export default class DataTableService {

    constructor(
        $timeout,
        $compile,
        UtilityService,
        AdmindesignsService,
        EntrustAcceptDataCenterService,
        EntrustAcceptDtRenderService
    ) {
        this.$timeout = $timeout;
        this.$compile = $compile;
        this.utilityService = UtilityService;
        this.admindesignsService = AdmindesignsService;
        this.dcService = EntrustAcceptDataCenterService;
        this.dtRenderService = EntrustAcceptDtRenderService;
    }

    getActionContent(index, preview, readonly = false, hasNoDelete = false) {
        let actionDel = hasNoDelete ? '' : '<span class="fa fa-trash-o" data-index="'+index+'"></span> ';
        if(preview && !readonly) {
            return (
                '<span class="fa fa-edit" data-index="'+index+'"></span> '+
                '<span class="fa fa-cloud-download" data-index="'+index+'"></span> '+
                '<span class="fa fa-picture-o" data-index="'+index+'"></span> '+
                '<span class="fa fa-camera" data-index="'+index+'"></span> '+
                '<span class="fa fa-copy" data-index="'+index+'"></span> '+
                actionDel +
                '<span class="fa fa-level-up" data-index="'+index+'"></span> '+
                '<span class="fa fa-level-down" data-index="'+index+'"></span> '
            );
        } else if(preview && readonly) {
            return (
            	'<span class="fa fa-file-text" data-index="'+index+'"></span> '+
                '<span class="fa fa-cloud-download" data-index="'+index+'"></span> '+
                '<span class="fa fa-picture-o" data-index="'+index+'"></span> '
            );
        } else if(!preview && !readonly) {
            return (
                '<span class="fa fa-edit" data-index="'+index+'"></span> '+
                '<span class="fa fa-camera" data-index="'+index+'"></span> '+
                '<span class="fa fa-copy" data-index="'+index+'"></span> '+
                actionDel +
                '<span class="fa fa-level-up" data-index="'+index+'"></span> '+
                '<span class="fa fa-level-down" data-index="'+index+'"></span> '
            );
        } else if(!preview && readonly) {
            return (
            	'<span class="fa fa-file-text" data-index="'+index+'"></span> '
            );
        }
    }

    transformData(key, data, dictMapping, category, outerIndex) {

        let dtData = [],
            activeState = this.dcService.activeState;

        for(let i = 0, outerLen = data.length; i < outerLen; i++) {
            let itemData = [],
                memberNameDisabled = false,
                hasNoDelete = false;

            if((category === 'evidenceList' || category === 'memberList') && activeState === 'app.accept') {
                if(typeof data[i].id !== 'undefined') {
                    memberNameDisabled = true;
                    hasNoDelete = true;
                }
            }

            if(activeState !== 'app.accept' && activeState.indexOf('app.entrust') < 0) {
                memberNameDisabled = true;
            }

            for(let j = 0, innerLen = key.length; j < innerLen; j++) {
                let displayContent;
                if(this.dcService.activeState === 'app.accept' && key[j] === 'dispostMethod') {
                    displayContent =
                        '<accept-switch category="'+category+'" index="'+i+'" outer-index="'+outerIndex+'" required="true"></accept-switch>';
                } else if(key[j] === 'memberName') {
                    displayContent =
                        '<dt-select-ary outer-index="'+outerIndex+'" inner-index="'+i+'" section="'+data[i].sections+'" category="'+data[i].identifyCategorys+'" disabled="'+memberNameDisabled+'" required="'+false+'"></dt-select-ary>';

                } else {
                    // let dataCopy = $.extend(true, {}, data); // 创建数据副本，避免影响提交的数据
                    // if(key[j] === 'relativesFlag' || key[j] === 'relationship') {
                    //     dataCopy[i][key[j]] = this.dcService[category][i][key[j]];
                    // }
                    displayContent = this.dtRenderService.getDisplayName(key[j], data[i][key[j]], dictMapping);
                }
                itemData.push(displayContent);
            }
            itemData.push(this.getActionContent(i, data[i].documentList.length, this.dcService.dtActionReadonly, hasNoDelete));
            itemData.unshift(i+1);
            dtData.push(itemData);
        }

        return dtData;
    }

    addToSubmitData(key) {
        let dcs = this.dcService;

        // if(!dcs.professionList.length) dcs.buildAcceptProfessionList();

        for(let i = 0, len = dcs.professionList.length; i < len; i++) {
            let item = dcs.professionList[i],
                data = Object.assign({}, dcs[key+'Item'], {
                    sections: item.profession.code,
                    identifyCategorys: item.category.code,
                    requestProjects: item.require.name,
                    documentList: dcs.fileSlideDataItem
                });

            if(dcs.mode === 'display') {
                dcs[key].push(data);
            } else if(dcs.mode === 'edit') {
                dcs[key].splice(dcs.editIndex+i+1, 0, data);
            }
        }
        if(dcs.mode === 'edit') dcs[key].splice(dcs.editIndex, 1);

        dcs[key+'Item'] = {};
        dcs.fileSlideDataItem = [];
    }
    
    addToSubmitDataDeep(key, subKey, index, isClear = true) {
        let i, len,
            dcs = this.dcService;

        if(this.utilityService.isEmpty(dcs[key+'Item'][subKey])) {
            dcs[key+'Item'][subKey] = [];
        }

        // if(!dcs.professionList.length) dcs.buildAcceptProfessionList();

        for(i = 0, len = dcs.professionList.length; i < len; i++) {
            let item = dcs.professionList[i],
                data,
                data2nd;

            if(subKey === 'sampleList' && item.profession.code === '3') continue;
            if(subKey === 'sampleDNAList' && item.profession.code !== '3') continue;

            if(subKey === 'sampleDNAList' && item.profession.code === '3') {
                Object.assign(dcs[subKey+'Item'], dcs['sampleListItem']);
            }

            data = Object.assign({}, dcs[subKey+'Item'], {
                sections: item.profession.code,
                identifyCategorys: item.category.code,
                requestProjects: item.require.name,
                documentList: dcs.fileSlideDataItem
            });

            if(dcs.mode === 'display') {
                dcs[key+'Item'][subKey].push(data);
            } else if(dcs.mode === 'edit') {
                dcs[key+'Item'][subKey].splice(i, 1, data);
            }

            if(key === 'relativesRelationList' && dcs[key+'Item']['relationship'] !== '1') {
                data2nd = Object.assign({}, dcs[subKey+'2ndItem'], {
                    sections: item.profession.code,
                    identifyCategorys: item.category.code,
                    requestProjects: item.require.name,
                    documentList: dcs.fileSlideDataItem
                });
                if(dcs.mode === 'display') {
                    dcs[key+'Item'][subKey].push(data2nd);
                } else if(dcs.mode === 'edit') {
                    dcs[key+'Item'][subKey].splice(i+1, 1, data2nd);
                }
            }
        }

        if(this.utilityService.isEmpty(index)) {
            if(dcs.mode === 'display') {
                dcs[key].push(dcs[key+'Item']);
            } else if(dcs.mode === 'edit') {
                dcs[key].splice(dcs.editOuterIndex, 1, dcs[key+'Item']);
            }
        } else {
            if(this.utilityService.isEmpty(dcs[key][index][subKey]) ) {
                dcs[key][index][subKey] = [];
            }
            if(dcs.mode === 'edit') {
                dcs[key][index][subKey].splice(dcs.editIndex, 1, dcs[key+'Item'][subKey]);
                dcs[key][index][subKey] = _.flatten(dcs[key][index][subKey]);
            } else if(dcs.mode === 'display') {
                dcs[key][index][subKey] = dcs[key][index][subKey].concat(dcs[key+'Item'][subKey]);
            }
        }

        if(!isClear) return;
        dcs[key+'Item'] = {};
        dcs[subKey+'Item'] = {};
        if(key === 'relativesRelationList' && dcs[key+'Item']['relationship'] !== '1') {
            dcs[subKey+'2ndItem'] = {};
        }
        if(key === 'evidenceList') dcs['sampleList'] = {};
        dcs.fileSlideDataItem = [];
    }

    renderDt(id, title, data, scope, fixedColums) {
        let columnDefs = [],
            index = this.utilityService.findArrayIndexByObjValue(title, 'title', '处置方法');

        if(index >= 0) {
            columnDefs = [{
                width: '170px',
                targets: index
            }];
        }
        this.$timeout(() => {
            return this.admindesignsService.initDataTable(id, {
                data: data,
                columns: title,
                fixedColumns: {
                    leftColumns: fixedColums,
                    rightColumns: 1
                },
                columnDefs: columnDefs,
                createdRow: (row, data, index) => {
                    this.$compile(row)(scope);
                }
            });
        });
    }
}

DataTableService.$inject = [
    '$timeout',
    '$compile',
    'UtilityService',
    'AdmindesignsService',
    'EntrustAcceptDataCenterService',
    'EntrustAcceptDtRenderService'
];
