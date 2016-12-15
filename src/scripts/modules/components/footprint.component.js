import FootPrintController from '../controllers/footprint';

const FootPrintComponent = {
    templateUrl: './templates/modules/footprint.html',
    bindings: {
        id: '<'
    },
    controller: FootPrintController,
    controllerAs: 'footprint'
};

export default FootPrintComponent;
