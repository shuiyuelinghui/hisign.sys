import '../sass/app.scss';

import angular from 'angular';
import babelPolyfill from 'babel-polyfill';

import config from './config';

import vendor from './vendor.module';
import coreService from './service.module';
import coreWidget from './widget.module';
import coreFilter from './filter.module';
import coreConstant from './constant.module';
import app from './app.module';

window.angular = angular;
const root = angular
    .module('hisign', [
        'vendor',
        'coreService',
        'coreWidget',
        'coreFilter',
        'coreConstant',
        'app'
    ].concat(window.newRootModules || []))
    .config(config);
export default root;