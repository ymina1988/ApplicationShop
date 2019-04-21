"use strict";
var PMask = (function () {
    var SetMask_Money = function (params) {
        if (params != undefined && params != null) {
            params.tedadAshar = params.tedadAshar || 0;
            params.allowMinus = params.allowMinus || false;
            params.rightAlign = params.rightAlign || true;
            params.removeMaskOnSubmit = params.removeMaskOnSubmit || true;

            $(".pmoney").inputmask('decimal',
                {
                    groupSeparator: ',',
                    autoGroup: true,
                    allowPlus: false,
                    autoUnmask: true,
                    digits: params.tedadAshar,
                    allowMinus: params.allowMinus,
                    removeMaskOnSubmit: params.removeMaskOnSubmit,
                    rightAlign: params.rightAlign
                });
        }
        else {
            $(".pmoney").inputmask('decimal',
                {
                    groupSeparator: ',',
                    autoGroup: true,
                    allowPlus: false,
                    autoUnmask: true,
                    digits: 0,
                    allowMinus: false,
                    removeMaskOnSubmit: true,
                    rightAlign: true
                });
        }
    }

    var GetUnmaskedValue_Money = function (idInput) {
        var _unmaskedValue_Num1 = Inputmask.unmask($("#" + idInput).val(), { alias: "decimal" });
        return _unmaskedValue_Num1;
    }


    return {
        SetMask_Money: SetMask_Money,
        GetUnmaskedValue_Money: GetUnmaskedValue_Money
    }

})();


$(document).ready(function () {

    var params = {
        allowMinus: false,
        removeMaskOnSubmit: true,
        tedadAshar: 0,
        rightAlign: true
    };

    PMask.SetMask_Money(params);
});