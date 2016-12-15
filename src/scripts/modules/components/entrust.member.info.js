import  EntrustMemberInfoController from '../controllers/entrust.member.info.js';

const EntrustMemberInfoComponent={
	templateUrl: './templates/modules/entrust/member.info.html',
	bindings: {
		ds: '='
	},
	controller: EntrustMemberInfoController,
	controllerAs: 'entrustMemberInfo'
};
 
export default EntrustMemberInfoComponent;
