(function() {
    $(function() {
        "use strict";


        $("#ExtractPursantButton").on("click", function (e) {
            //e.preventDefault();

            $.blockUI({
                message:
                    '<div class="progress" style="width:500px; height:50px; margin:0;padding:0;"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="50" style="width:100%; padding-top:15px;"><strong style="font-size:large;">در حال استخراج اطلاعات، لطفا صبور باشید.</strong></div></div>',
                css: {
                    border: 'none',
                    width: '500px',
                    padding: '0',
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .5,
                    color: '#fff'
                }
            });

        });

        window.onblur = function() { $.unblockUI(); };

    });
})();