import CancelController from '../controllers/cancel';

const CancelComponent = {
    templateUrl: './templates/modules/cancel.html',
    bindings: {
        id: '<',
        result: '<'
    },
    controller: CancelController,
    controllerAs: 'cancel'
};

export default CancelComponent;