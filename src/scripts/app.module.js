import angular from 'angular';

// page: /
import AppController from './apps/app';

// page:/register
import RegisterDataService from './apps/register/data.service';
import RegisterController from './apps/register/register';
import RegisterHeaderController from './apps/register/registerheader';

import FormIconComponent from './apps/register/form-icon.component';
import FormErrorMsgComponent from './apps/register/form-errmsg.component';
import FormProgressComponent from './apps/register/form-progress.component';

// page:/register-success
import RegisterSuccessController from './apps/register/register-success';

import NodeDataTableService from './modules/services/nodeDt.service';

// page:/index
import IndexController from './apps/index/index';
import IndexHcController from './apps/index/indexHc';

// page:/home
import HomeDataService from './apps/home/data.service';
import HomeController from './apps/home/home';

// page:/task
import TaskDataService from './apps/task/data.service';
import TaskController from './apps/task/task';

// page:/accept
import AcceptSwitch from './apps/accept/directive/switch.directive';

// page: /entrust/apply/evidence
import EntrustController from './apps/entrust/entrust';
import EntrustDataService from './apps/entrust/service/data.service';

import InstitutionInfoController from './apps/entrust/institution-info/institution-info';
import InstitutionInfoDataService from './apps/entrust/institution-info/data.service';
import EntrustInfoController from './apps/entrust/entrust-info/entrust-info';
import CaseInfoController from './apps/entrust/case-info/case-info';
import EvidenceInfoController from './apps/entrust/evidence-info/evidence-info';
import ExtractEvidenceController from './apps/entrust/extract/extract';
import AddEvidenceController from './apps/entrust/add-evidence/add-evidence';
import EvidenceMenuComponent from './apps/entrust/component/evidence-menu.component';
import MemberInfoController from './apps/entrust/member-info/member-info';
import AddMemberController from './apps/entrust/add-member/add-member';
import AddDNAController from './apps/entrust/add-dna/add-dna';
import DataTableService from './apps/entrust/service/datatable.service';
import ProfessionDataService from './apps/entrust/service/profession.data.service';
import ProfessionComponent from './apps/entrust/component/profession.component'
import FileSlideComponent from './apps/entrust/component/file-slide.component';

import EntrustAcceptDataCenterService from './apps/entrust/service/dc.service';
import EntrustAcceptRenderService from './apps/entrust/service/render.service';
import EntrustAcceptDtRenderService from './apps/entrust/service/dt.render.service';
import EntrustAcceptActionService from './apps/entrust/service/action.service';
import EntrustAcceptUtilService from './apps/entrust/service/util.service';

// page:/approval
import ApprovalController from './apps/approval/approval';
import ApprovalDataService from './apps/approval/approval.data.service';

// page:/inspection
import InspectionController from './apps/inspection/inspection';

// page:/case
import AcceptDataService from './apps/accept/data.service';
import AcceptController from './apps/accept/accept';
import AcceptSubmitCompController from './apps/accept/accept_submitComp';

// page:/pickup
import PickupDataService from './apps/pickup/data.service';
import PickupController from './apps/pickup/pickup';

// page: /preaccept
import PreacceptController from './apps/preaccept/preaccept';


// page: /examine
import ExamineController from './apps/examine/examine';
import ExamineDataService from './apps/examine/data.service.js';

// page: /examine_map
import ExamineMapController from './apps/examine_map/examine_map';
import ExamineMapDataService from './apps/examine_map/data.service.js';

// page: /doc_draft
import DocDraftController from './apps/doc/doc_draft';
import DocDratDataService from './apps/doc/data.service';
import DocDataCenterService from './apps/doc/dc.service';


// page: /doc_draft
import DocConfirmController from './apps/doc-confirm/doc_confirm';

// page: /examine_record
import ExamineRecordController from './apps/examine/examine.record';

// page: /doc_print
import DocPrintController from './apps/doc-print/doc_print';

// page: /submit_archive
import SubmitArchiveController from './apps/archive/submit_archive';

import  ArchiveDataService from './apps/archive/data.service';
// page: /submit_archive
import PreviewArchiveController from './apps/archive/preview_archive';


// page: /doc_publish
import DocPublishController from './apps/doc-publish/doc_publish';
import DocPublishDataService from './apps/doc-publish/data.service';

// page: /confirm_archive
import ConfirmArchiveController from './apps/archive/confirm_archive';

//page: /doc_approve
import DocApproveController from './apps/doc-approve/doc_approve';

//page: /doc_tech
import DocTechController from './apps/doc-tech/doc_tech';

//page: /doc_program
import DocProgramController from './apps/doc-program/doc_program';

 //page: /doc-leader
import DocLeaderController from './apps/doc-leader/doc_leader';

//page: /work_handover
import WorkHandoverDataService from './apps/workhandover/data.service';
import WorkHandoverController from './apps/workhandover/workhandover';


//page: /BusinessReview 科长|主任审核
import BusinessReviewController from './apps/business_review/business_review';
import ReivewDataService from './apps/business_review/data.service.js';

//page: /BusinessAction 延迟|中止|终止
import BusinessActionController from './apps/business_action/business_action';

// page: /examine_upload
import ExamineUploadController from './apps/examine_upload/examine_upload';

// page: /app/error
import ErrorController from './apps/error/error';

/**/
import CrossApprovalController from './apps/crossApproval/crossApproval';
import PreacceptApprovalController from './apps/preacceptApproval/preacceptApproval';
import entrustPreviewController from './apps/entrustPreview/entrustPreview';

// page: /doc
import DocCommonController from './apps/doc';

