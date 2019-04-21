"use strict";

var searchSanadModule = (function () {

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

    function initHesabTree() {

        var isMali = $("#IsMali").val();

        //console.log(isMali);

        if (isMali === "False") {
            InitDropDownTree("HesabTree", "/Admin/Sanad/GetHesabTree", true, true, true);
        }

        if (isMali === "True") {
            InitDropDownTree("HesabTree", "/Admin/Sanad/GetHesabTreeMali", true, true, true);
        }

    }

    function initDataTable() {
        $("#sanad-search-result-table").dataTable();
    }

    function saliMaliSelectChangeEvent() {
        $("#CompanySelect").on("change", function (e) {
            e.preventDefault();

            var $this = $(this);

            if ($this.val() === "") return;

            var $idCompany = $this.val();

            $.get("/Admin/DaftarHesabdari/GetSalMaliByIdCompany",
                { idCompany: $idCompany },
                function (data, textStatus, jqXHR) {

                    var htmlString = '<option value="">لطفا یک مقدار انتخاب کنید</option>';

                    data.forEach(function (value, index) {

                        htmlString += '<option value="' + value.Value + '">' + value.Text + '</option>';
                    });

                    $("#SalMaliSelect").html(htmlString);

                },
                "json"
            );

        });
    }

    function searchButtonClickEvent() {

        $("#search-sanad-submit-button").on("click", function (e) {
            e.preventDefault();

            var $form = $('#search-sanad-form');

            if (!$form.valid()) return;

            var spinnerElement = startAjaxSpinner("#daftare-hesabdari-search-body", spinnerConfig);

            var $formData = $form.serialize();

            $.ajax({
                type: "POST",
                url: "/Admin/DaftarHesabdari/SearchSanad",
                data: $formData,
                dataType: "html",
                success: function (response) {

                    $('#search-result-table').empty();

                    $('#search-result-table').html(response);

                    initDataTable();

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
        loadSalMaliSelectBasedOnCompanySelect: saliMaliSelectChangeEvent,
        initHesabTree: initHesabTree,
        searchButtonClickEvent: searchButtonClickEvent
    };

})();