$(function () {

    requirejs(["SearchSanadModule"], function () {

        searchSanadModule.initHesabTree();
        searchSanadModule.loadSalMaliSelectBasedOnCompanySelect();
        searchSanadModule.searchButtonClickEvent();

    });

});