var changeStateTableModule = (function () {

    var successNotice = function (titleMessage, bodyMessage) {
        new PNotify({
            title: titleMessage,
            text: bodyMessage,
            type: 'success',
            icon: 'glyphicon glyphicon-ok-sign',
            delay: 3000
        });
    };

    var warningNotice = function (titleMessage, bodyMessage) {
        new PNotify({
            title: titleMessage,
            text: bodyMessage,
            type: 'warning',
            icon: 'glyphicon glyphicon-warning-sign',
            delay: 3000
        });
    };

    var failureNotice = function (titleMessage, bodyMessage) {
        new PNotify({
            title: titleMessage,
            text: bodyMessage,
            type: 'danger',
            icon: 'glyphicon glyphicon-warning-sign',
            delay: 3000
        });
    };

    var spinnerConfig = {
        lines: 17 // The number of lines to draw
        , length: 12 // The length of each line
        , width: 21 // The line thickness
        , radius: 6 // The radius of the inner circle
        , scale: 1 // Scales overall size of the spinner
        , corners: 1 // Corner roundness (0..1)
        , color: '#380A2E' // #rgb or #rrggbb or array of colors
        , opacity: 0.45 // Opacity of the lines
        , rotate: 0 // The rotation offset
        , direction: 1 // 1: clockwise, -1: counterclockwise
        , speed: 0.9 // Rounds per second
        , trail: 66 // Afterglow percentage
        , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
        , zIndex: 2e9 // The z-index (defaults to 2000000000)
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '50%' // Top position relative to parent
        , left: '50%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: false // Whether to use hardware acceleration
        , position: 'absolute' // Element positioning
    };

    function changeSanadRowStateText() {

        var vaziatText = $("#SanadStatusChangeTableSelect option:selected").text();
        var trs = $("input:checked").closest("tr");

        trs.each(function (index, value) {
            $(value).find(".vaziat-td").text(vaziatText).fadeIn(200);
        });

    }

    function changeSanadState() {

        $("#change-sanad-state-button").on("click", function (e) {
            e.preventDefault();

            var $form = $("#change-sanad-state-table-form");

            var spinnerElement = startAjaxSpinner("#change-state-table-container", spinnerConfig);

            var vaziatSanad = $("#SanadStatusChangeTableSelect").val();

            var $formData = $form.serializeArray();

            $formData.push({ name: "vaziatSanad", value: vaziatSanad });

            $.ajax({
                type: "POST",
                url: "/Admin/ChangeSanadState/SubmitSanadState",
                data: $formData,
                dataType: "json",
                success: function (response) {

                    if (response.status === "Success") {
                        changeSanadRowStateText();
                        successNotice("ثبت موفق", "وضعیت سند های مورد نظر با موفقیت تغییر داده شد.");
                    }

                    if (response.status === "Failure") {
                        failureNotice("ثبت نا موفق", "خطایی در تغییر وضعیت سند های مختلف پیش آمده.");
                    }

                    if (response.status === "ParametersNotSupplied") {
                        warningNotice("توجه", "برای ثبت ابتدا باید سندها و وضعیت مورد نظرشان را انتخاب کنید.");
                    }

                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                },
                complete: function () {
                    stopAjaxSpinner(spinnerElement);
                }
            });



        });

    }

    return {
        changeSanadState: changeSanadState
    };

})();