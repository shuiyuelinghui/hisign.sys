const TextareaSelect = (admindesignsService, $timeout) => ({
    restrict: 'A',
    templateUrl:'../../../templates/modules/textarea_select.html',
    transclude:'true',
    scope: {
        'dict': '=',
        'append':'@'
    },
    link($scope, $element, $attrs) {
        let textareaDom = $element.find('textarea'),
            textareaIcon = $element.find('i'),
            textareaBtn = $element.find('a'),
            textareaSelect = $element.find('.textarea-select');


        //获取焦点时显示侧边栏
        textareaDom.on('focus',() => {
            textareaDom.addClass('gui-textarea-focus');
            $element.find('.slide-animate').show();
            //初始化scroller滚动条
            if(!textareaSelect.find('.scroller-content').get(0)) {
                textareaSelect.scroller();
            }
            //TODO: 确认正确调用tooltip的时机
            $timeout(() => {
                admindesignsService.initTooltipster();
            }, 100);
        });


        //按钮点击时切换展开、收缩
        textareaBtn.on('click',()=>{
            if (textareaIcon.hasClass('fa-chevron-left')) {
                textareaIcon.removeClass('fa-chevron-left')
                            .addClass('fa-chevron-right');
            } else {
                textareaIcon.removeClass('fa-chevron-right')
                            .addClass('fa-chevron-left');
            }

            $element.find('.slide-animate').toggleClass('slide-hide');
        });

        //li标签点击后其值加入textarea中
        $element.find('ul').on('click','li',function() {
            textareaDom.trigger('input');
            let itemValue = $(this).html() + '\r\n',
                temp = $element.find('textarea').val() || '';

            if ($scope.append == 'false'|| !$scope.append) {
                textareaDom.val(itemValue);
            } else {
                textareaDom.val(temp + itemValue);
            }
            textareaDom.trigger('input');
        });

        //取消textarea的focus状态
        //TODO: 从一个自定义指令点到另一个 无法取消focus
        $(document).on('click', function(e) {
            let t = $(e.target);
            if(!(t.hasClass('ui-textarea-select') || t.parents('.ui-textarea-select').length)) {
                $('.slide-animate').removeClass('slide-hide');
                $('.slide-animate').hide();
                textareaDom.removeClass('gui-textarea-focus');
            }
        });


    }
});

TextareaSelect.$inject = ['AdmindesignsService', '$timeout'];

export default TextareaSelect;