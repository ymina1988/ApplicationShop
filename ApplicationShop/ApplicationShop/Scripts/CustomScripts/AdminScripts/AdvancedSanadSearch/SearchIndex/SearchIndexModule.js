"use strict";

var searchIndexModule = (function () {

    function sanadSearchButtonClickEventHanlder() {

        $("#advanced-sanad-search-button").on("click", function (e) {
            e.preventDefault();

            var $form = $("#advanced-sanad-search-form");

            if (!$form.valid()) return;

            var spinnerElement = startAjaxSpinner("#advenced-search-form-container", "MidnightBlue");

            $.ajax({
                type: "POST",
                url: "/Admin/AdvancedSanadSearch/SearchSanad",
                data: $form.serialize(),
                dataType: "json",
                success: function (response) {

                    $("#sanad-anchor").trigger("click");

                    $("#sanad-grid-container").slideDown(500);
                    sanadGridModule.setupSanadGrid(response);

                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                }, complete: function () {
                    stopAjaxSpinner(spinnerElement);
                }
            });
        });

    }

    function sanadDetailSearchButtonClickEventHanlder() {

        $("#advanced-sanad-detail-search-button").on("click", function (e) {
            e.preventDefault();

            var $form = $("#advanced-sanad-search-form");

            if (!$form.valid()) return;

            var spinnerElement = startAjaxSpinner("#advenced-search-form-container", "MidnightBlue");

            $.ajax({
                type: "POST",
                url: "/Admin/AdvancedSanadSearch/SearchSanadDetail",
                data: $form.serialize(),
                dataType: "json",
                success: function (response) {

                    $("#sanad-article-anchor").trigger("click");

                    $("#sanad-grid-container").slideDown(500);
                    sanadDetailGridModule.setupSanadDetailGrid(response);

                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                }, complete: function () {
                    stopAjaxSpinner(spinnerElement);
                }
            });
        });

    }

    return {
        wireUpSanadSearchButtonClickEvent: sanadSearchButtonClickEventHanlder,
        wireUpsanadDetailSearchButtonClickEvent: sanadDetailSearchButtonClickEventHanlder
    };

})();