import echartsOptionConfig from './modules/config/echartsOption';
import highchartsOptionConfig from './modules/config/highchartsOption';

import dtTitleMapping from './modules/config/dtTitleMapping';
import dtDefaultSetting from './modules/config/dtDefaultSetting';
import pageIdMapping from './modules/config/pageIdMapping';
import {dtActionMapping, dtTypeActionMapping} from './modules/config/dtActionMapping';
import scMapping from './modules/config/scMapping';
import dtSubTitleMapping from './modules/config/dtSubTitleMapping';
import dtSubTypeMapping from './modules/config/dtSubTypeMapping';
import dtSubActionMapping from './modules/config/dtSubActionMapping';
import footprintMapping from './modules/config/footprintMapping';
import nodeIconMapping from './modules/config/nodeIconMapping';
import entrustDtConfig from './apps/entrust/config/dtConfig';
import acceptDtConfig from './apps/accept/config/dtConfig';
import detailDtConfig from './apps/accept/config/detailDtConfig';
import dictDataConfig from './apps/entrust/config/dictDataConfig';
import docMapping from './modules/config/docMapping';
import bookMapping from './modules/config/bookMapping';


const coreConstant = angular
    .module('coreConstant', [])

    .constant('SYS_URL', '/api/sys')
    .constant('ALIMS_URL', '/api/alims')
    .constant('FILE_URL', '/api/files')
    .constant('PDF_URL', '/alimsnew')

    .constant('SYSTEM_ID', 'ALIMS')

    .constant('ECHARTS_OPTION_CONFIG', echartsOptionConfig)
    .constant('HIGHCHARTS_OPTION_CONFIG', highchartsOptionConfig)
    .constant('DT_TITLE_MAPPING', dtTitleMapping)
    .constant('DT_DEFAULT_SETTING', dtDefaultSetting)
    .constant('PAGE_ID_MAPPING', pageIdMapping)
    .constant('DT_ACTION_MAPPING', dtActionMapping)
    .constant('DT_TYPE_ACTION_MAPPING', dtTypeActionMapping)
    .constant('SC_MAPPING', scMapping)
    .constant('DOC_MAPPING', docMapping)
    .constant('BOOK_MAPPING', bookMapping)
    .constant('DT_SUB_TITLE_MAPPING', dtSubTitleMapping)
    .constant('DT_SUB_TYPE_MAPPING', dtSubTypeMapping)
    .constant('DT_SUB_ACTION_MAPPING', dtSubActionMapping)
    .constant('FOOT_PRINT_MAPPING', footprintMapping)
    .constant('NODE_ICON_MAPPING', nodeIconMapping)
    .constant('entrust_DT_CONFIG', entrustDtConfig)
    .constant('accept_DT_CONFIG', acceptDtConfig)
    .constant('detail_DT_CONFIG', detailDtConfig)
    .constant('DICT_DATA_CONFIG', dictDataConfig);

export default coreConstant;
