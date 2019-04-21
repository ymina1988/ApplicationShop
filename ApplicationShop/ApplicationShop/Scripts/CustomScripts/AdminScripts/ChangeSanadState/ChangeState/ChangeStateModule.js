var changeStateModule = (function () {

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



    //function OnSelectedChange(senderId, selectedText, selectedValue) {
    //    if (senderId === "#CompanyTreeSelect_ulTree") {

    //        $.ajax({
    //            type: "GET",
    //            url: "/Admin/Sanad/GetSalMaliByIdCompany",
    //            data: { idCompany: selectedValue },
    //            dataType: "json",
    //            success: function (response) {
    //                $("#IdSalMali").empty();
    //                var htmlString = '<option value="">لطفا سال مالی را انتخاب کنید</option>';
    //                for (var i = 0; i < response.length; i++) {
    //                    htmlString += "<option value=" + response[i].Id + "  data-IsActive=" + response[i].IsActive + " data-from-date=" + response[i].FromShamsiDate + "  data-to-date=" + response[i].ToShamsiDate + ">" + response[i].Name + "</option>";
    //                }
    //                $("#IdSalMali").html(htmlString);
    //                $("select[name=IdSalMali]").find("option[data-isactive=true]").attr("selected", "selected")
    //                $("#IdSalMali").select2({
    //                    placeholder: "یک  سال انتخاب کنید...",
    //                    allowClear: true
    //                });
    //                $("#IdSalMali option [data-IsActive='" + "true" + "']  ").prop('selected', true);


    //            },
    //            error: function (xhr, status, error) {
    //                console.log(xhr.responseText);
    //                alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
    //            }
    //        });
    //        return;
    //    }



    //}




    
  
    function getSalMaliBasedOnCompany(idCompany) {


        $.ajax({
            type: "GET",
            url: "/Admin/ChangeSanadState/GetSalMaliBasedOnCompany",
            data: { idCompany: idCompany },
            dataType: "json",
            success: function (response) {
                $("#SalMaliSelect").empty();
                var htmlString = '<option value="">لطفا سال مالی را انتخاب کنید</option>';
                for (var i = 0; i < response.length; i++) {
                    htmlString += "<option value=" + response[i].Id + "  data-IsActive=" + response[i].IsActive + " data-from-date=" + response[i].FromShamsiDate + "  data-to-date=" + response[i].ToShamsiDate + ">" + response[i].Name + "</option>";
                }
                $("#SalMaliSelect").html(htmlString);
                $("select[name=SalMaliSelect]").find("option[data-isactive=true]").attr("selected", "selected")
                $("#SalMaliSelect").select2({
                    placeholder: "یک  سال انتخاب کنید...",
                    allowClear: true
                });
                $("#SalMaliSelect option [data-IsActive='" + "true" + "']  ").prop('selected', true);


            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
                alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
            }
        });







 

    }

    function getSalMaliBasedOnCompanyEventHandler() {

        $("#CompanySelect").on("change", function (e) {

            var idCompany = $(this).val();

            getSalMaliBasedOnCompany(idCompany);

        });

    }

    function searchSanadChangeStateEventHandler() {

        $("#search-sanad-state").on("click", function hangleSearch(e) {
            e.preventDefault();

            var $form = $("#change-sanad-state-form");
            var spinnerElement = startAjaxSpinner("#change-sanad-state-search-body", spinnerConfig);

            $.ajax({
                type: "POST",
                url: "/Admin/ChangeSanadState/ChangeState",
                data: $form.serialize(),
                dataType: "html",
                success: function (response) {

                    $("#change-state-table-body").empty();

                    $("#change-state-table-body").append(response);

                    $("#change-sanad-state-table").DataTable();

                    $("#change-state-table-container").slideDown(500);

                },
                error: function (xhr, status, error) {
                    alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                    console.log(xhr.responseText);
                },
                complete: function () {
                    stopAjaxSpinner(spinnerElement);
                }
            });


        });


    }

    return {
        populateSalMaliSelectBasedOnCompanySelect: getSalMaliBasedOnCompanyEventHandler,
        wireUpSearchSanad: searchSanadChangeStateEventHandler
    };

})();