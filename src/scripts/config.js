import cookie from 'js-cookie';

const configure = (
    $stateProvider,
    $locationProvider,
    $httpProvider,
    SYSTEM_ID
) => {

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(($q) => {
        return {
            request: (config) => {
                // NProgress.start();
                config.headers.token = cookie.get('token') || '';
                config.headers.systemId = SYSTEM_ID || '';
                return config;
            },

            response: (response) => {
                // NProgress.done();
                return response;
            },

            responseError: (rejection) => {
                // location.href = '/app/error/'+rejection.status;
                if(rejection.status === 401) window.location.href = '/login';
                return rejection;
            }
        }
    });

    $httpProvider.defaults.transformRequest = (data) => {
        let userId = cookie.get('userId') || '';
        if(data && userId !== '') {
            if(data.noUserId) delete data.noUserId;
            else data.userId = userId;
        }

        return JSON.stringify(data);
    };

    $stateProvider
        .state('/', {
            url: '/',
            templateUrl: './templates/mediator.html',
            controller: 'MediatorController',
            controllerAs: 'mediator'
        })

        .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: 'templates/app.html'
        })

        .state('app.index', {
            url: '/index',
            templateUrl: './templates/apps/index/index.html',
            controller: 'IndexController',
            controllerAs: 'index'
        })

        .state('app.indexHc', {
            url: '/indexHc',
            templateUrl: './templates/apps/index/indexHc.html',
            controller: 'IndexHcController',
            controllerAs: 'indexHc'
        })

        .state('app.home', {
            url: '/home',
            templateUrl: './templates/apps/home/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
        })
        // 委托管理
        .state('app.entrust', {
            abstract: true,
            url: '/entrust',
            template: '<ui-view />'
        })
        .state('app.entrust.apply', {
            abstract: true,
            url: '/apply',
            template: '<ui-view />'
        })
        
        .state('app.entrust.apply.evidence', {
            url: '/evidence',
            templateUrl: './templates/apps/entrust/index.html',
            controller: 'EntrustController',
            controllerAs: 'entrust'
        })

        .state('app.entrust.apply.evidence.save', {
            url: '/save/:id/:result/:flag',
            templateUrl: './templates/apps/entrust/index.html',
            controller: 'EntrustController',
            controllerAs: 'entrust'
        })

        .state('app.entrust.apply.evidence.edit', {
            url: '/edit/:id/:result/:flag',
            templateUrl: './templates/apps/entrust/index.html',
            controller: 'EntrustController',
            controllerAs: 'entrust'
        })

        .state('app.entrust.apply.evidence.copy', {
            url: '/copy/:id/:result/:flag',
            templateUrl: './templates/apps/entrust/index.html',
            controller: 'EntrustController',
            controllerAs: 'entrust'
        })

        .state('app.entrust.apply.evidence.reuse', {
            url: '/reuse',
            templateUrl: './templates/apps/entrust/index.html',
            controller: 'EntrustController',
            controllerAs: 'entrust'
        })

        .state('app.entrust.apply.external', {
            url: '/external?id&result&flag',
            templateUrl: './templates/apps/entrust/index.html',
            controller: 'EntrustController',
            controllerAs: 'entrust'
        })

        .state('app.entrust.apply.channel', {
            url: '/channel?id&result&flag',
            templateUrl: './templates/apps/entrust/index.html',
            controller: 'EntrustController',
            controllerAs: 'entrust'
        })

        .state('app.entrust.select', {
            abstract: true,
            url: '/select',
            template: '<ui-view />'
        })

        .state('app.entrust.select.list', {
            url: '/list/:pageId',
            templateUrl: './templates/apps/entrust/entrust-list.html',
            controller: 'TaskController',
            controllerAs: 'task',
            params: {pageId: 'en3100'}
        })

        .state('app.entrust.select.temporarylist', {
            url: '/temporarylist/:pageId',
            templateUrl: './templates/apps/entrust/entrust-temporary.html',
            controller: 'TaskController',
            controllerAs: 'task',
            params: {pageId: 'en4200'}
        })

        .state('app.entrust.select.departmentlist', {
            url: '/departmentlist/:pageId',
            templateUrl: './templates/apps/entrust/entrust-departmentlist.html',
            controller: 'TaskController',
            controllerAs: 'task',
            params: {pageId: 'en3400'}
        })

        .state('app.task', {
            abstract: true,
            url: '/task',
            template: '<div ui-view></div>'
        })
        .state('app.task.todo', {
            abstract: true,
            url: '/todo',
            template: '<div ui-view></div>'
        })
        .state('app.task.todo.personal', {
            url: '/personal/:pageId',
            templateUrl: './templates/apps/task/task.todo.personal.html',
            controller: 'TaskController',
            controllerAs: 'task'
        })
        .state('app.task.todo.departments', {
            url: '/departments/:pageId',
            templateUrl: './templates/apps/task/task.todo.departments.html',
            controller: 'TaskController',
            controllerAs: 'task'
        })

        .state('app.task.done', {
            abstract: true,
            url: '/done',
            template: '<div ui-view></div>'
        })
        .state('app.task.done.personal', {
            url: '/personal/:pageId',
            templateUrl: './templates/apps/task/task.done.personal.html',
            controller: 'TaskController',
            controllerAs: 'task',
            params:{pageId:'ap2000'}
        })
        .state('app.task.done.departments', {
            url: '/departments/:pageId',
            templateUrl: './templates/apps/task/task.done.departments.html',
            controller: 'TaskController',
            controllerAs: 'task',
            params:{pageId:'ap2100'}
        })
       //跨级审批
        .state('app.crossapproval', {
            url: '/crossapproval/:id/:result/:flag',
            templateUrl: './templates/apps/crossApproval/cross.approval.html',
            controller: 'CrossApprovalController',
            controllerAs: 'crossApproval'
        })

        .state('inspection', {
            url: '/inspection?submId&identifyCategoryCode&uuid&serverCode&section&type',
            templateUrl: './templates/apps/inspection/inspection.html',
            controller: 'InspectionController',
            controllerAs: 'inspection'
        })

        .state('doc', {
            url: '/doc/:id/:type/:nodeCode/:flag',
            templateUrl: './templates/doc.html',
            controller: 'DocCommonController',
            controllerAs: 'docCommon'
        })

        .state('book', {
            url: '/book/:id/:panelType',
            templateUrl: './templates/book.html',
            controller: 'BookCommonController',
            controllerAs: 'bookCommon'
        })
        
        .state('mediator', {
            url: '/mediator',
            templateUrl: './templates/mediator.html',
            controller: 'MediatorController',
            controllerAs: 'mediator'
        })

        .state('register', {
            url: '/register',
            templateUrl: './templates/apps/register/register.html',
            controller: 'RegisterController',
            controllerAs: 'register'
        })
        .state('register-success', {
            url: '/register-success',
            params: {
                userName: ''
            },
            templateUrl: './templates/apps/register/register-success.html',
            controller: 'RegisterSuccessController',
            controllerAs: 'register'
        })

        //受理
        .state('app.accept', {
            url: '/accept/:id/:result/:flag',
            templateUrl: './templates/apps/accept/index.html',
            controller: 'AcceptController',
            controllerAs: 'accept'
        })

        //预受理
        .state('app.preaccept', {
            url: '/preaccept/:id/:result/:flag',
            templateUrl: './templates/apps/preaccept/preaccept.html',
            controller: 'PreacceptController',
            controllerAs: 'preaccept'
        })
        
        /*预受理审核*/
        .state('app.preacceptapproval', {
            url: '/preacceptapproval/:id/:result/:flag',
            templateUrl: './templates/apps/preacceptAproval/preaccept.approval.html',
            controller: 'PreacceptApprovalController',
            controllerAs: 'preacceptApproval'
        })

        .state('app.entrustpreview', {
            url: '/entrustpreview/:id/:result',
            templateUrl: './templates/apps/entrustPreview/entrust.preview.html',
            controller: 'PreacceptApprovalController',
            controllerAs: 'preacceptApproval'
        })
        //收检
        .state('app.pickup', {
            url: '/pickup/:id/:result',
            templateUrl: './templates/apps/pickup/pickup.html',
            controller: 'PickupController',
            controllerAs: 'pickup'
        })
        //收检延期申请
        .state('app.pickup_delay_apply', {
            url: '/pickup_delay_apply/:id/:result',
            templateUrl: './templates/apps/business_action/business_action.html',
            controller: 'BusinessActionController',
            controllerAs: 'businessAction'
        })
        //收检工作交接
        .state('app.pickup_work_handover', {
            url: '/pickup_work_handover/:id/:result',
            templateUrl: './templates/apps/workhandover/workhandover.html',
            controller: 'WorkHandoverController',
            controllerAs: 'workHandover'
        })

        //检验鉴定
        .state('app.examine', {
            url: '/examine/:id/:result/:flag',
            templateUrl: './templates/apps/examine/examine.html',
            controller: 'ExamineController',
            controllerAs: 'examine'
        })
        //检验延期申请
        .state('app.examine_delay_apply', {
            url: '/examine_delay_apply/:id/:result',
            templateUrl: './templates/apps/business_action/business_action.html',
            controller: 'BusinessActionController',
            controllerAs: 'businessAction'
        })
        //检验工作交接
        .state('app.examine_work_handover', {
            url: '/examine_work_handover/:id/:result',
            templateUrl: './templates/apps/workhandover/workhandover.html',
            controller: 'WorkHandoverController',
            controllerAs: 'workHandover'
        })
        //检验中止申请
        .state('app.examine_halt_apply', {
            url: '/examine_halt_apply/:id/:result',
            templateUrl: './templates/apps/business_action/business_action.html',
            controller: 'BusinessActionController',
            controllerAs: 'businessAction'
        })
        //检验终止申请
        .state('app.examine_stop_apply', {
            url: '/examine_stop_apply/:id/:result',
            templateUrl: './templates/apps/business_action/business_action.html',
            controller: 'BusinessActionController',
            controllerAs: 'businessAction'
        })
        .state('examine_record', {
            url: '/examine_record',
            templateUrl: './templates/apps/examine/examine.record.html',
            controller: 'ExamineRecordController',
            controllerAs: 'examinerecord'
        })
        .state('app.examine_map', {
            url: '/examine_map/:id/:result',
            templateUrl: './templates/apps/examine_map/examine.map.html',
            controller: 'ExamineMapController',
            controllerAs: 'examineMap'
        })

        //文书拟稿
        .state('app.doc_draft', {
            url: '/doc_draft/:id/:result',
            templateUrl: './templates/apps/doc/doc_draft.html',
            controller: 'DocDraftController',
            controllerAs: 'docDraft'
        })
        //文书延期申请
        .state('app.doc_delay_apply', {
            url: '/doc_delay_apply/:id/:result',
            templateUrl: './templates/apps/business_action/business_action.html',
            controller: 'BusinessActionController',
            controllerAs: 'businessAction'
        })
        //文书拟稿工作交接
        .state('app.doc_work_handover', {
            url: '/doc_work_handover/:id/:result',
            templateUrl: './templates/apps/workhandover/workhandover.html',
            controller: 'WorkHandoverController',
            controllerAs: 'workHandover'
        })
        //文书终止申请
        .state('app.doc_stop_apply', {
            url: '/doc_stop_apply/:id/:result',
            templateUrl: './templates/apps/business_action/business_action.html',
            controller: 'BusinessActionController',
            controllerAs: 'businessAction'
        })

        //鉴定复核
        .state('app.doc_confirm', {
            url: '/doc_confirm/:id/:result/:type',
            templateUrl: './templates/apps/doc_confirm/doc_confirm.html',
            controller: 'DocConfirmController',
            controllerAs: 'docConfirm'
        })

        //鉴定文书技术负责人审批
        .state('app.doc_tech', {
            url: '/doc_tech/:id/:result/:type',
            templateUrl: './templates/apps/doc_approve/doc_approve.html',
            controller: 'DocApproveController',
            controllerAs: 'docApprove'
        })

         //鉴定文书程序审批
        .state('app.doc_program', {
            url: '/doc_program/:id/:result/:type',
            templateUrl: './templates/apps/doc_approve/doc_approve.html',
            controller: 'DocApproveController',
            controllerAs: 'docApprove'
        })

        //鉴定文书领导审批
        .state('app.doc_leader', {
            url: '/doc_leader/:id/:result/:type',
            templateUrl: './templates/apps/doc_approve/doc_approve.html',
            controller: 'DocApproveController',
            controllerAs: 'docApprove'
        })


        // //鉴定文书授权签字人审批
        // .state('app.doc_authorize', {
        //     url: '/doc_authorize',
        //     templateUrl: './templates/apps/doc_authorize/doc_authorize.html',
        //     controller: 'DocAuthorizeController',
        //     controllerAs: 'docAuthorize'
        // })

        .state('app.doc_print', {
            url: '/doc_print/:id/:result',
            templateUrl: './templates/apps/doc_print/doc_print.html',
            controller: 'DocPrintController',
            controllerAs: 'docPrint'
        })
        .state('app.doc_publish', {
            url: '/doc_publish/:id/:result',
            templateUrl: './templates/apps/doc_publish/doc_publish.html',
            controller: 'DocPublishController',
            controllerAs: 'docPublish'
        })

        .state('app.submit_archive', {
            url: '/submit_archive/:id/:result',
           	templateUrl:'./templates/apps/archive/submit_archive.html',
            controller: 'SubmitArchiveController',
            controllerAs: 'submitArchive'
        })

        .state('preview_archive', {
            url: '/preview_archive/:id/:result',
            templateUrl: './templates/apps/archive/preview_archive.html',
            controller: 'PreviewArchiveController',
            controllerAs: 'previewarchive'
        })

        .state('app.confirm_archive', {
            url: '/confirm_archive/:id/:result',
            templateUrl: './templates/apps/archive/confirm_archive.html',
            controller: 'ConfirmArchiveController',
            controllerAs: 'confirmarchive'
        })

        //收检延期申请科长审核
        .state('app.pickup_delay_section_chief', {
            url: '/pickup_delay_section_chief/:id/:result',
            templateUrl: './templates/apps/business_review/business_review.html',
            controller: 'BusinessReviewController',
            controllerAs: 'businessReview'
        })

        //收检延期申请主任审批
        .state('app.pickup_delay_director', {
            url: '/pickup_delay_director/:id/:result',
            templateUrl: './templates/apps/business_review/business_review.html',
            controller: 'BusinessReviewController',
            controllerAs: 'businessReview'
        })

        // 检验鉴定延期申请科长审批
        .state('app.examine_delay_section_chief', {
            url: '/examine_delay_section_chief/:id/:result',
            templateUrl: './templates/apps/business_review/business_review.html',
            controller: 'BusinessReviewController',
            controllerAs: 'businessReview'
        })


        // 检验鉴定延期申请主任审核
        .state('app.examine_delay_director', {
            url: '/examine_delay_director/:id/:result',
            templateUrl: './templates/apps/business_review/business_review.html',
            controller: 'BusinessReviewController',
            controllerAs: 'businessReview'
        })

        // 检验终止申请科长审核
        .state('app.examine_stop_section_chief', {
            url: '/examine_stop_section_chief/:id/:result',
            templateUrl: './templates/apps/business_review/business_review.html',
            controller: 'BusinessReviewController',
            controllerAs: 'businessReview'
        })


        // 检验终止申请主任审批
        .state('app.examine_halt_director', {
            url: '/examine_halt_director/:id/:result',
            templateUrl: './templates/apps/business_review/business_review.html',
            controller: 'BusinessReviewController',
            controllerAs: 'businessReview'
        })

        // 检验终止申请主任审批
        .state('app.examine_stop_director', {
            url: '/examine_stop_director/:id/:result',
            templateUrl: './templates/apps/business_review/business_review.html',
            controller: 'BusinessReviewController',
            controllerAs: 'businessReview'
        })


        //检验中止申请科长审核
        .state('app.examine_halt_section_chief', {
            url: '/examine_halt_section_chief/:id/:result',
            templateUrl: './templates/apps/business_review/business_review.html',
            controller: 'BusinessReviewController',
            controllerAs: 'businessReview'
        })

        //检验鉴定-上传图谱
        .state('app.examine_upload', {
            url: '/examine_upload',
            templateUrl: './templates/apps/examine_upload/examine_upload.html',
            controller: 'ExamineUploadController',
            controllerAs: 'examineUpload'
        })


        //文书延期申请科长审核
        .state('app.doc_delay_section_chief', {
            url: '/doc_delay_section_chief/:id/:result',
            templateUrl: './templates/apps/business_review/business_review.html',
            controller: 'BusinessReviewController',
            controllerAs: 'businessReview'
        })

        //文书延期申请主任审批
        .state('app.doc_delay_director', {
            url: '/doc_delay_director/:id/:result',
            templateUrl: './templates/apps/business_review/business_review.html',
            controller: 'BusinessReviewController',
            controllerAs: 'businessReview'
        })

        //文书终止申请科长审核
        .state('app.doc_stop_section_chief', {
            url: '/doc_stop_section_chief/:id/:result',
            templateUrl: './templates/apps/business_review/business_review.html',
            controller: 'BusinessReviewController',
            controllerAs: 'businessReview'
        })

        //文书终止申请主任审批
        .state('app.doc_stop_director', {
            url: '/doc_stop_director/:id/:result',
            templateUrl: './templates/apps/business_review/business_review.html',
            controller: 'BusinessReviewController',
            controllerAs: 'businessReview'
        })

        .state('app.error', {
            url: '/error/:status',
            templateUrl: './templates/apps/error/error.html',
            controller: 'ErrorController',
            controllerAs: 'error'
        })

    ;

};

export default configure;
