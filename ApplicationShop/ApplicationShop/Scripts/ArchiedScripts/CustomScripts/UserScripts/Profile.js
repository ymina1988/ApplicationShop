Dropzone.autoDiscover = false;
$("#profileUpload").dropzone({
    paramName: 'photos',
  //  url: '@Url.Action("profileUpload", "Profile", new { Area = "User" })',
    url: '/User/Profile/profileUpload',
    method: 'POST',
    clickable: true,
    enqueueForUpload: true,
    maxFilesize: 1,
    uploadMultiple: false,
    addRemoveLinks: true,
    maxFiles: 1,
    dictDefaultMessage: "عکس موردنظر خود را در اینجا قرار دهید" + '\n' + ".حجم فایل شما نباید بیشتر یک مگابایت باشد و فرمت فایل باید jpg یا png باشد.",
    dictFallbackMessage: "مرورگر شما امکان کشیدن فایل بر روی صفحه پشتیبانی نمی کند",
    dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
    dictFileTooBig: "فایل خیلی بزرگتر از  ({{filesize}}MiB) می باشد. حداکثر سایز فایل: {{maxFilesize}}MiB می باشد.",
    dictInvalidFileType: "شما نمی توانید این فایل با این فرمت ذخیره کنید",
    dictResponseError: "پاسخ سرور با کد  {{statusCode}} می باشد.",
    dictCancelUpload: "انصراف",
    dictCancelUploadConfirmation: "آیا از انصراف خود مطمئن هستید؟",
    dictRemoveFile: "حذف فایل",
    dictRemoveFileConfirmation: null,
    dictMaxFilesExceeded: "شما نمی توانید بیشتر این فایل ذخیره کنید.",
    removedfile: function (file) {
        if (file.status == 'success') {
            $.ajax({
               // url: '@Url.Action("DeleteProfileImage", "Profile", new { Area = "User" })',
                url: '/User/Profile/DeleteProfileImage',
                method: 'POST',
                dataType: 'json',
                success: function (data) {
                    $('.header-avatar').attr({ 'src': '../../assets/img/avatars/blank.gif' });
                }
            });
        }
        var _ref;
        if (file.previewElement) {
            if ((_ref = file.previewElement) != null) {
                _ref.parentNode.removeChild(file.previewElement);
            }
        }
        return this._updateMaxFilesReachedClass();
    },
    accept: function (file, done) {

            if (file.type == "image/jpeg" || file.type == "image/png") {
                done();
            }
            else {
                done('فرمت فایل شما مناسب نمی باشد.');
            }
    },
    success: function (file, response) {
        $('.header-avatar').attr({ 'src': '../../Images/profile/' + response });
        if (file.previewElement) {
            //this.emit("error", file, "Upload canceled");
            return file.previewElement.classList.add("dz-success");
        }
    }

});
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
$(document).ready(function () {
    $('#btnChangePassword').click(function () {
        $('#alertPassword').css({ 'display': 'none' });
        $('#alertPassword').removeClass();
        var NewPassword = $('#txtNewPassword').val();
        var ReNewPassword = $('#txtReNewPassword').val();
        var Password = $('#txtPassword').val();
        if (NewPassword && ReNewPassword && Password) {
            if (NewPassword.localeCompare(ReNewPassword) != 0) {
                $('#alertPassword').css({ 'display': 'block' });
                $('#alertPassword').addClass("alert alert-danger");
                $('#alertPassword Label').text('خطا !');
                $('#alertPassword span').text('رمز عبور جدید و تکرار آن با هم یکسان نمی باشند.');
            }
            else {
                $.ajax({
                    //url: '@Url.Action("ChangePassword", "Profile", new { Area = "User" })',
                    url: '/User/Profile/ChangePassword',
                    method: 'POST',
                    dataType: 'json',
                    data: { NewPassword: NewPassword, ReNewPassword: ReNewPassword, Password: Password },
                    success: function (data) {
                        if (data) {
                            if (data.IsError) {
                                $('#alertPassword').css({ 'display': 'block' });
                                $('#alertPassword').addClass("alert alert-danger");
                                $('#alertPassword Label').text('خطا !');
                                if (data.IsEmpaty) {
                                    $('#alertPassword span').text('گزینه های خواسته شده را کامل وارد نمایید.');
                                }
                                else if (data.IsNotCompare) {
                                    $('#alertPassword span').text('رمز عبور جدید و تکرار آن با هم یکسان نمی باشند.');
                                }
                                else if (data.IsProblem) {
                                    $('#alertPassword span').text('تغییر رمز عبور با مشکل مواجه شده است.');
                                }
                                else {
                                    $('#alertPassword span').text('خطای نامشخص.');
                                }

                            }
                            else {
                                $('#alertPassword').css({ 'display': 'block' });
                                $('#alertPassword').addClass("alert alert-success");
                                $('#alertPassword Label').text('موفقیت');
                                $('#alertPassword span').text('رمز عبور شما با موفقیت تغییر یافت.');
                            }
                        }
                    }
                });

            }
        }
        else {
            $('#alertPassword').css({ 'display': 'block' });
            $('#alertPassword').addClass("alert alert-danger");
            $('#alertPassword Label').text('خطا !');
            $('#alertPassword span').text('گزینه های خواسته شده را کامل وارد نمایید.');
        }

    });
    $('#btnChangeEmail').click(function () {
        var Email = $('#txtEmail').val();
        $('#alertEmail').css({ 'display': 'none' });
        $('#alertEmail').removeClass();
        if (Email) {
            if (validateEmail(Email)) {
                $.ajax({
                   // url: '@Url.Action("ChangeEmail", "Profile", new { Area = "User" })',
                    url: '/User/Profile/ChangeEmail',
                    method: 'POST',
                    dataType: 'json',
                    data: { Email: Email },
                    success: function (data) {
                        if (data) {
                            if (data.IsError) {
                                $('#alertEmail').css({ 'display': 'block' });
                                $('#alertEmail').addClass("alert alert-danger");
                                $('#alertEmail Label').text('خطا !');
                                if (data.IsEmpaty) {
                                    $('#alertEmail span').text('پست الکترونیک خود را کامل وارد نمایید.');
                                }
                                else if (data.IsNotValidEmail) {
                                    $('#alertEmail span').text('پست الکترونیک شما نادرست می باشد.');
                                }
                                else if (data.IsProblem) {
                                    $('#alertEmail span').text('تغییر پست الکترونیک با مشکل مواجه شده است.');
                                }
                                else {
                                    $('#alertEmail span').text('خطای نامشخص.');
                                }

                            }
                            else {
                                $('#alertEmail').css({ 'display': 'block' });
                                $('#alertEmail').addClass("alert alert-success");
                                $('#alertEmail Label').text('موفقیت');
                                $('#alertEmail span').text('پست الکترونیک  شما با موفقیت تغییر یافت.');
                            }
                        }
                        else {
                            $('#alertEmail').css({ 'display': 'block' });
                            $('#alertEmail').addClass("alert alert-danger");
                            $('#alertEmail Label').text('خطا !');
                            $('#alertEmail span').text('خطای نامشخص.');

                        }
                    }
                });
            }
            else {
                $('#alertEmail').css({ 'display': 'block' });
                $('#alertEmail').addClass("alert alert-danger");
                $('#alertEmail Label').text('خطا !');
                $('#alertEmail span').text('پست الکترونیک شما نادرست می باشد.');
            }
        }
        else {
            $('#alertEmail').css({ 'display': 'block' });
            $('#alertEmail').addClass("alert alert-danger");
            $('#alertEmail Label').text('خطا !');
            $('#alertEmail span').text('پست الکترونیک خود را کامل وارد نمایید.');
        }
    });
    $('#btnChangeLanguage').click(function () {
        var Language = $('#ddlLanguage').val();
        if (Language) {
            $.ajax({
                //url: '@Url.Action("ChangeLanguage", "Profile", new { Area = "User" })',
                url: '/User/Profile/ChangeLanguage',
                method: 'POST',
                dataType: 'json',
                data: { defualtLanguage: Language },
                success: function (data) {
                    if (data) {
                        $('#alertLanguage').css({ 'display': 'block' });
                        
                        if (data.IsError) {
                            $('#alertLanguage').addClass("alert alert-danger");
                        $('#alertLanguage Label').text('خطا !');
                            $('#alertLanguage span').text('تغییر پست الکترونیک با مشکل مواجه شده است.');
                        }
                        else {
                            $('#alertLanguage').css({ 'display': 'block' });
                            $('#alertLanguage').addClass("alert alert-success");
                            $('#alertLanguage Label').text('موفقیت');
                            $('#alertLanguage span').text('پست الکترونیک  شما با موفقیت تغییر یافت.');
                        }
                    }
                    else {
                        $('#alertLanguage').css({ 'display': 'block' });
                        $('#alertLanguage').addClass("alert alert-danger");
                        $('#alertLanguage Label').text('خطا !');
                        $('#alertLanguage span').text('خطای نامشخص.');
                    }
                }
            });
        }

    });


});