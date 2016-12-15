const weedayFilter = () => {
    return function(val) {
        let weekday;
        if(!moment) return val;

        weekday = moment(val).format('dddd');

        switch(weekday) {
            case 'Monday':
                return '星期一';

            case 'Tuesday':
                return '星期二';

            case 'Wednesday':
                return '星期三';

            case 'Thursday':
                return '星期四';

            case 'Friday':
                return '星期五';

            case 'Saturday':
                return '星期六';

            case 'Sunday':
                return '星期日';
        }
    };
};

export default weedayFilter;