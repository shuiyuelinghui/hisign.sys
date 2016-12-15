/**
 * Created by Administrator on 2016/9/20 0020.
 */
import ReviewController from '../controllers/review';

const ReviewComponent = {
    templateUrl: ($element, $attrs) => {
        var targetUrl = '';
        if ($attrs.type == '-1') {
            targetUrl = './templates/modules/review_basic.html'
        } else {
            targetUrl = './templates/modules/review_extral.html';
        }
        return targetUrl;
    },
    bindings: {
        'type': '<',
        'showSection': '<',
        'reviewData': '<'
    },
    controller: ReviewController,
    controllerAs: 'review'
};

export default ReviewComponent;