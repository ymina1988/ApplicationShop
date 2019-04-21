"use strict";

var searchIndexFormControlsModule = (function () {


    function companySelectChangeEventHandler() {
        $("#CompanySelect").on("change", function (e) {
            e.preventDefault();

            var $this = $(this);

            if ($this.val() === "") return;

            var spinnerElement = startAjaxSpinner("#advenced-search-form-container");

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
            ).complete(function () {
                stopAjaxSpinner(spinnerElement);
            });

        });
    }

    function gorouhTafziliSelectChangeEventHanlder() {


        $("#GorouhTafziliSelect").on("change", function (e) {
            e.preventDefault();

            var $this = $(this);

            if ($this.val() === "") return;

            var spinnerElement = startAjaxSpinner("#advenced-search-form-container");

            var $gorouhTafziliId = $this.val();

            $.get("/Admin/AdvancedSanadSearch/GetTafziliBasedOnGorouhTafziliSelectListItems",
                { idGorouhTafzili: $gorouhTafziliId },
                function (data, textStatus, jqXHR) {

                    var htmlString = '<option value="">لطفا یک مقدار انتخاب کنید</option>';

                    data.forEach(function (value, index) {

                        htmlString += '<option value="' + value.Value + '">' + value.Text + '</option>';
                    });

                    $("#Tafzili1Select").html(htmlString);

                },
                "json"
            ).complete(function () {
                stopAjaxSpinner(spinnerElement);
            });

        });
    }

    function initHesabTreeSelect() {
        InitDropDownTree("HesabTree", "/Admin/Sanad/GetHesabTree", true, true, false);
    }

    return {
        setUpSalMaliSelectBasedOnCompany: companySelectChangeEventHandler,
        setUpTafziliSelectBasedOnGorouhTafzili: gorouhTafziliSelectChangeEventHanlder,
        initHesabTreeSelect: initHesabTreeSelect
    };

})();