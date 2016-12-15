/**
 * Created by Administrator on 2016/9/20 0020.
 */
export default class ReviewController {

    constructor() {
        this.dictionary = {
            'title': '',
            'reason': '',
            'dateCount': '',
            'finishedDate': '',
            'person': '',
            'date': ''
        };
    }
    getDictionary(index) {
        var tpl = {
            'title': ['延期申请', '中止申请', '终止申请'],
            'reason': ['延期原因', '中止原因', '终止原因'],
            'dateCount': ['延期天数', '', ''],
            'finishedDate': ['延期申请完成日期', '', ''],
            'person': ['申请人', '申请人', '申请人'],
            'date': ['申请日期', '申请日期', '申请日期'],
            'codeName': ['延期', '中止', '终止']
        };
        for (var key in tpl) {
            this.dictionary[key] = tpl[key][index] || '';
        }
    }

    $onInit() {
        this.getDictionary(this.type);
    }
};  

