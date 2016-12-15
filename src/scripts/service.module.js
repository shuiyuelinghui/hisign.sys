import angular from 'angular';
import AdmindesignsService from './modules/services/admindesigns.service';
import EchartsService from './modules/services/echarts.service';
import HighchartsService from './modules/services/highcharts.service';
import PatternService from './modules/services/pattern.service';
import UtilityService from './modules/services/utility.service';
import SidebarService from './modules/services/sidebar.service';
import CommonDataService from './modules/services/data.service';
import PdfJsService from './modules/services/pdfjs.service';
import CommonService from './modules/services/common.service';
import PageofficeService from './modules/services/pageoffice.service';
import PageofficeDataService from './modules/services/pageoffice.data.service';

const coreService = angular
    .module('coreService', [])
    .service('AdmindesignsService', AdmindesignsService)
    .service('SidebarService', SidebarService)
    .service('EchartsService', EchartsService)
    .service('HighchartsService', HighchartsService)
    .service('PatternService', PatternService)
    .service('UtilityService', UtilityService)
    .service('CommonDataService', CommonDataService)
    .service('PdfJsService', PdfJsService)
    .service('CommonService', CommonService)
    .service('PageofficeService', PageofficeService)
    .service('PageofficeDataService', PageofficeDataService);

export default coreService;