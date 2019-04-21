(function () {
    $(function () {
        "use strict";


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

        var target = document.getElementById('spinJs');
        var spinner = new Spinner(opts);

        $(document).on({

            ajaxStart: function () {
                $.blockUI({ message: null });
                spinner.spin(target);
            },
            ajaxStop: function () {
                $.unblockUI();
                spinner.stop(target);
            }
        });


        $("#ChangeParentSubmit").on("click", function (e) {
            e.preventDefault();


            $('#ChangePrentForm').validate({
                rules: {
                    CodeMelliOrigin: {
                        required: true,
                        minlength: 10
                    },
                    CodemelliDestionation: {
                        required: true,
                        minlength: 10
                    }
                },
                messages: {
                    CodeMelliOrigin: {
                        required: "پر کردن این فیلد الزامی است.",
                        minlength: "لطفا یک کد ملی معتبر وارد کنید."
                    },
                    CodemelliDestionation: {
                        required: "پر کردن این فیلد الزامی است.",
                        minlength: "لطفا یک کد ملی معتبر وارد کنید."
                    }
                }
            });

            if ($('#ChangePrentForm').valid()) {


                var token = $('input[name="__RequestVerificationToken"]').val();
                var codeOrigin = $("#CodeMelliOrigin").val();
                var codeDestination = $("#CodemelliDestionation").val();

                $.ajax({
                    type: "POST",
                    url: "/User/UserProfile/ChangeParentNew",
                    data: { __RequestVerificationToken: token, codeMelliOrigin: codeOrigin, codemelliDestionation: codeDestination },
                    dataType: "json",
                    success: function (response) {


                        if (response.Status !== "originCustomerNotFound" &&
                            response.Status !== "destinationCustomerNotFound" &&
                            response.Status !== "OriginCustomerNotChild" &&
                            response.Status !== "DestinationCustomerNotChild" &&
                            response.Status !== "BothCustomersNotChild") {

                            //code responsible for treeBefore tree
                            var treeBefore = [];

                            $.get("/User/UserProfile/GetRelBeforeTreeNew", { txtCodeMelli: codeOrigin },
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


                            //code responsible for treeAtfer tree
                            var treeAtfer = [];

                            $.get("/User/UserProfile/GetRelAfterTreeNew", { codeMelliOrigin: codeOrigin, codemelliDestionation: codeDestination },
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


                            $("#treeContainer").removeClass("hidden").fadeIn("slow");

                            console.log(response.data);
                            //{ FullName: "امین قائمی", CodeMelli: "3071882203", Email: "aminghaemi@hotmail.com", Phone: "9131789133" }

                            $("#tdFullNameO").text(response.dataOrigin.FullName);
                            $("#tdCodeMelliO").text(response.dataOrigin.CodeMelli);
                            $("#tdEmailO").text(response.dataOrigin.Email);
                            $("#tdMobileO").text(response.dataOrigin.Phone);

                            $("#tdFullNameD").text(response.dataDestination.FullName);
                            $("#tdCodeMelliD").text(response.dataDestination.CodeMelli);
                            $("#tdEmailD").text(response.dataDestination.Email);
                            $("#tdMobileD").text(response.dataDestination.Phone);

                            $("#changeParent").text("تغییر بالاسری " + response.dataOrigin.FullName + " به " + response.dataDestination.FullName);
                        }


                        if (response.Status === "originCustomerNotFound") {

                            new PNotify({
                                title: 'جستجوی ناموفق',
                                text: 'یوزر مبدا با این مشخصات یافت نشد، لطفا از درست بودن کد ملی اطمینان حاصل فرمایید.',
                                type: 'warning',
                                icon: 'glyphicon glyphicon-warning-sign',
                                delay: 6000
                            });
                        }

                        if (response.Status === "destinationCustomerNotFound") {

                            new PNotify({
                                title: 'جستجوی ناموفق',
                                text: 'یوزر مقصدی با این مشخصات یافت نشد، لطفا از درست بودن کد ملی اطمینان حاصل فرمایید.',
                                type: 'warning',
                                icon: 'glyphicon glyphicon-warning-sign',
                                delay: 6000
                            });
                        }

                        if (response.Status === "OriginCustomerNotChild") {

                            new PNotify({
                                title: 'شرط لازم برقرار نیست',
                                text: 'یوزر مبدا زیر مجموعه شما نمی باشد، برای تغییر بالاسری یوزر مبدا باید جز فرزندان شما باشد.',
                                type: 'warning',
                                icon: 'glyphicon glyphicon-warning-sign',
                                delay: 6000
                            });
                        }

                        if (response.Status === "DestinationCustomerNotChild") {

                            new PNotify({
                                title: 'شرط لازم برقرار نیست',
                                text: 'یوزر مقصد زیر مجموعه شما نمی باشد، برای تغییر بالاسری یوزر مقصد باید جز فرزندان شما باشد.',
                                type: 'warning',
                                icon: 'glyphicon glyphicon-warning-sign',
                                delay: 6000
                            });
                        }

                        if (response.Status === "BothCustomersNotChild") {

                            new PNotify({
                                title: 'شرط لازم برقرار نیست',
                                text: 'یوزر مبدا و مقصد زیر مجموعه شما نمی باشند، برای تغییر بالاسری یوزر مبدا و مقصد باید جز فرزندان شما باشند.',
                                type: 'warning',
                                icon: 'glyphicon glyphicon-warning-sign',
                                delay: 6000
                            });
                        }

                    },
                    error: function (xhr, status, error) {
                        console.log(xhr.responseText);
                        alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                    }
                });


            }

        });


        $("#changeParent").on("click", function (e) {

            e.preventDefault();

            var token = $('input[name="__RequestVerificationToken"]').val();
            var codeOrigin = $("#CodeMelliOrigin").val();
            var codeDestination = $("#CodemelliDestionation").val();
            var requesterDesc = $("#RequesterDescription").val();

            (new PNotify({
                title: 'تایید تغییر بالاسری',
                text: 'آیا از تغییر بالاسری اطمینان دارید؟',
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
                    url: "/User/UserProfile/ChangeParentRequestNew",
                    data: { __RequestVerificationToken: token, codeMelliOrigin: codeOrigin, codemelliDestionation: codeDestination, requesterDescription: requesterDesc },
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

                        if (data.Status === "DescriptionRequired") {

                            new PNotify({
                                title: 'فیلد اجباری',
                                text: 'پر کردن توضیحات اجباری میباشد.',
                                type: 'warning',
                                icon: 'glyphicon glyphicon-warning-sign',
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