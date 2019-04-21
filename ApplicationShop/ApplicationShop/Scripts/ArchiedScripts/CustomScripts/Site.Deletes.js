(function () {

	var successfulDeleteNotice = function () {
		new PNotify({
			title: 'حذف موفق',
			text: 'آیتم مورد نظر با موفقیت حذف شد.',
			type: 'success',
			icon: 'glyphicon glyphicon-ok',
			delay: 1000
		});
	}

	//code dealing with deleting the slideshow
	$(function () {

		$(".RoleDeleteLink").on("click", function (e) {

			e.preventDefault();

			var token = $('input[name="__RequestVerificationToken"]').val();
			var item = $(this);
			var link = item.attr("href");

			(new PNotify({
				title: 'تایید حذف',
				text: 'آیا از حذف رول مورد نظر اطمینان دارید؟',
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

						if (data.Status === "Deleted") {
							successfulDeleteNotice();
							item.closest("tr").fadeOut(2000);
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

    //code dealing with deleting the Shekayat
	$(function () {

	    $(".ShekayatDelete").on("click", function (e) {

	        e.preventDefault();

	        var token = $('input[name="__RequestVerificationToken"]').val();
	        var item = $(this);
	        var link = item.attr("href");

	        (new PNotify({
	            title: 'تایید حذف',
	            text: 'آیا از حذف شکایت مورد نظر اطمینان دارید؟',
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

	                    if (data.Status === "Deleted") {
	                        successfulDeleteNotice();
	                        item.closest("tr").fadeOut(2000);
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