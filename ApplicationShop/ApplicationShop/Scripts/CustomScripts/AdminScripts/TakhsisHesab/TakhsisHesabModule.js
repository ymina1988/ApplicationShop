"use strict";
var takhsisHesabModule = (function () {

    //Initializing the TakhsisHesabTree
    function initTakhsisHesabTree() {
        InitDropDownTree("TakhsisHesabTree", "/Admin/Sanad/GetHesabTree", true, true, true);
    };

    //Set select2 on dropDown
    function setSelect2(selector, message) {
        $(selector)
     .select2({
         placeholder: message,
         allowClear: true
     });
    };

    //Handle the noe sanad load based on system select
    function systemSelectChangeHandler() {

        var $this = $(this);
        var systemId = $this.val();

        $.getJSON("/Admin/HesabTakhsis/GetNoeSanadBySystem", { systemId: systemId }, function getNoeSanadResponse(data, textStatus, jqXHR) {

            var htmlString = "<option>لطفا یک مقدار انتخاب کنید</option>";

            data.forEach(function forEachCallBack(value, index) {

                htmlString += '<option value="' + value.Value + '">' + value.Text + '</option>';
            });

            $("#NoeSanadSelect").empty();
            $("#NoeSanadSelect").append(htmlString);
        });
    };

    //Set noe sanad select event
    function setNoeSanadBasedOnSystem() {
        $("#SystemSelect").on("change", systemSelectChangeHandler);
    };

    //wire up spinner ajax event
    function setSpinnerWithEventForPartOfPage() {
        ajaxSpinnerForPartOfPage("#takhsis-hesab-form-body");
    };


    return {
        initTakhsisHesabTree: initTakhsisHesabTree,
        setSelect2: setSelect2,
        setNoeSanadBasedOnSystem: setNoeSanadBasedOnSystem,
        setSpinnerWithEventForPartOfPage: setSpinnerWithEventForPartOfPage
    }

})();