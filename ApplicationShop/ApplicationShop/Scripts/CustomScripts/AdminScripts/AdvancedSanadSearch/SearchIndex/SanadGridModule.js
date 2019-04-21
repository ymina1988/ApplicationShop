"use strict";

var sanadGridModule = (function () {

    var sanadGrid = $("#sanad-search-grid-body");

    var sanadGridData = function () {
        return sanadGrid.data('kendoGrid');
    };

    function sanadGridDetailInit(e) {

        var shomareSanad = e.data.ShomareSanad;

        var spinnerElement = startAjaxSpinner("#sanad-grid", "Gold");

        $.get("/Admin/AdvancedSanadSearch/GetSanadDetailForSanadGrid",
            { shomareSanad: shomareSanad },
            function (data, textStatus, jqXHR) {

                window.gridRowNumber = 0;

                $("<div/>")
                    .appendTo(e.detailCell)
                    .kendoGrid({
                        dataSource: {
                            data: data,
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
                            pageSize: 4
                        },
                        dataBinding: function () {
                            window.gridRowNumber = (this.dataSource.page() - 1) * this.dataSource.pageSize();
                        },
                        scrollable: false,
                        sortable: true,
                        selectable: false,
                        navigatable: false,
                        filterable: false,
                        pageable: {
                            input: true,
                            numeric: true
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

            },
            "json"
        ).complete(function () {
            stopAjaxSpinner(spinnerElement);
        });

    }

    function setupSanadGrid(gridData) {
        window.gridRowNumber = 0;


        sanadGrid.kendoGrid({
            dataSource: {
                data: gridData,
                schema: {
                    model: {

                        fields: {
                            Radif: { type: "number" },
                            Id: { type: "string" },
                            NameSherkat: { type: "string" },
                            CreateShamsiDate: { type: "string" },
                            ShomareSanad: { type: "string" },
                            ShomareMoratabShode: { type: "string" },
                            ShomareFarei: { type: "string" },
                            Tozihat: { type: "string" },
                            TahKamBedehkar: { type: "string" },
                            TshJamBestankar: { type: "string" },
                            MandehBedehkar: { type: "string" },
                            MandehBestankar: { type: "string" },
                            NameVaziatSanad: { type: "string" }

                        }
                    }
                },
                pageSize: 2000000
            },
            dataBinding: function () {
                window.gridRowNumber = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            height: 650,
            scrollable: true,
            sortable: true,
            selectable: true,
            navigatable: false,
            filterable: true,
            pageable: {
                input: true,
                numeric: false
            },
            detailInit: sanadGridDetailInit,
            dataBound: function () {
                this.expandRow(this.tbody.find("tr.k-master-row").first());
            },
            columns: [
                { field: "Radif", title: "ردیف", template: "#= ++gridRowNumber #", width: "50px" },
                                {
                                    width: "30px",
                                    title: "#",
                                    template: "<div class='checkbox'><label><input type='checkbox' R='#= ShomareSanad #' class='ClickTag'><span class='text'></span></label></div>"
                                },
                { field: "NameSherkat", title: "نام شرکت", width: "100px" },
                { field: "CreateShamsiDate", title: "تاریخ شمسی", width: "100px" },
                { field: "ShomareSanad", title: "شماره سند", width: "100px" },
                { field: "ShomareMoratabShode", title: "شماره مرتب شده", width: "100px" },
                { field: "ShomareFarei", title: "شماره فرعی", width: "100px" },
                { field: "Tozihat", title: "توضیحات", width: "100px" },
                { field: "TahKamBedehkar", title: "TahKamBedehkar", width: "100px" },
                { field: "TshJamBestankar", title: "TshJamBestankar", width: "100px" },
                { field: "MandehBedehkar", title: "مانده بدهکار", width: "100px" },
                { field: "MandehBestankar", title: "مانده بستانکار", width: "100px" },
                { field: "NameVaziatSanad", title: "وضعیت سند", width: "100px" },

            {
                field: "SanadStateHistory",
                title: "تاریخچه وضعیت",
                template:
                "<a class=\"btn btn-default sanad-state-history\" data-id-sanad='#= Id#'>تاریخچه وضعیت سند</a>",
                width: "120px"
            }
            ]
        }
        );

    };

    function sanadStatusHistoryButtonClickEventHandler() {

        $("body").on("click", ".sanad-state-history", function (e) {

            var $this = $(this);

            var spinnerElement = startAjaxSpinner("#sanad-grid", "Maroon");

            var idSanad = $this.data("id-sanad");

            $.get("/Admin/AdvancedSanadSearch/SanadStatusPartial",
                { sanadId: idSanad },
                function (data, textStatus, jqXHR) {

                    $("#sanad-status-modal-body").html(data);

                    $("#sanad-status-modal").modal("show");

                },
                "HTML"
            ).complete(function () {
                stopAjaxSpinner(spinnerElement);
            });

        });

    }


    return {
        setupSanadGrid: setupSanadGrid,
        wireUpsanadStatusHistoryButtonClickEvent: sanadStatusHistoryButtonClickEventHandler
    };

})();