import {PDFJS} from '../../../../library/pdfjs/web/pdf_viewer.js';

export default class PdfJsService {
  constructor($http, UtilityService) {
    this.$http = $http;
    this.UtilityService = UtilityService;
    this.PDFJS = PDFJS;
  };

  // 获取pdf地址
  getPdfPath(url, params) {
    
    return this.UtilityService.asyncGet(url, params);
  }

  //显示pdf
  showPdf(pdfPath) {
    /*this.PdfJsService.PDFJS.workerSrc = './scripts/pdf.worker.bundle.js';
     var pdfPath = 'http://dev-hisign.hezetech.cn/assets/sample.pdf';
     // || this.PdfJsService.getPdfPath(url, params) ;
     this.PdfJsService.showPdf(pdfPath);*/

    'use strict';

//
    PDFJS.workerSrc = './scripts/pdf.worker.bundle.js';

// Some PDFs need external cmaps.
//
// PDFJS.cMapUrl = '../../build/dist/cmaps/';
// PDFJS.cMapPacked = true;

    var SEARCH_FOR = ''; // try 'Mozilla';

    var container = document.getElementById('viewerContainer');

// (Optionally) enable hyperlinks within PDF files.
    var pdfLinkService = new PDFJS.PDFLinkService();

    var pdfViewer = new PDFJS.PDFViewer({
      container: container,
      linkService: pdfLinkService,
    });
    pdfLinkService.setViewer(pdfViewer);

// (Optionally) enable find controller.
    var pdfFindController = new PDFJS.PDFFindController({
      pdfViewer: pdfViewer
    });
    pdfViewer.setFindController(pdfFindController);

    container.addEventListener('pagesinit', function () {
      // We can use pdfViewer now, e.g. let's change default scale.
      pdfViewer.currentScaleValue = 'page-width';

      if (SEARCH_FOR) { // We can try search for things
        pdfFindController.executeCommand('find', {query: SEARCH_FOR});
      }
    });

// Loading document.
    PDFJS.getDocument(pdfPath).then(function (pdfDocument) {
      // Document loaded, specifying document for the viewer and
      // the (optional) linkService.
      pdfViewer.setDocument(pdfDocument);

      pdfLinkService.setDocument(pdfDocument, null);
    });
  }
  
};




PdfJsService.$inject = ['$http', 'UtilityService'];





