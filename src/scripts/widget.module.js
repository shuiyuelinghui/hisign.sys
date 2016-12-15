import angular from 'angular';

import HeaderComponent from './modules/components/header.component';
import SidebarComponent from './modules/components/sidebar.component';
import FilterComponent from './modules/components/filter.component';
import OrgComponent from './modules/components/org.component';
import FootPrintComponent from './modules/components/footprint.component';
import ApproveComponent from './modules/components/approve.component';
import UploadComponent from './modules/components/upload.component';
import DocComponent from './modules/components/doc.component';
import EntrustDetailComponent from './modules/components/entrust.detail';
import EntrustEvidenceInfoComponent from './modules/components/entrust.evidence.info';
import EntrustMemberInfoComponent from './modules/components/entrust.member.info';
import BreadcrumbComponent from './modules/components/breadcrumb.component';
import MapShowComponent from './modules/components/mapShow.component';
import BookComponent from './modules/components/book.component';
import BookDataCenterService from './modules/services/book.dc.service';
import CancelComponent from './modules/components/cancel.component';

import ApproveDataService from './modules/services/approve.data.service';
import MediatorController from './modules/controllers/mediator';
import ConfirmPassword from './modules/directives/confirm-pwd.directive';
import AsyncValidator from './modules/directives/asyncValidator.directive';
import BsPopoverAsync from './modules/directives/bs-popover-async.directive';
import InputSelect from './modules/directives/input-select.directive';
import InputSelectDl from './modules/directives/input-select-dl.directive';
import TextareaSelect from './modules/directives/textarea-select.directive';
import Select2 from './modules/directives/select2.directive';
import Counter from './modules/directives/counter.directive';
import DtSelect from './modules/directives/dt-select.directive';
import DtSelectAry from './apps/entrust/directives/dt-select-ary.directive';
import DtInput from './modules/directives/dt-input.directive';
import SubmitComponent from './modules/components/submit.component';
import SubmitCompService from './modules/services/submitComp.service';

import ReviewComponent from './modules/components/review.component.js';
import ReviewController from './modules/controllers/review';
import WorkHandoverComponent from './modules/components/workHandover.component';
import UIToggleClass from './modules/directives/ui-toggleclass.js';
import MapShowDataService from './modules/services/mapShow.data.service';

import IdCard from './modules/directives/id-card.directive.js';

import PageofficeResourceComponent from './modules/components/pageoffice-resource.component';

const coreWidget = angular
    .module('coreWidget', [])
    .directive('confirmPassword', ConfirmPassword)
    .directive('asyncValidator', AsyncValidator)
    .directive('bsPopoverAsync', BsPopoverAsync)
    .directive('inputSelect', InputSelect)
	.directive('inputSelectDl', InputSelectDl)
    .directive('textareaSelect', TextareaSelect)
    .directive('select2', Select2)
    .directive('counter', Counter)
    .directive('dtSelect', DtSelect)
    .directive('dtSelectAry', DtSelectAry)
    .directive('dtInput', DtInput)
    .component('headerComp', HeaderComponent)
    .component('sidebarComp', SidebarComponent)
    .component('filterComp', FilterComponent)
    .component('orgComp', OrgComponent)
    .component('footprintComp', FootPrintComponent)
    .component('approveComp', ApproveComponent)
    .component('reviewComp', ReviewComponent)
    .component('uploadComp', UploadComponent)
    .component('docComp', DocComponent)
    .component('bookComp', BookComponent)
    .service('BookDataCenterService', BookDataCenterService)
    .controller('MediatorController', MediatorController)
    .service('ApproveDataService', ApproveDataService)
    .controller('ReviewController', ReviewController)
    .component('workHandoverComp', WorkHandoverComponent)
    .directive('uiToggleClass', UIToggleClass)
    .component('entrustEvidenceInfoComp', EntrustEvidenceInfoComponent)
    .component('entrustDetailComp', EntrustDetailComponent)
    .component('entrustMemberInfoComp', EntrustMemberInfoComponent)
    .component('breadcrumbComp', BreadcrumbComponent)
    .component('mapShowComp', MapShowComponent)
    .component('cancelComp', CancelComponent)
    .service('MapShowDataService', MapShowDataService)
    .component('submitComp', SubmitComponent)
    .service('SubmitCompService', SubmitCompService)    
	.directive('idcard', IdCard)
	.component('pageofficeResourceComp', PageofficeResourceComponent);
	//重新指定收检人
//	.component('appointedPersonComp',reAppointedPersonComponent);

export default coreWidget;
