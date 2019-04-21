(function () {

    $(function () {
        "use strict";

        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g
        };

        var tbl = $('#kalaListTable').DataTable({
            "aoColumnDefs": [
                      { 'bSortable': false, 'aTargets': [1, 2, 4, 7, 8] }
            ],
            "bFilter": true,
            "bLengthChange": true,
            "bAutoWidth": false,
            "info": false
        });

        ajaxSpinnerForPartOfPage(".panel-container");

        //populating goruhKalaSelect mutiSelect
        $('#goruhKalaSelect').multiselect({
            enableFiltering: true,
            includeSelectAllOption: true,
            selectAllText: "انتخاب همه",
            buttonText: function (options, select) {
                return 'انتخاب گروه کالا';
            }
        });

        //populating brandSelect mutiSelect
        $('#brandSelect').multiselect({
            enableFiltering: true,
            includeSelectAllOption: true,
            selectAllText: "انتخاب همه",
            buttonText: function (options, select) {
                return 'انتخاب برند کالا';
            }
        });

        //save the measuring unit for furthur use
        var vahedHayeAndazegiri;

        //loading the list of product after click search kala
        $("#loadKala").on("click", function (e) {
            e.preventDefault();

            tbl.clear().draw();

            //console.log($("#goruhKalaSelect").val());

            //console.log($("#brandSelect").val());

            if ($("#goruhKalaSelect").val() === null) {
                new PNotify({
                    title: 'گروه کالا خالی',
                    text: 'گروه کالا خالی است، لطفا ابتدا گروه کالای مورد نظر خود را انتخاب کنید.',
                    type: 'warning',
                    icon: 'glyphicon glyphicon-warning-sign',
                    delay: 1000
                });
                return;
            }


            var goruhKalaIds = $("#goruhKalaSelect").val().toString();

            if ($("#brandSelect").val() !== null) {
                var brandIds = $("#brandSelect").val().toString();
            }


            $.ajax({
                type: "GET",
                url: "/User/Order/GetListOfKala",
                data: { goruhKalaId: goruhKalaIds, brandId: brandIds },
                dataType: "json",
                success: function (response) {

                    //bad practice
                    //$("#kalaTableBody").empty();

                    //console.log(response.kala);
                    //console.log(response.vahedByKala);
                    //console.log(response.kala.length);
                    //console.log(response.vahedByKala.length);
                    //console.log($("#kalaTableBody tr").length);

                    if (response.Status === "GoruhKalaIdCannotBeEmpty") {
                        new PNotify({
                            title: 'گروه کالا خالی',
                            text: 'گروه کالا خالی است، لطفا ابتدا گروه کالای مورد نظر خود را انتخاب کنید.',
                            type: 'warning',
                            icon: 'glyphicon glyphicon-warning-sign',
                            delay: 1000
                        });
                        return;
                    }

                    if (response.Status === "NoProductFound") {
                        new PNotify({
                            title: 'کالایی یافت نشد',
                            text: 'کالایی در گروه کالای انتخابی یافت نشد.',
                            type: 'warning',
                            icon: 'glyphicon glyphicon-warning-sign',
                            delay: 1000
                        });

                        $("#kalaTableBody").empty();
                        $("#listOfKalaTableContainer").slideUp(500);

                        return;
                    }




                    if (response.Status === "UserDoesntHaveAddress") {
                        new PNotify({
                            title: 'کاربر فاقد آدرس پیشفرض',
                            text: 'آدرس پیشفرضی برای شما وجود ندارد، لطفا قبل از ثبت سفارش یک آدرس پیشفرض برای خود ثبت کنید.',
                            type: 'warning',
                            icon: 'glyphicon glyphicon-warning-sign',
                            delay: 1000
                        });
                        return;
                    }

                    if (response.kala.length === 0) {
                        new PNotify({
                            title: 'کالایی یافت نشد',
                            text: 'کالایی برای گروه کالا و برند انتخابی یافت نشد.',
                            type: 'warning',
                            icon: 'glyphicon glyphicon-warning-sign',
                            delay: 1000
                        });
                        return;
                    }
                    var tableHtmlString;

                    vahedHayeAndazegiri = response.vahedByKala;

                    var previouslyAddedFinal = $("#kalaFinalTableBody .kalaCheckBox").map(function (index, element) { return $(element).val() });
                    var previouslyAddedPreFinal = $("#kalaTableBody .kalaCheckBox").map(function (index, element) { return $(element).val() });
                    //console.log(previouslyAddedFinal);
                    //console.log(previouslyAddedPreFinal);

                    var incomingKalasId = response.kala.map(function (value) { return value.IdKala });
                    //console.log(incomingKalasId);

                    //Note to future self: watch out for comparing string value in an array and int value, it van bite!!
                    previouslyAddedPreFinal.each(function (index, value) {
                        if ($.inArray(+value, incomingKalasId) === -1) {
                            //console.log(value);
                            //console.log(incomingKalasIs);

                            $("#kalaTableBody tr .kalaCheckBox").filter(function (index, element) {
                                return $(element).val() === value;
                            }).closest("tr").remove();
                            //console.log(haIeeKhoobe.length);
                        }
                    });

                    //console.log(response.vahedByKala);

                    $.each(response.kala, function (index, value) {

                        var vahedeAndazegiriSelectString;

                        //console.log($.inArray(value.IdKala.toString(), previouslyAddedFinal) === -1);

                        if ($.inArray(value.IdKala.toString(), previouslyAddedPreFinal) === -1) {
                            if ($.inArray(value.IdKala.toString(), previouslyAddedFinal) === -1) {

                                $.each(response.vahedByKala, function (innderIndex, innerValue) {
                                    if (value.IdKala === innerValue.IdKala) {
                                        var selectTemplate = _.template('<option {{ selected }} value ="{{ IdVahedAndazegiri }}">{{ Name }}</option>');
                                        vahedeAndazegiriSelectString += selectTemplate({ selected: (innerValue.IsAsli == true ? "selected=\"selected\"" : ""), IdVahedAndazegiri: innerValue.IdVahedAndazegiri, Name: innerValue.Name });
                                    }
                                });

                                var gheymat = response.vahedByKala.filter(function (currentValue) { return currentValue.IdKala == value.IdKala && currentValue.IsAsli == true }).map(function (value) { return { "GheymatVahed": value.GheymatVahed, "IdGheymatKala": value.Id } });
                                gheymat = gheymat.length === 0 ? [{ "GheymatVahed": 0, "IdGheymatKala": 0 }] : gheymat;//inversion of null check, interstring
                                //console.log(gheymat);

                                var tableBodyTemplate = _.template('<tr><td>{{ Index }}</td><td><input type="checkbox" class="kalaCheckBox" name="IdKala" value="{{ IdKala }}"/></td><td> <img src="/assets/img/avatars/nophoto.jpg" style="max-width: 50px;"/> </td><td>{{ Name }}</td><td> <select class="kalaSelect" name="IdVahedAndazegiri">{{ vahedeAndazegiriSelectString }}</select> </td><td class="gheymatKala">{{ GheymatKala }}</td><td class="gheymatTotalKala">{{ GheymatTotalKala }}</td> <input class="idGheymat" name="IdGheymatKala" value="{{ IdGheymat }}" type="hidden" /><input class="gheymatVahed" name="GheymatVahed" value="{{ GheymatVahed }}" type="hidden" /><td><input  type="number" min="1" max="99999" class="inputNumber" min="1" value="1" name="Meghdar" /></td><td><a href="#" class="btn btn-sm btn-success addToListFromRow">انتخاب</a></td></tr>');

                                var $theTr = $(tableBodyTemplate({ Index: index + 1, IdKala: value.IdKala, Name: value.Name, vahedeAndazegiriSelectString: vahedeAndazegiriSelectString, GheymatKala: gheymat[0].GheymatVahed, GheymatTotalKala: gheymat[0].GheymatVahed, IdGheymat: gheymat[0].IdGheymatKala, GheymatVahed: gheymat[0].GheymatVahed }));

                                //Note: the td and th must exactly match what you feed to datatable or else error!
                                tbl.row.add($theTr).draw(false);
                                //tbl.row.add($(this)).draw(false);
                            }
                        }

                    });

                    $("#preSubmitListKala").show();

                    $("#listOfKalaTableContainer").slideDown(500);

                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                }
            });

        });

        //code handling selection of all of deselecting of products
        $("#select-all").on("change", function (e) {

            var $this = $(this);

            if ($this.is(":checked")) {
                $("#kalaTableBody .kalaCheckBox").prop("checked", true);
            }

            if (!$this.is(":checked")) {
                $("#kalaTableBody .kalaCheckBox").prop("checked", false);
            }

        });

        //loading the selected products to the list
        $("#preSubmitListKala").on("click", function (e) {

            e.preventDefault();

            var checked = $("#kalaTableBody input[type='checkbox']").filter(":checked");

            var trs = checked.closest("tr");

            //trs.children(".kalaCheckBox").remove();

            //console.log(checked);
            //console.log(trs);

            if (trs.length === 0) {
                new PNotify({
                    title: 'لیست انتخابی خالی',
                    text: 'لیست انتخابی خالی است، لطفا اول یک سری کالا انتخاب کنید.',
                    type: 'warning',
                    icon: 'glyphicon glyphicon-warning-sign',
                    delay: 1000
                });
                return;
            }

            $.each(trs, function (index, value) {

                //$(value).find(".kalaCheckBox").closest("td").remove();

                $(value).fadeOut(1000, function () {
                    $(value).find(".deleteFinalKala").show();
                    $(value).appendTo("#kalaFinalTableBody").show(1000);
                    tbl.row(value).remove().draw(false);
                });

                $(value).find(".kalaCheckBox").prop("disabled", true);

                //change according to user request
                //$(value).find(".kalaSelect").prop("disabled", true);

                $(value).append('<td><a href="#" class="btn btn-danger btn-sm deleteFinalKala" style="display:none;">حذف</a></td>');
                $(value).find(".addToListFromRow").closest("td").fadeOut(1000, function () { $(this).remove() });

            });

            //#region calculating the total price
            var totalPrice = Number($("#totalPriceTd").text()) == NaN ? 0 : Number($("#totalPriceTd").text());
            trs.each(function (index, value) {

                var $innerThis = $(this);

                var price = $innerThis.find(".gheymatVahed").val();
                //console.log(price);

                var number = $innerThis.find(".inputNumber").val();
                //console.log(number);

                totalPrice += price * number;

            });

            $("#totalPriceTd").text(totalPrice);
            //#endregion


            $("#FinalSubmitListKala").show();

            $("#listOfFinalKala").slideDown(500);



        });

        //adding the individual product to the list
        $("body").on("click", ".addToListFromRow", function (e) {
            e.preventDefault();

            var $this = $(this);
            var $thisTr = $this.closest("tr");

            $thisTr.find(".kalaCheckBox").prop("disabled", true);
            $thisTr.find(".kalaCheckBox").prop("checked", "checked");

            $thisTr.append('<td><a href="#" class="btn btn-danger btn-sm deleteFinalKala" style="display:none;">حذف</a></td>');
            $thisTr.find(".addToListFromRow").closest("td").fadeOut(1000, function () { $(this).remove() });

            $thisTr.fadeOut(1000, function () {
                $thisTr.find(".deleteFinalKala").show();
                $(this).appendTo("#kalaFinalTableBody").show(1000);
                tbl.row($thisTr).remove().draw(false);
            });

            //#region calculating the total price
            var totalPrice = Number($("#totalPriceTd").text()) == NaN ? 0 : Number($("#totalPriceTd").text());

            var price = $thisTr.find(".gheymatVahed").val();
            //console.log(price);

            var number = $thisTr.find(".inputNumber").val();
            //console.log(number);

            totalPrice += price * number;

            $("#totalPriceTd").text(totalPrice);
            //#endregion

            //$("#kalaFinalTableBody").append($thisTr);
            $("#FinalSubmitListKala").show();

            $("#listOfFinalKala").slideDown(500);

        });

        //delete the selected products of needed
        $("body").on("click", ".deleteFinalKala", function (e) {

            e.preventDefault();

            var $this = $(this);

            $this.closest("tr").find(".kalaCheckBox").prop("disabled", false);

            $this.closest("tr").find(".kalaSelect").prop("disabled", false);

            $this.closest("tr").append('<td><a href="#" class="btn btn-sm btn-success addToListFromRow" style="display:none;">انتخاب</a></td>');

            $this.closest("tr").find(".deleteFinalKala").closest("td").fadeOut(1000, function () { $(this).remove() });

            $this.closest("tr").fadeOut(1000, function () {
                $(this).find(".addToListFromRow").show();
                $(this).appendTo("#kalaTableBody").show(1000);


                var totalPrice = 0;
                $("#kalaFinalTableBody tr").each(function (index, value) {

                    var $innerThis = $(this);

                    var price = $innerThis.find(".gheymatVahed").val();
                    //console.log(price);

                    var number = $innerThis.find(".inputNumber").val();
                    //console.log(number);

                    totalPrice += price * number;

                });

                $("#totalPriceTd").text(totalPrice);

            });

        });

        //by changing the measuring unit select the price of product change too
        $("body").on("change", ".kalaSelect", function (e) {

            var $this = $(this);

            var idKala = $this.closest("tr").find(".kalaCheckBox").val();

            var idVahed = $this.val();

            //console.log(idKala);
            //console.log(idVahed);
            //console.log(vahedHayeAndazegiri);

            var gheymat = vahedHayeAndazegiri.filter(function (value) { return (value.IdKala == idKala && value.IdVahedAndazegiri == idVahed) }).map(function (value) { return { "GheymatVahed": value.GheymatVahed, "IdGheymatKala": value.Id } });

            //console.log(gheymat);
            //console.log(gheymat[0].GheymatVahed);
            //console.log(gheymat[0].IdGheymatKala);

            $this.closest("tr").find(".gheymatKala").text(gheymat[0].GheymatVahed);
            $this.closest("tr").find(".idGheymat").val(gheymat[0].IdGheymatKala);
            $this.closest("tr").find(".gheymatVahed").val(gheymat[0].GheymatVahed);



            var currentTr = $this.closest("tr");

            var price = currentTr.find(".gheymatVahed").val();
            //console.log(price);

            var number = currentTr.find(".inputNumber").val();
            //console.log(number);

            currentTr.find(".gheymatTotalKala").text(price * number);

            var totalPrice = 0;
            $("#kalaFinalTableBody tr").each(function (index, value) {

                var $innerThis = $(this);

                var price = $innerThis.find(".gheymatVahed").val();
                //console.log(price);

                var number = $innerThis.find(".inputNumber").val();
                //console.log(number);

                totalPrice += price * number;

            });

            $("#totalPriceTd").text(totalPrice);


        });

        //by changing the number of product, the total price changing too
        $("body").on("input", ".inputNumber", function (e) {

            var $this = $(this);

            //check if the value of the input is more than 5 digit, truncate the rest
            if ($this.val().length > 5) {
                $this.val($this.val().slice(0, 5));
            }

            var currentTr = $this.closest("tr");

            var price = currentTr.find(".gheymatVahed").val();
            //console.log(price);

            var number = $this.val();
            //console.log(number);

            currentTr.find(".gheymatTotalKala").text(price * number);

            var totalPrice = 0;
            $("#kalaFinalTableBody tr").each(function (index, value) {

                var $innerThis = $(this);

                var price = $innerThis.find(".gheymatVahed").val();
                //console.log(price);

                var number = $innerThis.find(".inputNumber").val();
                //console.log(number);

                totalPrice += price * number;

            });

            $("#totalPriceTd").text(totalPrice);

        });

        //submitting the form and doing the necessary cleanup 
        $("#FinalSubmitListKala").on("click", function (e) {
            e.preventDefault();


            if ($('#kalaFinalTableBody tr').length === 0) {

                new PNotify({
                    title: 'ثبت نا موفق',
                    text: 'کالایی برای سفارش انتخاب نشده',
                    type: 'warning',
                    icon: 'glyphicon glyphicon-warning-sign',
                    delay: 1000
                });

                return;
            }

            ajaxSpinnerForPartOfPage("#listOfFinalKala");

            $("#SubmitListKalaForm :disabled").removeAttr('disabled');

            var token = $('input[name="__RequestVerificationToken"]').val();

            //console.log($("#SubmitListKalaForm").serializeArray());



            var data = $('#kalaFinalTableBody tr').map(function () {
                var $tr = $(this);

                return {
                    IdKala: $tr.find(':input[name=IdKala]').val(),
                    IdVahedAndazegiri: $tr.find(':input[name=IdVahedAndazegiri]').val(),
                    GheymatVahed: $tr.find(':input[name=GheymatVahed]').val(),
                    IdGheymatKala: $tr.find(':input[name=IdGheymatKala]').val(),
                    Meghdar: $tr.find(':input[name=Meghdar]').val()
                    //,
                    //listThing: $form.find(':input[name=ListThing]').map(function () {
                    //    return $(this).val();
                    //}).toArray()
                };

            }).toArray();

            if (_.any(data, function (value) { return value.Meghdar === "" })) {
                new PNotify({
                    title: 'ثبت نا موفق',
                    text: 'تعداد کالا نمی تواند خالی باشد.',
                    type: 'warning',
                    icon: 'glyphicon glyphicon-warning-sign',
                    delay: 1000
                });
                return;
            }

            //console.log(data);

            $.ajax({
                type: "POST",
                url: "/User/Order/SubmitOrder",
                data: { __RequestVerificationToken: token, viewModel: data },
                dataType: "json",
                success: function (response) {

                    if (response.Status === "Success") {

                        new PNotify({
                            title: 'ثبت موفق',
                            text: 'سفارش شما با موفقیت ثبت شد، شماره سفارش شما: ' + response.SefareshNumber,
                            type: 'success',
                            icon: 'glyphicon glyphicon-ok',
                            delay: 5000
                        });

                        $("#shomare-sefaresh-span").text(response.SefareshNumber);
                        $("#successAlert").slideDown("slow");

                        setTimeout(function () {
                            $("#successAlert").slideUp("slow");
                        }, 10000);

                        $("#kalaFinalTableBody tr").fadeOut(2000, function () {
                            tbl.row.add($(this)).draw(false);
                            $(this).append('<td><a href="#" class="btn btn-sm btn-success addToListFromRow">انتخاب</a></td>');
                            $(this).find(".deleteFinalKala").closest("td").remove();
                            $(this).appendTo("#kalaTableBody").show(2000);
                        });

                        $("#listOfFinalKala").slideUp(2000);

                    }

                    if (response.Status === "Failed") {
                        new PNotify({
                            title: 'خطا در ثبت سفارش',
                            text: 'خطایی در ثبت سفارش شما پیش آمده، لطفا پس از چند لجظه دوباره تلاش کنید، اگر موفق نشدید با مدیریت تماس بگیرید.',
                            type: 'warning',
                            icon: 'glyphicon glyphicon-warning-sign',
                            delay: 2000
                        });
                        return;
                    }

                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                }
            });

        });

        //#region throw away code, that is, code written by team members that is not needed now, here just for reference

        //$('#search').click(function () {
        //    var _goruhKalaSelect = $('#goruhKalaSelect').val();
        //    var _brandSelect = $('#brandSelect').val();
        //    $.ajax({
        //        url: "/User/Order/_ListKala",
        //        type: "POST",
        //        data: { goruhKalaSelect: _goruhKalaSelect, brandSelect: _brandSelect },
        //        success: function (response) {
        //            $('#result').empty();
        //            $('#result').append(response);
        //        },
        //        error: function (response) {
        //            alert('This Is a Problem For You , You Must Find The Problem');
        //        }
        //    })
        //    .done(function (res) {
        //        $("#ListOfCategory").data("kendoMultiSelect").value(res);
        //    });
        //});

        //#endregion

    });
})();