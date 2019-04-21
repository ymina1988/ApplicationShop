//(function () {
//    $(function () {
//        "use strict";

//        _.templateSettings = {
//            interpolate: /\{\{(.+?)\}\}/g
//        };

//        //function responsible for loading the OstanSelect based on Mantaghe, and Shahr select based on OstanSelect
//        var populateSelect = function (selector, idPlaceTree, idLanguage, selectDefaultMessage, targetSelect) {

//            $(selector).on("change", function (e) {

//                var $this = $(this);
//                var thisId = $this.val();
//                var htmlString = '<option value ="">' + selectDefaultMessage + '</option>';

//                if (thisId === "") {
//                    $(targetSelect).empty();
//                    $(targetSelect).append(htmlString);
//                }

//                if (thisId !== "") {
//                    $.ajax({
//                        type: "POST",
//                        url: "/UserControl/GetListCityPlaceTree_Json",
//                        data: { OstanSelect: thisId, IdNoePlaceTree: idPlaceTree, langID: idLanguage },
//                        dataType: "json",
//                        success: function (response) {

//                            //console.log(response.Provinces);

//                            if(response.Provinces.length !== 0) {

//                                var selectTemplate = _.template('<option value ="{{ IdPlaceTree }}">{{ Name }}</option>');

//                                $.each(response.Provinces, function (index, value) {
//                                    htmlString += selectTemplate({ IdPlaceTree: value.IdPlaceTree, Name: value.Name });
//                                });

//                                $(targetSelect).empty();
//                                $(targetSelect).append(htmlString);
//                            }
//                            else if (response.Provinces.length === 0) {
//                                $(targetSelect).empty();
//                                $(targetSelect).append(htmlString);
//                            }

//                        },
//                        error: function (xhr, status, error) {
//                            console.log(xhr.responseText);
//                            alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
//                        }
//                    });
//                }
//            });
//        }

//        populateSelect("#MantagheSelect", 2, 1, "لطفا استان را انتخاب کنید.", "#OstanSelect");
//        populateSelect("#OstanSelect", 3, 1, "لطفا شهر را انتخاب کنید.", "#ShahrSelect");


//        //#region code before refactoring, this two functions refatored into one
//        //$("#MantagheSelect").on("change", function (e) {

//        //    var $thisMantagheSelect = $(this);
//        //    var mantagheId = $thisMantagheSelect.val();

//        //    if (mantagheId !== "") {
//        //        $.ajax({
//        //            type: "POST",
//        //            url: "/User/DarkhastNamayandegi/GetListCityPlaceTree",
//        //            data: { OstanSelect: mantagheId, IdNoePlaceTree: 2, langID: 1 },
//        //            dataType: "json",
//        //            success: function (response) {

//        //                //console.log(response.Provinces);


//        //                if (response.Provinces.length !== 0 && mantagheId !== "") {

//        //                    var provinceSelectTemplate = _.template('<option value ="{{ IdPlaceTree }}">{{ Name }}</option>');
//        //                    var provinceHtmlString = '<option value ="">لطفا استان را انتخاب کنید.</option>';

//        //                    $.each(response.Provinces, function (index, value) {
//        //                        provinceHtmlString += provinceSelectTemplate({ IdPlaceTree: value.IdPlaceTree, Name: value.Name });
//        //                    });

//        //                    $("#OstanSelect").empty();
//        //                    $("#OstanSelect").append(provinceHtmlString);
//        //                }

//        //            },
//        //            error: function (xhr, status, error) {
//        //                console.log(xhr.responseText);
//        //                alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
//        //            }
//        //        });
//        //    }
//        //});

//        //$("#OstanSelect").on("change", function (e) {

//        //    var $thisOstanSelect = $(this);
//        //    var OstanSelect = $thisOstanSelect.val();

