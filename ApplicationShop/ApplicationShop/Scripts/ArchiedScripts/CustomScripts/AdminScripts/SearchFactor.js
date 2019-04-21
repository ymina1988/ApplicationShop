(function () {
    $.validator.setDefaults({ ignore: ":hidden:not(select)" });
    $(function () {
        "use strict";

        ////check the form, if no checkbox is selected, prevent from submitting and show message
        //$("#SubmitFactorRasmiForm").on("submit", function (e) { 

        //    var $this = $(this);

        //    //console.log($('input[name*="SearchFactorResultViewModels"]:checked:enabled').length);

        //    if ($('#factorTable input[name*="SearchFactorResultViewModels"]:checked:enabled').length === 0) {

        //        new PNotify({
        //            title: 'ثبت ناموفق',
        //            text: 'برای ثبت باید یک مقدار انتخاب کنید.',
        //            type: 'warning',
        //            icon: 'glyphicon glyphicon-warning-sign',
        //            delay: 2000
        //        });

        //        return false;
        //    } else {

        //        if ($this.valid()) {

        //            //$this.submit(); this cause infinite loop and exploding call stack if you're in a submit event
        //            return true;
        //        }
        //    }


        //});


        $(".factor-rasmi-submit").on("click", function (e) {
            e.preventDefault();
            var $this = $(this);
            var $form = $("#SubmitFactorRasmiForm");

            if ($('#factorTable input[name*="SearchFactorResultViewModels"]:checked:enabled').length === 0) {
                new PNotify({
                    title: 'ثبت ناموفق',
                    text: 'برای ثبت باید یک مقدار انتخاب کنید.',
                    type: 'warning',
                    icon: 'glyphicon glyphicon-warning-sign',
                    delay: 2000
                });
                return;
            }

            var factorType = $this.data("factor-type");

            var antiForgeryToken = $('input[name="__RequestVerificationToken"]').val();

            var formData = $form.serializeArray();
            formData.push({ name: "__RequestVerificationToken", value: antiForgeryToken });
            formData.push({ name: "factorType", value: factorType });

            if ($form.valid()) {
                $.ajax({
                    type: "POST",
                    url: "/Admin/FactorRasmi/SubmitFactorRasmi",
                    data: formData,
                    dataType: "json",
                    success: function (response) {

                        //console.log(response);


                        if (response.Status === "Success") {
                            new PNotify({
                                title: 'ثبت موفق',
                                text: 'فاکتور رسمی با موفقیت ثبت شد.',
                                type: 'success',
                                icon: 'glyphicon glyphicon-success',
                                delay: 2000
                            });
                            $("#factor-rasmi-form-container").slideUp(1000);
                        }

                        if (response.Status === "Failed") {
                            new PNotify({
                                title: 'ثبت ناموفق',
                                text: 'خطایی در ثبت فاکتور رسمی پیش آمده.',
                                type: 'warning',
                                icon: 'glyphicon glyphicon-warning-sign',
                                delay: 2000
                            });
                            $("#factor-rasmi-form-container").slideUp(1000);
                        }

                        if (response.Status === "UnKnownErrorOccurred") {
                            new PNotify({
                                title: 'خطای نامعلوم',
                                text: 'خطایی در پروسه ثبت پیش آمده',
                                type: 'warning',
                                icon: 'glyphicon glyphicon-warning-sign',
                                delay: 2000
                            });
                            $("#factor-rasmi-form-container").slideUp(1000);
                        }

                        if (response.Status === "ModelIsNotValid") {
                            new PNotify({
                                title: 'خطای ولیدیشن',
                                text: 'فرم معتبر نیست، ولیدیشن با خطا مواجه شد.',
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
            }



        });

        $("#CompanySelect").chosen();
        $("#CustomerNameSelect").chosen();

        //#region throw away code
        //$("#CustomerNameSelect").on("change", function(e) {

        //    var customerId = $(this).val();

        //    //$("#NameMostaar").val("somethind")

        //    $.ajax({
        //        type: "GET",
        //        url: "/Admin/FactorRasmi/GetMostaarNameAndAddress",
        //        data: { customerId: customerId },
        //        dataType: "json",
        //        success: function (response) {

        //            $("#NameMostaar").val(response.CustomerMostaarName).prop("readonly", "readonly");
        //            $("#CustomerAddress").val(response.CustomerAddress).prop("readonly", "readonly");

        //        },
        //        error: function (xhr, status, error) {
        //            console.log(xhr.responseText);
        //            alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
        //        }
        //    });


        //});
        //#endregion

    });
})();