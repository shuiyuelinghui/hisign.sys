import uuid from 'uuid';

const FileSlideComponent = {
    template: '<div id="{{$ctrl.uuid}}" class="ui-slide-file"></div>',
    bindings: {
        flag: '@',
        sampleId: '@',
        dcService: '<',
        readonly: '<'
    },
    controller: FileSlideCtrl
};

function FileSlideCtrl(
    $scope,
    $compile,
    $timeout,
    AdmindesignsService,
    EntrustAcceptDataCenterService,
    FILE_URL
) {

    this.$scope = $scope;
    this.$compile = $compile;
    this.$timeout = $timeout;
    this.admindesignsService = AdmindesignsService;

    this.fileUrl = FILE_URL.split("/api")[0];

    this.initSlide = (id) => {
        this.admindesignsService.initSlickSlide(id, {
            arrows: true,
            dots: false,
            slidesToShow: 5,
            slidesToScroll: 5,
            prevArrow: '<span class="ss-prev fa fa-chevron-left"></span>',
            nextArrow: '<span class="ss-next fa fa-chevron-right"></span>'
        });
    };

    this.getFileDataKey = () => {

        switch(this.flag) {
            case '1':
                return 'fileSlideProvinceDataItem';
            case '2':
                return 'fileSlideCityDataItem';
            case '3':
                return 'fileSlideOtherDataItem';
            case '4':
                return 'fileSlideDataItem';
            case '5':
                return 'fileSlideMappingDataItem';
            case '6':
                return 'fileSlideDataReuseItem';
            case '7':
                return 'fileSlideOtherItem';
        }
    };

    this.deleteFile = (e) => {
        let t = $(e.target),
            slidelist = t.parents('.ui-slide-file').find('.fa-minus-circle'),
            index = slidelist.index(t);

        this.$scope.$emit('imagesDel', this.dcService[this.getFileDataKey()][index].id);
 
        if (this.flag == '4' && this.sampleId) {
            this.dcService[this.getFileDataKey()][this.sampleId].splice(index, 1);
        } else {
            this.dcService[this.getFileDataKey()].splice(index, 1);
        }
        if(this.flag < 4) this.dcService.buildSubmissionFileData();
        this.renderFileSlide();

    };

    this.renderFileSlide = () => {

        let tmpl,
            data = this.dcService[this.getFileDataKey()],
            content = [],
            newSlide = $('<div id="'+this.uuid+'" class="ui-slide-file" />'),
            width = $('#'+this.uuid).width() / 0.9,
            cb = '<label class="option option-primary">' +
                    '<input type="checkbox" />' +
                    '<span class="checkbox"></span>' +
                 '</label>';

        if (this.flag == '4' && this.sampleId) {
            data = this.dcService[this.getFileDataKey()][this.sampleId] || [];
        }
        for(let i = 0, len = data.length; i < len; i++) {

            let source = '/assets/images/document_default.png',
                sourceThumb = '/assets/images/document_default.png';

            if (data[i].type !== '1') {
                source = this.fileUrl + '/api/files/' + data[i].path + '/download';
                sourceThumb = source.slice(0, source.indexOf('/download')) + '/thumbnail';
            }

            tmpl = '<div>'+
                        '<a href="'+source+'" data-lightbox="lb-file">'+
                            '<img src="'+sourceThumb+'" />'+
                        '</a>'+
                        (this.readonly ? '' : '<span class="fa fa-minus-circle" ng-click="$ctrl.deleteFile($event)"></span>')+
                        '<p>'+
                            '<span>'+data[i].name+'</span>'+
                        '</p>'+
                        (this.dcService.dcType === 'doc' ? cb : '')+
                    '</div>';

            content.push(tmpl);
        }

        $('#'+this.uuid).replaceWith(newSlide);
        newSlide
            .append(this.$compile(content.join(''))(this.$scope))
            .css({
                display: data.length ? 'block' : 'none',
                width: width+'px'
            });

        this.initSlide(this.uuid);
    };

    this.$onInit = () => {
        if(!this.dcService) {
            this.dcService = EntrustAcceptDataCenterService;
        }
        this.uuid = uuid.v4();

        if(this.flag === '4' || this.flag === '6' || this.flag === '5' || this.flag === '7') {
            this.$timeout(() => {
                this.renderFileSlide();
            }, 300);
        }

        this.$scope.$on('fileSlideDataPrepared', () => {
            if(!this.dcService.dtActionReadonly) {
                this.renderFileSlide();
            }
        });
        this.$scope.$on('fileSlideDataPreparedRo', () => {
            this.$timeout(() => {
                this.renderFileSlide();
            });
        });
        this.$scope.$on('fileUploadDataAdded'+this.flag, (e, resultData, fileData) => {
            this.dcService.buildFileSubmitData(fileData, resultData, this.flag, this.getFileDataKey(), this.sampleId);
            this.renderFileSlide();
        });
    };

}

FileSlideCtrl.$inject = [
    '$scope',
    '$compile',
    '$timeout',
    'AdmindesignsService',
    'EntrustAcceptDataCenterService',
    'FILE_URL'
];

export default FileSlideComponent;
