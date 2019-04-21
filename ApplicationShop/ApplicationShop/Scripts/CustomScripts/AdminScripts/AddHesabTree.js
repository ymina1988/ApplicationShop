(function () {
    $(function () {
        "use strict";

        var initTree = function () {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "/Admin/Hesab/GetHesabTree", true);
            xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
            xhttp.send();

            xhttp.onreadystatechange = function (e) {

                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var response = JSON.parse(JSON.parse(xhttp.response).Json);

                    //console.log(xhttp.response);
                    //console.log(response);
                    //console.log($.parseJSON(xhttp.response));

                    $('#hesab-tree').treeview({ data: response, silent: true });

                }

                if (xhttp.readyState == 4 && xhttp.status == 500) {
                    console.log(xhttp.responseText);
                    alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + xhttp.status + " \n error : \n" + xhttp.statusText);
                }
            };
        };

        initTree();

        var idHesab;
        var isMali;
        document.body.addEventListener("click", function (e) {

            //show the modal for add based on hesab type ie. moein(2,3) or kol(1)
            if (e.target && e.target.matches(".node-add-button")) {

                //console.log(e.target.getAttribute("data-id"));
                //console.log(e.target.getAttribute("data-id-noe-hesab"));

                idHesab = e.target.getAttribute("data-id");
                isMali = e.target.getAttribute("data-is-mali");
                //console.log(isMali);

                var idNoeHesab = e.target.getAttribute("data-id-noe-hesab");

                if (idNoeHesab == 1) {

                    var spinnerElement = startAjaxSpinner("#add-kol-modal-content",
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


                    var xhttp = new XMLHttpRequest();
                    xhttp.open("GET", "/Admin/Hesab/AddKolHesabForm", true);
                    xhttp.send();

                    xhttp.onreadystatechange = function (e) {

                        if (xhttp.readyState == 4 && xhttp.status == 200) {

                            //console.log(xhttp.response);
                            document.querySelector("#add-kol-modal-body").innerHTML = xhttp.response;
                            stopAjaxSpinner(spinnerElement);

                        }

                        if (xhttp.readyState == 4 && xhttp.status == 500) {
                            console.log(xhttp.responseText);
                            alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + xhttp.status + " \n error : \n" + xhttp.statusText);
                        }
                    };

                    $("#add-kol-modal").modal("show");
                }

                if (idNoeHesab == 2 || idNoeHesab == 3) {


                    var spinnerElement = startAjaxSpinner("#add-moein-modal-content",
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


                    var xhttp = new XMLHttpRequest();
                    xhttp.open("GET", "/Admin/Hesab/AddMoeinHesabForm", true);
                    xhttp.send();

                    xhttp.onreadystatechange = function (e) {

                        if (xhttp.readyState == 4 && xhttp.status == 200) {

                            //console.log(xhttp.response);
                            document.querySelector("#add-moein-modal-body").innerHTML = xhttp.response;
                            stopAjaxSpinner(spinnerElement);

                        }

                        if (xhttp.readyState == 4 && xhttp.status == 500) {
                            console.log(xhttp.responseText);
                            alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + xhttp.status + " \n error : \n" + xhttp.statusText);
                        }
                    };

                    $("#add-moein-modal").modal("show");
                }

            }

            //show the modal for edit based on hesab type ie. moein(2,3) or kol(1)
            if (e.target && e.target.matches(".node-edit-button")) {

                //console.log(e.target.getAttribute("data-id"));

                idHesab = e.target.getAttribute("data-id");

                var spinnerElement = startAjaxSpinner("#edit-kol-modal-content",
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

                var xhttp = new XMLHttpRequest();
                xhttp.open("GET", "/Admin/Hesab/EditHesabForm?id=" + idHesab, true);
                xhttp.send();

                xhttp.onreadystatechange = function (e) {

                    if (xhttp.readyState == 4 && xhttp.status == 200) {

                        //console.log(xhttp.response);
                        document.querySelector("#edit-hesab-modal-body").innerHTML = xhttp.response;
                        stopAjaxSpinner(spinnerElement);

                    }

                    if (xhttp.readyState == 4 && xhttp.status == 500) {
                        console.log(xhttp.responseText);
                        alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + xhttp.status + " \n error : \n" + xhttp.statusText);
                    }
                };

                $("#edit-hesab-modal").modal("show");

            }

            //delete the current node
            if (e.target && e.target.matches(".node-delete-button")) {

                idHesab = e.target.getAttribute("data-id");

                (new PNotify({
                    title: 'تایید حذف',
                    text: 'آیا از حذف حساب مورد نظر اطمینان دارید؟',
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

                            var xhttp = new XMLHttpRequest();
                            xhttp.open("POST", "/Admin/Hesab/DeleteHesab", true);

                            var antiForgeryToken = $('input[name="__RequestVerificationToken"]').val();

                            var params = new FormData();
                            params.append("id", idHesab);
                            params.append("__RequestVerificationToken", antiForgeryToken);
                            xhttp.send(params);

                            xhttp.onreadystatechange = function (e) {

                                if (xhttp.readyState == 4 && xhttp.status == 200) {
                                    var response = JSON.parse(xhttp.response);

                                    if (response.status === "Success") {

                                        new PNotify({
                                            title: 'حذف موفق',
                                            text: 'حساب مورد نظر با موفقیت حذف شد.',
                                            type: 'success',
                                            icon: 'glyphicon glyphicon-ok',
                                            delay: 2000
                                        });

                                        initTree();

                                    }

                                    if (response.status === "Failure") {

                                        new PNotify({
                                            title: 'حذف ناموفق',
                                            text: 'خطایی در پردازش درخواست شما پیش آمده، درخت مورد نظر با موفقیت حذف نشد.',
                                            type: 'warning',
                                            icon: 'glyphicon glyphicon-warning-sign',
                                            delay: 2000
                                        });

                                    }

                                    if (response.status === "DeleteChildFirst") {

                                        new PNotify({
                                            title: 'حذف ناموفق',
                                            text: 'حساب شما دارای فرزند است، برای حذف ابتدا باید فرزندان را پاک کنید.',
                                            type: 'warning',
                                            icon: 'glyphicon glyphicon-warning-sign',
                                            delay: 2000
                                        });

                                    }
                                }

                                if (xhttp.readyState == 4 && xhttp.status == 500) {
                                    console.log(xhttp.responseText);
                                    alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + xhttp.status + " \n error : \n" + xhttp.statusText);
                                }
                            };

                        });

            }

            //save the kol hesab
            if (e.target && e.target.matches("#save-kol")) {

                var saveKolSpinner = startAjaxSpinner("#add-kol-modal-body",
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


                var form = document.querySelector('#add-kol-form');
                var formForm = $("#add-kol-form");
                formForm.validate();

                if (formForm.valid()) {
                    var xhttp = new XMLHttpRequest();
                    xhttp.open("POST", "/Admin/Hesab/AddKolHesabForm", true);

                    var params = new FormData(form);
                    //console.log(idHesab);

                    params.append("ParentId", idHesab);


                    xhttp.send(params);

                    xhttp.onreadystatechange = function (e) {

                        if (xhttp.readyState == 4 && xhttp.status == 200) {
                            var response = JSON.parse(xhttp.response);

                            if (response.status === "Success") {

                                new PNotify({
                                    title: 'عملیات موفق',
                                    text: 'حساب کل مورد نظر با موفقیت ثبت شد.',
                                    type: 'success',
                                    icon: 'glyphicon glyphicon-ok',
                                    delay: 2000
                                });

                                $("#add-kol-modal").modal("hide");

                                initTree();
                            }

                            if (response.status === "FormIsNotValid") {

                                new PNotify({
                                    title: 'عملیات ناموفق',
                                    text: 'فرم معتبر نیست.',
                                    type: 'warning',
                                    icon: 'glyphicon glyphicon-warning-sign',
                                    delay: 2000
                                });

                            }

                            stopAjaxSpinner(saveKolSpinner);
                        }

                        if (xhttp.readyState == 4 && xhttp.status == 500) {
                            console.log(xhttp.responseText);
                            alert("message : \n" +
                                "An error occurred, for more info check the js console" +
                                "\n status : \n" +
                                xhttp.status +
                                " \n error : \n" +
                                xhttp.statusText);
                        }
                    };
                }

            }

            //save the moein hesab
            if (e.target && e.target.matches("#save-moein")) {

                var saveKolSpinner = startAjaxSpinner("#add-moein-modal-content",
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


                var form = document.querySelector('#add-moein-form');

                if ($(form).valid()) {
                    var xhttp = new XMLHttpRequest();
                    xhttp.open("POST", "/Admin/Hesab/AddMoeinHesabForm", true);


                    var params = new FormData(form);
                    //console.log(idHesab);
                    //console.log(isMali);
                    params.append("ParentId", idHesab);
                    params.append("IsMali", isMali);

                    xhttp.send(params);

                    xhttp.onreadystatechange = function (e) {

                        if (xhttp.readyState == 4 && xhttp.status == 200) {
                            var response = JSON.parse(xhttp.response);

                            if (response.status === "ThisHesabAlreadyExistInHesabToGoruhTafzili") {

                                new PNotify({
                                    title: 'ثبت ناموفق',
                                    text: 'حساب معین فوق نباید در جدول حساب به گروه تفضیلی وجود داشته باشد.',
                                    type: 'warning',
                                    icon: 'glyphicon glyphicon-warning-sign',
                                    delay: 2000
                                });

                            }

                            if (response.status === "Success") {

                                new PNotify({
                                    title: 'عملیات موفق',
                                    text: 'حساب کل مورد نظر با موفقیت ثبت شد.',
                                    type: 'success',
                                    icon: 'glyphicon glyphicon-ok',
                                    delay: 2000
                                });

                                $("#add-moein-modal").modal("hide");

                                initTree();
                            }

                            if (response.status === "FormIsNotValid") {

                                new PNotify({
                                    title: 'عملیات ناموفق',
                                    text: 'فرم معتبر نیست.',
                                    type: 'warning',
                                    icon: 'glyphicon glyphicon-warning-sign',
                                    delay: 2000
                                });

                            }

                            stopAjaxSpinner(saveKolSpinner);
                        }

                        if (xhttp.readyState == 4 && xhttp.status == 500) {
                            console.log(xhttp.responseText);
                            alert("message : \n" +
                                "An error occurred, for more info check the js console" +
                                "\n status : \n" +
                                xhttp.status +
                                " \n error : \n" +
                                xhttp.statusText);
                        }
                    };
                }


            }

            //edit the hesab
            if (e.target && e.target.matches("#edit-hesab")) {

                var saveKolSpinner = startAjaxSpinner("#edit-hesab-modal-body",
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


                var form = document.querySelector('#edit-hesab-form');

                if ($(form).valid()) {
                    var xhttp = new XMLHttpRequest();
                    xhttp.open("POST", "/Admin/Hesab/EditHesabForm", true);

                    var params = new FormData(form);
                    //console.log(idHesab);
                    params.append("Id", idHesab);
                    params.append("ParentId", idHesab);


                    xhttp.send(params);

                    xhttp.onreadystatechange = function (e) {

                        if (xhttp.readyState == 4 && xhttp.status == 200) {
                            var response = JSON.parse(xhttp.response);

                            if (response.status === "Success") {

                                new PNotify({
                                    title: 'عملیات موفق',
                                    text: 'حساب مورد نظر با موفقیت ویرایش شد.',
                                    type: 'success',
                                    icon: 'glyphicon glyphicon-ok',
                                    delay: 2000
                                });

                                $("#edit-hesab-modal").modal("hide");

                                initTree();
                            }

                            if (response.status === "FormIsNotValid") {

                                new PNotify({
                                    title: 'عملیات ناموفق',
                                    text: 'فرم معتبر نیست.',
                                    type: 'warning',
                                    icon: 'glyphicon glyphicon-warning-sign',
                                    delay: 2000
                                });

                            }

                            stopAjaxSpinner(saveKolSpinner);
                        }

                        if (xhttp.readyState == 4 && xhttp.status == 500) {
                            console.log(xhttp.responseText);
                            alert("message : \n" +
                                "An error occurred, for more info check the js console" +
                                "\n status : \n" +
                                xhttp.status +
                                " \n error : \n" +
                                xhttp.statusText);
                        }
                    };
                }

            }

            //expand all button
            if (e.target && e.target.matches("#hesab-expand-all")) {
                $("#hesab-tree").treeview('expandAll');
            }

            //collapse all button
            if (e.target && e.target.matches("#hesab-collapse-all")) {
                $("#hesab-tree").treeview('collapseAll');
            }

        }, false);

    });
})();