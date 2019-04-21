(function () {
    $(function () {


        var opts = {
            lines: 10, // The number of lines to draw
            length: 7, // The length of each line
            width: 4, // The line thickness
            radius: 10, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            color: '#000', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            //top: 25, // Top position relative to parent in px
            //left: 25 // Left position relative to parent in px
        };


        var target = document.getElementById('spinJs');
        var spinner = new Spinner(opts);

        $(document).on({

            ajaxStart: function () {
                $.blockUI({ message: null });
                spinner.spin(target);
            },
            ajaxStop: function () {
                $.unblockUI();
                spinner.stop(target);
            }
        });


        $("#searchBala").on("click", function (e) {

            var tree = [];
            var codeM = $("#txtCodeMelli").val();

            $.get("/Jenology/GetRelTree", { txtCodeMelli: codeM },
        function (data, textStatus, jqXHR) {
            var nodeCounter = data.tree.length - 1;
            data.tree.reduce(function (r, a) {
                var o = { id: a.CodeMelli, FullName: a.FirstName + ' ' + a.LastName, tags: ['تعداد زیرمجموعه: ' + '<span style="color:purple; ">' + nodeCounter + '</span>'], Semat: a.Semat_Desc, state: { expanded: true }, icon: "glyphicon glyphicon-user", text: ' ' + a.FirstName + ' ' + a.LastName + ' - ' + a.CodeMelli + ' - ' + a.Semat_Desc + ' ' + '<a href="#" class="btn btn-sm btn-primary moreDetailTree">جزئیات</a>', nodes: [] };
                r.push(o);
                nodeCounter--;
                return o.nodes;
            }, tree);

            $('#tree').treeview({ data: tree, showTags: true });
            $('#tree').hide().fadeIn(600);
        },
        "json"
      );

        });
        
        $('body').on('nodeSelected', "#tree", function (event, data) {

            $.get("/Admin/Jenology/GetExtraInfo", { id: data.id },
            function (innerData, textStatus, jqXHR) {

                $("#fullNameTxt").text(data.FullName);
                $("#SematTxt").text(data.Semat);
                $("#CodeMelliTxt").text(data.id);
                $("#LastSuccessOrderTxt").text(innerData.lastOrderDate);
                $("#RegisterDateTxt").text(innerData.registerDate);

                //console.log(data.id);
                //console.log(data.FullName);
                //console.log(data.Semat);
                //console.log(innerData.registerDate);
                //console.log(innerData.lastOrderDate);
                $("#treeDetailModal").modal("show");

            },
            "json"
           );

        });

    });
})();


