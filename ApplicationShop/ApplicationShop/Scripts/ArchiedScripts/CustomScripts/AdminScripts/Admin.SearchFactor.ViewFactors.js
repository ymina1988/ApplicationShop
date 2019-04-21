/// <reference path="F:\repositories\SaleNew\Sale\assets/js/jquery-ui-1.10.4.custom.js" />
//دو فانکشن که فاکتور را میدهند
//فرقشون توی پارامتر های ارسالی به استور هستش
function GetFactorBy_DateFactorFrom_DateFactorTo_shomareFactor_IdNoeFactor_IdVaziatFactor_Vaziat_IdSefaresh_IdCustomer_IdCompany_IdMantaghe_IdKala() {


    $('#spinner').show();

    var IdCustomer = $('#MaxFactorSearchFieldsForAdminVM_IdCustomer').data("kendoComboBox").value();
    var IdMantaghe = $('#MaxFactorSearchFieldsForAdminVM_IdMantaghe').data("kendoComboBox").value();
    var IdKala = multiSelectt.value().join(',');
    var IdSefaresh = $('#MaxFactorSearchFieldsForAdminVM_IdSefaresh').data("kendoComboBox").value();
    var IdCompany = $('#MaxFactorSearchFieldsForAdminVM_IdCompany').data("kendoComboBox").value();
    var fromDate = $('#MaxFactorSearchFieldsForAdminVM_DateFactorFrom').val();
    var ToDate = $('#MaxFactorSearchFieldsForAdminVM_DateFactorTo').val();
    var ShomareFactor = $('#MaxFactorSearchFieldsForAdminVM_shomareFactor').val();
    var IdNoeFactor = $('#MaxFactorSearchFieldsForAdminVM_IdNoeFactor').data("kendoComboBox").value();
    var IdVaziatFactor = $('#MaxFactorSearchFieldsForAdminVM_IdVaziatFactor').data("kendoComboBox").value();
    var Vaziat = $('#MaxFactorSearchFieldsForAdminVM_Vaziat').data("kendoComboBox").value();



    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "/SearchFactor/GetFactorBy_DateFactorFrom_DateFactorTo_shomareFactor_IdNoeFactor_IdVaziatFactor_Vaziat_IdSefaresh_IdCustomer_IdCompany_IdMantaghe_IdKala?IdCustomer=" + IdCustomer + "&IdMantaghe=" + IdMantaghe + "&IdKala=" + IdKala +
                    "&IdSefaresh=" + IdSefaresh + "&IdCompany=" + IdCompany + "&fromDate=" + fromDate + "&ToDate=" + ToDate + "&ShomareFactor=" + ShomareFactor + "&IdNoeFactor=" + IdNoeFactor +
                    "&IdVaziatFactor=" + IdVaziatFactor   + "&Vaziat=" + Vaziat,
                dataType: "json"
            },
            parameterMap: function (options, operation) {
                if (operation !== "read" && options.models) {
                    return { models: kendo.stringify(options.models) };
                }
            }
        },
        pageSize: 5,
        schema: {
            model: {
                id: "Id",
                fields: {
                    ShomareFactor: { type: "string", editable: false },
                    CreateShamsiDate: { type: "string", editable: false },
                    FullName: { type: "string", editable: false },
                    NameSherkat: { type: "string", editable: false },
                    NoeFacotr: { type: "string", editable: false },
                    Tozihat: { type: "string", editable: false },
                    NameSherkat: { type: "string", editable: false },
                    IdCustomer: { type: "string", editable: false },
                    IdCompany: { type: "string", editable: false },
                    IdNoeFactor: { type: "string", editable: false },
                    Vaziat: { type: "string", editable: false }

                }
            }
        },
    });

    var grid = $("#divFactorSearchResult").kendoGrid({
        dataSource: dataSource,
        navigatable: true,
        sortable: true,
        pageable: true,
        filterable: true,
        editable: true,
        columns: [
            {
                field: "ShomareFactor",
                title: "شماه فاکتور",
                width: "110px",
                filterable: { multi: true, search: true }
            },
            {
                field: "CreateShamsiDate",
                title: "تاریخ",
                width: "110px",
                filterable: { multi: true, search: true },
            },
            {
                field: "FullName",
                title: "مشتری",
                width: "110px",
                filterable: { multi: true, search: true },
            },
            {
                field: "NameSherkat",
                title: "شرکت",
                width: "110px",
                filterable: { multi: true, search: true },
            },
            {
                field: "NoeFacotr",
                title: "نوع فاکتور",
                width: "110px",
                filterable: { multi: true, search: true },
            },
            {
                field: "Tozihat",
                title: "توضیحات",
                width: "110px",
            },
        {
            command: {
                title: "  عملیات ",
                text: "جزییات",
                click: ShowDetaisOfFactor
            }
        }
        ]
    }).data("kendoGrid");


    $('#spinner').hide();
}
function GetFactorByDateFromDateToShomareSefaresh_IdCustomer_dMantaghe_IdKala() {

    $('#spinner').show();

    var Customer = $("#MaxFactorSearchFieldsForAdminVM_IdCustomer").data("kendoComboBox");
    var Mantaghe = $("#MaxFactorSearchFieldsForAdminVM_IdMantaghe").data("kendoComboBox");
 
    var IdCustomer = Customer.value();
    var IdMantaghe = Mantaghe.value();
    var IdKala = '';

 
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "/SearchFactor/GetFactorByDateFromDateToShomareSefaresh_IdCustomer_dMantaghe_IdKala?IdCustomer=" + IdCustomer + "&IdMantaghe=" + IdMantaghe + "&IdKala=" + IdKala   ,
                dataType: "json"
            },
            parameterMap: function (options, operation) {
                if (operation !== "read" && options.models) {
                    return { models: kendo.stringify(options.models) };
                }
            }
        },
        pageSize: 5,
        schema: {
            model: {
                id: "Id",
                fields: {
                    ShomareFactor: { type: "string", editable: false },
                    CreateShamsiDate: { type: "string", editable: false },
                    FullName: { type: "string", editable: false },
                    NameSherkat: { type: "string", editable: false },
                    NoeFacotr: { type: "string", editable: false },
                    Tozihat: { type: "string", editable: false },
                    NameSherkat: { type: "string", editable: false },
                    IdCustomer: { type: "string", editable: false },
                    IdCompany: { type: "string", editable: false },
                    IdNoeFactor: { type: "string", editable: false }
                }
            }
        },
    });

    var grid = $("#divFactorSearchResult").kendoGrid({
        dataSource: dataSource,
        navigatable: true,
        sortable: true,
        pageable: true,
        filterable: true,
        editable: true,
        columns: [
            {
                field: "ShomareFactor",
                title: "شماه فاکتور",
                width: "110px",
                filterable: { multi: true, search: true }
            },
            {
                field: "CreateShamsiDate",
                title: "تاریخ",
                width: "110px",
                filterable: { multi: true, search: true },
            },
            {
                field: "FullName",
                title: "مشتری",
                width: "110px",
                filterable: { multi: true, search: true },
            },
            {
                field: "NameSherkat",
                title: "شرکت",
                width: "110px",
                filterable: { multi: true, search: true },
            },
            {
                field: "NoeFacotr",
                title: "نوع فاکتور",
                width: "110px",
                filterable: { multi: true, search: true },
            },
            {
                field: "Tozihat",
                title: "توضیحات",
                width: "110px",
            },
        {
            command: {
                title: "  عملیات ",
                text: "جزییات",
                click: ShowDetaisOfFactor
                //, template: "<button type='button' class='btn btn-primary' onklick='ShowDetaisOfFactor(#=#)' data-toggle='modal' data-target='.bs-example-modal-lg'>جزییات</button>"
            }
        }
        ]
    }).data("kendoGrid");


    //$("#BodyShowFaktro").html('');
    $('#spinner').hide();
}
//دو فانکشن که سفارش میدهند
//فرقشون توی پارامتر های ارسالی به استور هستش
function GetSefateshByDateFromDateToShomareSefaresh_IdCustomer_IdMantaghe_IdKala() {

    $('#collapsethrees_link').click();
    $('#mehdiHeidari').effect("highlight", {}, 2000); 


    var DateFrom = $('#MaxFactorSearchFieldsForAdminVM_DateSefareshFrom').val();
    var DateTo = $('#MaxFactorSearchFieldsForAdminVM_DateSefateshTo').val();
    var ShomareSefaresh = $('#MaxFactorSearchFieldsForAdminVM_ShomareSefatesh').val();
    var IdCustomer = $('#MaxFactorSearchFieldsForAdminVM_IdCustomer').data("kendoComboBox").value();
    var IdMantaghe = $('#MaxFactorSearchFieldsForAdminVM_IdMantaghe').data("kendoComboBox").value();
    var IdKala = multiSelectt.value().join(',');
    $.ajax({
        url: "/SearchFactor/GetSefateshByDateFromDateToShomareSefaresh_IdCustomer_IdMantaghe_IdKala",
        type: "Get",
        data: {
            DateFrom: DateFrom,
            DateTo: DateTo,
            ShomareSefaresh: ShomareSefaresh,
           
            IdCustomer: IdCustomer,
            IdMantaghe: IdMantaghe,
            IdKala: IdKala

        },

    }).done(function (res) {








        $("#MaxFactorSearchFieldsForAdminVM_IdSefaresh").kendoComboBox({

            dataTextField: "ShomareSefaresh",
            dataValueField: "Id",
            filter: "contains",
            placeholder: "سفارش را انتخاب کنید",
            headerTemplate: '  <table style=" border:thin;border-width:1px;width:100%;text-align:center"   >' +
                ' <tr style=" width:100%;text-align:center" >' +
                '  <td style="width:10%;border:thin;border-width:1px;text-align:center"> <b>شماره سفارش </b></td>' +
                  '  <td style="width:25%;border:thin;border-width:1px;text-align:center"><b>تاریخ سفارش </b> </td>' +
                    '  <td style="width:25%;border:thin;border-width:1px;text-align:center"> <b>  مبلغ سفارش   </b></td>' +
                      '  <td style="width:25%;border:thin;border-width:1px;text-align:center"><b>مشتری </b></td>' +
                         '  <td style="width:15%;border:thin;border-width:1px;text-align:center"><b>شرکت </b></td>' +
                '  </tr>' +
            ' </table>',
            template:
                '  <table style=" border:thin;border-width:1px;width:100%;text-align:center"   >' +
                ' <tr  style=" width:100%;text-align:center"   >' +
                '  <td style="width:10%;border:thin;border-width:1px;text-align:center"> #: data.ShomareSefaresh#   </td>' +
                  '  <td style="width:25%;border:thin;border-width:1px;text-align:center"> #: data.CreateShamsiDate# </td>' +
                    '  <td style="width:25%;border:thin;border-width:1px;text-align:center">  #: data.MablaghKhales#   </td>' +
                      '  <td style="width:25%;border:thin;border-width:1px;text-align:center">#: data.FullName#   </td>' +
                         '  <td style="width:15%;border:thin;border-width:1px;text-align:center">#: data.NameSherkat#   </td>' +
                '  </tr>' +
            ' </table>',
            dataSource: {
                data: res,
                serverFiltering: false,
                schema: {
                    model: {
                        fields: {
                            ShomareSefaresh: { type: "string" },
                        }
                    }
                }
            },
            suggest: true,
            autoBind: false
        });

    });
    $('span[ aria-controls="MaxFactorSearchFieldsForAdminVM_IdSefaresh_listbox"]').click();


}
function GetSefareshByDateFromDateToShomareSefaresh() {
  
    $('#collapsethrees_link').click();
    $('#mehdiHeidari').effect("highlight", {}, 2000);//.animate({ 'zoom': 1.2 }, 400).effect("highlight", {}, 500).effect("shake", { times: 4 }, 1500).animate({ 'zoom': 1 }, 400);
   
    

    var DateFrom = $('#MaxFactorSearchFieldsForAdminVM_DateSefareshFrom').val();
    var DateTo = $('#MaxFactorSearchFieldsForAdminVM_DateSefateshTo').val();
    var ShomareSefaresh = $('#MaxFactorSearchFieldsForAdminVM_ShomareSefatesh').val();
    $.ajax({
        url: "/SearchFactor/GetSefareshByDateFromDateToShomareSefaresh",
        type: "Get",
        data: {
            DateFrom: DateFrom,
            DateTo: DateTo,
            ShomareSefaresh: ShomareSefaresh,
           
        },

    }).done(function (res) {
     
        $("#MaxFactorSearchFieldsForAdminVM_IdSefaresh").kendoComboBox({
            dataTextField: "ShomareSefaresh",
            dataValueField: "Id",
            filter: "contains",
            placeholder: "سفارش را انتخاب کنید",
            headerTemplate: '  <table style=" border:thin;border-width:1px;width:100%;text-align:center"   >' +
                ' <tr style=" width:100%;text-align:center" >' +
                '  <td style="width:10%;border:thin;border-width:1px;text-align:center"> <b>شماره سفارش </b></td>' +
                  '  <td style="width:25%;border:thin;border-width:1px;text-align:center"><b>تاریخ سفارش </b> </td>' +
                    '  <td style="width:25%;border:thin;border-width:1px;text-align:center"> <b>  مبلغ سفارش   </b></td>' +
                      '  <td style="width:25%;border:thin;border-width:1px;text-align:center"><b>مشتری </b></td>' +
                         '  <td style="width:15%;border:thin;border-width:1px;text-align:center"><b>شرکت </b></td>' +
                '  </tr>' +
            ' </table>',
            template:
                '  <table style=" border:thin;border-width:1px;width:100%;text-align:center"   >' +
                ' <tr  style=" width:100%;text-align:center"   >' +
                '  <td style="width:10%;border:thin;border-width:1px;text-align:center"> #: data.ShomareSefaresh#   </td>' +
                  '  <td style="width:25%;border:thin;border-width:1px;text-align:center"> #: data.CreateShamsiDate# </td>' +
                    '  <td style="width:25%;border:thin;border-width:1px;text-align:center">  #: data.MablaghKhales#   </td>' +
                      '  <td style="width:25%;border:thin;border-width:1px;text-align:center">#: data.FullName#   </td>' +
                         '  <td style="width:15%;border:thin;border-width:1px;text-align:center">#: data.NameSherkat#   </td>' +
                '  </tr>' +
            ' </table>',
            dataSource: {
                data: res,
                serverFiltering: false,
                schema: {
                    model: {
                        fields: {
                            ShomareSefaresh: { type: "string" },
                        }
                    }
                }
            },
            suggest: true,
            autoBind: false
        });
     
        $('span[ aria-controls="MaxFactorSearchFieldsForAdminVM_IdSefaresh_listbox"]').click();
    });
    
    
}



