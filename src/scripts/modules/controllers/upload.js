import uuid from 'uuid';

export default class UploadController {
    constructor(
        $scope,
        $compile,
        $timeout,
        toaster,
        UtilityService,
        AdmindesignsService,
        FILE_URL
    ) {
        this.$scope = $scope;
        this.$compile = $compile;
        this.$timeout = $timeout;
        this.toaster = toaster;
        this.utilityService = UtilityService;
        this.admindesignsService = AdmindesignsService;
        this.fileUrl = FILE_URL;

        this.compId = uuid.v4();
        this.eventBinded = false;
        this.fileData = [];
        this.resultData = [];
    }

    $onInit() {
        this.getTmpl();
    }

    triggerUpload(e) {
        $('#file_'+this.compId).trigger('click');
    }

    getTmpl() {
        this.utilityService.asyncGet('./templates/modules/upload.html')
            .then((response) => {
                this.$timeout(() => {
                    let popover = $('#upload_trigger_'+this.compId);
                    this.admindesignsService.initBsPopover(popover, {
                        content: this.$compile(response)(this.$scope),
                        html: true,
                        trigger: 'click',
                        viewport: {
                            selector: this.viewport || 'body',
                            padding: 10
                        },
                        placement: 'auto top',
                        delay: {
                            show: 100
                        }
                    });

                    popover.on('shown.bs.popover', () => {
                        if(this.eventBinded) return;
                        this.eventBinded = true;
                        let inputFile = $('#file_'+this.compId);
                        inputFile.on('change', (e) => {
                            this.handleFileSelected(e);
                            $(e.target).val('');
                        });
                    });
                });
            });
    }

    getPreviewImgData(file, index) {
        let reader = new FileReader();
        reader.addEventListener('load', (e) => {
            this.$scope.$apply(() => {
                this.fileData[index].source = e.target.result;
            });
        });
        reader.readAsDataURL(file);
    }

    handleFileSelected(e) {
        let files = e.target.files,
            fileLen = this.fileData.length,
            repeat = 0;

        for(let i = 0, len = files.length; i < len; i++) {
            let file = files[i],
                formData = new FormData(),
                imgType = file.type.match(/image.*/),
                index = this.utilityService.findArrayIndexByObjValue(this.fileData, 'name', file.name);

            if(index >= 0 && file.size === this.fileData[index].size) {
                this.$timeout(() => {
                    this.toaster.pop('error', '重复上传', file.name);
                });
                repeat++;
                continue;
            }

            this.$scope.$apply(() => {
                this.fileData.push({
                    name: file.name,
                    size: file.size,
                    source: imgType ? this.getPreviewImgData(file, i+fileLen-repeat) : '',
                    progress: 0,
                    imgType: imgType
                });
            });
            this.resultData.push('');
            formData.append('file', file);
            this.upload(formData, i+fileLen-repeat);
        }
    }

    upload(formData, index) {
        let xhr = new XMLHttpRequest();
        xhr.open('post', this.fileUrl+'/upload', true);
        xhr.upload.onprogress = (e) => {
            if(e.lengthComputable) {
                let progress = e.loaded / e.total * 100;
                this.$scope.$apply(() => {
                    this.fileData[index].progress = progress;
                });
            }
        };
        xhr.onload = (e) => {
            let status = e.target.status,
                res = JSON.parse(e.target.responseText);

            if(status === 200) {
                this.resultData.splice(index, 1, res[0]);
                if(this.utilityService.findArrayIndexByValue(this.resultData, '') < 0) {
                    this.$timeout(() => {
                        this.toaster.pop('success', null, '全部文件上传完毕！');
                    });
                }
            }
        };

        xhr.send(formData);
    }

    delete(index) {
        this.fileData.splice(index, 1);
        this.resultData.splice(index, 1);
    }

    save(e) {
        let scope;
        if(this.flag < 4) scope = this.$scope.$parent.$parent;
        else scope = this.$scope.$parent;
        scope.$broadcast('fileUploadDataAdded'+this.flag, this.resultData, this.fileData);

        //文书拟稿专用
        this.$scope.$emit('fileUploadDataDocDraft', this.resultData, this.fileData, this.flag);
        this.closePopover(e);
    }

    closePopover(e) {
        e.preventDefault();
        let popover = $('#upload_trigger_'+this.compId);
        popover.popover('hide');
        this.fileData = [];
        this.resultData = [];
    }
}

UploadController.$inject = [
    '$scope',
    '$compile',
    '$timeout',
    'toaster',
    'UtilityService',
    'AdmindesignsService',
    'FILE_URL'
];
