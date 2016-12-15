(function() {
    angular.module('common_modules')
        .directive('highLight', highLight);

    function highLight () {
        var directive = {
            restrict: 'EA',
            scope: {
                singleCheck: '@ ',
                index: '@'
            },
            link: link
        };
        return directive;
    }


    function link (scope, element, attrs ) {
        element.on('click', function () {
            //单选
             if (scope.singleCheck == 'true') {
                element.siblings().
                        removeClass('active');
                element.addClass('active');
            //多选
            }else{
                 //第一项"不限"
                 if (scope.index == 0) {
                     element.siblings().
                     removeClass('active');
                     element.addClass('active');
                 //后面项
                 }else {
                     element.toggleClass('active');
                     if (element.siblings().eq(0).hasClass('active')) {
                         element.siblings().eq(0).removeClass('active');
                     } else if (!element.siblings().hasClass('active')) {
                         element.siblings().eq(0).addClass('active');
                     }

                 }
            }
        })


    }

})();
