if($('#currentReport\\.report\\.detail\\.certifiedThermometer\\.type').length>0){

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

  var obj = {
    "certifiedThermometer.type": "currentReport\\.report\\.detail\\.certifiedThermometer\\.type",
    "certifiedThermometer.model": "currentReport\\.report\\.detail\\.certifiedThermometer\\.model"
  };


  function saveEq(){
    $.each( obj, function( key, value ) {
      createCookie(key, $('#'+value).val(), 300);
    });
  }

  function loadEq(){
    $.each( obj, function( key, value ) {
      $('#'+value).val(readCookie(key));
    });
  }
  
  var button = $('<div class="button" id="uniform-undefined"><span>SAVE<input name="btnSelectFormGroup" tabindex="200" class="btnAddforms" type="button" value="SAVE" style="opacity: 0;"></span></div>');

button.click(function() {
  saveEq();
});

$('.group_800').append(button);

button = $('<div class="button" id="uniform-undefined"><span>LOAD<input name="btnSelectFormGroup" tabindex="200" class="btnAddforms" type="button" value="LOAD" style="opacity: 0;"></span></div>');

button.click(function() {
  loadEq();
});

$('.group_800').append(button);
  
  
}


