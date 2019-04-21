var changeStateSanadDetailModule = (function () {

    function sanadDetailButtonEventHandler() {

        $("body").on("click", ".sanad-detail-button", function (e) {
            e.preventDefault();

            var idSanad = $(e.target).data("id");

            $("#sanad-detail-modal-body").load("/Admin/Moghayerat/SanadDetailModal?id=" + idSanad, function () { $("#sanad-detail-modal").modal("show"); });
        });

    }

    return {
        wireUpsanadDetailButtonClickHandler: sanadDetailButtonEventHandler
    };

})();