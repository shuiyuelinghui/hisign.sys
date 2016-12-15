import SubmitCompController from '../controllers/submitComp.js';

const SubmitComponent = {
    bindings: {
        configData: '='
    },
    templateUrl: './templates/modules/submitComp.html',
    controller: SubmitCompController,
    controllerAs: 'submitComp'
};

export default SubmitComponent;
