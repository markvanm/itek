/*
https://chrome.google.com/webstore/detail/injector/bfdonckegflhbiamlmidciapolfccmmb/related
$("head").append('<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/markvanm/itek/iswim.js?' + Math.random().toString() + '"></script>');
*/

$(function() {
  
  $('head').append('<style type="text/css">.tabBox .tabs .selected a{ background: #fff !important;color: #000;}</style>'); //changing style (now only tabs)  
  
  var keyCodes = [
    13, 40, // Arrow down, enter
    38, // Arrow up
    39, // Arrow right
    37 // Arrow left
  ];
  $(':text').on('keydown', function(e) {

    if ($(e.target).parent('div').hasClass('selector200')) {
      return true;
    }
    var keyCode = e.keyCode || e.which;

    if (keyCodes.includes(keyCode)) { // on tab go to next input
      // prevent the default action
      e.preventDefault();

      // select the next row containing a text input field (skip select!)
      // and get the first element

      var currentIndex = $(e.target).closest('tr').find('input').index(e.target);

      var nextInput;
      if (keyCode == 40 || keyCode == 13) {
        nextInput = $(e.target).closest('tr').nextAll('tr').filter(function(index, element) {
          return $(element).find(':text').length > 0;
        });
      } else if (keyCode == 38) {
        nextInput = $(e.target).closest('tr').prevAll('tr').filter(function(index, element) {
          return $(element).find(':text').length > 0;
        });

      } else if (keyCode == 39) {
        nextInput = $(e.target).closest('tr').filter(function(index, element) {
          return $(element).find(':text').length > 0;
        });

        currentIndex++;

      } else if (keyCode == 37) {
        nextInput = $(e.target).closest('tr').filter(function(index, element) {
          return $(element).find(':text').length > 0;
        });

        currentIndex--;

      }
      nextInput = nextInput.first().find(':text');
      //console.log(nextInput.closest('tr').index());
      // if next input exists go there, else go to the first one
      console.log(nextInput);
      if (nextInput.length == 0) {
        return false;
      } else {
        nextInput.eq(currentIndex).focus().select();
      }
    }
  });

  var arrivalTable, departureTable;

  if ($('input[name="currentReport.tanks[0].entity.arrivalTank.gauge"]').length) {
    arrivalTable = $('input[name="currentReport.tanks[0].entity.arrivalTank.gauge"]').closest('table');
    departureTable = $('input[name="currentReport.tanks[0].entity.departureTank.gauge"]').closest('table');

  } else if ($('input[name="currentReport.tanks[0].entity.arrivalTank.tovMeasurement.tankGauge"]').length) {
    arrivalTable = $('input[name="currentReport.tanks[0].entity.arrivalTank.tovMeasurement.tankGauge"]').closest('table');
    departureTable = $('input[name="currentReport.tanks[0].entity.departureTank.tovMeasurement.tankGauge"]').closest('table');

  }

  function copyToDepartureOrArrival(where = 'arrival') {
    //slob report


    var inputs = {};

    var theTable = departureTable;
    var replaceFrom = 'departure';
    var replaceTo = 'arrival';
    if (where == "departure") {
      theTable = arrivalTable;
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
      $(selectName).val(val);
    });



  }

  if (arrivalTable) {

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
  }

  
  
  
  function fillROB(){
  for (let i = 0; i < 100; i++) {
    $('input[name="currentReport.tanks['+i+'].entity.gaugeTrimCorrected"]').val('Nil');
    $('input[name="currentReport.tanks['+i+'].entity.tov"]').val('0');
    $('input[name="currentReport.tanks['+i+'].entity.freeWaterGauge"]').val('Nil');
    $('input[name="currentReport.tanks['+i+'].entity.freeWaterVolume"]').val('0');
    $('input[name="currentReport.tanks['+i+'].entity.temperature"]').val('15');
    $('input[name="currentReport.tanks['+i+'].entity.methods.waterMethodOfgauge"]').val('Innage');

     $("#liquidNonLiquidWedgeId"+i+" option[value='N/A']").attr('selected','selected').trigger('change');
    
     $("#gaugeTrimUncorrectedId"+i+" option[value='INNAGE TRIM CORRECTED']").attr('selected','selected').trigger('change');
  }
  
  if($('#currentReport\\.report\\.detail\\.locationOfGauge').val() == '2 INCH GAUGE HATCH'){
  	alert('Please select Location of Gauge!!!');
  }
}

//currentReport.tanks0.entity.gaugeTrimCorrected
var tableROB = $('input[name="currentReport.tanks[0].entity.gaugeTrimCorrected"]').closest('table');
   
 if(tableROB.length>0){ 
 
 var button = $('<div class="button" id="uniform-undefined"><span>Click for if tanks are empty<input name="btnSelectFormGroup" tabindex="200" class="btnAddforms" type="button" value="Sort Tanks" style="opacity: 0;"></span></div>');

    button.click(function() {
      fillROB();
    });
    
     $('#tanksDiv .group_600').append(button);
 
 
}
  
  if ($('#currentReport\\.report\\.detail\\.certifiedThermometer\\.type').length > 0) {

  function createCookie(name, value, days) {
    var expires;

    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
  }

  function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ')
        c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0)
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }

  function eraseCookie(name) {
    createCookie(name, "", -1);
  }

  var inputArrayCalibration = [
    "currentReport.report.detail.certifiedThermometer.type",
    "currentReport.report.detail.certifiedThermometer.model",
    "currentReport.report.detail.certifiedThermometer.serial",
    "currentReport.certifiedThermometerReading",
    "currentReport.report.detail.intertekProbe.type",
    "currentReport.report.detail.intertekProbe.model",
    "currentReport.intertekProbeReading",
    "currentReport.report.detail.intertekTape.type",
    "currentReport.report.detail.intertekTape.model",
    "currentReport.report.detail.intertekThermometer.type",
    "currentReport.report.detail.intertekThermometer.model",
    "currentReport.report.detail.intertekThermometer.serial",
    "currentReport.levelReadingIntertekTape",
    "currentReport.levelReadingVesselProbe",
    "currentReport.vesselsProbeReading",
    "currentReport.report.detail.intertekProbe.serial",
    "currentReport.intertekThermometerReading",


    "datepicker_certifiedThermometer_intertekTape",
    "datepicker_vesselsProbe_intertekTape",

    "datepicker_intertekTape_intertekTape1",
    "datepicker_intertekThermometer_intertekTape1"

  ];



  function saveEq() {
    var hasEmpty = false;
    inputArrayCalibration.forEach((key) => {
      var keyFormatted = key.replace(/\./g, '\\.');
      if ($('#' + keyFormatted).val() == "") {
        hasEmpty = true;
      }
    });

    if (hasEmpty) {
      var r = confirm("It has empty fields, are you sure you want to save?");
      if (r == true) {
        //gewoon doorgaan
      } else {
        return;
      }
    }

    inputArrayCalibration.forEach((key) => {
      var keyFormatted = key.replace(/\./g, '\\.');
      createCookie(key, $('#' + keyFormatted).val(), 300);
    });
    var today = new Date();

    var todayWritten = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + " " + today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

    createCookie("EqSaveDate", todayWritten, 300);

    $('#lastSavedEq').html("Last saved: " + todayWritten);
  }

  function loadEq() {

    inputArrayCalibration.forEach((key) => {
      var keyFormatted = key.replace(/\./g, '\\.');
      var val = readCookie(key);

      if ([
          "datepicker_certifiedThermometer_intertekTape",
          "datepicker_vesselsProbe_intertekTape",
          "datepicker_intertekTape_intertekTape1",
          "datepicker_intertekThermometer_intertekTape1"
        ].includes(key)) {
        var yesterday = new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24);

        var dateYesterday = yesterday.getDate() + "/" + (yesterday.getMonth() + 1) + "/" + yesterday.getFullYear();
        val = dateYesterday;
      }



      $('#' + keyFormatted).val(val).change().blur();

    });


    $('#tempSel option[value="Degree Celsius"]').attr('selected', 'selected').trigger('change');
    $('#heightSel option[value="meters"]').attr('selected', 'selected').trigger('change');
    $('#interfaceCheck').attr('checked', true).trigger('change').trigger('click');


  }

  var button = $('<div class="button" id="uniform-undefined"><span>SAVE (with current values)<input name="btnSelectFormGroup" tabindex="200" class="btnAddforms" type="button" value="SAVE" style="opacity: 0;"></span></div>');

  button.click(function() {
    saveEq();
  });

  $('.group_800').append(button);

  button = $('<div class="button" id="uniform-undefined"><span>LOAD (last saved values)<input name="btnSelectFormGroup" tabindex="200" class="btnAddforms" type="button" value="LOAD" style="opacity: 0;"></span></div>');



  button.click(function() {
    loadEq();
  });

  var lastSaved = readCookie("EqSaveDate");
  if (lastSaved != undefined) {
    $('.group_800').append(button);
    $('.group_800').append("<p id='lastSavedEq'>Last saved: " + lastSaved + "</p>");
  }

}

  
  

});
