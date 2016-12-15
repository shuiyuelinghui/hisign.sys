import uuid from 'uuid';

export default class EntrustAcceptActionService {

    constructor(
        toaster,
        UtilityService,
        AdmindesignsService,
        DataTableService,
        EntrustAcceptDataCenterService,
        EntrustAcceptRenderService,
        FILE_URL
    ) {
        this.toaster = toaster;
        this.utilityService = UtilityService;
        this.admindesignsService = AdmindesignsService;
        this.dtService = DataTableService;
        this.dcService = EntrustAcceptDataCenterService;
        this.renderService = EntrustAcceptRenderService;
        this.fileUrl = FILE_URL.split("/api")[0];
    }

    delegateDateTimePickerAction() {
        let _self = this;

        $('body').on('focusin', '.bs-datetimepicker', function() {
            if($(this).data('initialize')) return;

            $(this).data('initialize', true);
            _self.admindesignsService.initDateTimePicker($(this));
        });
    }

    delegateDtRowAction(con, scope) {
        con.on('click', '.fa-trash-o, .fa-copy, .fa-edit, .fa-level-up, .fa-level-down, .fa-picture-o, .fa-file-text', (e) => {
            let t = $(e.target);
            if(!t.parents('tr').length) return;

            let index = t.data('index'),
                dt = t.closest('table'),
                key = dt.data('key'),
                tableId = dt.data('identity'),
                outerIndex = dt.data('index');

            if(t.hasClass('fa-trash-o')) {
                this.admindesignsService.openConfirmDeleteMagnificPopup(scope, {}, () => {
                    this.deleteDtRow(tableId, key, index, outerIndex, scope);
                });
            }
            if(t.hasClass('fa-copy')) {
                this.copyDtRow(tableId, key, index, outerIndex, scope);
            }
            if(t.hasClass('fa-edit')) {
                this.editDtRow(tableId, key, index, outerIndex);
            }
            if(t.hasClass('fa-level-up')) {
                this.swapDtRow(tableId, key, index, outerIndex, 'up', scope);
            }
            if(t.hasClass('fa-level-down')) {
                this.swapDtRow(tableId, key, index, outerIndex, 'down', scope);
            }
            if(t.hasClass('fa-picture-o')) {
                this.previewFile(tableId, key, index, outerIndex);
            }
            if(t.hasClass('fa-file-text')) {
                this.editDtRow(tableId, key, index, outerIndex);
            }
        });
    }

    buildEditProfessionList(data) {
        let dcs = this.dcService;

        dcs.professionList.push({
            profession: {
                name: dcs.dictMapping['ProfessionList'][data.sections],
                code: data.sections
            },
            category: {
                name: dcs.dictMapping['IdentifyCategorys'][data.identifyCategorys],
                code: data.identifyCategorys
            },
            require: {
                name: data.requestProjects,
                code: ''
            }
        });
    }

    manipulateEvidenceListDtRow(tableId, key, index, outerIndex, type, scope) {
        let dcs = this.dcService,
            sectionCode,
            sampleList = dcs.evidenceList[outerIndex]['sampleList'],
            sampleDNAList = dcs.evidenceList[outerIndex]['sampleDNAList'],
            dt = $('#'+tableId);

        if(dcs.activeState === 'app.accept') {
            sectionCode = dcs.submission.sectionName;
        } else {
            sectionCode = $('tr', '#'+tableId)
                .eq(index+1)
                .find('td')
                .eq(4)
                .html();
        }

        //DNA专业
        if(sectionCode === 'DNA') {
            index = index - (sampleList && sampleList.length || 0);
            if(type === 'delete') {
                scope.$apply(() => {
                    sampleDNAList.splice(index, 1);
                });
            }
            else if(type === 'copy') sampleDNAList.splice(index, 0, this.clearCopyId(Object.assign({}, sampleDNAList[index])));
            else if(type === 'edit') {
                dcs.sampleDNAListItem = Object.assign({}, dcs[key][outerIndex]['sampleDNAList'][index]);
                dcs.sampleListItem = Object.assign({}, dcs.sampleDNAListItem)
                dcs.sampleId = dcs[key][outerIndex]['sampleDNAList'][index].id;
                dcs.fileSlideDataItem = dcs[key][outerIndex]['sampleDNAList'][index].documentList.slice();
                dcs.editSubKey = 'sampleDNAList';
                this.buildEditProfessionList(dcs.sampleDNAListItem);
                return;
            } else if(type === 'preview') {
                this.initPreviewFileLightBox(dcs[key][outerIndex]['sampleDNAList'][index]['documentList']);
                return;
            }
        } else {
            if(type === 'delete') {
                scope.$apply(() => {
                    sampleList.splice(index, 1);
                });
            }
            else if(type === 'copy') sampleList.splice(index, 0, this.clearCopyId(Object.assign({}, sampleList[index])));
            else if(type === 'edit') {
                dcs.sampleListItem = Object.assign({}, dcs[key][outerIndex]['sampleList'][index]);
                dcs.sampleId = dcs[key][outerIndex]['sampleList'][index].id;
                dcs.fileSlideDataItem = dcs[key][outerIndex]['sampleList'][index].documentList.slice();
                dcs.editSubKey = 'sampleList';
                this.buildEditProfessionList(dcs.sampleListItem);
                return;
            } else if(type === 'preview') {
                this.initPreviewFileLightBox(dcs[key][outerIndex]['sampleList'][index]['documentList']);
                return;
            }
        }

        if(type === 'delete' && $('tr', dt).length <= 2) {
            dt.DataTable().destroy();
            dt.html('');
            return;
        }
        this.renderService.renderAction(key, outerIndex, scope);

        if(type === 'delete') this.toaster.pop('success', null, '删除数据成功');
        if(type === 'copy') this.toaster.pop('success', null, '复制数据成功');
    }

