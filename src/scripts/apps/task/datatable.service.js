export default class TaskDataTableService {
    constructor() {
        this.commonAction =
            '<a href="#" ng-click="task.footprint()"><span class="fa fa-flag fs18 tooltipster" title="留痕"></span></a> ';
    }

    getDataTableActionMap(type) {

        let actionMap = {
            "cross_approval": '<a ui-sref="app.approval""><span class="fa fa-gavel fs18 tooltipster" title="跨级审批"></span></a> ',
            "pre_accept": '<a ui-sref="app.preaccept"><span class="fa fa-folder-open fs18 tooltipster" title="案件预受理"></span></a> ',
            "accept": '<a ui-sref="app.accept"><span class="fa fa-check-square-o fs18 tooltipster" title="案件受理"></span></a> ',
            "pickup": '<a ui-sref="app.pickup"><span class="fa fa-umbrella fs18 tooltipster" title="收捡"></span></a> ',
            "examine": '<a ui-sref="app.examine"><span class="fa fa-flask fs18 tooltipster" title="检验鉴定"></span></a> ',
            "doc_draft": '<a ui-sref="app.doc_draft"><span class="fa fa-umbrella fs18 tooltipster" title="鉴定文书拟稿"></span></a> ',
            "doc_check": '<a ui-sref="app.doc_confirm"><span class="fa fa-umbrella fs18 tooltipster" title="鉴定文书复核"></span></a> ',
            "doc_print": '<a ui-sref="app.doc_print"><span class="fa fa-print fs18 tooltipster" title="鉴定文书打印"></span></a> ',
            "submit_archive": '<a ui-sref="app.submit_archive"><span class="fa fa-archive fs18 tooltipster" title="提交归档"></span></a> ',
            "confirm_archive": '<a ui-sref="app.confirm_archive"><span class="fa fa-archive fs18 tooltipster" title="确认归档"></span></a> ',
            "doc_publish": '<a ui-sref="app.doc_publish"><span class="fa fa-umbrella fs18 tooltipster" title="鉴定文书发放"></span></a> ',
            "doc_tech": '<a ui-sref="app.doc_tech"><span class="fa fa-umbrella fs18 tooltipster" title="鉴定文书技术审批"></span></a> ',
            "doc_leader": '<a ui-sref="app.doc-leader"><span class="fa fa-umbrella fs18 tooltipster" title="鉴定文书领导审批"></span></a> '
        };

        return '<div>' + actionMap[type] + this.commonAction + '</div>';
    }
}