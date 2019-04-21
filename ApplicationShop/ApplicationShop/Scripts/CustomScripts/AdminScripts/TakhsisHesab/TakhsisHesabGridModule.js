"use strict";

var takhsisHesabGridModule = (function () {

    var takhsisHesabGrid = $("#takhsis-hesab-grid");

    var takhsisHesabGridData = function () {
        return takhsisHesabGrid.data('kendoGrid');
    };

    //set up the takhsis hesab grid
    function setupTakhsisHesabGrid(gridData) {
        window.gridRowNumber = 0;


        takhsisHesabGrid.kendoGrid({
            dataSource: {
                data: gridData,
                schema: {
                    model: {
                        fields: {
                            Radif: { type: "number" },
                            Id: { type: "string" },
                            IdHesab: { type: "string" },
                            IdNoeSanadPerSystem: { type: "string" },
                            Mahiat: { type: "string" },
                            IdTafzili: { type: "string" }
                        }
                    }
                },
                pageSize: 20
            },
            dataBinding: function () {
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
                { field: "IdHesab", title: "ایدی حساب", width: "100px" },
                { field: "IdNoeSanadPerSystem", title: "آیدی نوع سند", width: "100px" },
                { field: "Mahiat", title: "ماهیت", width: "100px" },
                { field: "IdTafzili", title: "آیدی تفضیلی", width: "100px" }//,
            //{
            //    field: "Delete",
            //    title: "حذف",
            //    template:
            //    "<a class=\"btn btn-default delete-takhsis-hesab\" data-id='#= Id#'>حذف</a>",
            //    width: "100px"
            //}
            ]
        }
        );

    };
    
    //getting takhsis hesab grid data
    function getGridDataAndInit() {

        $.get("/Admin/HesabTakhsis/GetTakhsisHesabGridData",
            function (response) {

                setupTakhsisHesabGrid(response);

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

                                    var dataItem = takhsisHesabGridData().dataItem($tr);

                                    takhsisHesabGridData().dataSource.remove(dataItem);

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
        initGrid: getGridDataAndInit,
        wireDeleteEvent: wireupGridRowDeleteEvent,
        setSpinnerWithEventForPartOfPage: setSpinnerWithEventForPartOfPage
    };

})();