$(function () {

    requirejs(
        ["../../../Helpers/Spin.PartOfPageWithoutEvent",
          "../../../Helpers/PNotifyModule",
          "../../Sanad/DaftarHesabPopupModule",
          "SearchIndexFormControlsModule",
          "SanadGridModule",
          "SanadDetailGridModule",
          "SearchIndexModule"
        ],
        function () {

            searchIndexFormControlsModule.setUpSalMaliSelectBasedOnCompany();
            searchIndexFormControlsModule.setUpTafziliSelectBasedOnGorouhTafzili();
            searchIndexFormControlsModule.initHesabTreeSelect();

            searchIndexModule.wireUpSanadSearchButtonClickEvent();
            searchIndexModule.wireUpsanadDetailSearchButtonClickEvent();

            sanadGridModule.wireUpsanadStatusHistoryButtonClickEvent();

            daftarHesabPopupModule.wireUpDaftareHesabModalButtonClickEvent();
        });

});