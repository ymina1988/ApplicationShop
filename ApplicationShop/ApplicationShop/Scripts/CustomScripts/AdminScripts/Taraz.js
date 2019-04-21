(function () {
    $(function () {
        "use strict";

        var tarazDetail = function (detailAction) {

            $("body").on("click", ".taraz-detail", function (e) {
                e.preventDefault();

                var $this = $(e.target);

                var idCompany = $this.data("id-company");
                var month = $this.data("month");
                var moein = $this.data("moein");
                var kol = $this.data("kol");

                var $form = $("#frmTarazMali").serializeArray();

                $form.push({ name: "IdCompanyFromSatr", value: idCompany });
                $form.push({ name: "MonthFromSatr", value: month });
                $form.push({ name: "MoeinSatr", value: moein });
                $form.push({ name: "IdkolSatr", value: kol });



                $.ajax({
                    type: "GET",
                    url: "/Admin/Taraz/" + detailAction,
                    data: $form,
                    dataType: "html",
                    success: function (response) {

                        $("#taraz-detail-modal-body").empty();

                        $("#taraz-detail-modal-body").append(response);

                        $("#taraz-detail-table").dataTable();

                        $("#taraz-detail-modal").modal("show");

                    },
                    error: function (xhr, status, error) {
                        console.log(xhr.responseText);
                        alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                    }
                });


            });
        }

        var tarazType = $("#taraz-type").val();

        if (tarazType === "TarazHesab") {
            tarazDetail("TarazDetailPartial");
        }

        if (tarazType === "TarazTafili") {
            tarazDetail("TarazTafziliDetailPartial");
        }

        $("body").on("click", ".sanad-detail", function (e) {
            e.preventDefault();

            var $this = $(e.target);

            var shomareSanad = $this.data("shomare-sanad");

            $("#sanad-detail-modal-body").load("/Admin/Taraz/SanadDetailPartial?idSanad=" + shomareSanad, function () {
                $("#sanad-detail-table").dataTable();
            });

            $("#sanad-detail-modal").modal("show");

        });


    });
})();