const BsPopoverAsync = (
    $compile,
    AdmindesignsService,
    UtilityService
) => ({
    restrict: 'A',
    link($scope, $element, $attrs) {

        UtilityService.asyncGet($attrs.url)
            .then((response) => {
                AdmindesignsService.initBsPopover($element, {
                    placement: 'bottom',
                    html: true,
                    content: $compile(response)($scope),
                    viewport: $attrs.viewport
                });
            });
    }
});

BsPopoverAsync.$inject = [
    '$compile',
    'AdmindesignsService',
    'UtilityService'
];

export default BsPopoverAsync;