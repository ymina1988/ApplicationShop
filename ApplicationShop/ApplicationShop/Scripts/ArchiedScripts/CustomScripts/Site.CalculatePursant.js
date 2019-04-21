(function() {
    $(function() {
        "use strict";


        $("#CalculatePursantButton").on("click", function(e) {
            //e.preventDefault();

            $(document).on("submit", function() {

                var htmlString;

                $.ajax({
                    type: "GET",
                    url: "/Poursant/EstimateCalculatePursant",
                    dataType: "json",
                    async:false,
                    success: function (response) {

                        htmlString = '<div class="progress" style="width:500px; height:60px; margin:0;padding:0;"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="50" style="width:100%"><strong style="font-size:large;">در حال محاسبه، لطفا صبور باشید. محاسبه ممکن است ' + response.Min + ' تا ' + response.Max + ' دقیقه به طول بینجامد.</strong></div></div>';

                    }
                });


                $.blockUI({
                    message: htmlString,
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
            
        });

    });
})();