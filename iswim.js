/*

https://chrome.google.com/webstore/detail/css-and-javascript-inject/ckddknfdmcemedlmmebildepcmneakaa/related

$("head").append('<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/markvanm/itek/iswim.js"></script>');

*/

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


"use strict";
(() => {
const modified_inputs = new Set;
const defaultValue = "defaultValue";
// store default values
addEventListener("beforeinput", (evt) => {
    const target = evt.target;
    if (!(defaultValue in target || defaultValue in target.dataset)) {
        target.dataset[defaultValue] = ("" + (target.value || target.textContent)).trim();
    }
});
// detect input modifications
addEventListener("input", (evt) => {
    const target = evt.target;
    let original;
    if (defaultValue in target) {
        original = target[defaultValue];
    } else {
        original = target.dataset[defaultValue];
    }
    if (original !== ("" + (target.value || target.textContent)).trim()) {
        if (!modified_inputs.has(target)) {
            modified_inputs.add(target);
        }
    } else if (modified_inputs.has(target)) {
        modified_inputs.delete(target);
    }
});
// clear modified inputs upon form submission
addEventListener("submit", (evt) => {
    modified_inputs.clear();
    // to prevent the warning from happening, it is advisable
    // that you clear your form controls back to their default
    // state with evt.target.reset() or form.reset() after submission
});
// warn before closing if any inputs are modified
addEventListener("beforeunload", (evt) => {
    if (modified_inputs.size) {
        const unsaved_changes_warning = "Changes you made may not be saved.";
        evt.returnValue = unsaved_changes_warning;
        return unsaved_changes_warning;
    }
});
})();
