import  EntrustEvidenceInfoController from '../controllers/entrust.evidence.info.js';

const EntrustEvidenceInfoComponent={
	templateUrl: './templates/modules/entrust/evidence.info.html',
	bindings: {
		ds: '='
	},
	controller: EntrustEvidenceInfoController,
	controllerAs: 'entrustEvidenceInfo'
};
 
export default EntrustEvidenceInfoComponent;
