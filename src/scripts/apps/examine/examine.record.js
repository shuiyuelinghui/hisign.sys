export default class ExamineRecordController {

    constructor(AdmindesignsService) {
        this.adminDesignsService = AdmindesignsService;
    }

    $onInit() {
        this.adminDesignsService.initAdminPanel();
        this.adminDesignsService.initTooltipster();
    }

    confirm() {

    }

    toggleDocMenu() {

        this.adminDesignsService.toggleDocMenu();
    }

}

ExamineRecordController.$inject = ['AdmindesignsService'];
