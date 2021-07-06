function copyToDepartureOrArrival(where = 'arrival') {
  //slob report

  var arrivalTable = $('#currentReport\\.tanks0\\.entity\\.arrivalTank\\.tankNumber').closest('table');
  var departureTable = $('#currentReport\\.tanks0\\.entity\\.departureTank\\.tankNumber').closest('table');

  var inputs = {};
	
  var theTable = arrivalTable;
  var replaceFrom = 'departure';
  var replaceTo = 'arrival';
  if (where == "departure") {
  	theTable = departureTable;
    replaceFrom = 'arrival';
    replaceTo = 'departure';    
  }


  theTable.find('input[type=text]').each(function() {

    var keyValue = $(this).attr('name');
    keyValue = keyValue.replace(replaceFrom, replaceTo);
    inputs[keyValue] = $(this).val();
  });

  $.each(inputs, function(key, val) {
    var selectName = 'input[name="' + key + '"]';
    console.log(selectName);
    console.log(val);
    $(selectName).val(val);
  });



}

var button = $('<div class="button" id="uniform-undefined"><span>Kopieer naar departure ><input name="btnSelectFormGroup" tabindex="200" class="btnAddforms" type="button" value="Sort Tanks" style="opacity: 0;"></span></div>');

button.click(function() {
  copyToDepartureOrArrival('departure');
});

$('#tankDIV0').append(button);

var button = $('<div class="button" id="uniform-undefined"><span>Kopieer naar arrival \<<input name="btnSelectFormGroup" tabindex="200" class="btnAddforms" type="button" value="Sort Tanks" style="opacity: 0;"></span></div>');

button.click(function() {
  copyToDepartureOrArrival();
});

$('#tankDIV1').append(button);
