jQuery.fn.PersianToEnglish = function () {
    return this.each(function () {
        $(this).change(function (value) {
            var newValue = "";
            for (var i = 0; i < value.length; i++) {
                var ch = value.charCodeAt(i);
                if (ch >= 1776 && ch <= 1785) // For Persian digits.
                {
                    var newChar = ch - 1728;
                    newValue = newValue + String.fromCharCode(newChar);
                }
                else if (ch >= 1632 && ch <= 1641) // For Arabic & Unix digits.
                {
                    var newChar = ch - 1584;
                    newValue = newValue + String.fromCharCode(newChar);
                }
                else
                    newValue = newValue + String.fromCharCode(ch);
            }
            return newValue;
        });
    });
};
jQuery.fn.ForceNumericOnly = function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A, Command+A
             (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: home, end, left, right, down, up
             (e.keyCode >= 35 && e.keyCode <= 40)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    });
};


jQuery.fn.ForceEnglishOnly = function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            validate_en(e);
        });
    });
};


//بررسی ورودی فقط انگلیسی
function validate_en(key) {
    var keycode = (key.which) ? key.which : key.keyCode
    //comparing pressed keycode
    if (keycode == 127) { return true; }
    else if (!(keycode < 48 || keycode > 57) || keycode > 255) {
        alert('لطفا کیبورد خود را به لاتین تغییر دهید!');
        return false;
    }
    else {
        return true;
    }
}
//بررسی ورودی فقط حروف فارسی
function validate_fa(key, textbox) {
    var t = textbox
    var keycode = (key.which) ? key.which : key.keyCode
    var phn = document.getElementById(t);
    //comparing pressed keycode
    if (keycode == 8 || keycode == 9 || keycode == 32 || keycode == 127) {
        return true;
    }
    else if ((keycode < 255)) {
        alert('لطفا کیبورد خود را به فارسی تغییر دهید!');
        return false;
    }
    else {
        return true;
    }
}
//بررسی ورودی فقط عدد
function validate_number(key, textbox) {
    var t = textbox
    var keycode = (key.which) ? key.which : key.keyCode
    var phn = document.getElementById(t);
    //comparing pressed keycode
    if (keycode == 8 || keycode == 9 || keycode == 32 || keycode == 46 || keycode == 127) {
        return true;
    }
    else if (keycode > 47 && keycode < 58) {
        return true;
    }
    else {
        alert('لطفا فقط عدد وارد کنید!');
        return false;
    }
}
//بررسی ورودی فقط عدد صحیح
function validate_int_number(key, textbox) {
    var t = textbox
    var keycode = (key.which) ? key.which : key.keyCode
    var phn = document.getElementById(t);
    //comparing pressed keycode
    if (keycode == 8 || keycode == 9 || keycode == 32 || keycode == 127) {
        return true;
    }
    else if (keycode > 47 && keycode < 58) {
        return true;
    }
    else {
        alert('لطفا فقط عدد وارد کنید!');
        return false;
    }
}
$(document).ready(function () {
    $('.inputonlynumber').ForceNumericOnly();
    $('.inputonlyenglish').ForceEnglishOnly();
});
$(".inputnospace").on("keydown", function (e) {
    return e.which !== 32;
})

$(document).on('input', '.CodeMelliRegister', function () {
    var actionUrl = '/Account/CheckExistCustomerViaCodeMelli';
    var param = $(this).val();
    if (param.length == 0) {
        $("#MelliCodeValidation").html("");
    }
    else if ($(this).val().length == 10 || $(this).val().length == 16) {
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: false,
            url: actionUrl,
            data: { _codeMelli: param },
            success: function (response) {
                if (response != null) {
                    if (response.IsValid == 'True') {
                        if (response.ISExist == 'True') {
                            $("#MelliCodeValidation").html('این کد ملی قبلا در سیستم ثبت شده است!');
                            $('.CodeMelliRegister').css('border-color', '#a94442');
                        }
                        else {
                            $('.CodeMelliRegister').css('border-color', 'green');
                            $("#MelliCodeValidation").html("");
                        }
                    }
                    else if (response.IsValid == 'False') {
                        $("#MelliCodeValidation").html('کد ملی اشتباه می باشد');
                        $('.CodeMelliRegister').css('border-color', '#a94442');
                    }
                    else {
                        $("#MelliCodeValidation").html("");
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                toastr.error("خطایی رخ داد!", 'پیام سیستم');
            }
        });
    }
    else {
        $("#MelliCodeValidation").html('تعداد کارکتر نامعتبر است');
    }
});

//$(".chosen-select").chosen({ allow_single_deselect: true, width: "95%", no_results_text: 'چیزی پیدا نشد', disable_search_threshold: 10 });


//--Jquery Select2--
$(document).ready(function () {
    $(".chosen-select").select2();
    $(".select2m").select2({
        placeholder: "انتخاب کنید ...",
        allowClear: true
    });
    $(".multi-select2").select2({
        placeholder: "یک یا چند مقدار را انتخاب کنید",
        allowClear: true
    });
    $(".select2-container-multi").select2({
        placeholder: "یک یا چند مقدار را انتخاب کنید",
        allowClear: true
    });
});

function expandAllNodes() {
    var length = $('[class^="treeClass"]').length;
    for (var i = 1; i <= length; i++) {
        var treeClassName = ".treeClass";
        if (i > 1) treeClassName = treeClassName + i;

        $(treeClassName).data("kendoTreeView").expand(".k-item");
    }
}

function collapseAllNodes(e) {
    var length = $('[class^="treeClass"]').length;
    for (var i = 1; i <= length; i++) {
        var treeClassName = ".treeClass";
        if (i > 1) treeClassName = treeClassName + i;

        $(treeClassName).data("kendoTreeView").collapse(".k-item");
    }
}

(function ($) {
    "use strict";
    $(document).ready(function () {
        $('.searchinput').val("");
        $('.searchinput').keyup(function (e) {
            var valueLength = $(this).val().length;
            var string = $(this).val();
            if (valueLength > 0) {
                $(".searchhelper").hide();
                $(".page-sidebar").find("li").hide();
                $(".page-sidebar").find(".menu-text").each(function () {
                    var menu_title = $(this).html();

                    if (menu_title.indexOf(string) != -1) {
                        $(this).parents("li").show();
                        $(this).parents("ul.submenu").addClass('active');
                        $(this).parents("li.submenu").addClass('open');
                        $(this).parents("ul.submenu").css('display', "block");
                        $('li.start').removeClass('active');
                    }
                });
            }
            else if (valueLength == 0) {
                $('li').show();
                $('ul.submenu').hide();
                $(".page-sidebar").find(".submenu").removeClass('active');
                $('li.start').removeClass('active');
                $(this).closest('li.submenu').removeClass('active');
                $(this).closest('li').removeClass('active');

                $('li.current').addClass('active');
                $('li.active').closest("li.submenu").show();
                $('li.active>ul.submenu').show();
                if ($("li.submenu").hasClass("current") == false) $('li.start').addClass('active');
            }
        });
    });
})(jQuery);

function refreshSelectedNode(idTreeView) {
    var treeView = $(idTreeView).data("kendoTreeView");

    var selectedNode = treeView.select();

    if (selectedNode.length > 0) {
        var parent = treeView.parent(selectedNode);
        if (parent.length > 0) {
            var selectedDataItem = treeView.dataItem(parent);
            selectedDataItem.loaded(false);
            selectedDataItem.load();
        }
        else {
            var tree = $(idTreeView).data("kendoTreeView");
            tree.dataSource.read();
        }
    }
}