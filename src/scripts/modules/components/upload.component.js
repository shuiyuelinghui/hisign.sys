import UploadController from '../controllers/upload';

const UploadComponent = {
    bindings: {
        viewport: '@',
        flag: '@'
    },
    template: `
        <span class="ui-upload-trigger" id="upload_trigger_{{upload.compId}}">
            <em class="fa fa-file"></em> 上传附件
        </span>
    `,
    controller: UploadController,
    controllerAs: 'upload'
};

export default UploadComponent;