    manipulateRelativesRelationListDtRow(tableId, key, index, outerIndex, type, scope) {
        let dcs = this.dcService,
            count = 0,
            dt = $('#'+tableId);

        for(let i = 0, len = dcs.relativesRelationList.length; i < len; i++) {
            let relativesList = dcs.relativesRelationList[i]['relativesList'],
                length = relativesList.length;

            if(!length) continue;
            if(index > count+length-1) {
                count += length;
                continue;
            } else {
                if(type === 'delete') {
                    scope.$apply(() => {
                        relativesList.splice(index-count, 1);
                    });
                } else if(type === 'copy') {
                    relativesList.splice(index-count, 0, this.clearCopyId(Object.assign({}, relativesList[index-count])));
                } else if(type === 'edit') {
                    dcs.relativesRelationListItem = Object.assign({}, dcs[key][i]);
                    if(dcs.relativesRelationListItem.relationship === '1') {
                        dcs.relativesListItem = Object.assign({}, dcs[key][i]['relativesList'][index-count]);
                    } else {
                        dcs.relativesListItem = Object.assign({}, dcs[key][i]['relativesList'][0]);
                        dcs.relativesList2ndItem = Object.assign({}, dcs[key][i]['relativesList'][1]);
                    }

                    dcs.sampleId = dcs[key][i]['relativesList'][index-count].id;
                    dcs.fileSlideDataItem = dcs[key][i]['relativesList'][index-count].documentList.slice();
                    dcs.editOuterIndex = i;
                    dcs.editSubKey = 'relativesList';
                    this.buildEditProfessionList(dcs.relativesListItem);
                    return;
                } else if(type === 'preview') {
                    this.initPreviewFileLightBox(dcs[key][i]['relativesList'][index-count]['documentList']);
                    return;
                }
                break;
            }
        }

        if(type === 'delete' && $('tr', dt).length <= 2) {
            dt.DataTable().destroy();
            dt.html('');
            return;
        }
        this.renderService.renderAction(key, outerIndex, scope);

        if(type === 'delete') this.toaster.pop('success', null, '删除数据成功');
        if(type === 'copy') this.toaster.pop('success', null, '复制数据成功');
    }

    deleteDtRow(tableId, key, index, outerIndex, scope) {
        let dcs = this.dcService;

        if(key === 'evidenceList') {
            this.manipulateEvidenceListDtRow(tableId, key, index, outerIndex, 'delete', scope);
            return;
        }
        if(key === 'relativesRelationList') {
            this.manipulateRelativesRelationListDtRow(tableId, key, index, outerIndex, 'delete', scope);
            return;
        }
        let dt = $('#'+tableId);
        scope.$apply(() => {
            dcs[key].splice(index, 1);
        });
        if(dcs[key] && !dcs[key].length) {
            dt.DataTable().destroy();
            dt.html('');
            return;
        }
        this.renderService.renderAction(key, outerIndex, scope);
        this.toaster.pop('success', null, '删除数据成功');
    }
    
    clearCopyId(data, deepClone = true) {
        let copyData;
        if(deepClone) copyData = $.extend(true, {}, data);
        else copyData = data;

        for(let key in copyData) {
            if(key === 'id' && copyData[key]) {
                copyData[key] = null;
            }
            if(this.utilityService.isArray(copyData[key])) {
                for(let i = 0, len = copyData[key].length; i < len; i++) {
                    this.clearCopyId(copyData[key][i], false);
                }
            }
        }

        return copyData;
    }

    copyDtRow(tableId, key, index, outerIndex, scope) {
        let dcs = this.dcService;

        if(key === 'evidenceList') {
            this.manipulateEvidenceListDtRow(tableId, key, index, outerIndex, 'copy', scope);
            return;
        }
        if(key === 'relativesRelationList') {
            this.manipulateRelativesRelationListDtRow(tableId, key, index, outerIndex, 'copy', scope);
            return;
        }
        dcs[key].splice(index, 0, this.clearCopyId(Object.assign({}, dcs[key][index])));
        this.renderService.renderAction(key, outerIndex, scope);
        this.toaster.pop('success', null, '复制数据成功');
    }

