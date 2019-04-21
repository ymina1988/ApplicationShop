






$(document).ready(function () {

    //Grid definition
    fillGrid();
    $(document)
          .ajaxStart(function () {
              $("#spinner").show();
          })
          .ajaxStop(function () {
              $("#spinner").hide();
          });

});
function fillGrid()
{

    var grid = $("#gridEtebarToNoeEtebar").kendoGrid({
        dataSource: {
            type: "jsonp",
            transport: {
                read: "/Namayandegi/GetListEtebarToNoeEtebar"
            },
            pageSize: 20
        },
        filterable: true,
        pageable: true,
        height: 430,
        dataBound: onDataBound,
        columns: [
{ template: " <div class='checkbox'    >  <label>   <input type='checkbox'    >    <span class='text'></span>    </label>    </div>", title: "انتخاب" },
        {
            field: "Name",
            title: "نام",
            width: "48%",
            filterable: { multi: true, search: true }
        },

        {
            field: "Mablagh",
            title: "مبلغ",
            width: "48%",
            filterable: { multi: true, search: true }
        }
        ]
    }).data("kendoGrid");
    grid.table.on("click", "input[ type='checkbox']", selectRow);



}
var checkedIds = {};


function MySubmit() {
    var checked = [];
    for (var i in checkedIds) {
        if (checkedIds[i]) {
            checked.push(i);
        }
    }
    var CustomerList = $('#CustomerList').val();
    var ids = checked;
    var CustomerRotbe = $(".rotbe").val();
    if (CustomerList == '' || ids.length == 0 || CustomerRotbe == '') {
        alert('اطلاعات را کامل وارد کنید ');
    }
    else {
        $.ajax({
            type: "POST",
            url: "/Namayandegi/EtaNamayandegi",
            data: { CustomerList: CustomerList, ids: ids, CustomerRotbe: CustomerRotbe },
            dataType: "script"
        }).done(function () {
            $("#CustomerList").val(null);
            $('.info').html('');
            $(".rotbe").val(null);
            checkedIds = {};
            fillGrid();
            refreshCustomer();
        });
    }





}


function selectRow() {

    var checked = this.checked;

    var row = $(this).closest("tr")
    var grid = $("#gridEtebarToNoeEtebar").data("kendoGrid");
    var dataItem = grid.dataItem(row);

    checkedIds[dataItem.Id] = checked;
    if (checked) {
        //-select the row
        row.addClass("k-state-selected");
    } else {
        //-remove selection
        row.removeClass("k-state-selected");
    }
}


//on dataBound event restore previous selected rows:
function onDataBound(e) {
    var view = this.dataSource.view();
    for (var i = 0; i < view.length; i++) {
        if (checkedIds[view[i].id]) {
            this.tbody.find("tr[data-uid='" + view[i].uid + "']")
            .addClass("k-state-selected")
            .find(".checkbox")
            .attr("checked", "checked");
        }
    }
}





 


(function () {
    $(function () {
        "use strict";

        $("#CustomerList").on("change", function () {

            var customerId = $("#CustomerList").val();

            $.ajax({
                type: "GET",
                url: "/Namayandegi/GetCustomerRotbe",
                data: { customerId: customerId },
                dataType: "json",
                success: function (response) {
                    if (response.ErrorMessage != "") {
                        alert(response.ErrorMessage);
                        $("#CustomerList").val(null);
                    }
                    else {
                        $("#CustomerRotbe").text(response.CustomerRotbe);
                        $(".rotbe").val(response.RotbeId); 
                    }
                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                }
            });
        });

        $("#NoeEtebarList").on("change", function () {

            var noeEtebarIdVal = $("#NoeEtebar  List").val();

            $.ajax({
                type: "GET",
                url: "/Namayandegi/GetEtebar",
                data: { noeEtebarId: noeEtebarIdVal },
                dataType: "json",
                success: function (response) {

                    console.log(response.etebar);

                    $("#EtebarList").empty();

                    var options = '<option value="">لطفا اعتبار را انتخاب کنید</option>';

                    $.each(response.etebar, function (index, value) {
                        options += '<option value=' + value.Id + '>' + value.Mablagh + '</option>';
                    });

                    $("#EtebarList").append(options);
                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
                }
            });
        });
    });
})();