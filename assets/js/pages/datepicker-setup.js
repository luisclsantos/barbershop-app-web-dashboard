// minimum setup
(function () {
  const d_week = new Datepicker(document.querySelector("#pc-datepicker-1"), {
    buttonClass: "btn",
  });
})();
(function () {
  const d_week = new Datepicker(
    document.querySelector("#pc-datepicker-1_modal"),
    {
      buttonClass: "btn",
    }
  );
})();

// range picker
(function () {
  const datepicker_range = new DateRangePicker(
    document.querySelector("#pc-datepicker-5"),
    {
      buttonClass: "btn",
    }
  );
})();
