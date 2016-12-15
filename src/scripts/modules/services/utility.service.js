import _ from 'underscore';
export default class UtilityService {

    constructor($state, $q, $http, toaster,PatternService) {
        this.$state = $state;
        this.$q = $q;
        this.$http = $http;
        this.toaster = toaster;
        
        this.patternService=PatternService.isId();

    }

    goState(state, params, isNewWindow) {

        if(isNewWindow) {
            var url = this.$state.href(state, params || {});
            window.open(url,'_blank');
        } else {
            this.$state.go(state, params || {});
        }

    }

    reloadState() {
        this.$state.reload();
    }

    checkPwdValue(val) {
        if (val >= 48 && val <= 57) return 1;
        else if (val >= 65 && val <= 90) return 2;
        else if (val >= 97 && val <= 122) return 3;
        else return 4;
    }

    checkPwdLevel(pwd) {
        let n = false,
            s = false,
            t = false,
            l_num = 0,
            i;

        if (pwd.length < 6) l_num = 1;
        else {
            for (i = 0; i < pwd.length; i++) {
                let asc = this.checkPwdValue(pwd.charCodeAt(i));
                if (asc === 1 && n === false) {
                    l_num += 1;
                    n = true;
                }
                if ((asc === 2 || asc === 3) && s === false) {
                    l_num += 1;
                    s = true;
                }
                if (asc === 4 && t === false) {
                    l_num += 1;
                    t = true;
                }
            }
        }
        return l_num;
    }

    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    isArray(array) {
        return Array.isArray(array);
    }

    isObjectEqual(o1, o2) {
        return angular.toJson(o1) === angular.toJson(o2);
    }

    findObjKeyByValue(obj, val) {
        let key;
        for(key in obj) {
            if(typeof obj[key] !== 'object' && obj[key] === val) {
                return key;
            }
        }
    }

    findArrayIndexByObjValue(ary, key, val) {
        return ary.findIndex((element) => {
            return element[key] === val;
        });
    }

    findArrayIndexByValue(ary, val) {
        return ary.findIndex((value) => {
            return value === val;
        });
    }

    calculateFileSize(size) {

        let unit;

        if(size/1024/1024 < 1) {
            size = size/1024;
            unit = 'KB';
        } else {
            size = size/1024/1024;
            unit = 'MB';
        }

        return Math.round(size*100)/100+unit;
    }

    asyncGet(url, params) {
        let deferred = this.$q.defer();

        this.$http.get(url, {params:params})
            .then((res) => {
                if(!res.headers('Status')) deferred.resolve(res.data);
                else {
                    deferred.reject(res);
                    this.toaster.pop('error', null, res.data.message);
                }
            }, (res) => {
                deferred.reject(res);
                this.toaster.pop('error', null, res.data);
            });

        return deferred.promise;
    }

    asyncPost(url, params = {}) {
        let deferred = this.$q.defer();

        this.$http.post(url, params)
            .then((res) => {
                if(!res.headers('Status')) deferred.resolve(res.data);
                else {
                    deferred.reject(res);
                    this.toaster.pop('error', null, res.data.message);
                }
            }, (res) => {
                deferred.reject(res);
                this.toaster.pop('error', null, res.data);
            });

        return deferred.promise;
    }

    //param key ：需要判断的字段名
    isDate(key) {
        let upperKey = key.toUpperCase();

        if(upperKey.endsWith("DATE") || upperKey.endsWith("TIME") || upperKey.endsWith("SJ") || upperKey.endsWith("BIRTH")) {
            return true;
        } else {
            return false;
        }
    }

    formatDate(val, format) {

        if(val !== null || val !== "") {
           val = moment(val).format(format)
        }

        return val;
    }

    isEmpty(val) {
        return _.isNull(val) || _.isUndefined(val);
    }
    
    //通过身份证获取用户信息
    getUserInforById ( id ) {
    
    	let currentObj = new Date();  						//当前时间对象
    	let idInforStr;										//出生年月日性别19941127282
    	let currentYear, currentMonth, currentDate;			//当前年月日
    	let year, month, day, genderCode;				//身份证年月日
    	let gender='', age=0, birthday;					//返回年龄 性别 生日
    	
    	if( this.patternService.test(id) && id.length == 18 ){
    		idInforStr  =  id.substr(6,11);
    		
    	 	currentMonth=  currentObj.getMonth(),
    		currentYear =  currentObj.getFullYear(),
    		currentDate	=	currentObj.getDate();
    		
    		birthday = this.formatDate(idInforStr.substr(0,8),'YYYY-MM-DD');  //格式化出生日期
    		year = parseInt(idInforStr.substr(0,4)),
    		month = parseInt(idInforStr.substr(4,2)),
    		day = parseInt(idInforStr.substr(6,2)),
    		genderCode = parseInt(idInforStr.substr(8,3));
	    	age = currentYear-year; 						//年龄	
	    	if ( currentMonth < month || currentDate < day ) {
	    		age = age-1;
	    	}
	    	
	    	if ( genderCode % 2 == 0) {							//性别	
	    		gender = '女';
	    	} else {
	    		gender = '男';
	    	}
	    	return { "age":age, "gender":gender, "birthday":birthday };
    	} else {
    		return false;
    	}
    }

    //数组去重
    filterArr(array) {
        return array.filter(function (element, index, self) {
            return self.indexOf(element) === index;
        });
    }
}

UtilityService.$inject = ['$state', '$q', '$http', 'toaster','PatternService'];