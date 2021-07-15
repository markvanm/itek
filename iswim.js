/*
https://chrome.google.com/webstore/detail/injector/bfdonckegflhbiamlmidciapolfccmmb/related
$("head").append('<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/markvanm/itek/iswim.js"></script>');
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


});
