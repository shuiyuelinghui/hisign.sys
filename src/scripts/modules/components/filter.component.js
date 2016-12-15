import FilterController from '../controllers/filter';

const FilterComponent = {
    templateUrl: './templates/modules/filter.html',
    bindings: {
        noShadow: '<',
        detailShow: '<'
    },
    controller: FilterController,
    controllerAs: 'filter'
};

export default FilterComponent;
