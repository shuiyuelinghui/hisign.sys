import BookController from '../controllers/book';

const BookComponent = {
    templateUrl: './templates/modules/book.html',
    bindings: {
        title: '<',
        id: '<',
        showSidebar: '<',
        panelType: '<'
    },
    controller: BookController,
    controllerAs: 'book'
};

export default BookComponent;
