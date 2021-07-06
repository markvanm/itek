
/*
currentReport.tanks[0].entity.arrivalTank.tovMeasurement.tankGauge
currentReport.tanks[0].entity.departureTank.tovMeasurement.tankGauge
*/

//slob report

var arrivalTable = $('#currentReport\\.tanks0\\.entity\\.arrivalTank\\.tankNumber').closest('table');
var departureTable = $('#currentReport\\.tanks0\\.entity\\.departureTank\\.tankNumber').closest('table');

var inputs = {};

var replaceFrom = 'arrival';
var replaceTo = 'departure';

arrivalTable.find('input[type=text]').each(function(keyValue, ){

		var keyValue = $(this).attr('name');
     //console.log(keyValue);
    keyValue = keyValue.replace(replaceFrom, replaceTo);
		//keyValue = keyValue.replaceAll(".", "\\.");
    inputs[keyValue] = $(this).val();
     // console.log(keyValue);
});
//alert(inputs);
//console.log(inputs);

//currentReport\\.tanks0.entity.departureTank.tovMeasurement.correctedGauge
//currentReport.tanks0.entity.departureTank.tovMeasurement.tankGauge

$.each(inputs, function (key, val) {
var selectName = 'input[name="'+key+'"]';
 console.log(selectName);
 console.log(val);
    $(selectName).val(val);
});