//        //    if (OstanSelect !== "") {
//        //        $.ajax({
//        //            type: "POST",
//        //            url: "/User/DarkhastNamayandegi/GetListCityPlaceTree",
//        //            data: { OstanSelect: OstanSelect, IdNoePlaceTree: 3, langID: 1 },
//        //            dataType: "json",
//        //            success: function (response) {

//        //                //console.log(response.Provinces);

//        //                if (response.Provinces.length !== 0) {

//        //                    var shahrSelectTemplate = _.template('<option value ="{{ IdPlaceTree }}">{{ Name }}</option>');
//        //                    var shahrHtmlString = '<option value ="">لطفا شهر را انتخاب کنید.</option>';;

//        //                    $.each(response.Provinces, function (index, value) {
//        //                        shahrHtmlString += shahrSelectTemplate({ IdPlaceTree: value.IdPlaceTree, Name: value.Name });
//        //                    });

//        //                    $("#ShahrSelect").empty();
//        //                    $("#ShahrSelect").append(shahrHtmlString);
//        //                }

//        //            },
//        //            error: function (xhr, status, error) {
//        //                console.log(xhr.responseText);
//        //                alert("message : \n" + "An error occurred, for more info check the js console" + "\n status : \n" + status + " \n error : \n" + error);
//        //            }
//        //        });
//        //    }
//        //});
//        //#endregion

//    });
//}) ();







var KeshvarID = $('#IdKeshvar_Model').val();
var LangID = $('#LangId_Model').val();

var S = "Select...";
var Mpty = "<option value='0' selected='selected'>" + S + "</option>";


$(document).ready(function ()
{
    $("#MantagheSelect").change(function () {
        var Text = $(this).find("option:selected").text();
        var M_Value = $(this).find("option:selected").val();


        if (S != Text) {
            CallProvince(0, M_Value);

            $("#ShahrSelect").empty();
            $("#ShahrSelect").append(Mpty);
        }
        else {
            CallProvince(KeshvarID, 0);

            $("#ShahrSelect").empty();
            $("#ShahrSelect").append(Mpty);
        }


    });

    $("#OstanSelect").change(function () {

        var value = $(this).find("option:selected").val();
        var Text = $(this).find("option:selected").text();



        if (S != Text) {
            CallCity(value);
        }
        else {
            $("#ShahrSelect").empty();
            $("#ShahrSelect").append(Mpty);
        }


    });
});


function CallCity(ID)
{
    var NoePlaceTree = 3;

    $('.LoadingDiv').show();

    $.ajax({
        url: '/Customers/GetListCityPlaceTree',//"@Url.Action("GetListCityPlaceTree", "Customers", new { area="" })",
        type: "GET",
        data: { ProvinceID: ID, IdNoePlaceTree: NoePlaceTree, langID: LangID, IdMantaghe: "0" }
    }).done(function (res) {
        $("#ShahrSelect").empty();
        $("#ShahrSelect").append(Mpty);

        for (var i = 0; i < res.length; i++) {
            $("#ShahrSelect").append($('<option/>', { value: res[i].IdPlaceTree, html: res[i].Name }));
        }

        $('.LoadingDiv').hide();
    });
}

function CallProvince(OstanSelect, IdMantaghe)
{
    var NoePlaceTree = 2;

    $('.LoadingDiv').show();
    $.ajax({
        url: '/Customers/GetListCityPlaceTree',// "@Url.Action("GetListCityPlaceTree", "Customers", new { area="" })",
        type: "GET",
        data: { ProvinceID: OstanSelect, IdNoePlaceTree: NoePlaceTree, langID: LangID, IdMantaghe: IdMantaghe }
    }).done(function (res) {
        $("#OstanSelect").empty();
        $("#OstanSelect").append(Mpty);

        for (var i = 0; i < res.length; i++) {
            $("#OstanSelect").append($('<option/>', { value: res[i].IdPlaceTree, html: res[i].Name }));
        }

        $('.LoadingDiv').hide();
    });
}