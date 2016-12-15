import weekdayFilter from './modules/filter/weekday';

const coreFilter = angular
    .module('coreFilter', [])
    .filter('weekday', weekdayFilter);

export default coreFilter;