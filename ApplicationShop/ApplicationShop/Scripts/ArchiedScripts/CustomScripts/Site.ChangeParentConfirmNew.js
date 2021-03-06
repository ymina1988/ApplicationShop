﻿(function () {


    var opts = {
        lines: 10, // The number of lines to draw
        length: 7, // The length of each line
        width: 4, // The line thickness
        radius: 10, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        color: '#000', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        //top: 25, // Top position relative to parent in px
        //left: 25 // Left position relative to parent in px
    };

    //code responsible for setting up the spin.js and blockUI and handling the ajaxstart and stop events
    $(function () {

        var Beforetarget = document.getElementById('beforeCol');
        var Aftertarget = document.getElementById('AfterCol');
        var Beforespinner = new Spinner(opts);
        var Afterspinner = new Spinner(opts);

        //in this approach the spin works for every ajax request, which is not what we want
        //$(document).on({

        //    ajaxStart: function () {
        //        $("#beforeCol").block({ message: null });
        //        $("#AfterCol").block({ message: null });
        //        Beforespinner.spin(Beforetarget);
        //        Afterspinner.spin(Aftertarget);
        //    },
        //    ajaxStop: function () {
        //        $("#beforeCol").unblock();
        //        $("#AfterCol").unblock();
        //        Beforespinner.stop(Beforetarget);
        //        Afterspinner.stop(Aftertarget);
        //    }
        //});

        $(document).bind("ajaxStart.mine", function () {
            $("#beforeCol").block({ message: null });
            $("#AfterCol").block({ message: null });
            Beforespinner.spin(Beforetarget);
            Afterspinner.spin(Aftertarget);
        });

        $(document).bind("ajaxStop.mine", function () {
            $("#beforeCol").unblock();
            $("#AfterCol").unblock();
            Beforespinner.stop(Beforetarget);
            Afterspinner.stop(Aftertarget);
        });

    });

    //code responsible for showing the tree change request detail modal to the user
    $(function () {

        $(".requestDetail").on("click", function (e) {
            e.preventDefault();
            $(document).unbind(".theirs");

            var treeBefore = [];
            //important: jquery data attribute manipulate the data for example ignore the prefixed zero
            //if you want the raw value use this
            //var codeMBefore = $(this).data("codemelli");
            var codeOriginal = $(this).attr("data-codemelliorg");

            $.get("/Jenology/GetRelBeforeTreeNew", { txtCodeMelli: codeOriginal },
		function (data, textStatus, jqXHR) {
		    var nodeCounter = data.tree.length - 1;
		    data.tree.reduce(function (r, a) {
		        var o = { id: a.CodeMelli, FullName: a.FirstName + ' ' + a.LastName, Semat: a.Semat_Desc, state: { expanded: true }, icon: "glyphicon glyphicon-user", text: ' ' + a.FirstName + ' ' + a.LastName + ' - ' + a.CodeMelli + ' - ' + a.Semat_Desc, nodes: [] };
		        r.push(o);
		        nodeCounter--;
		        return o.nodes;
		    }, treeBefore);

		    $('#treeBefore').treeview({ data: treeBefore, showTags: true });
		    //$('#treeBefore').hide().fadeIn(600);
		},
		"json"
	  );

            var treeAtfer = [];
            var codeOriginal = $(this).attr("data-codemelliorg");
            var codeDestination = $(this).attr("data-codemellides");

            $.get("/Jenology/GetRelAfterTreeNew", { codeMelliOrigin: codeOriginal, codemelliDestionation: codeDestination },
		function (data, textStatus, jqXHR) {
		    var nodeCounter = data.tree.length - 1;
		    data.tree.reduce(function (r, a) {
		        var o = { id: a.CodeMelli, FullName: a.FirstName + ' ' + a.LastName, Semat: a.Semat_Desc, state: { expanded: true }, icon: "glyphicon glyphicon-user", text: ' ' + a.FirstName + ' ' + a.LastName + ' - ' + a.CodeMelli + ' - ' + a.Semat_Desc, nodes: [] };
		        r.push(o);
		        nodeCounter--;
		        return o.nodes;
		    }, treeAtfer);

		    $('#treeAfter').treeview({ data: treeAtfer, showTags: true });
		    //$('#treeAfter').hide().fadeIn(600);
		},
		"json"
	  );

            $("#requestDetailModal").modal("show");

        });

    });

    //code responsible for agree and disagree button
    $(function () {

        $(".requestAsnwer").on("click", function (e) {
            e.preventDefault();

            //$(document).unbind(".mine");

            var target = document.getElementById('spinJs');
            var spinner = new Spinner(opts);

            $(document).bind("ajaxStart.theirs", function () {
                $.blockUI({ message: null });
                spinner.spin(target);
            });

            $(document).bind("ajaxStop.theirs", function () {
                $.unblockUI();
                spinner.stop(target);
            });



            var ans = $(this).data("answer");

            var token = $('input[name="__RequestVerificationToken"]').val();
            var item = $(this);
            var link = item.attr("href");

            (new PNotify({
                title: 'تایید جواب به تغییر بالاسری',
                text: 'آیا از پاسخ خود به این تغییر اطمینان دارید؟',
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
            })).get().on('pnotify.confirm', function () {

                $.ajax({
                    url: link,
                    data: { __RequestVerificationToken: token, answer: ans },
                    type: 'POST',
                    dataType: 'json',
                    success: function (data) {

                        if (data.Status === "SuccessAgree") {
                            if (ans === "saleuseragree") {
                                item.addClass("disabled");
                                item.next().addClass("disabled");
                                //item.next().removeClass("disabled");
                            }
                            if (ans === "saleuserdisagree") {
                                item.addClass("disabled");
                                item.prev().addClass("disabled");
                                //item.prev().removeClass("disabled");
                            }


                            new PNotify({
                                title: 'عملیات موفق',
                                text: 'جواب شما به درخواست کاربر با موفقیت ذخیره شد، و عملیات جا به جایی بالاسری انجام شد.',
                                type: 'success',
                                icon: 'glyphicon glyphicon-ok',
                                delay: 2000
                            });
                        }

                        if (data.Status === "SuccessDisAgree") {
                            if (ans === "saleuseragree") {
                                item.addClass("disabled");
                                item.next().addClass("disabled");
                                //item.next().removeClass("disabled");
                            }
                            if (ans === "saleuserdisagree") {
                                item.addClass("disabled");
                                item.prev().addClass("disabled");
                                //item.prev().removeClass("disabled");
                            }


                            new PNotify({
                                title: 'عملیات موفق',
                                text: 'جواب شما به درخواست کاربر با موفقیت ذخیره شد.',
                                type: 'success',
                                icon: 'glyphicon glyphicon-warning-sign',
                                delay: 2000
                            });
                        }

                        if (data.Status === "StoreProcedureCannotProceed") {
                            new PNotify({
                                title: 'عملیات ناموفق',
                                text: 'شما شرایط لازم برای انجام این جا به جایی را ندارید.',
                                type: 'notice',
                                icon: 'glyphicon glyphicon-warning-sign',
                                delay: 2000
                            });
                        }

                        if (data.Status === "AnswerCannotChange") {
                            new PNotify({
                                title: 'عملیات ناموفق',
                                text: 'بعد از پاسخ دادن امکان تغییر پاسخ وجود ندارید.',
                                type: 'notice',
                                icon: 'glyphicon glyphicon-warning-sign',
                                delay: 2000
                            });
                        }

                        if (data.Status === "Error") {
                            new PNotify({
                                title: 'عملیات ناموفق',
                                text: 'خطایی در اجرای پروسه تغییر بالاسری پیش آمده، لطفا دوباره تلاش کنید، اگر مشکل هنوز برقرار بود، با پشتیبانی سایت تماس حاصل فرمایید.',
                                type: 'error',
                                icon: 'glyphicon glyphicon-warning-sign',
                                delay: 2000
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

    //code responsible for showing the description modal
    $(function () {

        var reqId;
        
        $(".requestAnswerDescription").on("click", function (e) {
            e.preventDefault();

            //remove the modal object tested it but didn't work, it's here for reference
            //$('#requestDescriptionModal').on('hidden.bs.modal', function () {
            //    $(this).removeData('bs.modal');
            //});

            $("#requestSaleUserDescription").text($(this).data("description"));

            $("#requestDescriptionModal").modal("show");

            reqId = $(this).data("id");
        });


        $("#requestDescriptionSave").on("click", function () {

            var descritionCol = document.getElementById('descriptionPanelBody');
            var descritionColspinner = new Spinner(opts);

            $(document).bind("ajaxStart.desc", function () {
                $("#descriptionPanelBody").block({ message: null });
                descritionColspinner.spin(descritionCol);
            });

            $(document).bind("ajaxStop.desc", function () {
                $("#descriptionPanelBody").unblock();
                descritionColspinner.stop(descritionCol);
            });

            var token = $('input[name="__RequestVerificationToken"]').val();
            var descText = $("#requestSaleUserDescription").val();

            $.ajax({
                url: "/Jenology/ChangeParentSUDescription",
                data: { __RequestVerificationToken: token, text: descText, id: reqId },
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    if (data.Status === "Success") {
                        new PNotify({
                            title: 'عملیات موفق',
                            text: 'توضیحات شما با موفقیت ذخیره شد.',
                            type: 'success',
                            icon: 'glyphicon glyphicon-ok',
                            delay: 2000
                        });
                    }

                    $("#requestDescriptionModal").modal("hide");

                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                }
            });

        });

    });

    //code responsible for showing the requester description modal
    $(function () {

        var reqId;

        $(".requesterDescriptionclass").on("click", function (e) {
            e.preventDefault();

            //remove the modal object tested it but didn't work, it's here for reference
            //$('#requestDescriptionModal').on('hidden.bs.modal', function () {
            //    $(this).removeData('bs.modal');
            //});

            $("#requesterUserDescription").text($(this).data("requesterdescription"));

            $("#UserDescriptionModal").modal("show");

            reqId = $(this).data("id");
        });


    });

})();