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
