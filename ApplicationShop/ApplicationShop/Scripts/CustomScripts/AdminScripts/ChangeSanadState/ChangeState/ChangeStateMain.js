$(function () {

    //requirejs.config({
    //    baseUrl: '/Scripts/CustomScripts/AdminScripts/ChangeSanadState/ChangeState',
    //    paths: {
    //        mo: 'mo'
    //    }
    //});


    requirejs(["ChangeStateModule", "ChangeStateTableModule", "ChangeStateSanadDetailModule"], function () {

        changeStateModule.populateSalMaliSelectBasedOnCompanySelect();
        changeStateModule.wireUpSearchSanad();
        changeStateTableModule.changeSanadState();
        changeStateSanadDetailModule.wireUpsanadDetailButtonClickHandler();

    });


});