function ShowDetaisOfFactor(e) {
    e.preventDefault();

    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var ShomareFactor = dataItem.ShomareFactor;
    var FullName = dataItem.FullName;
    var IdCustomer = dataItem.IdCustomer;
    var url = "";
    if (dataItem.NoeFacotr == "فاکتور")
        url = '/Admin/SodorFactor/ShowFactor?IdCustomer=' + IdCustomer + '&Id=' + ShomareFactor + '&customerName=' + FullName;
    else
        url = '/Admin/SodorFactor/ShowPishFactor?IdCustomer=' + IdCustomer + '&Id=' + ShomareFactor + '&customerName=' + FullName;

    window.open(url);
    return;


    $.ajax({
        url: url,
        type: "Get",
    }).done(function (res)
    {
        $("#BodyShowFaktro").html(res);
    });
    //  window.open($(this).attr('href', url).attr('href'), '_blank', 'toolbar=0,location=0,menubar=0');
}

jQuery(function ($) {

    $("#MaxFactorSearchFieldsForAdminVM_IdSefaresh").kendoComboBox();
    $('#MaxFactorSearchFieldsForAdminVM_DateSefareshFrom, #MaxFactorSearchFieldsForAdminVM_DateSefateshTo, #MaxFactorSearchFieldsForAdminVM_DateFactorFrom,#MaxFactorSearchFieldsForAdminVM_DateFactorTo').MdPersianDateTimePicker({
        Placement: 'right',
        EnableTimePicker: 'false'
    });
    //مشتری ها را پر کن 
    $("#MaxFactorSearchFieldsForAdminVM_IdCustomer").kendoComboBox({
        placeholder: "مشتری را انتخاب کنید...",
        dataTextField: "FilterValue",
        dataValueField: "Customer_ID",
        filter: "contains",
        autoBind: true,
        dataSource: {
            type: "json",
            serverFiltering: false,
            transport: {
                read: {
                    url: "/SearchFactor/GetListCustomers"  
                }
            }
        }
    });



    //شرکت ها را پر کن 

    $("#MaxFactorSearchFieldsForAdminVM_IdCompany").kendoComboBox({
        placeholder: "شرکت را انتخاب کنید...",
        dataTextField: "Name",
        dataValueField: "IdCompany",
        filter: "contains",
        autoBind: true,
        dataSource: {
            type: "json",
            serverFiltering: false,
            transport: {
                read: {
                    url: "/SearchFactor/GetListCompany  " 
                }
            }
        }
    });




    //مناطق را پر کن 
    $("#MaxFactorSearchFieldsForAdminVM_IdMantaghe").kendoComboBox({
        placeholder: "منطقه را انتخاب کنید...",
        dataTextField: "Name",
        dataValueField: "Id",
        filter: "contains",
        autoBind: true,
        dataSource: {
            type: "json",
            serverFiltering: false,
            transport: {
                read: {
                    url: "/SearchFactor/GetListMantagheForush" 
                }
            }
        }
    });

    //کالاها را پر کن 
    $.ajax({
        url: "/SearchFactor/GetListKala",
        type: "get",
        contentType: 'text',
        data: {  IdSystem: IdSystem }
    }).done(function (res) {
        multiSelectt = $("#MaxFactorSearchFieldsForAdminVM_IdKala").kendoMultiSelect({
            autoClose: false,
            dataTextField: "KalaName",
            dataValueField: "IdKala",
            dataSource: res
        }).data("kendoMultiSelect"); 
    });

    //وضعیت فاکتور را پر کن 
    $("#MaxFactorSearchFieldsForAdminVM_IdVaziatFactor").kendoComboBox({
        placeholder: "وضعیت  را انتخاب کنید...",
        dataTextField: "Name",
        dataValueField: "IdVaziatFactor",
        filter: "contains",
        autoBind: true,
        dataSource: {
            type: "json",
            serverFiltering: false,
            transport: {
                read: {
                    url: "/SearchFactor/GetListVaziyateFactor"  
                }
            }
        }
    });

    //نوع فاکتور را پرکن 
    $("#MaxFactorSearchFieldsForAdminVM_IdNoeFactor").kendoComboBox({
        placeholder: "نوع فاکتور را انتخاب کنید...",
        dataTextField: "Name",
        dataValueField: "IdNoeFactor",
        filter: "contains",
        autoBind: true,
        dataSource: {
            type: "json",
            serverFiltering: false,
            transport: {
                read: {
                    url: "/SearchFactor/GetListNoeFactor"  
                }
            }
        }
    });

    //وضعیت فاکتور را پر کن 
    $("#MaxFactorSearchFieldsForAdminVM_Vaziat").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "قابل ویرایش", value: "true" },
            { text: "غیر قابل ویرایش", value: "false" }
        ],
        filter: "contains",
        suggest: true
    });






});

