"use strict";

var sanadDetailGridModule = (function () {

    var sanadDetailGrid = $("#sanad-detail-search-grid-body");

    var sanadDetailGridData = function () {
        return sanadDetailGrid.data('kendoGrid');
    };

    function setupSanadDetailGrid(gridData) {
        window.gridRowNumber = 0;

        sanadDetailGrid.kendoGrid({
            dataSource: {
                data: gridData,
                schema: {
                    model: {
                        fields: {
                            Radif: { type: "number" },
                            Id: { type: "string" },
                            IdTafzili1: { type: "string" },
                            NameTafzili1: { type: "string" },
                            MarkazHazineh: { type: "string" },
                            NameMarkazHazineh: { type: "string" },
                            Prije: { type: "string" },
                            NamePrije: { type: "string" },
                            CodeMoein: { type: "string" },
                            NameMoein: { type: "string" },
                            CodeKol: { type: "string" },
                            NameKol: { type: "string" },
                            Bedehkar: { type: "string" },
                            Bestankar: { type: "string" },
                            Tozihat: { type: "string" }


                        }
                    }
                },
                pageSize: 20
            },
            dataBinding: function() {
                window.gridRowNumber = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            height: 345,
            scrollable: true,
            sortable: true,
            selectable: true,
            navigatable: false,
            filterable: true,
            pageable: {
                input: true,
                numeric: false
            },
            columns: [
                { field: "Radif", title: "ردیف", template: "#= ++gridRowNumber #", width: "50px" },
                { field: "IdTafzili1", title: "ایدی تفضیلی", width: "80px" },
                { field: "NameTafzili1", title: "نام تفضیلی", width: "100px" },
                { field: "MarkazHazineh", title: "مرکز هزینه", width: "100px" },
                { field: "NameMarkazHazineh", title: "نام مرکز هزینه", width: "100px" },
                { field: "Prije", title: "پروژه", width: "100px" },
                { field: "NamePrije", title: "نام پروژه", width: "100px" },
                { field: "CodeMoein", title: "کد معین", width: "60px" },
                { field: "NameMoein", title: "نام معین", width: "100px" },
                { field: "CodeKol", title: "کد کل", width: "60px" },
                { field: "NameKol", title: "نام کل", width: "100px" },
                { field: "Bedehkar", title: "بدهکار", width: "100px" },
                { field: "Bestankar", title: "بستانکار", width: "100px" },
                { field: "Tozihat", title: "توضیحات", width: "180px" },
                {
                    field: "DaftareHesab",
                    title: "دفتر حساب",
                    template:
                        "<a class=\"btn btn-default btn-pol-daftare-hesab\" data-id='#= Id#'>دفتر حساب</a>",
                    width: "120px"
                }
            ]
        });

    };

    //wire up spinner ajax event
    function setSpinnerWithEventForPartOfPage() {
        ajaxSpinnerForPartOfPage("#takhsis-hesab-grid-body");
    };

    //delete selected grid row
    function wireupGridRowDeleteEvent() {

        $("body").on("click", ".delete-takhsis-hesab", function (e) {
            var $this = $(e.target);

            var idUser = $this.data("id-user");
            var idSource = $this.data("id-source");
            var antiForgeryToken = $("input[name='__RequestVerificationToken']").val();

            (new PNotify({
                title: 'تایید حذف',
                text: 'آیا از حذف پرمیشن مورد نظر اطمینان دارید؟',
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
            })).get()
                .on('pnotify.confirm',
                    function () {
                        $.ajax({
                            type: "POST",
                            url: "/Admin/AccessPermission/DeleteAccessPermission",
                            data: { idUser: idUser, idSource: idSource, __RequestVerificationToken: antiForgeryToken },
                            dataType: "json",
                            success: function (response) {

                                if (response.status === "Success") {
                                    new PNotify({
                                        title: 'حذف موفق',
                                        text: 'جزئیات سند با موفقیت حذف شد.',
                                        type: 'success',
                                        icon: 'glyphicon glyphicon-ok-sign',
                                        delay: 3000
                                    });

                                    var $tr = $this.closest("tr");

                                    var dataItem = sanadDetailGridData().dataItem($tr);

                                    sanadDetailGridData().dataSource.remove(dataItem);

                                    $tr.fadeOut(500);
                                }
                                if (response.status === "Failure") {

                                    new PNotify({
                                        title: 'حذف ناموفق',
                                        text: 'جزئیات سند با موفقیت حذف نشد.',
                                        type: 'success',
                                        icon: 'glyphicon glyphicon-warning-sign',
                                        delay: 3000
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
    }


    return {
        setupSanadDetailGrid: setupSanadDetailGrid
    };

})();