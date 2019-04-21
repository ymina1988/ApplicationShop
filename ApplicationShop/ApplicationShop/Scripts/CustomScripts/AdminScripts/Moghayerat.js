(function () {
    $(function () {
        "use strict";


        $("body").on("click", ".gridButt", function (e) {
            e.preventDefault();

            var id = $(this).data("id");

            $.ajax({
                type: "GET",
                url: "/Admin/Moghayerat/SanadDetailModal",
                data: { id: id },
                dataType: "html",
                success: function (response) {

                    $("#sanad-detail-modal-body").empty();
                    $("#sanad-detail-modal-body").append(response);
                    $("#sanad-detail-modal").modal("show");

                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                }
            });





        });


    });
})();