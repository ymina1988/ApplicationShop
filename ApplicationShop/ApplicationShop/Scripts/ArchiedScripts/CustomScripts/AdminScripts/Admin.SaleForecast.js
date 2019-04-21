Chart.defaults.global.hover.mode = 'single';
var randomScalingFactor = function() {
	return Math.round(Math.random() * 100);
};
var randomColorFactor = function() {
	return Math.round(Math.random() * 255);
};
var randomColor = function(opacity) {
	return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
};
//---------- Start Config Chart ------------- 
var config = {
	type: 'line',
	data: {
		labels: ['0'],
		datasets: [{label: "میزان فروش",data: [0]}]
	},
	options: {
		responsive: true,
		title:{
			text:'میزان فروش'
		},
		tooltips: {
			mode: 'label'
		}
	},
	hover: {
		mode: 'dataset'
	},
	scales: {
		xAxes: [{
			display: true,
			scaleLabel: {
				show: true,
				labelString: 'Month'
			}
		}],
		yAxes: [{
			display: true,
			scaleLabel: {
				show: true,
				labelString: 'Value'
			},
			ticks: {
				suggestedMin: -10,
				suggestedMax: 250,
			}
		}]
	}
};

$.each(config.data.datasets, function(i, dataset) {
	dataset.borderColor = randomColor(0.4);
	dataset.backgroundColor = randomColor(0.5);
	dataset.pointBorderColor = randomColor(0.7);
	dataset.pointBackgroundColor = randomColor(0.5);
	dataset.pointBorderWidth = 1;
});

window.onload = function() {
	var ctx = document.getElementById("canvas").getContext("2d");
	window.myLine = new Chart.Line(ctx, config);
};
//------------- End Config Chart -----------------
$(document).ready(function () {
	//---------- Show Detail Sale ---------------
	$( "#btnShowDetail" ).click(function() {
		var _label = [] ;
		var _data = [];
		if(chart){


			$.each(chart ,function(index,value){
				_label.push(value.year);
				_data.push(value.value);
			});
		}
		else
		{
			_label.push(0);
			_data.push(0);
		}
		config.data = {
			labels: _label,
			datasets: [{
				label: "میزان فروش",
				data: _data
			}]
		};
		$.each(config.data.datasets, function(i, dataset) {
			dataset.borderColor = randomColor(0.4);
			dataset.backgroundColor = randomColor(0.5);
			dataset.pointBorderColor = randomColor(0.7);
			dataset.pointBackgroundColor = randomColor(0.5);
			dataset.pointBorderWidth = 1;
		});
		// Update the chart
		window.myLine.update();
	});
	//---------- Start Config Table ---------------
	$('#tblForecast').DataTable({
		"bSort": false,
		"bFilter": false,
		"bLengthChange": false
	});
	//----------- Search Kala For Show Sale -------------
	$('#btnSearch').click(function () {
		var Kala = $('#KalaName').val();
		var FromDate = $('#FromDate').val();
		var ToDate = $('#ToDate').val();
		$('span[data-valmsg-for="KalaName"]').empty();
		$('span[data-valmsg-for="FromDate"]').empty();
		$('span[data-valmsg-for="ToDate"]').empty();
		$('#CountFactor').empty();
		$('#CountSefaresh').empty();
		var tblForecast = $('#tblForecast').DataTable();
		var row = tblForecast.clear().draw();
		chart =[];
		if($('#frmSearch').valid())
		{
			$.ajax({
				url: '/Admin/SaleForecast/GetAllVahedeAndazegiri',
				method: "GET",
				dataType: "html",
				data:{Idkala :Kala}
				,success:function(info)
				{
					$('#UnitName').empty();
					$('#UnitName').append(info);
					$('#UnitName').trigger('chosen:updated');
					$.ajax({
						url:'/Admin/SaleForecast/CountFactorAndSefaresh',
						method: "POST",
						dataType: "json",
						data:{Idkala :Kala , FromDate:FromDate,ToDate:ToDate}
						,success:function(data)
						{
							$('#CountFactor').text(data.CountFactor);
							$('#CountSefaresh').text(data.CountSefaresh);
							var ForecastHistory =data.ForecastHistory;
							var _count = ForecastHistory.length;
							for (var i = 0; i < _count; i++) {

								tblForecast.row.add( [
										data.ForecastHistory[i].AzTarikh,
										data.ForecastHistory[i].TaTarikh,
										 data.ForecastHistory[i].NameVahedAndazegiri,
									   data.ForecastHistory[i].Tedad
								] ).draw( false );
							}

							$.each(data.Chart ,function(index,value){
								chart.push(
											{
												year: value.Day,
												value: value.Count
											}
									);
							});

						}
					})
				}
			})
		}
	});
	//----------------- Save Data SaleForecast -----------------
	$("#btnForecastSave").click(function(){
		var FromDate = $('#FromDateNew').val();
		var ToDate = $('#ToDateNew').val();
		var CountForecast = $('#CountForecast').val();
		var UnitName = $('#UnitName').val();
		var Kala = $('#KalaName').val();
		//--------------------------------------------
		$('span[data-valmsg-for="KalaName"]').empty();
		$('span[data-valmsg-for="FromDateNew"]').empty();
		$('span[data-valmsg-for="ToDateNew"]').empty();
		$('span[data-valmsg-for="CountForecast"]').empty();
		$('span[data-valmsg-for="UnitName"]').empty();
		$('#alert_success').css('display','none');
		$('#alert_danger').css('display','none');
		$('#alert_success span').text('');
		$('#alert_danger span').text('');
		//--------------------------------------------

		if($('#frmForecast').valid())
		{
			var array = [];
			var model ={
				IdKala : Kala, FromDateNew: FromDate,ToDateNew :ToDate,CountForecast :CountForecast,UnitName:UnitName
			}
			array.push(model);
			$.ajax({
				url:'/Admin/SaleForecast/InsertPishbiniForush',
				method: "GET",
				dataType: "json",
				data:array[0]
				,success:function(data)
				{
					if(data)
					{
						if(data.IsSave)
						{
							$('#alert_success span').text(data.Message);
							$('#alert_success').css('display','block');
						}
						else
						{ $('#alert_danger span').text(data.Message);
							$('#alert_danger').css('display','block');
						}
					}
					else
					{
						//$('#alert_danger span').text('@DAL.App_GlobalResources.SaleResource.ErrorUnknown');
						$('#alert_danger').css('display','block');
					}
				}
			})
		}
	});
});
