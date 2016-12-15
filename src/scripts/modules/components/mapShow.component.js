import MapShowController from '../controllers/mapShow.js';

const MapShowComponent = {
    bindings: {
        staticData: '<',
        showDownload: '<',
        submId: '<'
    },
    templateUrl: './templates/modules/mapShow.html',
    controller: MapShowController,
    controllerAs: 'mapShow'
};

export default MapShowComponent;
