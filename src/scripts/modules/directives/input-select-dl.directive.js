import uuid from 'uuid';

const InputSelectDl = () => ({
    restrict: 'A',
    scope: {
        dict: '='
    },
    link($scope, $element, $attrs) {

        let inputDom = $element.find('input'),
            source = [],
            id = uuid.v4();

        if(!$scope.dict) return;

        inputDom.attr('list', id);

        filterData($scope.dict);
        buildPreDefinedList(source);

        function filterData(raw) {
            raw.forEach((item) => {
                source.push({
                    name: item.dictValue1,
                    value: item.dictKey
                });
            });
        }

        function buildPreDefinedList(source) {
            let datalist = $('<datalist  id="'+id+'" />'),
                listTmpl = '<option value="${name}" />';

            source.forEach((item) => {
                datalist.append($.tmpl(listTmpl, item));
            });

            $element.append(datalist);
        }
    }
});

InputSelectDl.$inject = [];

export default InputSelectDl;
