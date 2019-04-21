$(function () {
    takhsisHesabModule.initTakhsisHesabTree();
    takhsisHesabModule.setSelect2("#TafziliChecked", "تا حداکثر پنج تفضیلی می توانید انتخاب کنید");
    takhsisHesabModule.setNoeSanadBasedOnSystem();
    takhsisHesabModule.setSpinnerWithEventForPartOfPage();
    takhsisHesabGridModule.initGrid();
    takhsisHesabGridModule.setSpinnerWithEventForPartOfPage();
});