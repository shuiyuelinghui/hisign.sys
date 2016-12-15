import WorkHandoverController from '../controllers/workHandover';

const WorkHandoverComponent = {
    templateUrl: './templates/modules/workHandover.html',
    bindings: {
        id: '<'
    },
    controller: WorkHandoverController,
    controllerAs: 'workHandover'
};

export default WorkHandoverComponent;