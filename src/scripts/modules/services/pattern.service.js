export default class PatternService {

    // 身份证号
    isId() {
        /*return /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;*/
       return  /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    }

    // 手机号
    isMobile() {
        return /^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/;
    }

    //警员编号
    isPoliceId() {
        return /^[A-Za-z0-9]{1,6}$/;
    }

    // 数字或字母
    isAlphaNumeric() {
        return /^[A-Za-z0-9]+$/;
    }

    // 非负浮点数
    isPositiveFloat() {
        return /^(?:[1-9]\d*|0)?(?:\.\d+)?$/;
    }

    // 非负整数
    isPositiveInteger() {
        return /^\+?(0|[1-9]\d*)$/;
    }
}