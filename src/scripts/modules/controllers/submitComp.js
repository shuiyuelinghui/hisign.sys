export default class SubmitCompController {
    constructor($scope) {
        this.$scope = $scope;
        this.isSlideDown = false; //false:收缩并显示审核, true:展开并显示提交
        this.now = moment().format('YYYY-MM-DD');
    }
    $onInit() {
        this.closeComp();
    }

    // 检查检材信息是否都为拒绝
    checkEvidenceSampleAllReject() {
        let evidenceList = this.configData.dcService.evidenceList,
            memberDNAList = this.configData.dcService.memberDNAList,
            relativesRelationList = this.configData.dcService.relativesRelationList,
            nameLessCorpseList = this.configData.dcService.nameLessCorpseList,
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

    toggleApproveFrom($event) {
        if (!this.isSlideDown && this.configData.hasOwnProperty('allReject')) {
            this.configData.allReject = this.checkEvidenceSampleAllReject();
        }

        this.isSlideDown = !this.isSlideDown;
        $('#slideUpAnimate').stop(true, true).slideToggle('slow');
        if ($event) {$event.stopPropagation();}
    }
    //选择li给textarea赋值
    chooseTpl(index, tplContent) {
        let formData = this.configData.formData;
        this.configData.tplIndex = index;
        if (tplContent) {
            if (formData.opinion) {
                let len = formData.opinion.length + tplContent.length;
                if (len < 100 && formData.opinion.indexOf(tplContent) == -1) {
                    formData.opinion += tplContent + '\r';
                }
            } else {
                formData.opinion = tplContent + '\r';
            }
        }

    }
    choosePlace(index, tplContent) {
        let formData = this.configData.formData;
        this.configData.placeIndex = index;
        if (tplContent) {
            if (formData.archivePosition) {
                let len = formData.archivePosition.length + tplContent.length;
                if (len < 100 && formData.archivePosition.indexOf(tplContent) == -1) {
                    formData.archivePosition += tplContent + '\r';
                }
            } else {
                formData.archivePosition = tplContent + '\r';
            }
        }

    }

    //发出弹确认框事件
    emitPopupEvent($event) {
        if ($event) {$event.stopPropagation();}
        if (this.configData.hasOwnProperty('allReject')) {
            this.$scope.$broadcast('preparedApproveSubmit');
        } else {
            this.$scope.$emit('approveSubmitSuccess');
        }

    }
    //点击空白关闭弹窗
    closeComp() {
        let that = this;
        $(document).on('click', function(e) {
            let t = $(e.target);
            if(!(t.hasClass('.ui-approve') || t.parents('.ui-approve').length)) {
                if (that.isSlideDown) {
                    that.isSlideDown = false;
                    that.$scope.$apply();
                    $('#slideUpAnimate').stop(true, true).slideUp('slow');
                }
            }
        });
    }
    //验证传入表单
    checkValid() {
        let isInValid = false;
        //受理验证
        if (this.configData.hasOwnProperty('dcService')) {
            let arr = [this.configData.dcService.caseForm, this.configData.dcService.entrustForm, this.configData.dcService.containerForm];
            for(let value of arr) {
                if (value && value.$invalid) {
                    isInValid = true;
                    break;
                }
            }
        }

        if (this.configData.hasOwnProperty('archiveInfo') && !this.configData.archiveInfo.insDate) {
            isInValid = true;
        }

        return isInValid || this.$scope.approveForm.$invalid;
    }
    //选择工作流程：继续复核 || 提交审批
    chooseWork() {
        if (this.configData.workHandOver == '1') {
            this.configData.formData.auditorType = '';
        } else {
            this.configData.formData.auditorType = '1';
        }
    }
}


SubmitCompController.$inject = [
    '$scope',
    'UtilityService',
    'AdmindesignsService',
    'CommonDataService'
];
