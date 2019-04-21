(function () {
    $(function () {
        "use strict";

        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g
        };

        $("#pish-factor-table").DataTable();

        //it keeps the temporary price table values 
        var priceTableData = [];

        //show the popup detail for factor
        $(".sodoorDetail").on("click", function (e) {
            e.preventDefault();
            window.open($(this).attr("href"), '_blank', 'toolbar=0,location=0,menubar=0,scrollbars=yes');
        });

        //showing the factor number modal, if the element exist, that is if we are in that page
        if ($(".alertClose").length > 0) {

            //setTimeout(function () {
            //    window.close();
            //}, 20000);

            $("#closeWindowCountDownModal").modal("show");

            //var ourTime = 20;

            //setInterval(function () {

            //    $("#countDown").text(ourTime);

            //    ourTime--;

            //}, 1000);

        }

        //code handling the price preview calculator
        $(".hazineHamlTxt").on("change", function (e) {

            var $this = $(this);

            var txtName = $this.attr("name");

            var companyId = $this.closest("tr").find(".companyDropDown option:selected").val();
            //console.log(companyId);

            var companyName = $this.closest("tr").find(".companyDropDown option:selected").text().split("-")[0];
            //console.log(companyName);

            //console.log(_.flatten(priceTableData));
            //console.log(txtName);
            //console.log(_.flatten(priceTableData).map(function (value) { return value.TextBoxName }));
            if ($.inArray(txtName, _.flatten(priceTableData).map(function (value) { return value.TextBoxName })) !== -1) {
                priceTableData = $.grep(priceTableData, function (value) { return value.TextBoxName !== txtName });
            }

            priceTableData.push({ TextBoxName: txtName, CompanyId: companyId, CompanyName: companyName, Price: $this.val() });
            //console.log(data);

            var groupedData = _.groupBy(priceTableData, "CompanyId");
            //console.log(groupedData);

            if (!isNaN($this.val())) {
                if (companyId !== "") {

                    $(".tdHazine").closest("tr").remove();

                    var hazineTableTemplate = _.template('<tr><td>{{ karKhaneName }}</td><td class="tdHazine">{{ hazineHaml }}</td></tr>');
                    var htmlString = "";

                    $.each(groupedData, function (index, value) {

                        var totalPrice = 0;
                        $.each(value, function (innerIndex, innerValue) {

                            //adds the price of grouped companies
                            totalPrice += Number(innerValue.Price);

                            //only add the last grouped companies when its price is accumulated and add it once to the list
                            if (innerIndex === value.length - 1) {
                                htmlString += hazineTableTemplate({
                                    karKhaneName: innerValue.CompanyName,
                                    hazineHaml: totalPrice
                                });
                            }

                        });

                    });

                    var total = 0; $.each(priceTableData, function (index, value) { total += +value.Price; });

                    $(htmlString).insertBefore("#totalTr");
                    $("#totalTd").text(total);
                }
            }

            //#region this code is refactored into above code
            //if (!isNaN($this.val())) {
            //    if (companyId !== "") {

            //        var addedCompanies = $("#companyTableBody tr");

            //#region this replaced with jquery is

            //if (addedCompanies.length !== 0) {

            //    addedCompanies.each(function (index, element) {

            //        var $previousElement = $(element);
            //        // use the damn == for number comparison form now on
            //        //console.log($(element).data("company-id"));
            //        //console.log(companyId);
            //        //console.log($(element).data("company-id") == companyId);

            //        if ($(element).data("company-id") == companyId) {
            //            $previousElement.find(".tdHazine").text((+$this.val()) + (+$previousElement.find(".tdHazine").text()));
            //        }
            //    });

            //}

            //#endregion

            //        //this is shorter but you loose the context of $(this) here
            //        if (addedCompanies.is(function (index) { return $(this).data("company-id") == companyId })) {
            //            //console.log($this.val());
            //            //console.log($(this).find(".tdHazine").text());
            //            var $element = addedCompanies.filter(function () { return $(this).data("company-id") == companyId });
            //            $element.find(".tdHazine").text((+$this.val()) + ((+$element.find(".tdHazine").text()) - +prev));
            //        }

            //        if (!addedCompanies.is(function (index) { return $(this).data("company-id") == companyId })) {
            //            var hazineTableTemplate = _.template('<tr data-company-id={{ companyId }}><td>{{ karKhaneName }}</td><td class="tdHazine">{{ hazineHaml }}</td></tr>');

            //            var htmlString = hazineTableTemplate({
            //                karKhaneName: companyName,
            //                hazineHaml: $this.val(),
            //                companyId: companyId
            //            });

            //            //$("#companyTableBody").append(htmlString);
            //            // <tr id="totalTr" style="background-color: #2DC3E8;"><td>جمع کل</td><td id="totalTd"></td></tr>
            //            $(htmlString).insertBefore("#totalTr");
            //        }

            //        var sum = 0;

            //        var totalValue = $("#companyTableBody tr").find(".tdHazine").map(function (index, value) { return +$(value).text() }).each(function (index, value) { sum += value; });
            //        $("#totalTd").text(sum);
            //    }
            //}
            //#endregion

        });

        // make the promotion select in pish factor detail chosen thingy stuff
        $(".promotion-select").chosen();

        //handle the both deny and confirm button
        $(".response").on("click", function (e) {
            e.preventDefault();

            var $this = $(this);
            var buttonResponse = $this.data("response");

            var $form = $("#SodoorPishFactorDetailForm");
            var formData = $form.serializeArray();

            if (buttonResponse === "deny") {

                formData.push({ name: "sefareshResponse", value: "Deny" });

                $.ajax({
                    type: "POST",
                    url: "/Admin/PishFactor/SodoorPishFactorDetail",
                    data: formData,
                    dataType: "json",
                    success: function (response) {

                        //console.log(response);

                        if (response.Status === "DenySuccess") {
                            $("#DenyModal").modal("show");
                        }

                        if (response.Status === "UnknownErrorOccurred") {
                            new PNotify({
                                title: 'خطای نامعلوم یا فرم بدون تغییر',
                                text: 'خطای نامعلومی رخ داده یا چیزی برای ذخیره کردن وجود نداشت.',
                                type: 'warning',
                                icon: 'glyphicon glyphicon-warning-sign',
                                delay: 5000
                            });
                        }

                        if (response.Status === "ModelIsNotValid") {
                            new PNotify({
                                title: 'فرم فاقد اعتبار',
                                text: 'مقادیر پر شده برای فرم فاقد اعتبار است، پروسه ولیدیشن موفقیت آمیر نبود.',
                                type: 'warning',
                                icon: 'glyphicon glyphicon-warning-sign',
                                delay: 1000
                            });
                        }

                    },
                    error: function (xhr, status, error) {
                        console.log(xhr.responseText);
                        alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                    }
                });

            }

            if (buttonResponse === "confirm") {
                formData.push({ name: "sefareshResponse", value: "Confirm" });

                if ($form.valid()) {

                    $.ajax({
                        type: "POST",
                        url: "/Admin/PishFactor/SodoorPishFactorDetail",
                        data: formData,
                        dataType: "json",
                        success: function (response) {

                            //console.log(response);

                            if (response.Status === "ConfirmSuccess") {
                                var htmlString = "";
                                console.log(response.ShomareFactors);

                                $.each(response.ShomareFactors, function (index, value) {

                                    htmlString += '<tr><td>' + (index + 1) + '</td><td>' + value.ShomareFactor + '</td></tr>';

                                });

                                $("#factor-number-table").append(htmlString);
                                $("#confirm-modal").modal("show");
                            }

                            if (response.Status === "ConfirmFailed") {
                                new PNotify({
                                    title: 'تایید ناموفق',
                                    text: 'تایید موفقیت آمیز نبود.',
                                    type: 'warning',
                                    icon: 'glyphicon glyphicon-warning-sign',
                                    delay: 1000
                                });
                            }

                            if (response.Status === "UnknownErrorOccurred") {
                                new PNotify({
                                    title: 'خطای نامعلوم',
                                    text: 'خطای نامعلومی رخ داده، لطفا بعد از چند لحظه دوباره تلاش کنید، اگر موفق نشدید با ساپورت تماس بگیرید.',
                                    type: 'warning',
                                    icon: 'glyphicon glyphicon-warning-sign',
                                    delay: 1000
                                });
                            }

                            if (response.Status === "ModelIsNotValid") {
                                new PNotify({
                                    title: 'فرم فاقد اعتبار',
                                    text: 'مقادیر پر شده برای فرم فاقد اعتبار است، پروسه ولیدیشن موفقیت آمیر نبود.',
                                    type: 'warning',
                                    icon: 'glyphicon glyphicon-warning-sign',
                                    delay: 1000
                                });
                            }

                        },
                        error: function (xhr, status, error) {
                            console.log(xhr.responseText);
                            alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                        }
                    });
                }

            }





        });


    });
})();