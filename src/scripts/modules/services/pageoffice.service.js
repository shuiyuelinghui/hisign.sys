export default class PageofficeService {

    constructor() {
        this.iframe;
    }

    // 获取iframe doc
    getIframeDoc() {
        this.iframe = $('iframe').get(0);
        return this.iframe.contentWindow;
    }

    // 打印
    print() {
        this.getIframeDoc().printOut();
    }

    // 本地保存
    saveLocal() {
        this.getIframeDoc().Save();
    }

    // 服务器端保存
    saveRemote() {
        this.getIframeDoc().SaveServer();
    }

    // 插入图片
    insertPic(ids) {
        this.getIframeDoc().addImageMark(ids);
    }

    // 插入文字
    insertText(text) {
        this.getIframeDoc().addTextMark(text);
    }

}

PageofficeService.$inject = [];
