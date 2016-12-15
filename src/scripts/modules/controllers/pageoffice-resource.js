export default class PageofficeResourceController {
    constructor(
        $scope,
        $stateParams,
        $timeout,
        UtilityService,
        AdmindesignsService,
        CommonDataService,
        PageofficeService,
        PageofficeDataService,
        FILE_URL
    ) {
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.utilityService = UtilityService;
        this.admindesignsService = AdmindesignsService;
        this.commonDataService = CommonDataService;
        this.pageofficeService = PageofficeService;
        this.dataService = PageofficeDataService;

        this.activeState = '';
        this.submData = {};
        this.textData = [];
        this.docData = [];
        this.pageNum = 1;
        this.pageSize = 10;
        this.paginationInited = false;
        this.activeRequestMethod;

        this.fileUrl = FILE_URL.split('/api')[0];
        this.docFlag = '1';
        this.docNum = 0;

        this.insertData = [];
        this.allChecked = false;
    }

    $onInit() {
        let submCode = this.$stateParams.id;
        this.commonDataService.fetchSubmissionData(submCode)
            .then((response) => {
                this.submData = response;
            });
        // this.admindesignsService.initNProgress('.ui-pageoffice-wrapper h1');
    }

    buildTextParams() {
        let searchCategory = this.searchTextCategory,
            submData = this.submData,
            params = {
                searchCondition: {
                    serverCode: submData.serverCode,
                    section: submData.section,
                    identifyCategory: submData.identifyCategory,
                    testmethodName: searchCategory === 'testmethodName' ? this.searchTextContent : '',
                    testmethodCode: searchCategory === 'testmethodCode' ? this.searchTextContent : '',
                    testmethodCategory: '',
                    testmethodCatalogId: '',
                    flag: '1'
                },
                orderBy: 'insDate',
                sort: 'desc',
                pageNum: this.pageNum,
                pageSize: this.pageSize
            };

        return params;
    }

    buildDocumentParams() {
        let searchCategory = this.searchDocCategory,
            submId = this.$stateParams.id,
            params = {
                submId: submId,
                flag: this.docFlag,
                name: searchCategory === 'name' ? this.searchDocContent : '',
                code: searchCategory === 'code' ? this.searchDocContent : '',
                sampleName: searchCategory === 'sampleName' ? this.searchDocContent : '',
            };

        return params;
    }

    setTextData(res) {
        this.textData = res;
        if(this.paginationInited) {
            $('#po_pagination').replaceWith($('<ul id="po_pagination" class="pagination" />'));
            this.paginationInited = false;
        }
        if(res.total <= 0) return;
        this.admindesignsService.initTwbsPagination('po_pagination', Object.assign({}, {
            totalPages: Math.ceil(res.total / this.pageSize),
            startPage: this.pageNum,
            prev: '<span aria-hidden="true">&laquo;</span>',
            next: '<span aria-hidden="true">&raquo;</span>',
            first: '',
            last: '',
            onPageClick: (event, page) => {
                this.pageNum = page;
                this.activeRequestMethod();
            }
        }));
        this.paginationInited = true;
    }

    getSysMethodData() {
        let params = this.buildTextParams();
        // NProgress.start();
        return this.dataService.getSysMethod(params)
            .then((response) => {
                // NProgress.done(true);
                this.setTextData(response);
                this.$timeout(() => {
                    this.isAllChecked();
                });
            });
    }

    getSysApplianceData() {
        let params = this.buildTextParams();
        // NProgress.start();
        return this.dataService.getSysAppliance(params)
            .then((response) => {
                // NProgress.done(true);
                this.setTextData(response);
                this.$timeout(() => {
                    this.isAllChecked();
                });
            });
    }

    getDocumentsData() {
        let params = this.buildDocumentParams();
        this.docNum = 0;
        // NProgress.start();
        return this.dataService.getDocuments(params)
            .then((response) => {
                // NProgress.done(true);
                this.docData = response;
                for(let i = 0, len = this.docData.length; i < len; i++) {
                    this.docNum += this.docData[i].documentList.length;
                }
            });
    }

    setActiveState(state) {
        this.insertData = [];
        if(this.activeState === state) {
            this.activeState = '';
            this.$scope.$emit('rightSidebarChange', 'shrink');
        } else {
            this.activeState = state;
            this.$scope.$emit('rightSidebarChange', 'expand');
            switch(state) {
                case 'method':
                    this.activeRequestMethod = this.getSysMethodData;
                    break;

                case 'appliance':
                    this.activeRequestMethod = this.getSysApplianceData;
                    break;

                case 'document':
                    this.activeRequestMethod = this.getDocumentsData;
                    break;
            }
            this.activeRequestMethod();
        }
    }

    search() {
        this.pageNum = 1;
        this.activeRequestMethod();
    }

    handleSearchOnEnter(e) {
        if(e.keyCode === 13) {
            this.insertData = [];
            this.search();
        }
    }

    switchDocTab(flag) {
        this.insertData = [];
        this.docFlag = flag;
        this.activeRequestMethod();
    }

    toggleInsertData(e, data) {
        let checked = $(e.target).prop('checked'),
            index;

        if(checked) this.insertData.push(data);
        else {
            index = this.utilityService.findArrayIndexByValue(this.insertData, data);
            this.insertData.splice(index, 1);
        }
        if(this.activeState !== 'document') {
            this.isAllChecked();
        }
    }

    insert() {
        let state = this.activeState,
            data = this.insertData.join(';');

        if(state === 'method' || state === 'appliance') {
            this.pageofficeService.insertText(data);
        } else if(state === 'document') {
            this.pageofficeService.insertPic(data);
        }
    }

    toggleAllCheckbox(e) {
        let t = $(e.target),
            tb = t.parents('table'),
            cbList = $('td input[type="checkbox"]', tb),
            checked = t.prop('checked'),
            index;

        for(let i = 0, len = cbList.length; i < len; i++) {
            let cb = $(cbList[i]),
                data = cb.attr('data-name');

            if(checked && !cb.prop('checked')) {
                cb.prop('checked', true);
                this.insertData.push(data);
            } else if(!checked && cb.prop('checked')) {
                cb.prop('checked', false);
                index = this.utilityService.findArrayIndexByValue(this.insertData, data);
                this.insertData.splice(index, 1);
            }
        }
    }

    isAllChecked() {
        if(!$('td input[type="checkbox"]:not(:checked)', '.ui-pageoffice-container').length) {
            this.allChecked = true;
        } else {
            this.allChecked = false;
        }
    }
}

PageofficeResourceController.$inject = [
    '$scope',
    '$stateParams',
    '$timeout',
    'UtilityService',
    'AdmindesignsService',
    'CommonDataService',
    'PageofficeService',
    'PageofficeDataService',
    'FILE_URL'
];
