(function () {
    document.addEventListener("DOMContentLoaded", function () {
        "use strict";

        kendo.culture('fa-IR');

        var makeGridRowSelectableByArrowKey = function () {

            var target = $('.k-grid-content');
            //give it a tabindex so it can get focus and accept key input.
            target.attr("tabindex", 0);

            target.keydown(function (ke) {
                var kGrid, curRow, newRow;

                kGrid = $(this).closest('.k-grid').data("kendoGrid");

                //get currently selected row
                curRow = kGrid.select();

                //abort if no row selected
                if (!curRow.length)
                    return;

                //get newRow up or down.
                if (ke.which == 38) {
                    newRow = curRow.prev();
                } else if (ke.which == 40) {
                    newRow = curRow.next();
                } else {
                    return;
                }

                //Top or Bottom exceeded, abort.
                if (!newRow.length)
                    return;

                //Select new row
                kGrid.select(newRow);
            });

        };

        var goFromStep1ToStep2 = function () {

            $('#tab1').removeClass("active");
            $("#simplewizardinwidgetstep1").removeClass("active");
            $('#tab1').addClass("complete");

            $('#tab2').removeClass("complete");
            $('#tab2').addClass("active");
            $("#simplewizardinwidgetstep2").addClass("active");

            $('#tab3').removeClass("active");
            $('#tab3').removeClass("complete");

        };


        //initializing grid
        var initGrid = function () {

            var sanadGridData = [];
            window.gridRowNumber = 0;

            $("#sanad-grid")
                .kendoGrid({
                    dataSource: {
                        data: sanadGridData,
                        schema: {
                            model: {
                                fields: {
                                    Radif: { type: "number" },
                                    Id: { type: "string" },
                                    Kol: { type: "string" },
                                    Moein: { type: "string" },
                                    Tafzili1: { type: "string" },
                                    Tafzili2: { type: "string" },
                                    Tafzili3: { type: "string" },
                                    Description: { type: "string" },
                                    OwedMoney: { type: "number" },
                                    DueMoney: { type: "number" }
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
                        { field: "Kol", title: "کل", width: "100px" },
                        { field: "Moein", title: "معین", width: "100px" },
                        { field: "Tafzili1", title: "تفضیلی 1", width: "100px" },
                        { field: "Tafzili2", title: "مرکز هزینه", width: "100px" },
                        { field: "Tafzili3", title: "پروژه", width: "100px" },
                        { field: "Description", title: "شرح آرتیکل", width: "100px" },
                        { field: "OwedMoney", title: "مبلغ بدهکار", format: "{0:c}", width: "100px" },
                        { field: "DueMoney", title: "مبلغ بستانکار", format: "{0:c}", width: "100px" },
                        {
                            field: "Atf",
                            title: "عطف",
                            template: "<a class=\"btn btn-default add-atf\" data-id='#= Id#'>عطف</a>",
                            width: "100px"
                        },
                        {
                            field: "Delete",
                            title: "حذف",
                            template: "<a class=\"btn btn-danger delete-detail\" data-id='#= Id#'>حذف</a>",
                            width: "100px"
                        },
                        {
                            field: "Edit",
                            title: "ویرایش",
                            template: "<a class=\"btn btn-warning edit-detail\" data-id='#= Id#'>ویرایش</a>",
                            width: "100px"
                        }
                    ]
                }
                );

        };
        initGrid();

        //initializing previously added atf grid
        var initPreviousAtfGrid = function (previouslyGridData) {

            window.gridRowNumber = 0;

            $("#previously-added-atf")
                .kendoGrid({
                    dataSource: {
                        data: previouslyGridData,
                        schema: {
                            model: {
                                fields: {
                                    Radif: { type: "number" },
                                    Id: { type: "string" },
                                    IdAtf: { type: "string" },
                                    Kol: { type: "string" },
                                    Moein: { type: "string" },
                                    Tafzili1: { type: "string" },
                                    Tafzili2: { type: "string" },
                                    Tafzili3: { type: "string" },
                                    Description: { type: "string" },
                                    OwedMoney: { type: "string" },
                                    DueMoney: { type: "string" }
                                }
                            }
                        },
                        pageSize: 8
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
                    pageable: true,
                    columns: [
                        { field: "Radif", title: "ردیف", template: "#= ++gridRowNumber #", width: "50px" },
                        { field: "Kol", title: "کل", width: "100px" },
                        { field: "Moein", title: "معین", width: "100px" },
                         { field: "Tafzili1", title: "تفضیلی 1", width: "100px" },
                        { field: "Tafzili2", title: "مرکز هزینه", width: "100px" },
                        { field: "Tafzili3", title: "پروژه", width: "100px" },
                        { field: "Description", title: "شرح", width: "100px" },
                        { field: "OwedMoney", title: "مبلغ بدهکار", format: "{0:c}", width: "100px" },
                        { field: "DueMoney", title: "مبلغ بستانکار", format: "{0:c}", width: "100px" },
                        {
                            field: "Delete",
                            title: "حذف عطف",
                            template: "<a class=\"btn btn-default delete-atf-from-detail\" data-id='#= IdAtf#' data-id-sanad-detail='#= Id#'>حذف عطف</a>",
                            width: "100px"
                        }
                    ]
                }
                );

        };

        makeGridRowSelectableByArrowKey();


        $("#TafziliChecked").select2({ placeholder: "تا حداکثر پنج تفضیلی می توانید انتخاب کنید", allowClear: true });

        $('#Date').MdPersianDateTimePicker({
            Placement: 'bottom',
            Trigger: 'focus',
            EnableTimePicker: false,
            TargetSelector: '',
            GroupId: '',
            ToDate: false,
            FromDate: false,
            EnglishNumber: true,
            Disabled: false,
        });
        $("#Value").mask("#,##0", { reverse: true });
        $("#OwedMoney").mask("#,##0", { reverse: true });
        $("#DueMoney").mask("#,##0", { reverse: true });

        //initializing the company tree
        InitDropDownTree("CompanyTreeSelect", "/Admin/Sanad/GetCompanyTree", true, true, true);

        var isMali = $("#IsModirMali").val();

        if (isMali === "False") {
            InitDropDownTree("HesabTree", "/Admin/Sanad/GetHesabTree", true, true, true);
        }

        if (isMali === "True") {
            InitDropDownTree("HesabTree", "/Admin/Sanad/GetHesabTreeMali", true, true, true);
        }

        //submitting sana detail on insert input
        $(window).keydown(function (e) {
            if (e.keyCode === 45) {
                document.querySelector("#preliminarySubmit").click();
            }
        });

        ////delete a row form detail grid
        $(window).keydown(function (e) {
            if (e.keyCode === 46) {



                var grid = $("#sanad-grid").data('kendoGrid');
                var selectedItem = grid.dataItem(grid.select());

                //console.log(selectedItem);
                //"delete-detail"

                var $thisDeleteButton = $('a[data-id="' + selectedItem.Id + '"][class~="delete-detail"]');

                $thisDeleteButton.click();

                setTimeout(function () {
                    $(".ui-pnotify-container button").eq(0).focus();
                }, 300);




            }
        });

        //refresh the page to add a new sanad
        $("#submit-new-sanad").on("click", function (e) {
            e.preventDefault();

            (new PNotify({
                title: 'تایید ترک صفحه',
                text: 'آیا از ترک صفحه و ایجاد سند جدید اطمینان دارید؟',
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
                        window.location.reload();
                    });
        });

        $(window).keydown(function (e) {
            if (e.keyCode === 113) {
                window.location.reload();
            }
        });

        //add new sanad detail and now row to grid
        document.querySelector("#preliminarySubmit").addEventListener("click", function (e) {
            e.preventDefault();


            //$("#Value").val(document.querySelector("#Value").value.replace(new RegExp(",", 'g'), ""));
            $("#OwedMoney").val(document.querySelector("#OwedMoney").value.replace(new RegExp(",", 'g'), ""));
            $("#DueMoney").val(document.querySelector("#DueMoney").value.replace(new RegExp(",", 'g'), ""));


            var $form = $("#SanadSubForm");
            var grid = $("#sanad-grid").data("kendoGrid");


            if (!$form.valid()) {
                return;
            }

            $.ajax({
                type: "Post",
                url: "/Admin/Sanad/InsertNewSanadRow",
                data: { viewModel: serializeJSON($form) },
                dataType: "json",
                success: function (response) {

                    if (response.status === "CheckedIdsRangeIsNotValid") {

                        new PNotify({
                            title: 'ثبت ناموفق',
                            text: 'تعداد گروه تفضیلی های انتخاب شده باید بین یک تا پنج باشد.',
                            type: 'warning',
                            icon: 'glyphicon glyphicon-warning-sign',
                            delay: 2000
                        });

                        return;

                    }

                    if (response.status === "DueAndOweBothCannotBeEmpty") {

                        new PNotify({
                            title: 'ثبت ناموفق',
                            text: 'مقدار بدهکاری و بستانکاری هر دو نمی تواند خالی باشد.',
                            type: 'warning',
                            icon: 'glyphicon glyphicon-warning-sign',
                            delay: 2000
                        });

                        return;

                    }

                    if (response.status === "DueAndOweBothCannotBeFilled") {

                        new PNotify({
                            title: 'ثبت ناموفق',
                            text: 'مقدار بدهکاری و بستانکاری هر دو نمی تواند پر باشد.',
                            type: 'warning',
                            icon: 'glyphicon glyphicon-warning-sign',
                            delay: 2000
                        });

                        return;

                    }

                    if (response.status === "FormIsNotValid") {
                        new PNotify({
                            title: 'درج ناموفق',
                            text: 'فرم معتبر نیست، مطمئن شوید تفضیلی و بقیه فیلد های فرم پر شده است',
                            type: 'warning',
                            icon: 'glyphicon glyphicon-warning-sign',
                            delay: 2000
                        });

                        return;
                    }

                    if (response.status === "OneTafziliFiledShouldBeFilled") {
                        new PNotify({
                            title: 'درج ناموفق',
                            text: 'حداقل یکی از فیلدهای تفضیلی 1، مرکز هزینه، پروژه باید پر باشد.',
                            type: 'warning',
                            icon: 'glyphicon glyphicon-warning-sign',
                            delay: 2000
                        });

                        return;
                    }

                    grid.dataSource.add({
                        Id: response.row.Id,
                        Kol: response.row.Kol,
                        Moein: response.row.Moein,
                        Tafzili1: response.row.Tafzili1,
                        Tafzili2: response.row.Tafzili2,
                        Tafzili3: response.row.Tafzili3,
                        Description: response.row.Description,
                        OwedMoney: response.row.OwedMoney,
                        DueMoney: response.row.DueMoney
                    });

                    var gridData = grid.dataSource.data().toJSON();

                    var oweArray = gridData.map(function (value, index) { return value.OwedMoney });
                    var dueArray = gridData.map(function (value, index) { return value.DueMoney });

                    var owe = oweArray.reduce(function (left, right) { return left + right; }, 0);
                    var due = dueArray.reduce(function (left, right) { return left + right; }, 0);

                    if (owe === due) {
                        $("#sanad-is-taraz").show(500);
                        $("#sanad-isnot-taraz").hide(500);
                    }

                    if (owe !== due) {
                        $("#sanad-is-taraz").hide(500);
                        $("#sanad-isnot-taraz").show(500);
                    }

                    $("#sum-amount").empty();
                    $("#sum-amount").append('<tr><td>' + Number(owe).toLocaleString("en") + '</td>  <td>' + Number(due).toLocaleString("en") + '</td></tr>');

                    document.querySelector("#SanadSubForm").reset();

                    $("#TafziliChecked")
                    .select2({
                        placeholder: "تا حداکثر پنج تفضیلی می توانید انتخاب کنید",
                        allowClear: true
                    });

                    if (response.row.DescrptionAdded) {
                        $("#DefaultDescriptionSelect").append('<option>' + response.row.DescrptionAdded + '<option>');
                    }

                    $("#Tafzili1Select").select2("val", "");
                    $("#MarkazeHazineSelect").select2("val", "");
                    $("#ProjectSelect").select2("val", "");
                    $("#DefaultDescriptionSelect").select2("val", "");

                    document.querySelector("#HesabTree_treeViewSearchInput").focus();

                    //console.log(response);

                    //return what you see
                    //console.log(grid.dataSource.view().toJSON());

                    //return all of data
                    //console.log(grid.dataSource.data().toJSON());

                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    alert("message : \n" +
                        "An error occurred, for more info check the js console" +
                        "\n status : \n" +
                        status +
                        " \n error : \n" +
                        error);
                }

            });
        }, false);

        //submit sanad
        $("#submit-sanad-master").on("click", function (e) {
            e.preventDefault();

            (new PNotify({
                title: 'تایید ثبت سند',
                text: 'آیا از ثبت سند مورد نظر اطمینان دارید؟',
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

                        var $form = $("#SanadForm");

                        var date = $("#Date").val();
                        var salMaliSelect = document.querySelector("#SalMaliSelect");
                        var formDate = salMaliSelect.options[salMaliSelect.selectedIndex].getAttribute("data-from-date");
                        var toDate = salMaliSelect.options[salMaliSelect.selectedIndex].getAttribute("data-to-date");

                        if (date < formDate || date > toDate) {
                            new PNotify({
                                title: 'ثبت ناموفق',
                                text: 'بازه تاریخ باید با سال مالی همخوانی داشته باشد.',
                                type: 'warning',
                                icon: 'glyphicon glyphicon-warning-sign',
                                delay: 3000
                            });
                            return;
                        }

                        if (!$form.valid()) {
                            return;
                        }

                        var antiForgeryToken = $("input[name='__RequestVerificationToken']").val();
                        //console.log(antiForgeryToken);


                        var spinnerElement = startAjaxSpinner("#simplewizardinwidget-steps",
                        {
                            lines: 15 // The number of lines to draw
                            ,
                            length: 12 // The length of each line
                            ,
                            width: 8 // The line thickness
                            ,
                            radius: 12 // The radius of the inner circle
                            ,
                            scale: 0.75 // Scales overall size of the spinner
                            ,
                            corners: 0.3 // Corner roundness (0..1)
                            ,
                            color: '#3387CC' // #rgb or #rrggbb or array of colors
                            ,
                            opacity: 0.7 // Opacity of the lines
                            ,
                            rotate: 40 // The rotation offset
                            ,
                            direction: 1 // 1: clockwise, -1: counterclockwise
                            ,
                            speed: 1.5 // Rounds per second
                            ,
                            trail: 36 // Afterglow percentage
                            ,
                            fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
                            ,
                            zIndex: 2e9 // The z-index (defaults to 2000000000)
                            ,
                            className: 'spinner' // The CSS class to assign to the spinner
                            ,
                            top: '50%' // Top position relative to parent
                            ,
                            left: '51%' // Left position relative to parent
                            ,
                            shadow: false // Whether to render a shadow
                            ,
                            hwaccel: false // Whether to use hardware acceleration
                            ,
                            position: 'absolute' // Element positioning
                        });




                        $.ajax({
                            type: "POST",
                            url: "/Admin/Sanad/SubmitSanad",
                            data: {
                                __RequestVerificationToken: antiForgeryToken,
                                viewModel: serializeJSON($form)
                            },
                            dataType: "json",
                            success: function (response) {

                                //console.log(response);

                                if (response.status === "Failure") {
                                    new PNotify({
                                        title: 'ثبت نا موفق',
                                        text: 'ثبت سند موفقیت آمیز نبود.',
                                        type: 'warning',
                                        icon: 'glyphicon glyphicon-warning-sign',
                                        delay: 3000
                                    });
                                }

                                if (response.status === "Success") {
                                    new PNotify({
                                        title: 'ثبت موفق',
                                        text: 'سند با موفقیت ثبت شد.',
                                        type: 'success',
                                        icon: 'glyphicon glyphicon-success',
                                        delay: 2000
                                    });

                                    goFromStep1ToStep2();
                                    $("#Id").val(response.id);




                                    $("#shomare-sanad").text(response.shomareSanad);

                                    var shomareSanad = $('#SanadSubForm #shomare-sanad').text();
                                    var urlShowMode = "/Admin/Sanad/goToPrintPage?ShomareSanad=" + shomareSanad + "&DesignMode=false";
                                    var urlDesignMode = "/Admin/Sanad/goToPrintPage?ShomareSanad=" + shomareSanad + "&DesignMode=true";
                                    $("#btnPrintSanadInDesignMode").attr("href", urlDesignMode);
                                    $("#btnPrintSanadInViewMode").attr("href", urlShowMode);




                                    $("#shomare-moratab-shode").text(response.shomareMoratabShode);
                                    $("#company-name-span").text(response.companyName);
                                    $("#sal-mali-span").text(response.salMali);
                                    $("#noe-sanad-span").text(response.noeSanad);
                                    $("#date-span").text(response.date);


                                    $("#submit-sanad-master").hide(200);
                                    $("#edit-sanad-master").show(200);
                                    $("#cancel-edit-master").show(200);


                                }

                                stopAjaxSpinner(spinnerElement);

                            },
                            error: function (xhr, status, error) {
                                console.log(xhr.responseText);
                                alert("message : \n" +
                                    "An error occurred, for more info check the js console" +
                                    "\n status : \n" +
                                    status +
                                    " \n error : \n" +
                                    error);
                            }
                        });

                    });

        });

        //go to next step
        $("#cancel-edit-master").on("click", function (e) {
            e.preventDefault();


            goFromStep1ToStep2();


        });

        //edit sanad
        $("#edit-sanad-master").on("click", function (e) {
            e.preventDefault();

            var form = document.querySelector("#SanadForm");

            var date = $("#Date").val();
            var salMaliSelect = document.querySelector("#SalMaliSelect");
            var formDate = salMaliSelect.options[salMaliSelect.selectedIndex].getAttribute("data-from-date");
            var toDate = salMaliSelect.options[salMaliSelect.selectedIndex].getAttribute("data-to-date");

            if (date < formDate || date > toDate) {
                new PNotify({
                    title: 'ثبت ناموفق',
                    text: 'بازه تاریخ باید با سال مالی همخوانی داشته باشد.',
                    type: 'warning',
                    icon: 'glyphicon glyphicon-warning-sign',
                    delay: 3000
                });
                return;
            }

            if (!$(form).valid()) {
                return;
            }


            var sanadId = $("#Id").val();

            var params = $(form).serializeArray();

            params.push({ name: "Id", value: sanadId });

            $.ajax({
                type: "POST",
                url: "/Admin/Sanad/EditSanad",
                data: params,
                dataType: "json",
                success: function (response) {

                    //console.log(response);

                    if (response.status === "Failure") {
                        new PNotify({
                            title: 'ویرایش نا موفق',
                            text: 'ویرایش سند موفقیت آمیز نبود.',
                            type: 'warning',
                            icon: 'glyphicon glyphicon-warning-sign',
                            delay: 3000
                        });
                    }

                    if (response.status === "Success") {
                        new PNotify({
                            title: 'ویرایش موفق',
                            text: 'سند با موفقیت ویرایش شد.',
                            type: 'success',
                            icon: 'glyphicon glyphicon-success',
                            delay: 2000
                        });

                        $("#company-name-span").text(response.companyName);
                        $("#sal-mali-span").text(response.salMali);
                        $("#noe-sanad-span").text(response.noeSanad);
                        $("#date-span").text(response.date);

                        goFromStep1ToStep2();

                    }
                }
            });

        });

        //set the date picker on sal mali select
        $("#SalMaliSelect").on("change", function () {

            var monthAndYear = $("#month-and-year").val();

            $("#Date").val(this.options[this.selectedIndex].text + "/" + monthAndYear);

        });

        //open the atf modal
        $("body").on("click", ".add-atf", function (e) {
            e.preventDefault();

            var sanadDetailId = e.target.getAttribute("data-id");
            //console.log(sanadDetailId);
            var isMali = $("#IsModirMali").val();


            var spinnerElement = startAjaxSpinner("#atf-modal-body",
    {
        lines: 11 // The number of lines to draw
        , length: 0 // The length of each line
        , width: 52 // The line thickness
        , radius: 2 // The radius of the inner circle
        , scale: 1.25 // Scales overall size of the spinner
        , corners: 1 // Corner roundness (0..1)
        , color: '#2DC3E8' // #rgb or #rrggbb or array of colors
        , opacity: 0.2 // Opacity of the lines
        , rotate: 69 // The rotation offset
        , direction: 1 // 1: clockwise, -1: counterclockwise
        , speed: 0.9 // Rounds per second
        , trail: 48 // Afterglow percentage
        , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
        , zIndex: 2e9 // The z-index (defaults to 2000000000)
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '50%' // Top position relative to parent
        , left: '50%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: false // Whether to use hardware acceleration
        , position: 'absolute' // Element positioning
    });



            $("#atf-modal-body")
                .load("/Admin/Sanad/SubmitAtf",
                    function () {

                        $("#FromDate").MdPersianDateTimePicker({ EnableTimePicker: false });
                        $("#ToDate").MdPersianDateTimePicker({ EnableTimePicker: false });

                        $("#TafziliCheckedAtf")
                                     .select2({
                                         placeholder: "تا حداکثر پنج تفضیلی می توانید انتخاب کنید",
                                         allowClear: true
                                     });


                        document.querySelector("#SanadDetailId").value = sanadDetailId;

                        InitDropDownTree("HesabTreePartial",
                            "/Admin/Sanad/GetHesabTree",
                            true,
                            true,
                            true);

                    });


            $.ajax({
                type: "GET",
                url: "/Admin/Sanad/GetPreviouslyAddedAtf",
                data: { idDetail: sanadDetailId, isModirMali: isMali },
                dataType: "json",
                success: function (response) {

                    setTimeout(function () {
                        initPreviousAtfGrid(response);
                        stopAjaxSpinner(spinnerElement);
                    }, 500);

                    makeGridRowSelectableByArrowKey();

                },
                //complete: function (response) {
                //    console.log(eval(response.responseText));

                //    initPreviousAtfGrid(eval(response.responseText));
                //    stopAjaxSpinner(spinnerElement);

                //},
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                }
            });


            $("#atf-modal").modal("show");


        });

        //add default description select content to the description textbox
        $("#DefaultDescriptionSelect").on("change", function (e) {
            e.preventDefault();

            if (this.value !== "") {

                document
                    .querySelector("#Description")
                    .value = this.options[this.selectedIndex].innerHTML;

                return;
            }

            document.querySelector("#Description").value = "";

        });

        //search for sanad detail to add atf to them
        $("body").on("submit", "#atf-row-form", function (e) {
            e.preventDefault();

            var $thisForm = $(this);

            if (!$thisForm.valid()) {
                return;
            }

            var isMali = $("#IsModirMali").val();

            $.ajax({
                type: "POST",
                url: "/Admin/Sanad/SearchSanadDetail",
                data: {
                    viewModel: serializeJSON($thisForm),
                    isModirMali: isMali
                },
                dataType: "html",
                success: function (response) {

                    $("#search-detail-result-grid").empty();
                    $("#search-detail-result-grid").append(response);
                    $("#atf-search-result-table").dataTable();

                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    alert("message : \n" +
                        "An error occurred, for more info check the js console" +
                        "\n status : \n" +
                        status +
                        " \n error : \n" +
                        error);
                }
            });

        });

        //submitting list of atf
        $("body").on("click", "#submit-atf", function (e) {
            e.preventDefault();

            var spinnerElement = startAjaxSpinner("#atf-modal-body",
            {
                lines: 13 // The number of lines to draw
                ,
                length: 17 // The length of each line
                ,
                width: 14 // The line thickness
                ,
                radius: 10 // The radius of the inner circle
                ,
                scale: 1 // Scales overall size of the spinner
                ,
                corners: 1 // Corner roundness (0..1)
                ,
                color: '#E37E52' // #rgb or #rrggbb or array of colors
                ,
                opacity: 0.25 // Opacity of the lines
                ,
                rotate: 0 // The rotation offset
                ,
                direction: 1 // 1: clockwise, -1: counterclockwise
                ,
                speed: 1 // Rounds per second
                ,
                trail: 60 // Afterglow percentage
                ,
                fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
                ,
                zIndex: 2e9 // The z-index (defaults to 2000000000)
                ,
                className: 'spinner' // The CSS class to assign to the spinner
                ,
                top: '50%' // Top position relative to parent
                ,
                left: '50%' // Left position relative to parent
                ,
                shadow: false // Whether to render a shadow
                ,
                hwaccel: false // Whether to use hardware acceleration
                ,
                position: 'absolute' // Element positioning
            });

            var antiForgeryToken = $("input[name='__RequestVerificationToken']").val();
            var sanadDetailId = document.querySelector("#SanadDetailId").value;

            var sdaArray = [];
            var idSanadDetailAtf = $(".sanad-detail-atf-checkbox:checked").map(function (index, element) { sdaArray.push($(element).val()); });

            //console.log(JSON.stringify(idSanadDetailAtf));

            // return;

            if (sdaArray.length === 0) {
                new PNotify({
                    title: 'ثبت ناموفق',
                    text: 'قبل از ثبت لطفا چند ردیف از جدول انتخاب کنید.',
                    type: 'warning',
                    icon: 'glyphicon glyphicon-warning-sign',
                    delay: 3000
                });

                stopAjaxSpinner(spinnerElement);

                return;
            }

            var isMali = $("#IsModirMali").val();


            $.ajax({
                type: "POST",
                url: "/Admin/Sanad/SubmitAtfList",
                data: {
                    __RequestVerificationToken: antiForgeryToken,
                    idSanadDetailAtf: JSON.parse(JSON.stringify(sdaArray)),
                    sdId: sanadDetailId,
                    isModirMali: isMali
                },
                dataType: "json",
                success: function (response) {

                    //console.log(response);

                    if (response.status === "Success") {
                        new PNotify({
                            title: 'ثبت موفق',
                            text: 'عطف با موفقیت ثبت شد.',
                            type: 'success',
                            icon: 'glyphicon glyphicon-success',
                            delay: 2000
                        });

                        $("#atf-modal").modal("hide");
                    }

                    if (response.status === "Failure") {
                        new PNotify({
                            title: 'ثبت ناموفق',
                            text: 'مشکلی برای ثبت پیش آمده یا چیزی رای ثبت شدن وجود نداشت.',
                            type: 'warning',
                            icon: 'glyphicon glyphicon-warning-sign',
                            delay: 3000
                        });
                    }

                    stopAjaxSpinner(spinnerElement);


                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    alert("message : \n" +
                        "An error occurred, for more info check the js console" +
                        "\n status : \n" +
                        status +
                        " \n error : \n" +
                        error);
                }
            });


        });

        //delete sanad detail
        $("body").on("click", ".delete-detail", function (e) {
            e.preventDefault();

            var isMali = $("#IsModirMali").val();
            var detailId = e.target.getAttribute("data-id");
            var sanadId = $("#Id").val();
            var $this = $(e.target);

            //console.log(isMali);
            //console.log(detailId);

            (new PNotify({
                title: 'تایید حذف',
                text: 'آیا از حذف جزئیات سند مورد نظر اطمینان دارید؟',
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
                            url: "/Admin/Sanad/DeleteSanadDetail",
                            data: { sanadId: sanadId, sanadDetailId: detailId, isModirMali: isMali },
                            dataType: "json",
                            success: function (response) {

                                if (response.status === "Success") {
                                    new PNotify({
                                        title: 'حذف موفق',
                                        text: 'جزئیات سند با موفقیت حذف شد.',
                                        type: 'warning',
                                        icon: 'glyphicon glyphicon-warning-sign',
                                        delay: 3000
                                    });

                                    var grid = $("#sanad-grid").data("kendoGrid");

                                    var dataItem = grid.dataItem($this.closest("tr"));
                                    grid.dataSource.remove(dataItem);

                                    var gridData = grid.dataSource.data().toJSON();

                                    var oweArray = gridData.map(function (value, index) { return value.OwedMoney });
                                    var dueArray = gridData.map(function (value, index) { return value.DueMoney });
                                    var valArray = gridData.map(function (value, index) { return value.Value });

                                    var owe = oweArray.reduce(function (left, right) { return left + right; }, 0);
                                    var due = dueArray.reduce(function (left, right) { return left + right; }, 0);
                                    var val = valArray.reduce(function (left, right) { return left + right; }, 0);

                                    $("#sum-amount").empty();
                                    $("#sum-amount").append('<tr> <td>' + val + '</td> <td>' + owe + '</td>  <td>' + due + '</td></tr>');


                                    $this.closest("tr").fadeOut(500);
                                }
                                if (response.status === "Failure") {

                                    alertify.error(response.errorMessage);
                                }

                            },
                            error: function (xhr, status, error) {
                                console.log(xhr.responseText);
                                alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                            }
                        });
                    });


        });

        //edit sanad detail
        $("body").on("click", ".edit-detail", function (e) {
            e.preventDefault();

            var isMali = $("#IsModirMali").val();
            var detailId = e.target.getAttribute("data-id");
            var sanadId = $("#Id").val();
            var $this = $(e.target);


            var entityGrid = $("#sanad-grid").data("kendoGrid");
            var selectedItem = entityGrid.dataItem(entityGrid.select());

            var ShomareSanad = $("#shomare-sanad").text();


            var Moein = selectedItem.Moein;

            editSanadDetails(detailId, isMali, ShomareSanad, Moein);

        });

        //delete sanad detail atf
        $("body").on("click", ".delete-atf-from-detail", function (e) {
            e.preventDefault();


            var isMali = $("#IsModirMali").val();
            var detailAtfId = e.target.getAttribute("data-id");
            var sanadDetailId = e.target.getAttribute("data-id-sanad-detail");
            var $this = $(e.target);

            //console.log(isMali);
            //console.log(detailId);

            (new PNotify({
                title: 'تایید حذف',
                text: 'آیا از حذف عطف سند مورد نظر اطمینان دارید؟',
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
                            url: "/Admin/Sanad/DeleteAtfSanadDetail",
                            data: { sanadDetailId: sanadDetailId, atfId: detailAtfId, isModirMali: isMali },
                            dataType: "json",
                            success: function (response) {

                                if (response.status === "Success") {
                                    new PNotify({
                                        title: 'حذف موفق',
                                        text: 'عطف سند با موفقیت جذف شد.',
                                        type: 'success',
                                        icon: 'glyphicon glyphicon-ok-sign',
                                        delay: 3000
                                    });

                                    var grid = $("#previously-added-atf").data("kendoGrid");

                                    var dataItem = grid.dataItem($this.closest("tr"));
                                    grid.dataSource.remove(dataItem);

                                    $this.closest("tr").fadeOut(500);
                                }

                                if (response.status === "Failure") {
                                    new PNotify({
                                        title: 'حذف ناموفق',
                                        text: 'عطف سند با موفقیت جذف نشد.',
                                        type: 'warning',
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

    });
})();

function OnSelectedChange(senderId, selectedText, selectedValue) {

    if (senderId === "#HesabTree_ulTree") {

        $.get("/Admin/Sanad/PopulateTafziliesDropDown", { idHesabMoien: selectedValue }, function (data, textStatus, jqXHR) {

            //console.log(data.tafzili1SelectListItem);
            //console.log(data.markazeHazineSelectListItem);
            //console.log(data.projectSelectListItem);

            if (data.tafzili1SelectListItem) {
                $("#Tafzili1Select").empty();

                let htmlString = '<option value="">لطفا یک مقدار انتخاب کنید</option>';

                data.tafzili1SelectListItem.forEach(function (value, index) {

                    htmlString += '<option value="' + value.Value + '">' + value.Text + '</option>';
                });

                $("#Tafzili1Select").append(htmlString);
            }

            if (data.markazeHazineSelectListItem) {
                $("#MarkazeHazineSelect").empty();

                let htmlString = '<option value="">لطفا یک مقدار انتخاب کنید</option>';

                data.markazeHazineSelectListItem.forEach(function (value, index) {

                    htmlString += '<option value="' + value.Value + '">' + value.Text + '</option>';
                });

                $("#MarkazeHazineSelect").append(htmlString);
            }

            if (data.projectSelectListItem) {
                $("#ProjectSelect").empty();

                let htmlString = '<option value="">لطفا یک مقدار انتخاب کنید</option>';

                data.projectSelectListItem.forEach(function (value, index) {

                    htmlString += '<option value="' + value.Value + '">' + value.Text + '</option>';
                });

                $("#ProjectSelect").append(htmlString);
            }





        }, "json");

        return;
    }

    if (senderId === "#HesabTreePartial_ulTree") {

        $.get("/Admin/Sanad/PopulateTafziliesDropDown", { idHesabMoien: selectedValue }, function (data, textStatus, jqXHR) {

            //console.log(data.tafzili1SelectListItem);
            //console.log(data.markazeHazineSelectListItem);
            //console.log(data.projectSelectListItem);

            if (data.tafzili1SelectListItem) {
                $("#Tafzili1AtfSelect").empty();

                let htmlString = '<option value="">لطفا یک مقدار انتخاب کنید</option>';

                data.tafzili1SelectListItem.forEach(function (value, index) {

                    htmlString += '<option value="' + value.Value + '">' + value.Text + '</option>';
                });

                $("#Tafzili1AtfSelect").append(htmlString);
            }

            if (data.markazeHazineSelectListItem) {
                $("#MarkazeHazineAtfSelect").empty();

                let htmlString = '<option value="">لطفا یک مقدار انتخاب کنید</option>';

                data.markazeHazineSelectListItem.forEach(function (value, index) {

                    htmlString += '<option value="' + value.Value + '">' + value.Text + '</option>';
                });

                $("#MarkazeHazineAtfSelect").append(htmlString);
            }

            if (data.projectSelectListItem) {
                $("#ProjectAtfSelect").empty();

                let htmlString = '<option value="">لطفا یک مقدار انتخاب کنید</option>';

                data.projectSelectListItem.forEach(function (value, index) {

                    htmlString += '<option value="' + value.Value + '">' + value.Text + '</option>';
                });

                $("#ProjectAtfSelect").append(htmlString);
            }

        }, "json");

        return;
    }

    if (senderId === "#CompanyTreeSelect_ulTree") {

        $.ajax({
            type: "GET",
            url: "/Admin/Sanad/GetSalMaliByIdCompany",
            data: { idCompany: selectedValue },
            dataType: "json",
            success: function (response) {


                //console.log(response);

                $("#SalMaliSelect").empty();

                var htmlString = '<option value="">لطفا سال مالی را انتخاب کنید</option>';

                for (var i = 0; i < response.length; i++) {

                    htmlString += "<option value=" + response[i].Id + " data-from-date=" + response[i].FromShamsiDate + "  data-to-date=" + response[i].ToShamsiDate + " Selected=" + (response[i].Selected === true ? "Selected" : "") + ">" + response[i].Name + "</option>";
                }

                $("#SalMaliSelect").html(htmlString);

                var valueOfCurrentYear = $("#SalMaliSelect :selected").val();
                //console.log(valueOfCurrentYear);

                $("#SalMaliSelect").val(valueOfCurrentYear).trigger("change");

            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
                alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
            }
        });

        return;
    }

    if (senderId === "#HesabTree_EditPartialSanadDetail_ulTree") {

        $.get("/Admin/Sanad/PopulateTafziliesDropDown", { idHesabMoien: selectedValue }, function (data, textStatus, jqXHR) {

            //console.log(data.tafzili1SelectListItem);
            //console.log(data.markazeHazineSelectListItem);
            //console.log(data.projectSelectListItem);

            if (data.tafzili1SelectListItem) {
                $("#Tafzili1EditSanadDetailSelect").empty();

                let htmlString = '<option value="">لطفا یک مقدار انتخاب کنید</option>';

                data.tafzili1SelectListItem.forEach(function (value, index) {

                    htmlString += '<option value="' + value.Value + '">' + value.Text + '</option>';
                });

                $("#Tafzili1EditSanadDetailSelect").append(htmlString);
            }

            if (data.markazeHazineSelectListItem) {
                $("#MarkazeHazineEditSanadDetailSelect").empty();

                let htmlString = '<option value="">لطفا یک مقدار انتخاب کنید</option>';

                data.markazeHazineSelectListItem.forEach(function (value, index) {

                    htmlString += '<option value="' + value.Value + '">' + value.Text + '</option>';
                });

                $("#MarkazeHazineEditSanadDetailSelect").append(htmlString);
            }

            if (data.projectSelectListItem) {
                $("#ProjectEditSanadDetailSelect").empty();

                let htmlString = '<option value="">لطفا یک مقدار انتخاب کنید</option>';

                data.projectSelectListItem.forEach(function (value, index) {

                    htmlString += '<option value="' + value.Value + '">' + value.Text + '</option>';
                });

                $("#ProjectEditSanadDetailSelect").append(htmlString);
            }

        }, "json");

        return;
    }

}

function SharhPishFarzChanged_EditMode() {
    $('#Tozihat').val($("#IdSharhPishfarzSanad option:selected").text());
}

function SubmitEditSanadDetail() {

    var isMali = $("#IsModirMali").val();

    $("#Bedehkar").val(document.querySelector("#Bedehkar").value.replace(new RegExp(",", 'g'), ""));
    $("#Bestankar").val(document.querySelector("#Bestankar").value.replace(new RegExp(",", 'g'), ""));

    var $form = $('#FrmEditArticle');
    var detailId = $form.find("#Id").val();
    $.ajax({
        type: "POST",
        url: "/Admin/Sanad/SubmitEditSanadDetail",
        data: {
            viewModel: serializeJSON($form), HesabTree_EditPartialSanadDetail_SelectedItem: $('#HesabTree_EditPartialSanadDetail_SelectedItem').val(),
            HesabTree_EditPartialSanadDetail_SelectedText: $('#HesabTree_EditPartialSanadDetail_SelectedText').val()
        },
        dataType: "json",
        success: function (res) {

            if (res.status === "DueAndOweBothCannotBeEmpty") {
                alertify.warning("مقدار بدهکار و بستانکار نمی تواند خالی باشد.");
                return;
            }

            if (res.status === "DueAndOweBothCannotBeFilled") {
                alertify.warning("مقدار بدهکار و بستانکار نمی تواند همزمان پر باشد، یا بدهکار باید مقدار داشته باشد یا بستانکار.");
                return;
            }

            if (res.Status === 'Success') {
                $("#Modal_EditSanadDetail").modal("hide");
                alertify.success(res.errorMessage);

                $.get("/Admin/Sanad/GetSandGridRowsModel", { idDetail: detailId, isModirMali: isMali },
                function (data, textStatus, jqXHR) {
                    //console.log(data);

                    var entityGrid = $("#sanad-grid").data("kendoGrid");
                    var selectedItem = entityGrid.dataItem(entityGrid.select());

                    selectedItem.set("Kol", data.row.Kol);
                    selectedItem.set("Moein", data.row.Moein);
                    selectedItem.set("Tafzili1", data.row.Tafzili1);
                    selectedItem.set("Tafzili2", data.row.Tafzili2);
                    selectedItem.set("Tafzili3", data.row.Tafzili3);
                    selectedItem.set("Description", data.row.Description);
                    selectedItem.set("OwedMoney", data.row.OwedMoney);
                    selectedItem.set("DueMoney", data.row.DueMoney);

                },
                "json"
            );


            }
            else if (res.Status === 'Failure') {
                alertify.error(res.errorMessage);

            }
        }
    });
}

function editSanadDetails(IdDetail, IsModirMali, shomareSanad, IdMoien) {

    //first ajax call(second ajax and third ajax are located in body of success scope of first ajax)
    //get partial view edit sanad detail
    $.ajax({
        url: "/Admin/Sanad/editSanadDetails",
        type: "Get",
        dataType: "html",
        data: { IdDetail: IdDetail, IsModirMali: IsModirMali, shomareSanad: shomareSanad },
        success: function (res) {
            if (res) {
                //set modal

                $('#myModalLabel_EditSanadDetail').html('ویرایش آرتیکل');
                $('#ModalBody_EditSanadDetail').empty();
                $("#ModalBody_EditSanadDetail").html(res);



                $("#IdSharhPishfarzSanad")
                                    .select2({
                                        placeholder: "توضیح پیش فرض انتخاب کنید...",
                                        allowClear: true
                                    });

                InitDropDownTree("HesabTree_EditPartialSanadDetail",
                           "/Admin/Sanad/GetHesabTree",
                           false,
                           true,
                           true);

                $("#Bedehkar").mask("#,##0", { reverse: true });
                $("#Bestankar").mask("#,##0", { reverse: true });


                if (IdMoien) {
                    var id = IdMoien.split("-")[0];

                    $('#HesabTree_EditPartialSanadDetail_SelectedItem').val(id);
                    $('#HesabTree_EditPartialSanadDetail_treeViewSearchInput').val(IdMoien);
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error - ' + errorThrown);
        }
    }).done(function () {

        $('#Modal_EditSanadDetail').modal({
            backdrop: 'static',
            keyboard: true,
            show: true
        });


        $(".tafzili-detail-master")
            .select2({
                placeholder: "تا حداکثر پنج تفضیلی می توانید انتخاب کنید",
                allowClear: true
            });


    });

}