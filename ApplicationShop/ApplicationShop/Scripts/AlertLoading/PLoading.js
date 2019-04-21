"use strict";
var PLoading = (function () {
    var contentElement;
    //function StartLoading(_contentElement, _spinnerColor) {
    //    //var opts = {
    //    //    lines: 17 // The number of lines to draw
    //    //   , length: 12 // The length of each line
    //    //   , width: 21 // The line thickness
    //    //   , radius: 6 // The radius of the inner circle
    //    //   , scale: 1 // Scales overall size of the spinner
    //    //   , corners: 1 // Corner roundness (0..1)
    //    //   , color: isNaN(_spinnerColor) ? '#rrggbb' : _spinnerColor // #rgb or #rrggbb or array of colors
    //    //   , opacity: 0.45 // Opacity of the lines
    //    //   , rotate: 0 // The rotation offset
    //    //   , direction: 1 // 1: clockwise, -1: counterclockwise
    //    //   , speed: 0.9 // Rounds per second
    //    //   , trail: 66 // Afterglow percentage
    //    //   , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
    //    //   , zIndex: 2e9 // The z-index (defaults to 2000000000)
    //    //   , className: 'spinner' // The CSS class to assign to the spinner
    //    //   , top: '50%' // Top position relative to parent
    //    //   , left: '50%' // Left position relative to parent
    //    //   , shadow: false // Whether to render a shadow
    //    //   , hwaccel: false // Whether to use hardware acceleration
    //    //   , position: 'absolute' // Element positioning
    //    //};

    //    //var target = $('#divResult');
    //    //var spinner = new Spinner(opts).spin(target);

    //  //  contentElement = isNaN(_contentElement) ? $('page-body') : $(_contentElement);
    //  ////  var element = contentElement;
    //  //  var spinner = new Spinner(opts);

    //  //  //element.block({ message: null });
    //  //  contentElement.css({ 'pointer-events': 'none', 'opacity': '.5' });
    //  //  spinner.spin(contentElement);//element[0]);

    //  //  return { Spinner: spinner, Element: contentElement };
    //}
    //function StopLoading(_contentElement) {
    //    //contentElement = isNaN(_contentElement) ? $('page-body') : $(_contentElement);
    //    //contentElement.Spinner.stop(contentElement.Element);
    //    //contentElement.css({ 'pointer-events': 'auto', 'opacity': '1' });
    //}
    function parameterValid(parameter1, defaultParameter) {
        if (typeof parameter1 !== 'undefined') {
            return parameter1;
        }
        else {
            return defaultParameter;
        }
    }
    var startAjaxSpinner = function (_selector, _spinnerColor) {
        var spinnerColor = parameterValid(_spinnerColor, 'cornflowerblue');
        var selector = parameterValid(_selector, '.page-body');

        var opts = {
            lines: 11 // The number of lines to draw
            , length: 20 // The length of each line
            , width: 14 // The line thickness
            , radius: 42 // The radius of the inner circle
            , scale: 0.40 // Scales overall size of the spinner
            , corners: 1 // Corner roundness (0..1)
            , color: spinnerColor // #rgb or #rrggbb or array of colors
            , opacity: 0.25 // Opacity of the lines
            , rotate: 0 // The rotation offset
            , direction: 1 // 1: clockwise, -1: counterclockwise
            , speed: 1.5 // Rounds per second
            , trail: 60 // Afterglow percentage
            , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
            , zIndex: 2e9 // The z-index (defaults to 2000000000)
            , className: 'p_spinner' // The CSS class to assign to the spinner
            , top: '50%' // Top position relative to parent
            , left: '50%' // Left position relative to parent
            , shadow: false // Whether to render a shadow
            , hwaccel: false // Whether to use hardware acceleration
            , position: 'absolute' // Element positioning
        };

        var element = $(selector);
        var spinner = new Spinner(opts).spin(element[0]);

        element.css({ 'pointer-events': 'none', 'opacity': '.5', 'position': 'relative' });

        // return { Spinner: spinner, Element: element[0] };
    };

    var stopAjaxSpinner = function (_selector) {
        var selector = parameterValid(_selector, '.page-body');

        $(selector).css({ 'pointer-events': 'auto', 'opacity': '1' });
        $('.p_spinner').remove();
    };

    return {
        Start: startAjaxSpinner,
        Stop: stopAjaxSpinner
    }
})();