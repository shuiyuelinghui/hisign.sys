import OrgController from '../controllers/org';

const OrgComponent = {
    template: `
        <span
            class="append-icon right org-name"
            ng-click="org.openMagnificPopup('ztree-modal.html');org.onClick()"
        >
            <i class="fa fa-align-justify"></i>
        </span>
        <input
            type="text"
            class="{{org.cname}}"
            id="{{org.id}}"
            name="{{org.name}}"
            ng-readonly="{{org.readonly}}"
            ng-required="{{org.required}}"
            ng-model="org.model"
            placeholder="请选择委托单位"
        />
    `,
    bindings: {
        cname: '@',
        id: '@',
        name: '@',
        readonly: '<',
        required: '<',
        model: '<',
        onClick: '&'
    },
    controller: OrgController,
    controllerAs: 'org'
};

export default OrgComponent;
