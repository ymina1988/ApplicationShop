"use strict";

var breadCrumbSettingModule = (function () {

    function breadCrumbsOptions(
            opt = {
                showBreadCrumb:true,
                showExpandTree:true,
                showCollapseTree:true,
                showSideBarToggle:true,
                showRefreshToggle:true,
                showFullScreenToggle:true,
                showHelpButton:true,
                showPrintButton:true
               }) {
                    var $theBreadCrumb = $("#bread-container");
                    var $expandTree = $("#expandTreeView");
                    var $collapseTree = $("#collapseTreeView");
                    var $sidebarToggle = $("#sidebar-toggle");
                    var $refreshToggler = $("#refresh-toggler");
                    var $fullscreenToggler = $("#fullscreen-toggler");
                    var $getHelp = $("#get-help");
                    var $print = $("#print");

                    if (opt.showBreadCrumb === false) {
                        $theBreadCrumb.hide();
                    }

                    if (opt.showExpandTree === false) {
                        $expandTree.hide();
                    }

                    if (opt.showCollapseTree === false) {
                        $collapseTree.hide();
                    }

                    if (opt.showSideBarToggle === false) {
                        $sidebarToggle.hide();
                    }

                    if (opt.showRefreshToggle === false) {
                        $refreshToggler.hide();
                    }

                    if (opt.showFullScreenToggle === false) {
                        $fullscreenToggler.hide();
                    }

                    if (opt.showHelpButton === false) {
                        $getHelp.hide();
                    }

                    if (opt.showPrintButton === false) {
                        $print.hide();
                    }
}

    return {
            options: breadCrumbsOptions
         };

})();