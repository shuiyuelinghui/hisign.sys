import ProfessionController from './profession';

const ProfessionComponent = {
    templateUrl: './templates/apps/entrust/profession.html',
    bindings: {
        'isdna': '<',
        'filterdna': '<'
    },
    controller: ProfessionController,
    controllerAs: 'pro'
};

export default ProfessionComponent;