    editDtRow(tableId, key, index, outerIndex) {
        let dcs = this.dcService,
            trigger;

        dcs.activeMemberType = key;

        if(key === 'evidenceList') {
            trigger = $('#'+tableId)
                .parents('.evidence-item')
                .find('.evidence-action-menu li')
                .eq(0);

        } else {
            trigger = $('#'+tableId)
                .parents('.member-section')
                .find('.operate-menu .fa-plus-square')
                .parent();
        }

        dcs.mode = 'edit';
        dcs.editOuterIndex = outerIndex;
        dcs.editIndex = index;
        dcs.editKey  = key;

        if(key === 'evidenceList') {
            this.manipulateEvidenceListDtRow(tableId, key, index, outerIndex, 'edit');
        } else if(key === 'relativesRelationList') {
            this.manipulateRelativesRelationListDtRow(tableId, key, index, outerIndex, 'edit');
        } else {
            dcs[key+'Item'] = Object.assign({}, dcs[key][index]);
            dcs.sampleId = dcs[key][index].id;
            dcs.fileSlideDataItem = dcs[key][index].documentList.slice();
            this.buildEditProfessionList(dcs[key+'Item']);
        }
        trigger.trigger('click');
    }

    updateEditDtRow(scope) {
        let dcs = this.dcService;

        if(dcs.editKey === 'evidenceList') {
            let index;
            if(dcs.editSubKey === 'sampleDNAList') {
                index = dcs.editIndex - dcs[dcs.editKey][dcs.editOuterIndex]['sampleList'].length;
            } else {
                index = dcs.editIndex;
            }
            // dcs[dcs.editKey][dcs.editOuterIndex][dcs.editSubKey][index] = dcs[dcs.editSubKey+'Item'];
            dcs[dcs.editKey][dcs.editOuterIndex][dcs.editSubKey][index] = Object.assign({}, dcs.sampleDNAListItem, dcs.sampleListItem);
        } else if(dcs.editKey === 'relativesRelationList') {
            dcs[dcs.editKey][dcs.editOuterIndex][dcs.editSubKey][dcs.editIndex] = dcs[dcs.editSubKey+'Item'];
        } else {
            dcs[dcs.editKey][dcs.editIndex] = dcs[dcs.editKey+'Item'];
        }

        this.renderService.renderAction(dcs.editKey, dcs.editOuterIndex, scope);
        this.admindesignsService.closeMagnificPopup();
        this.toaster.pop('success', null, '编辑数据成功');
    }

    swapDtRow(tableId, key, index, outerIndex, type, scope) {
        let dcs = this.dcService,
            dt = $('#'+tableId),
            len = $('tr', dt).length - 1,
            data,
            upIndex, downIndex;

        if(key === 'evidenceList' || key === 'relativesRelationList') {
            return;
        }
        if(index === 0 && type === 'up' || index === len - 1 && type === 'down') {
            return;
        }
        data = dcs[key];
        if(type === 'up') {
            upIndex = index - 1;
            downIndex = index;
        } else if(type === 'down') {
            upIndex = index;
            downIndex = index + 1;
        }
        data[upIndex] = data.splice(downIndex, 1, data[upIndex])[0];
        this.renderService.renderAction(key, outerIndex, scope);
        if(type === 'up') this.toaster.pop('success', null, '上移数据成功');
        if(type === 'down') this.toaster.pop('success', null, '下移数据成功');
    }

    previewFile(tableId, key, index, outerIndex) {
        let dcs = this.dcService;

        if(key === 'evidenceList') {
            this.manipulateEvidenceListDtRow(tableId, key, index, outerIndex, 'preview');
            return;
        }
        if(key === 'relativesRelationList') {
            this.manipulateRelativesRelationListDtRow(tableId, key, index, outerIndex, 'preview');
            return;
        }

        this.initPreviewFileLightBox(dcs[key][index]['documentList']);

    }

    initPreviewFileLightBox(data) {

        let id = uuid.v4(),
            tmpl =
                '{{if type == "1"}}'+
                '<a href="/assets/images/document_default.png" data-lightbox="'+id+'">'+
                    '<img src="/assets/images/document_default.png" />'+
                '</a>'+
                '{{else}}'+
                '<a href="'+this.fileUrl+'/api/files/${path}/download" data-lightbox="'+id+'">'+
                    '<img src="'+this.fileUrl+'/api/files/${path}/thumbnail" />'+
                '</a>'+
                '{{/if}}',
            con = $('<div />'),
            lb;

        $.template('lbTemplate', tmpl);
        lb = $.tmpl('lbTemplate', data);

        con
            .append(lb)
            .css({
                position: 'absolute',
                top: '-9999em'
            })
            .appendTo($('body'));

        $('[data-lightbox]', con).eq(0).trigger('click');
    }
}

EntrustAcceptActionService.$inject = [
    'toaster',
    'UtilityService',
    'AdmindesignsService',
    'DataTableService',
    'EntrustAcceptDataCenterService',
    'EntrustAcceptRenderService',
    'FILE_URL'
];
