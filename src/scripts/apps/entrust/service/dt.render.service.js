export default class EntrustAcceptDtRenderService {

    constructor() {}

    getDisplayName(key, value, dictMapping) {
        switch(key) {
            case 'sections':
                value = dictMapping.ProfessionList[value];
                break;
            case 'identifyCategorys':
                value = dictMapping.IdentifyCategorys[value];
                break;
            case 'sampleFlag':
                value = dictMapping.SampleFlagModel[value];
                break;
            case 'nationality':
                value = dictMapping.NationalityModel[value];
                break;
            case 'sex':
                value = dictMapping.SexModel[value];
                break;
            case 'pob':
                value = dictMapping.NativePlaceModel[value];
                break;
            case 'race':
                value = dictMapping.NationModel[value];
                break;
            case 'education':
                value = dictMapping.EduDegreeModel[value];
                break;
            case 'credentialType':
                value = dictMapping.PersonCreTypeModel[value];
                break;
            case 'dispostMethod':
                value = dictMapping.DispostMethodModel[value];
                break;
            case 'memberType':
                value = dictMapping.MemberTypeModel[value];
                break;
            case 'sampleType':
                value = dictMapping.SampleTypeModel[value];
                break;
            case 'isFta':
                value = dictMapping.IsNoModel[value];
                break;
            case 'targetRel':
                value = dictMapping.TargetRelModel[value];
                break;
            case 'involvedRelationship':
                value = dictMapping.DnaInvolvedRelModel[value];
                break;
            case 'relativesFlag':
                value = dictMapping.DnaPersonCateModel[value];
                break;
            case 'relationship':
                value = dictMapping.RelationshipModel[value];
                break;
            default:
                break;
        }
        return value;
    }
}

EntrustAcceptDtRenderService.$inject = [];
