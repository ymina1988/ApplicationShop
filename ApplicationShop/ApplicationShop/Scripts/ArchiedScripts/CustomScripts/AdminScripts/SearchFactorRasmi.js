(function () {
    $(function () {
        "use strict";

        //it will return all of the events on page 
        //console.log($._data(document, "events"));

        //searching for factor rasmi with provided parameter
        $("#searchFactorRasmiSubmit").on("click", function (e) {
            e.preventDefault();

            var spinnerElement = startAjaxSpinner("#searchFactorRasmiSearchContainer",
            {
                lines: 11 // The number of lines to draw
                , length: 0 // The length of each line
                , width: 52 // The line thickness
                , radius: 2 // The radius of the inner circle
                , scale: 1.25 // Scales overall size of the spinner
                , corners: 1 // Corner roundness (0..1)
                , color: '#2DC3E8' // #rgb or #rrggbb or array of colors
                , opacity: 0.2 // Opacity of the lines
                , rotate: 69 // The rotation offset
                , direction: 1 // 1: clockwise, -1: counterclockwise
                , speed: 0.9 // Rounds per second
                , trail: 48 // Afterglow percentage
                , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
                , zIndex: 2e9 // The z-index (defaults to 2000000000)
                , className: 'spinner' // The CSS class to assign to the spinner
                , top: '50%' // Top position relative to parent
                , left: '50%' // Left position relative to parent
                , shadow: false // Whether to render a shadow
                , hwaccel: false // Whether to use hardware acceleration
                , position: 'absolute' // Element positioning
            });

            $.ajax({
                type: "POST",
                url: "/Admin/FactorRasmi/SearchFactorRasmi",
                data: $("#searchFactorRasmiForm").serialize(),
                dataType: "html",
                success: function (response) {

                    stopAjaxSpinner(spinnerElement);

                    //console.log(response);

                    if (response !== "") {
                        $("#factorRasmiTableContainer").html(response);
                        $("#FactorRasmiResultTable").DataTable({ "bAutoWidth": false });
                        $("#factorRasmiListContainer").slideDown(1000);
                    } else {
                        $("#factorRasmiEmptyContainer").slideDown(1000);
                    }
                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                }
            });


        });

        //show the detail modal for the selected factor rasmi
        $("body").on("click", ".factorRasmiDetailButton", function (e) {
            e.preventDefault();

            var spinnerElement = startAjaxSpinner("#frdmc");

            var $this = $(this);

            $("#factorRasmiDetailModal").modal("show");

            $("#factorRasmiDetailModalBody").load($this.attr("href"), function () { stopAjaxSpinner(spinnerElement); });

        });

        //delete factor rasmi detail
        $("body").on("click", ".deleteFactorRasmiDetail", function (e) {
            e.preventDefault();

            var $this = $(this);
            var antiForgeryToken = $('input[name="__RequestVerificationToken"]').val();
            var factorRasmiDetailId = $this.data("factor-rasmi-detail-id");

            (new PNotify({
                title: 'حذف جزئیات فاکتور رسمی',
                text: 'آیا از حذف جزئیات فاکتور رسمی مورد نظر اطمینان دارید؟',
                icon: 'glyphicon glyphicon-question-sign',
                hide: false,
                confirm: {
                    confirm: true
                },
                buttons: {
                    closer: false,
                    sticker: false
                },
                history: {
                    history: false
                }
            })).get().on('pnotify.confirm', function () {

                $.ajax({
                    type: "POST",
                    url: "/Admin/FactorRasmi/DeleteFactorRasmiDetail",
                    data: { __RequestVerificationToken: antiForgeryToken, FactorRasmiDetailId: factorRasmiDetailId },
                    dataType: "json",
                    success: function (response) {

                        if (response.Status === "DeleteSuccess") {
                            new PNotify({
                                title: 'حذف موفق',
                                text: 'آیتم مورد نظر با موفقیت حذف شد.',
                                type: 'success',
                                icon: 'glyphicon glyphicon-ok',
                                delay: 1000
                            });

                            $this.closest("tr").fadeOut(1000);
                        }

                        if (response.Status === "NotSuchFactorRasmiDetail") {
                            new PNotify({
                                title: 'یافت نشد',
                                text: 'جزئیات فاکتور رسمی با مشخصات فوق یافت نشد.',
                                type: 'warning',
                                icon: 'glyphicon glyphicon-warning-sign',
                                delay: 1000
                            });
                        }

                        if (response.Status === "IdCannotBeNull") {
                            new PNotify({
                                title: 'درخواست اشتباه',
                                text: 'آیدی جزئیات فاکتور رسمی نمی تواند خالی باشد.',
                                type: 'dander',
                                icon: 'glyphicon glyphicon-danger',
                                delay: 1000
                            });
                        }

                    },
                    error: function (xhr, status, error) {
                        console.log(xhr.responseText);
                        alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                    }
                });

            });

        });

        //loading the modal form for adding the new kala to factor rasmi
        $("body").on("click", ".addFactorRasmi", function (e) {
            e.preventDefault();

            var spinnerElement = startAjaxSpinner("#addKalaToFactorRasmiModalBody");


            var $this = $(this);
            var idFactorRasmi = $this.data("factor-rasmi-id");
            var pNumber = $this.data("pnumber");

            //console.log(idFactorRasmi);
            //console.log(pNumber);

            $("#addKalaToFactorRasmiModal").modal("show");

            $("#addKalaToFactorRasmiModalBody").load($this.attr("href"), function (response, status, xhr) {
                //console.log(response);
                //console.log(xhr.status);
                //console.log(xhr.statusText);
                //removes the jquery unobtrusive validation thingy from form, so the validation works!!?!(|:)
                $("#NewFactorRasmiDetailForm").removeData("validator");
                $("#NewFactorRasmiDetailForm").removeData("unobtrusiveValidation");
                $.validator.unobtrusive.parse("#NewFactorRasmiDetailForm");
                $("#IdFactorRasmi").val(idFactorRasmi);
                $("#PNumber").val(pNumber);
                stopAjaxSpinner(spinnerElement);
            });

        });

        //set measuring unit select when product select changes
        $("body").on("change", "#KalaSelect", function (e) {
            e.preventDefault();

            var $this = $(this);
            var kalaId = $this.val();

            if (kalaId !== "") {

                $.ajax({
                    type: "GET",
                    url: "/Admin/FactorRasmi/GetVahedeAndazegiriByKala",
                    data: { idKala: kalaId },
                    dataType: "json",
                    success: function (response) {

                        //console.log(response);
                        $("#VahedeAndazegiriSelect").empty();
                        var vahedSelectHtmlString = '<option value="">لطفا واحد اندازه گیری را انتخاب کنید</option>';

                        $.each(response.vaheds, function (index, value) {
                            vahedSelectHtmlString += '<option value="' + value.GheymatVahed + '" data-id-vahed="' + value.IdVahedAndazegiri + '" data-id-gheymat-kala="' + value.Id + '">' + value.Name + '</option>';
                        });

                        $("#VahedeAndazegiriSelect").append(vahedSelectHtmlString);

                    },
                    error: function (xhr, status, error) {
                        console.log(xhr.responseText);
                        alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                    }
                });
            }

        });

        //initialize the price span and and tedad input || set the IdVahedAndazegiri and IdGheymatKala hidden input on loaded form
        $("body").on("change", "#VahedeAndazegiriSelect", function (e) {
            e.preventDefault();

            var $thisSelect = $(this);

            var selectedOption = $thisSelect.find(":selected");
            //console.log(selectedOption.length);

            var idVahed = selectedOption.data("id-vahed");
            var idGheymat = selectedOption.data("id-gheymat-kala");
            //console.log(idVahed);
            //console.log(idGheymat);


            $("#IdVahedAndazegiri").val(idVahed);
            $("#IdGheymatKala").val(idGheymat);

            $("#Tedad").val(1);
            $("#Gheymat").text($("#VahedeAndazegiriSelect").val());

        });

        //set the price span based on vahede andazegiri select and tedad
        $("body").on("change", "#Tedad", function (e) {
            e.preventDefault();

            var $this = $(this);
            var number = $this.val();
            var price = $("#VahedeAndazegiriSelect").val();

            $("#Gheymat").text(+number * +price);
            $("#MablaghPasAzTakhfif").text(+$("#DarsadeTakhfif").val() * +$("#Gheymat").text());

        });

        //set the mablagh bad az takhfif based on darsade takhfif and total price
        $("body").on("change", "#DarsadeTakhfif", function (e) {
            e.preventDefault();

            var $this = $(this);
            var number = $this.val();
            var price = $("#Gheymat").text();

            $("#MablaghPasAzTakhfif").text(+number * +price);

        });

        //submit the new factor rasmi detail form
        $("body").on("submit", "#NewFactorRasmiDetailForm", function (e) {
            e.preventDefault();

            var spinnerElement = startAjaxSpinner("#add-kala-to-fr");


            var $thisForm = $(this);
            //console.log($thisForm.serializeArray());

            var antiForgeryToken = $('input[name="__RequestVerificationToken"]').val();

            var formValues = $thisForm.serializeArray();
            formValues.push({ name: "__RequestVerificationToken", value: antiForgeryToken });

            if ($("#NewFactorRasmiDetailForm").valid()) {

                $.ajax({
                    type: "POST",
                    url: "/Admin/FactorRasmi/NewFactorRasmiDetail",
                    data: formValues,
                    dataType: "json",
                    success: function (response) {

                        stopAjaxSpinner(spinnerElement);

                        //console.log(response);

                        if (response.Status === "ModelIsNotValid") {
                            var ulHtmlString = "<li>پر کردن مقادیر ذکر شده اجباری است.</li>";

                            $.each(response.Errors, function (index, value) {
                                ulHtmlString += '<li>' + value + '</li>';
                            });

                            $("#add-kala-modal-alert").append('<ul>' + ulHtmlString + '</ul>').slideDown(2000);
                        }

                        if (response.Status === "Success") {

                            new PNotify({
                                title: 'ثبت موفق',
                                text: 'آیتم مورد نظر با موفقیت ثبت شد.',
                                type: 'success',
                                icon: 'glyphicon glyphicon-ok',
                                delay: 5000
                            });

                            $("#NewFactorRasmiDetailForm").get(0).reset();

                            setTimeout(function () {
                                $("#addKalaToFactorRasmiModal").modal("hide");
                            }, 3000);

                        }

                        if (response.Status === "Error") {

                            new PNotify({
                                title: 'خطا',
                                text: 'عملیات ثبت موفقیت آمیز نبود.',
                                type: 'warning',
                                icon: 'glyphicon glyphicon-warning-sign',
                                delay: 2000
                            });

                            $("#NewFactorRasmiDetailForm").get(0).reset();
                            $("#addKalaToFactorRasmiModal").modal("hide");

                        }

                    },
                    error: function (xhr, status, error) {
                        console.log(xhr.responseText);
                        alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                    }
                });






            }

        });

        //load the edit element needed for editting factor rasmi detail
        $("body").on("click", ".editFactorRasmiDetail", function (e) {
            e.preventDefault();

            var $this = $(this);
            var $thisTr = $this.closest("tr");

            var tedadTd = $thisTr.find(".td-tedad");
            var discountTd = $thisTr.find(".td-discount");
            var editButton = $thisTr.find(".editFactorRasmiDetail");
            var editTd = $thisTr.find(".fsd-edit-button");

            var tedadTextBox = $('<input type="number" min="1" name="Tedad" value="' + tedadTd.text().trim() + '" class="form-control Tedad" placeholder="تعداد" />');
            var discountTextBox = $('<input type="text" name="DersadeTakhfif" value="' + discountTd.text().trim() + '" class="form-control DersadeTakhfif" placeholder="درصد تخفیف" />');
            var saveButton = $('<a data-factor-rasmi-detail-id="' + editButton.data("factor-rasmi-detail-id") + '" class="btn btn-success save-fsd">ذخیره</a>');

            tedadTd.fadeOut(1000, function () {
                $(this).html(tedadTextBox).fadeIn(1000);
            });

            discountTd.fadeOut(1000, function () {
                $(this).html(discountTextBox).fadeIn(1000);
            });

            editTd.fadeOut(1000, function () {
                $(this).html(saveButton).fadeIn(1000);
            });

        });

        //saving the new values for factor rasmi detail
        $("body").on("click", ".save-fsd", function (e) {
            e.preventDefault();

            var $this = $(this);
            var $thisTr = $this.closest("tr");
            var antiForgeryToken = $('input[name="__RequestVerificationToken"]').val();


            var tedadTd = $thisTr.find(".td-tedad");
            var discountTd = $thisTr.find(".td-discount");


            var fsdId = $this.data("factor-rasmi-detail-id");
            var tedadValue = $thisTr.find(".Tedad").val();
            var discountValue = $thisTr.find(".DersadeTakhfif").val();
            var editButton = $('<a data-factor-rasmi-detail-id="' + fsdId + '" class="btn btn-default editFactorRasmiDetail">ویرایش</a>');
            var editTd = $thisTr.find(".fsd-edit-button");

            $.ajax({
                type: "POST",
                url: "/Admin/FactorRasmi/EditFactorRasmiDetail",
                data: { __RequestVerificationToken: antiForgeryToken, idFsd: fsdId, tedad: tedadValue, discount: discountValue },
                dataType: "json",
                success: function (response) {

                    //console.log(response);


                    if (response.Status === "Success") {

                        new PNotify({
                            title: 'ثبت موفق',
                            text: 'آیتم مورد نظر با موفقیت ویرایش شد.',
                            type: 'success',
                            icon: 'glyphicon glyphicon-ok',
                            delay: 5000
                        });

                        tedadTd.fadeOut(1000, function () { $(this).html(tedadValue).fadeIn(1000); });
                        discountTd.fadeOut(1000, function () { $(this).html(discountValue).fadeIn(1000); });
                        editTd.fadeOut(1000, function () { $(this).html(editButton).fadeIn(1000); });

                    }

                    if (response.Status === "ParametersNotProvided") {

                        new PNotify({
                            title: 'خطای پارامتر',
                            text: 'پارامترهای لازم ارسال نشده..',
                            type: 'warning',
                            icon: 'glyphicon glyphicon-warning-sign',
                            delay: 2000
                        });

                    }

                    if (response.Status === "TedadCannotBeZero") {

                        new PNotify({
                            title: 'خطای پارامتر',
                            text: 'تعداد نمی تواند صفر یا کمتر از صفر باشد.',
                            type: 'warning',
                            icon: 'glyphicon glyphicon-warning-sign',
                            delay: 2000
                        });

                    }

                    if (response.Status === "NotFound") {

                        new PNotify({
                            title: 'یافت نشد',
                            text: 'جزئیات فاکتور مورد نظر یافت نشد.',
                            type: 'warning',
                            icon: 'glyphicon glyphicon-warning-sign',
                            delay: 2000
                        });

                    }

                    if (response.Status === "FailedOrNothingToSave") {

                        new PNotify({
                            title: 'خطا',
                            text: 'خطای نامعلومی رخ داده یا چیزی برای ذخیره وجود نداشت.',
                            type: 'warning',
                            icon: 'glyphicon glyphicon-warning-sign',
                            delay: 2000
                        });

                    }

                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                }
            });


        });


    });
})();