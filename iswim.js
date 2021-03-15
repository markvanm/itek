/*

https://chrome.google.com/webstore/detail/css-and-javascript-inject/ckddknfdmcemedlmmebildepcmneakaa/related

$("head").append('<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/markvanm/itek/iswim.js"></script>');

*/

$('input[type="text"],textarea').keydown( function(e) {
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

    if(key == 40) {
        e.preventDefault();
        var inputs = $(this).parents('form').find(':input[type="text"]:enabled:visible:not("disabled"),textarea');
				
        $(this).parent('tr').next('tr').find('')
        inputs.eq( inputs.index(this)+ 1 ).focus();
        inputs.eq( inputs.index(this)+ 1 ).click();
    }
});


$(function () {
  $(':text').on('keydown', function (e) {
    var keyCode = e.keyCode || e.which;
     
    if (keyCode == 13 || keyCode == 40 || keyCode == 38 || keyCode == 39 || keyCode == 37) { // on tab go to next input
      // prevent the default action
      e.preventDefault();
      
      // select the next row containing a text input field (skip select!)
      // and get the first element
      
      var currentIndex = $(e.target).closest('tr').find('input').index(e.target);
     
    var nextInput;
    if(keyCode == 40 || keyCode == 13){
    nextInput =  $(e.target).closest('tr').nextAll('tr').filter(function(index, element) {
        return $(element).find(':text').length > 0;
      });
    }else if(keyCode == 38){
    nextInput =  $(e.target).closest('tr').prevAll('tr').filter(function(index, element) {
        return $(element).find(':text').length > 0;
      });
    
    } else if(keyCode == 39){
    nextInput =  $(e.target).closest('tr').filter(function(index, element) {
        return $(element).find(':text').length > 0;
      });
      
      currentIndex++;
    
    }else if(keyCode == 37){
    nextInput =  $(e.target).closest('tr').filter(function(index, element) {
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
        nextInput.eq(currentIndex).focus();
      }
    }
  });

});
