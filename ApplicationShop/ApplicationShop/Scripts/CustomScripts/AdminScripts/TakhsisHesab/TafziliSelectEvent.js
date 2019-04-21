function OnSelectedChange(senderId, selectedText, selectedValue) {
    $.ajax({
        url: "/Admin/Sanad/ListTafzili",
        type: "Post",
        async: false,
        data: { idHesab: selectedValue },
    })
          .done(function (res) {

              $("#TafziliChecked").empty();

              $("#TafziliChecked").select2({
                  placeholder: "تا حداکثر پنج تفضیلی می توانید انتخاب کنید",
                  allowClear: true
              });


              for (var i = 0; i < res.length; i++) {
                  $("#TafziliChecked").append($('<option/>', { value: res[i].IdTafzili, html: res[i].Name }));
              }

          });


}