// page: /book
import BookCommonController from './apps/book';

//重新指定收检人
import reAppointedPersonController from './apps/accept/reAppointedPerson';

const app = angular
    .module('app', [])

    // page:/
    .controller('AppController', AppController)

    // page:/register
    .component('formIconComp', FormIconComponent)
    .component('formErrorMsgComp', FormErrorMsgComponent)
    .component('formProgressComp', FormProgressComponent)
    .service('RegisterDataService', RegisterDataService)
    .controller('RegisterController', RegisterController)

    // page:/register-success
    .controller('RegisterSuccessController', RegisterSuccessController)

    .service('NodeDataTableService', NodeDataTableService)

    // page:/index
    .controller('IndexController', IndexController)
    .controller('IndexHcController', IndexHcController)

    // page:/home
    .service('HomeDataService', HomeDataService)
    .controller('HomeController', HomeController)

    // page:/task
    .service('TaskDataService', TaskDataService)
    .controller('TaskController', TaskController)

    // page:/entrust/apply/evidence
    .controller('EntrustController', EntrustController)
    .service('EntrustDataService', EntrustDataService)

    .controller('InstitutionInfoController', InstitutionInfoController)
    .service('InstitutionInfoDataService', InstitutionInfoDataService)

    .controller('EntrustInfoController', EntrustInfoController)
    .controller('CaseInfoController', CaseInfoController)
    .controller('EvidenceInfoController', EvidenceInfoController)
    .controller('AddEvidenceController', AddEvidenceController)
    .component('evidenceMenuComp', EvidenceMenuComponent)

    .controller('ExtractEvidenceController', ExtractEvidenceController)
    .controller('MemberInfoController', MemberInfoController)
    .controller('AddMemberController', AddMemberController)
    .controller('AddDNAController', AddDNAController)

    // .controller('ProfessionController', ProfessionController)
    .component('proComp', ProfessionComponent)
    .component('fileSlideComp', FileSlideComponent)

    .service('DataTableService', DataTableService)
    .service('ProfessionDataService', ProfessionDataService)

    .service('EntrustAcceptDataCenterService', EntrustAcceptDataCenterService)
    .service('EntrustAcceptRenderService', EntrustAcceptRenderService)
    .service('EntrustAcceptDtRenderService', EntrustAcceptDtRenderService)
    .service('EntrustAcceptActionService', EntrustAcceptActionService)
    .service('EntrustAcceptUtilService', EntrustAcceptUtilService)

    // page:/approval
    .controller('ApprovalController', ApprovalController)
    .service('ApprovalDataService', ApprovalDataService)

    // page:/inspection
    .controller('InspectionController', InspectionController)

    // page:/accept
    .service('AcceptDataService', AcceptDataService)
    .controller('AcceptController', AcceptController)
    .controller('AcceptSubmitCompController', AcceptSubmitCompController)
    .directive('acceptSwitch', AcceptSwitch)

    // page:/pickup
    .service('PickupDataService', PickupDataService)
    .controller('PickupController', PickupController)

    //page:/preaccept
    .controller('PreacceptController', PreacceptController)

    // page: /examine
    .controller('ExamineController', ExamineController)
    .service('ExamineDataService', ExamineDataService)

    // page: /examine_map
    .controller('ExamineMapController', ExamineMapController)
    .service('ExamineMapDataService', ExamineMapDataService)

    // page: /doc_draft
    .controller('DocDraftController', DocDraftController)
    .service('DocDratDataService', DocDratDataService)
    .service('DocDataCenterService', DocDataCenterService)

    // page: /doc_confirm
    .controller('DocConfirmController', DocConfirmController)

    // page: /examine_record
    .controller('ExamineRecordController', ExamineRecordController)

    // page: /doc_print
    .controller('DocPrintController', DocPrintController)

    // page: /submit_archive
    .controller('SubmitArchiveController', SubmitArchiveController)
    
    .service('ArchiveDataService', ArchiveDataService)

    // page: /preview_archive
    .controller('PreviewArchiveController', PreviewArchiveController)

    // page: /doc_publish
    .service('DocPublishDataService', DocPublishDataService)
    .controller('DocPublishController', DocPublishController)

    // page: /confirm_archive
    .controller('ConfirmArchiveController', ConfirmArchiveController)

    // page: /doc_approve
    .controller('DocApproveController', DocApproveController)
    // page: /doc_tech
    .controller('DocTechController', DocTechController)


    // page: /doc_program
    .controller('DocProgramController', DocProgramController)

     // page: /doc-leader
     .controller('DocLeaderController', DocLeaderController)

    // page: /work_handover
    .controller('WorkHandoverController', WorkHandoverController)
    .service('WorkHandoverDataService', WorkHandoverDataService)

    //page: /businessReview
    .controller('BusinessReviewController', BusinessReviewController)
    .service('ReivewDataService', ReivewDataService)
    //page: /businessAction
    .controller('BusinessActionController', BusinessActionController)

    //page: /register
    .controller('RegisterHeaderController', RegisterHeaderController)

    //page: /examine
    .controller('ExamineUploadController', ExamineUploadController)

    // page: app/error
    .controller('ErrorController', ErrorController)
    
    .controller('CrossApprovalController', CrossApprovalController)
    
    .controller('PreacceptApprovalController', PreacceptApprovalController)
    
    .controller('entrustPreviewController', entrustPreviewController)

    .controller('DocCommonController', DocCommonController)

    .controller('BookCommonController', BookCommonController)
    
    .controller('reAppointedPersonController', reAppointedPersonController)


export default app;