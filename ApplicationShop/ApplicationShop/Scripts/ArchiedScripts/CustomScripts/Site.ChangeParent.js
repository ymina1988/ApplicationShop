(function () {


    var successfulDeleteNotice = function () {
        new PNotify({
            title: 'ویرایش موفق',
            text: 'آیتم مورد نظر با موفقیت ویرایش شد.',
            type: 'success',
            icon: 'glyphicon glyphicon-ok',
            delay: 1000
        });
    }

    //code responsible for setting up the spin.js and blockUI and handling the ajaxstart and stop events
    $(function () {
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

    //code responsible for treeBefore tree
    $(function () {


        var treeBefore = [];
        var codeM = $("#CodeMelliTxt").val();

        $.get("/User/UserProfile/GetRelBeforeTree",
    function (data, textStatus, jqXHR) {
        var nodeCounter = data.tree.length - 1;
        data.tree.reduce(function (r, a) {
            var o = { id: a.CodeMelli, FullName: a.FirstName + ' ' + a.LastName, Semat: a.Semat_Desc, state: { expanded: true }, icon: "glyphicon glyphicon-user", text: ' ' + a.FirstName + ' ' + a.LastName + ' - ' + a.CodeMelli + ' - ' + a.Semat_Desc, nodes: [] };
            r.push(o);
            nodeCounter--;
            return o.nodes;
        }, treeBefore);

        $('#treeBefore').treeview({ data: treeBefore, showTags: true });
        $('#treeBefore').hide().fadeIn(600);
    },
    "json"
  );


    });

    //code responsible for treeAtfer tree
    $(function () {


        var treeAtfer = [];
        var codeM = $("#CodeMelliTxt").val();

        $.get("/User/UserProfile/GetRelAfterTree", { txtCodeMelli: codeM },
    function (data, textStatus, jqXHR) {
        var nodeCounter = data.tree.length - 1;
        data.tree.reduce(function (r, a) {
            var o = { id: a.CodeMelli, FullName: a.FirstName + ' ' + a.LastName, Semat: a.Semat_Desc, state: { expanded: true }, icon: "glyphicon glyphicon-user", text: ' ' + a.FirstName + ' ' + a.LastName + ' - ' + a.CodeMelli + ' - ' + a.Semat_Desc, nodes: [] };
            r.push(o);
            nodeCounter--;
            return o.nodes;
        }, treeAtfer);

        $('#treeAfter').treeview({ data: treeAtfer, showTags: true });
        $('#treeAfter').hide().fadeIn(600);
    },
    "json"
  );


    });

    //code responsible for sending the user's change parent request to the controller
    $(function () {

        $("#changeParent").on("click", function (e) {

            $(document).unbind(".mine");

            e.preventDefault();

            var token = $('input[name="__RequestVerificationToken"]').val();
            var item = $(this);
            var link = item.attr("href");

            (new PNotify({
                title: 'تایید تغییر بالاسری',
                text: 'آیا از تغییر بالاسری خود اطمینان دارید؟',
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
                    data: { __RequestVerificationToken: token },
                    type: 'POST',
                    dataType: 'json',
                    success: function (data) {

                        if (data.Status === "Success") {

                            new PNotify({
                                title: 'درخواست موفق',
                                text: 'درخواست تغییر بالاسری با موفقیت ارسال شد، لطفا برای مشاهده نتیجه به پروفایل خود مراجعه کنید.',
                                type: 'success',
                                icon: 'glyphicon glyphicon-ok',
                                delay: 2000
                            });
                        }

                        if (data.Status === "RequestAwaiting") {

                            new PNotify({
                                title: 'درخواست غیرمیسر',
                                text: 'مشتری گرامی، درخواست قبلی شما تحت بررسی است، تا زمانی که جواب درخواست قبلی شما  داده نشده، نمی توانید درخواست جدیدی ثبت کنید.',
                                type: 'warning',
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

})();