const FormProgressComponent = {
    bindings: {
        progress: '<'
    },
    template: `
        <div class="row">
            <div 
                class="col-md-8 form-progress" 
                ng-class="{true:'active'}[$ctrl.progress >= 1]"
            >
                <em>1</em>
                填写账户信息
            </div>
            <div 
                class="col-md-4 form-progress"
                ng-class="{true:'active'}[$ctrl.progress === 2]"
            >
                <span class="arrow" ng-class="{true:'arrow-register',false:'arrow-register-success'}[$ctrl.progress === 1]"></span>
                <em>2</em>
                注册成功
            </div>
        </div>
    `
};

export default FormProgressComponent;
