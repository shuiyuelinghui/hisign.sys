import DocController from '../controllers/doc';

const DocComponent = {
    templateUrl: './templates/modules/doc.html',
    bindings: {
        title: '<',
        type: '<',
        id: '<',
        nodeCode: "<",
        showSidebar: '<'
    },
    controller: DocController,
    controllerAs: 'doc'
};

export default DocComponent;
