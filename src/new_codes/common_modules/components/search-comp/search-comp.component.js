/**
 * Created by lilang on 2016/12/7.
 */
(function() {
    angular.module('common_modules')
        .component('searchComp', {
            templateUrl: './templates/common_modules/components/search-comp/search-comp.html',
            bindings: {
                noShadow: '<',
                detailShow: '<',
                configData: '<',
                searchData: '<'
            },
            controller: SearchController,
            controllerAs: 'search'
        });
    // SearchController.$inject = [];

    function SearchController ($scope, $timeout, $location, CommonDataService, toaster, DT_DEFAULT_SETTING) {
        var vm = this;
        if (!vm.configData) {
            vm.configData = [
                {
                    target: '#search_condition',
                    expanded: true,
                    headContent: '查询条件',
                    tplUrl: './templates/common_modules/components/search-comp/templates/search_condition.html'
                },
                {
                    target: '#search_history',
                    expanded: false,
                    headContent: '历史查询条件',
                    tplUrl: './templates/common_modules/components/search-comp/templates/search_history.html'
                },
                {
                    target: '#saved_condition',
                    expanded: false,
                    headContent: '已保存条件',
                    tplUrl: './templates/common_modules/components/search-comp/templates/search_history.html'
                }
            ];
        }
        vm.tabIndex = 0;
        vm.activeCondition = {}; //当前查询条件
        vm.selectedCondition = []; //已选择的查询类别
        vm.condition = {};
        vm.historyActiveCondition = {}; //历史查询数据
        vm.savedActiveCondition = {}; //已保存查询数据
        vm.searchType = $location.path().split('/').pop();
        vm.historyActiveCondition[vm.searchType] = {};
        vm.savedActiveCondition[vm.searchType] = {};
        vm.dtCustomSetting = $.extend(true, {}, store.get('dtCustomSetting') || DT_DEFAULT_SETTING);

        vm.toggleTable = toggleTable;
        vm.chooseItem = chooseItem;
        vm.inputItem = inputItem;
        vm.selectItem = selectItem;
        vm.deleteSelectCondition = deleteSelectCondition;
        vm.save = save;
        vm.search = search;
        vm.reset = reset;
        vm.deleteSavedCondition = deleteSavedCondition;
        vm.research = research;


        linsenDatePick();

        function toggleTable(index) {
            vm.tabIndex = index;
            if (vm.tabIndex == 1) {
                vm.conditionType = 'historyActiveCondition';
                vm.condition =  $.extend(true, vm.historyActiveCondition, store.get('historyActiveCondition'));
            } else if (vm.tabIndex == 2) {
                vm.conditionType = 'savedActiveCondition';
                vm.condition = $.extend(true, vm.savedActiveCondition, store.get('savedActiveCondition'));
            }
        }
        //监听dateRange控件发出的事件，并设置activeCondition、selectedCondition
        function linsenDatePick () {
            $scope.$on('dateSelected', function (e, searchItem, dateDate) {
                var searchName = searchItem.name,
                    searchValue = dateDate.start.format('YYYY/MM/DD') + '-' + dateDate.end.format('YYYY/MM/DD'),
                    selectNameArryIndex = '';

                selectNameArryIndex = getArrIndex(vm.selectedCondition, searchName);
                if (selectNameArryIndex == -1) {
                    vm.selectedCondition.push({ name: searchName, value: searchValue, startDate: searchItem.startDate, endDate: searchItem.endDate, type: searchItem.type});
                } else {
                    vm.selectedCondition[selectNameArryIndex].value = searchValue;
                }

                vm.activeCondition[searchItem.startDate] = dateDate.start.format('YYYY-MM-DD');
                vm.activeCondition[searchItem.endDate] = dateDate.end.format('YYYY-MM-DD');
                $scope.$apply();
            })
        }

        //设置input类型查询的已选择条件
        function inputItem (searchItem) {
            var searchName = searchItem.name,
                selectNameArryIndex = '';

            selectNameArryIndex = getArrIndex(vm.selectedCondition, searchName);
            //判断输入项是否为空，为空就删除此项
            if (vm.activeCondition[searchItem.category]) {
                //如果此项不在已选项中就添加，存在就更新
                if (selectNameArryIndex == -1) {
                    vm.selectedCondition.push({name: searchItem.name, value: vm.activeCondition[searchItem.category]});
                } else {
                    vm.selectedCondition[selectNameArryIndex].value = vm.activeCondition[searchItem.category];
                }
            } else {
                vm.selectedCondition.splice(selectNameArryIndex, 1);
            }
        }

        //设置select类型查询的已选择条件
        function selectItem (searchItem) {
            var selectNameArryIndex = '',
                selectValueArryIndex = '';

            selectNameArryIndex = getArrIndex(vm.selectedCondition, searchItem.name);
            selectValueArryIndex = getArrIndex(searchItem.textOption, vm.activeCondition[searchItem.category], 'value');
            //判断输入项是否为空，为空就删除此项
            if (vm.activeCondition[searchItem.category]) {
                //如果此项不在已选项中就添加，存在就更新
                if (selectNameArryIndex == -1) {
                    vm.selectedCondition.push({name: searchItem.name, value: searchItem.textOption[selectValueArryIndex].name});
                } else {
                    vm.selectedCondition[selectNameArryIndex].value = searchItem.textOption[selectValueArryIndex].name;
                }
            } else {
                vm.selectedCondition.splice(selectNameArryIndex, 1);
            }
        }

        //文本点击时，选择当前项  这里index指向item顺序
        function chooseItem (index, searchItem, item) {
            searchItem.index = index;
            setCondition(index, searchItem, item);
            if (searchItem.type == 'time') {
                $scope.$broadcast(searchItem.eventName, item.value);
            }
        }
        //设置查询条件
        function setCondition (index, searchItem, item) {
            var selectNameArryIndex = '',
                selectValueArry = '',
                activeValueArry = '',
                selectValueArryIndex = '',

            selectNameArryIndex = getArrIndex(vm.selectedCondition, searchItem.name);

            //如果是"不限",并且所选项存在就删除整项
            if (index == 0) {
                restSearchItem(selectNameArryIndex, searchItem);
            //如果不是"不限"
            } else {
                //如果点击的这条选项的名称不存在于已选择的查询条件,则添加
                if (selectNameArryIndex == -1) {
                    addSearchItem(item, searchItem);
                //如果点击的这条选项的名称存在于已选择的查询条件,
                } else {
                    //多选：
                    if (searchItem.multi) {
                        selectValueArry = vm.selectedCondition[selectNameArryIndex].value.split('、') || [];
                        activeValueArry = vm.activeCondition[searchItem.category].split(',') || [];
                        selectValueArryIndex = selectValueArry.indexOf(item.name);
                        //值不相同：添加
                        if (selectValueArryIndex == -1) {
                            addSearchItemValue(selectNameArryIndex, item, searchItem, selectValueArry, activeValueArry);
                        //值相同：删除
                        } else {
                            deleteSearchItemValue(selectNameArryIndex ,selectValueArryIndex, searchItem, selectValueArry, activeValueArry);
                        }
                    //单选：
                    } else {
                        //值不相同：更新
                        if ( vm.selectedCondition[selectNameArryIndex].value !== item.name) {
                            updateSearchItemValue(selectNameArryIndex, item, searchItem);
                        }
                    }
                }
            }
        }
        //通过name 获取数组[{name: 11,value: aa}, {name: 12, value: bb}]中 name=11 所在项的序号
        function getArrIndex (arr, name, value) {
            var temp = [],
                index = '';
            for (var i = 0, len = arr.length; i < len; i++) {
                if (value) {
                    temp.push(arr[i].value);
                } else {
                    temp.push(arr[i].name);
                }
            }
            index = temp.indexOf(name);
            return index;
        }
        //单独设置日期查询数据
        function dateItem (item, searchItem) {
            vm.activeCondition[searchItem.startDate] = item.value[0].format('YYYY-MM-DD');
            vm.activeCondition[searchItem.endDate] = item.value[1].format('YYYY-MM-DD');
        }
        //选择"不限" 时 初始化单条查询项
        function restSearchItem (index, searchItem) {
            if (index != -1) {
                vm.selectedCondition.splice(index, 1);
            }
            if (searchItem.type == 'time') {
                vm.activeCondition[searchItem.startDate] = '';
                vm.activeCondition[searchItem.endDate] = '';
            } else {
                vm.activeCondition[searchItem.category] = '';
            }

        }
        //点击的查询项不存在于已选项
        function addSearchItem (item, searchItem) {
            vm.selectedCondition.push({ name: searchItem.name, value: item.name});
            if (searchItem.type == 'time') {
                dateItem(item, searchItem);
            } else {
                vm.activeCondition[searchItem.category] = item.value;
            }
        }
        //点击的查询项名称存在但值不同, 多选： 添加值
        function addSearchItemValue (index, item, searchItem, selectValueArry, activeValueArry) {
            selectValueArry.push(item.name);
            activeValueArry.push(item.value);
            vm.selectedCondition[index].value = selectValueArry.join('、');
            vm.activeCondition[searchItem.category] = activeValueArry.join(',');
        }
        //点击的查询项名称存在并且值相同, 多选： 删除
        function deleteSearchItemValue (nameIndex, valueIndex, searchItem, selectValueArry, activeValueArry) {
            selectValueArry.splice(valueIndex, 1);
            activeValueArry.splice(valueIndex, 1);

            //如果已选条件中查询项的值为空就删除这一项
            if (selectValueArry.length == 0) {
                vm.selectedCondition.splice(nameIndex, 1);
            } else {
                vm.selectedCondition[nameIndex].value = selectValueArry.join('、') || '';
            }
            vm.activeCondition[searchItem.category]= activeValueArry.join(',') || '';

        }
        //点击的查询项名称存在但值不同, 单选： 更新值
        function updateSearchItemValue (index, item, searchItem) {
            vm.selectedCondition[index].value = item.name;
            if (searchItem.type == 'time') {
                dateItem(item, searchItem);
            } else {
                vm.activeCondition[searchItem.category] = item.value;
            }
        }

        //点击×删除一项查询项
        function deleteSelectCondition (index, searchData) {
            var name = vm.selectedCondition[index].name,
                type = '',
                category = '',
                searchItemIndex = '';

            vm.selectedCondition.splice(index, 1);

            //寻找到'不限'， 并触发它的点击函数 重置这一项
            searchItemIndex = getArrIndex(searchData, name);
            type = searchData[searchItemIndex].type;
            category = searchData[searchItemIndex].category;
            switch (type) {
                case 'time':
                case 'text':
                    $timeout(function(){
                        $('.searchItem').eq(searchItemIndex).find('.optionItem span:first').trigger('click');
                    }, 0);
                    break;
                case 'input':
                case 'select':
                    vm.activeCondition[category] = "";
                    break;
            }
        }
        //设置历史|已保存查询缓存
        function saveCondition (type) {
            console.log(type);
            console.log( vm[type]);
            console.log( vm.searchType);
            var actionItem =  vm[type][vm.searchType],
                dateItem = moment().format('YYYY-MM-DD'),
                searchItem = {
                    timestamp: moment().format('HH:mm:ss'),
                    selectedCondition: $.map(vm.selectedCondition, function(item) {
                        return $.extend(true, {}, item);
                    }),
                    activeCondition: $.extend(true, {}, vm.activeCondition)
                };

            if ($.isArray(actionItem[dateItem])) {
                actionItem[dateItem].push(searchItem);
            } else if (vm.selectedCondition.length) {
                actionItem[dateItem] = [searchItem];
            }

            store.set(type, vm[type]);
            saveCustomSetting()
        }
        //点击查询或者保存或者删除 调用接口，跟新用户设置
        function saveCustomSetting () {
            CommonDataService.saveCustomSetting({
                historyActiveCondition: store.get('historyActiveCondition') || {},
                savedActiveCondition: store.get('savedActiveCondition') || {},
                dtCustomSetting: vm.dtCustomSetting
            });
        }
        //已保存查询条件
        function save(type) {
            saveCondition(type);
        }
        //点击查询按钮，发出查询事件，通知父级执行查询，传递已选择数据 与查询数据
        function search (type) {
            $scope.$emit('doSearch', vm.activeCondition);
            saveCondition( type);
        }
        //重置所有项
        function reset() {
            $timeout(function(){
                $('.searchItem .optionItem span:first-child').each(function(){
                    $(this).trigger('click');
                })
            }, 0);
            vm.activeCondition = {};
            vm.selectedCondition = [];
        }
        //历史|已保存查询项 删除
        function deleteSavedCondition (index, key, allDay) {
            if(allDay) {
                delete vm.condition[vm.searchType][key];
            } else {
                vm.condition[vm.searchType][key].splice(index, 1);
            }
            toaster.pop('success', null, '删除成功');
            store.set(vm.conditionType, vm.condition);
            saveCustomSetting();
        }
        //点击 已保存|历史查询 链接 再次查询
        function research (condition) {
            $scope.$emit('doSearch', condition);
        }
    }
})();
