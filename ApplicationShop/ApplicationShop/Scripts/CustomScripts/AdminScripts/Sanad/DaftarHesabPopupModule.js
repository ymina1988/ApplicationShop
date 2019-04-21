"use strict";

var daftarHesabPopupModule = (function () {

    function daftareHesabModalButtonClickEventHandler() {

        $("body").on("click", ".btn-pol-daftare-hesab", function (e) {
            e.preventDefault();

            var $this = $(e.target);

            var idSanadDetail = $this.data("id");

            //console.log(idSanadDetail);


            $.get("/Admin/Sanad/SearchSanadForDaftareHesabDari",
                { sanadDetailId: idSanadDetail },
                function (data, textStatus, jqXHR) {

                    $("#daftare-hesab-modal-body").html(data);

                    $("#sanad-search-result-table").dataTable();

                    $("#daftare-hesab-modal").modal("show");

                },
                "HTML"
            );

        });


    }

    return {
        wireUpDaftareHesabModalButtonClickEvent: daftareHesabModalButtonClickEventHandler
    };

})();