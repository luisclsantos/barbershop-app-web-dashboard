/*var table = document.querySelector("#pc-dt-methods");
var div = document.getElementById("data");
var btn = document.getElementsByTagName("button")[0];
var checkboxes = document.getElementById("columns");
var inputs = [],
  visible = [],
  hidden = [];

var datatable = new simpleDatatables.DataTable(table, {
  perPage: 5,
});

datatable.on("datatable.init", function () {
  setCheckboxes();
});

function updateColumns() {
  try {
    datatable.columns().show(visible);
    datatable.columns().hide(hidden);
  } catch (e) {
    console.log(e);
  }
}

function setCheckboxes() {
  inputs = [];
  visible = [];
  checkboxes.innerHTML = "";

  util.each(datatable.headings, function (i, heading) {
    var checkbox = util.createElement("div", {
      class: "form-check",
    });
    var input = util.createElement("input", {
      type: "checkbox",
      id: "checkbox-" + i,
      name: "checkbox",
      class: "form-check-input",
    });
    var label = util.createElement("label", {
      for: "checkbox-" + i,
      text: heading.textContent,
      class: "form-check-label",
    });

    input.idx = i;

    if (datatable.columns().visible(heading.cellIndex)) {
      input.checked = true;
      visible.push(i);
    } else {
      if (hidden.indexOf(i) < 0) {
        hidden.push(i);
      }
    }

    checkbox.appendChild(input);
    checkbox.appendChild(label);

    checkboxes.appendChild(checkbox);

    inputs.push(input);
  });

  util.each(inputs, function (i, input) {
    input.onchange = function (e) {
      if (input.checked) {
        hidden.splice(hidden.indexOf(input.idx), 1);
        visible.push(input.idx);
      } else {
        visible.splice(visible.indexOf(input.idx), 1);
        hidden.push(input.idx);
      }

      updateColumns();
    };
  });
}

document.querySelectorAll(".export").forEach(function (el) {
  el.addEventListener("click", function (e) {
    var type = el.dataset.type;

    var data = {
      type: type,
      filename: "my-" + type,
    };

    if (type === "csv") {
      data.columnDelimiter = "|";
    }

    datatable.export(data);
  });
});

document.querySelectorAll(".main").forEach(function (el) {
  el.addEventListener("click", (e) => {
    datatable[el.id]();
    setTimeout(function () {
      document
        .getElementById("hide")
        .classList.toggle("hidden", !datatable.initialized);
      table.classList.toggle("table", !datatable.initialized);
    }, 10);
  });
});*/
