$(document).ready(function () {
    $("#grid").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: "/HowToPay/GetListFactor"
            },
            data: [{
                ShomareSefaresh: { type: "string" },
                ShomareFactor: { type: "string" },
                CreateShamsiDate: { type: "string" },
                NameSherkat: { type: "string" },
                HazineHaml: { type: "string" }
            }]
            //group: { field: "ShomareSefaresh" } // set grouping for the dataSource
           ,
            pageSize: 20,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        //height: 550,
        filterable: true,
        sortable: true,
        pageable: true,
        //groupable: true,
        columns: [{ field: "ShomareSefaresh", title: "شماره سفارش", filterable: true, width: 200 },
            { field: "ShomareFactor", title: "شماره فاکتور", filterable: true, width: 200 },
            { field: "NameSherkat", title: '@DAL.App_GlobalResources.SaleResource.CompanyName', width: 200 },
            { field: "CreateShamsiDate", title: '@DAL.App_GlobalResources.SaleResource.Date', format: "{0:YYYY/MM/dd}", width: 150 },
           {
               template: '<a type="button" class="k-button info" href="/User/HowToPay/Detail?Id=#=ShomareFactor#" />' + '@DAL.App_GlobalResources.SaleResource.Details' + '</a>',
               filterable: false,
               sortable: false,
               width: 100
           }
        ]
    })
});
function showDetails(e) {
    e.preventDefault();
}