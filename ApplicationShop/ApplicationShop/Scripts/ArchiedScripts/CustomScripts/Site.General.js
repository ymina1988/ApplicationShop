(function () {

    var successfulDeleteNotice = function () {
        new PNotify({
            title: 'ویرایش موفق',
            text: 'آیتم مورد نظر با موفقیت ویرایش شد.',
            type: 'success',
            icon: 'glyphicon glyphicon-ok',
            delay: 1000
        });
    }

    //code responsible for initializing the Persian calendar
    $(function () {

        $('#fromDate').MdPersianDateTimePicker({
            Placement: 'bottom', // default is 'bottom'
            Trigger: 'focus', // default is 'focus',
            EnableTimePicker: false, // default is true,
            TargetSelector: '', // default is empty,
            GroupId: '', // default is empty,
            ToDate: false, // default is false,
            FromDate: false, // default is false,
        });

        $('#toDate').MdPersianDateTimePicker({
            Placement: 'bottom', // default is 'bottom'
            Trigger: 'focus', // default is 'focus',
            EnableTimePicker: false, // default is true,
            TargetSelector: '', // default is empty,
            GroupId: '', // default is empty,
            ToDate: false, // default is false,
            FromDate: false, // default is false,
        });

    });

    //code responsible user's edit to address
    $(function () {

        var customerAddressId;

        //code responsible for showing the edit customer address and populate it with data
        $(".CustomerAddressEditButton").on("click", function (e) {
            e.preventDefault();

            customerAddressId = $(this).closest("tr").data("customeraddressid");
            var cAddress = $(this).closest("tr").data("customeradress");
            var cCodePosti = $(this).closest("tr").data("customercodeposti");
            var cPishfarzAddress = $(this).closest("tr").data("addresspishfarz");
            var cShowAddress = $(this).closest("tr").data("showaddress");

            if (cPishfarzAddress === "") { cPishfarzAddress = false.toString(); };
            if (cShowAddress === "") { cShowAddress = false.toString(); };
            if (cPishfarzAddress === "0") { cPishfarzAddress = false.toString(); };
            if (cShowAddress === "0") { cShowAddress = false.toString(); };
            if (cPishfarzAddress === "1") { cPishfarzAddress = true.toString(); };
            if (cShowAddress === "1") { cShowAddress = true.toString(); };

            //$("#CustomerAddress").attr("value", cAddress);
            $("#CustomerAddress").text(cAddress);
            $("#CustomerCodePosti").attr("value", cCodePosti);

            //$("#CustomerPishfarzAddress").attr("value", cPishfarzAddress);
            //$("#CustomerShowAddress").attr("value", cShowAddress);
            $("#CustomerPishfarzAddress").val(cPishfarzAddress);
            $("#CustomerShowAddress").val(cShowAddress);


            $("#CustomerModal").modal("show");
        });

        //code responsible for submitting the user's edit to address
        $("#submitEditCAddress").on("click", function (e) {
            e.preventDefault();
            var token = $('input[name="__RequestVerificationToken"]').val();

            var newCAddress = $("#CustomerAddress").val();
            var newCCodePosti = $("#CustomerCodePosti").val();
            var newCPishfarzAddress = $("#CustomerPishfarzAddress").val();
            var newCShowAddress = $("#CustomerShowAddress").val();


            $.ajax({
                type: "POST",
                url: "/Customer/EditCustomerAddress",
                data: { __RequestVerificationToken: token, id: customerAddressId, Address: newCAddress, CodePosti: newCCodePosti, PishfarzAddress: newCPishfarzAddress, ShowAddress: newCShowAddress },
                dataType: "json",
                success: function (data) {

                    if (data.Status === "EditSuccess") {
                        successfulDeleteNotice();
                        setTimeout(function () {
                            //window.location.replace("/Customer/Edit/" + customerAddressId);
                            location.reload();
                        }, 2000);
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