(function () {


    $(document).ready(function () {

        //$("#PieChartButton").on("click", function () {

            var fromdate = $("#fromDate").val();
            var todate = $("#toDate").val();

            $.ajax({
                type: "POST",
                url: "/Statistic/OrderStatisticByProvinceGetData",
                data: { fromDate: fromdate, toDate: todate },
                dataType: "json",
                success: function (response) {

                    function gd(year, month, day) {
                        return new Date(year, month, day).getTime();
                    }

                    function getRandomColor() {
                        var letters = '0123456789ABCDEF'.split('');
                        var color = '#';
                        for (var i = 0; i < 6; i++) {
                            color += letters[Math.floor(Math.random() * 16)];
                        }
                        return color;
                    }

                    var previousPoint = null, previousLabel = null;

                    var dataset = [];

                    for (var i = 0; i < response.data.length; i++) {

                        dataset.push({ label: "انبار " + response.data[i].Name, data: response.data[i].SumMablagh, color: getRandomColor() });

                    }

                    console.log(dataset);

                    var options = {
                        series: {
                            pie: {
                                show: true,
                                label: {
                                    show: true,
                                    radius: 330
                                }
                            }
                        },
                        legend: {
                            show: true
                        },
                        grid: {
                            hoverable: true
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: function (label, xval, yval) {
                                var content = "%s : %p.0%</br>" + "میزان فروش: " + Number(yval).toLocaleString("en");
                                return content;
                            },
                            shifts: {
                                x: 20,
                                y: 0
                            },
                            defaultTheme: false
                        }
                    };

                    $.plot($("#placeholderPieChart"), dataset, options);

                }
            });


        });


    //});


})();