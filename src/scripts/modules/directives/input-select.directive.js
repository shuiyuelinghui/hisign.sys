const InputSelect = () => ({
    restrict: 'A',
    scope: {
        dict: '='
    },
    link($scope, $element, $attrs) {
        let inputDom = $element.find('input'),
            source = [];

        function filterData(raw) {
            raw.forEach((item) => {
                source.push({
                    name: item.dictValue1,
                    value: item.dictKey
                });
            });
        }

        function buildPreDefinedList(source) {
            let ul = $('<ul  class="ui_input_select"/>'),
                listTmpl = '<li data-value="${value}">${name}</li>';

            source.forEach((item) => {
                ul.append($.tmpl(listTmpl, item));
            });

            $element.append(ul);

            $('li', ul).on('click', function() {
                inputDom.val($(this).html());
                inputDom.attr('data-id', $(this).data("value"));
                inputDom.trigger('input');
            });
        }

        $(document).on('click', function(e) {
            let t = $(e.target),
                tagName = t.get(0).tagName.toLowerCase();

            if(
                !t.hasClass('ui-input-select') &&
                !t.parents('.ui-input-select').length ||
                tagName === 'li' ||
                tagName === 'ul'
            ) {
                $element.find('ul').hide();
            }
        });

        inputDom.on('focus', function() {
            $('.ui-input-select ul').hide();
            if(!source.length) {
                filterData($scope.dict);
                buildPreDefinedList(source);
            } else {
                $element.find('ul').show();
            }
        });
    }
});

InputSelect.$inject = [];

export default InputSelect;
