(function () {

    $(function () {

        //$.get('/UserAllocationRole/UserLookup', function (data) {
        //    $("#UserName").typeahead({ source: data });
        //}, 'json');

        //$('#UserName').typeahead({
        //    minLength: 1,
        //    showHintOnFocus: true,
        //    autoSelect: true,
        //    afterSelect: function (val) { this.$element.val(""); },
        //    source: function (query) {
        //        return $.get('/UserAllocationRole/UserLookup');
        //    }
        //});

        $('#UserName').typeahead({
            local: ['alpha', 'allpha2', 'alpha3', 'bravo', 'charlie', 'delta', 'epsilon', 'gamma', 'zulu']
        });

    });

})();