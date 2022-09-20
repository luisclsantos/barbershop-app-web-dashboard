(function () {
  var switch_event = document.querySelector("#switch_event");

  switch_event.addEventListener("change", function () {
    if (switch_event.checked) {
      document.querySelector("#console_event").innerHTML =
        "Switch Button Checked";
    } else {
      document.querySelector("#console_event").innerHTML =
        "Switch Button Unchecked";
    }
  });
})();
