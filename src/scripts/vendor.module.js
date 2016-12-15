import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import toaster from 'angularjs-toaster';
import ngMessages from 'angular-messages';

const vendor = angular
    .module('vendor', [
        uiRouter,
        ngAnimate,
        toaster,
        ngMessages
    ]);
export default vendor;
