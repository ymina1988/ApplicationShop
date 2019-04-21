"use strict";
var PAlert = (function () {

    /* چک متغییر تابع */
    function parameterValid(parameter1, defaultParameter) {
        if (typeof parameter1 !== 'undefined') {
            return parameter1;
        }
        else {
            return defaultParameter;
        }
    }
    /* setPosition pnotify */
    //function setPositionPnotify() {
    //    var width = window.clientWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    //    var height = window.clientHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    //    var left = (width / 3);
    //    var top = (height / 10);

    //    $("div.ui-pnotify").each(function () {
    //        $(this).css({
    //            "position": "fixed", "top": top, 'right': left + $("div.ui-pnotify").width(), 'z-index': '10000'
    //        });
    //    });
    //}
    /* تابع alert */
    // var StackCenter = { "dir1": "down", "dir2": "right", "push": "top" };

  
    function PAlertFunction(bodyMessage, delayMessage, typeMessage) {

        var PAlertOptions = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": parameterValid(delayMessage, "3000"),
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        if (typeMessage == "success") {
            toastr.success(bodyMessage, '', PAlertOptions);
        }else if(typeMessage =="warning"){
            toastr.warning(bodyMessage, '', PAlertOptions);
        } else if (typeMessage == "danger") {
            toastr.error(bodyMessage, '', PAlertOptions);
        } else if (typeMessage == "info") {
            toastr.info(bodyMessage, '', PAlertOptions);
        }

    }
    //function PAlertFunction(titleMessage, bodyMessage, delayMessage, typeMessage, iconMessage) {
      //  var stack_right_up = { "dir1": "up", "dir2": "right", "spacing1": 0, "spacing2": 0 };
        //new PNotify({
        //    title:parameterValid(titleMessage, 'عنوان' ),
        //    text: parameterValid(bodyMessage, 'متن'),
        //    type: typeMessage,
        //    addclass: "stack-topright",
        //    stack: stack_right_up,
        //    icon: 'glyphicon glyphicon-ok-sign',
        //    delay: parameterValid(delayMessage, 3000)
        //});
        //var options = {
        //    "closeButton": true,
        //    "debug": false,
        //    "newestOnTop": true,
        //    "progressBar": true,
        //    "positionClass": "toast-top-right",
        //    "preventDuplicates": false,
        //    "onclick": null,
        //    "showDuration": "1000",
        //    "hideDuration": "1000",
        //    "timeOut": "5000",
        //    "extendedTimeOut": "1000",
        //    "showEasing": "swing",
        //    "hideEasing": "linear",
        //    "showMethod": "fadeIn",
        //    "hideMethod": "fadeOut"
        //}
        //Notify(parameterValid(bodyMessage, '', options),
        //    'top-right',
        //    parameterValid(delayMessage, 8000000),
        //    typeMessage,
        //    //iconMessage,
        //    true);
        //$("div.ui-pnotify .stack-topright").each(function () {
        //    $(this).css({
        //        "position": "fixed", 'right':0, 'z-index': '100000'
        //    });
        //});
    
    /* تابع caption */
    function PCaptionFunction(_titleMessage, _bodyMessage, _elementSelect, _type, _icon) {
        var titleMessage = parameterValid(_titleMessage, "عنوان");
        var bodyMessage = parameterValid(_bodyMessage, "متن");
        var elementSelect = parameterValid(_elementSelect, ".page-body");
        var type = parameterValid(_type, "info");
        var icon = parameterValid(_icon, "info");

        var html = "<div  class=\"PCaption alert alert-" + type + " fade in\ <button class=\"close\" data-dismiss=\"alert\">  × </button> <i class=\"fa-fw fa fa-" + icon + "\"></i> <strong>" + titleMessage + "</strong> " + bodyMessage + "</div>";
          
        //if (typeof _elementSelect != 'undefined') {
            $(elementSelect).html(html);
       // } else {
        //    var tmp = $(elementSelect).html();
        //    $(elementSelect).html(html);//در ابتدای سلکتور بیاد
       //     $(elementSelect).append(tmp);
       // }
    }    
    /* pop up*/
    function PPopUpFunction(_titleMessage, _bodyMessage,  _icon, _buttonType) {
        var titleMessage = parameterValid(_titleMessage, "");
        var bodyMessage = parameterValid(_bodyMessage, "متن");
       // var typeMessage = parameterValid(_typeMessage, "info");    
        var icon = parameterValid(_icon, "fa-info");
        var buttonType = parameterValid(_buttonType, "btn-primary");
        var buttonText = "تایید";
        
        $.alert({
            title: titleMessage,
            content: bodyMessage,
            icon: icon,
            buttons: {
                ok: {
                    text: buttonText,
                    btnClass: buttonType,
                    keys: ['enter']
                }
            }
        })

        //new PNotify({
        //    title: titleMessage,
        //    text: bodyMessage,
        //    type: typeMessage,
        //    icon: 'glyphicon glyphicon-' + icon + "-sign",
        //    hide: false,
        // //   stack: StackCenter,
        //   // addclass: "stack-custom",
        //    confirm: {
        //        confirm: true,
        //        buttons: [
        //            {
        //                text: buttonText,
        //                addClass: 'btn-' + buttonType + '',
        //                click: function (notice) {
        //                    notice.remove();
        //                }
        //            }, {
        //                text: '', addClass: 'oneButton',/*  برای حذف دکمه اضافه شده الکی*/
        //                click: function (notice) {
        //                    notice.remove();
        //                }
        //            }
        //        ]
        //    },
        //    buttons: {
        //        closer: false,
        //        sticker: false
        //    },
        //    history: {
        //        history: false
        //    }
        //});
        //$('.ui-pnotify button.oneButton').remove();/*  برای حذف دکمه اضافه شده الکی*/
       // setPositionPnotify();
    }

    /* success */
    var SuccessAlert = function ( bodyMessage, delayMessage) {
        var alert = PAlertFunction(bodyMessage, delayMessage, "success");// PAlertFunction(bodyMessage, delayMessage, "success", "fa-check");
            //toastr.success(bodyMessage, '', PAlertOptions); ///
    };
    var SuccessPopUp = function (titleMessage, bodyMessage) {
        var popUp = PPopUpFunction(titleMessage, bodyMessage, "glyphicon glyphicon-ok", "btn-success");
    };

    var SuccessCaption = function (titleMessage, bodyMessage, elementSelect) {
        var caption = PCaptionFunction(titleMessage, bodyMessage, elementSelect, "success", "check");
    };

    /* end success */
    /*warning */
    var WarningAlert = function ( bodyMessage, delayMessage) {
        var alert = PAlertFunction(bodyMessage, delayMessage, "warning" );
            //toastr.warning(bodyMessage, '', PAlertOptions); //PAlertFunction( bodyMessage, delayMessage, "warning", "fa-warning");
    };
    var WarningPopUp = function (titleMessage, bodyMessage) {
        var popUp = PPopUpFunction(titleMessage, bodyMessage, "glyphicon glyphicon-warning-sign", "btn-warning");
    }
    var WarningCaption = function (titleMessage, bodyMessage, elementSelect) {
        var caption = PCaptionFunction(titleMessage, bodyMessage, elementSelect, "warning", "warning");
    };
    /*end warning */
    /*error */
    var ErrorAlert = function ( bodyMessage, delayMessage) {
        var alert = PAlertFunction(bodyMessage, delayMessage, "danger");
            //toastr.error(bodyMessage, '', PAlertOptions);;//PAlertFunction(bodyMessage, delayMessage, "danger", "fa-remove");
    };
    var ErrorPopUp = function (titleMessage, bodyMessage) {
        var popUp = PPopUpFunction(titleMessage, bodyMessage, "glyphicon glyphicon-remove", "btn-danger");
    }
    var ErrorCaption = function (titleMessage, bodyMessage, elementSelect) {
        var caption = PCaptionFunction(titleMessage, bodyMessage, elementSelect, "danger", "times");
    };
    /*end error */
    /*info */
    var InfoAlert = function ( bodyMessage, delayMessage) {
        var alert = PAlertFunction(bodyMessage, delayMessage, "info" );
            //toastr.info(bodyMessage, '', PAlertOptions);//PAlertFunction(bodyMessage, delayMessage, "info", "fa-info");
    };
    var InfoPopUp = function (titleMessage, bodyMessage) {
        var popUp = PPopUpFunction(titleMessage, bodyMessage, "glyphicon glyphicon-info-sign", "btn-primary");
    }
    var InfoCaption = function (titleMessage, bodyMessage, elementSelect) {
        var caption = PCaptionFunction(titleMessage, bodyMessage, elementSelect, "info", "info");
    };
    /*end info */
    //var Confirm = function (title, text, functionCall) {
     

    //    (new PNotify({
    //        title: title,
    //        text: text,
    //        icon: 'glyphicon glyphicon-question-sign',
    //        hide: false,
           
    //        addclass: "stack-modal",
    //        confirm: {
    //            confirm: true
    //        },
    //        buttons: {
    //            closer: false,
    //            sticker: false
    //        },
    //        history: {
    //            history: false
    //        }
    //    })).get().on('pnotify.confirm', function () {
    //        var myFunc = window[functionCall];
    //        myFunc();
    //    }).on('pnotify.cancel', function () {

    //    });
    //    setPositionPnotify();
    //};


    return {
        SuccessPopUp: SuccessPopUp,
        SuccessAlert: SuccessAlert,
        SuccessCaption: SuccessCaption,


        WarningAlert: WarningAlert,
        WarningCaption: WarningCaption,
        WarningPopUp: WarningPopUp,

        ErrorAlert: ErrorAlert,
        ErrorCaption: ErrorCaption,
        ErrorPopUp:ErrorPopUp,

        InfoAlert: InfoAlert,
        InfoCaption: InfoCaption,
        InfoPopUp: InfoPopUp,

        //Confirm: Confirm
    };

})();
