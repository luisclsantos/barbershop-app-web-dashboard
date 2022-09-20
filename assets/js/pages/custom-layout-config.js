feather.replace();
var pctoggle = document.querySelector("#pct-toggler");
if (pctoggle) {
  pctoggle.addEventListener("click", function () {
    if (
      !document.querySelector(".pct-customizer").classList.contains("active")
    ) {
      document.querySelector(".pct-customizer").classList.add("active");
    } else {
      document.querySelector(".pct-customizer").classList.remove("active");
    }
  });
}

/*var custsidebrand = document.querySelector("#cust-sidebrand");
custsidebrand.addEventListener("click", function () {
  if (custsidebrand.checked) {
    document.querySelector(".m-header").classList.add("bg-dark");
    document
      .querySelector(".theme-color.brand-color")
      .classList.remove("d-none");
  } else {
    removeClassByPrefix(document.querySelector(".m-header"), "bg-");
    // document.querySelector(".m-header > .b-brand > .logo-lg").setAttribute('src', '../assets/images/logo-dark.svg');
    document.querySelector(".theme-color.brand-color").classList.add("d-none");
  }
});*/

var brandcolor = document.querySelectorAll(".brand-color > a");
for (var t = 0; t < brandcolor.length; t++) {
  var c = brandcolor[t];
  c.addEventListener("click", function (event) {
    var targetElement = event.target;
    if (targetElement.tagName == "SPAN") {
      targetElement = targetElement.parentNode;
    }
    var temp = targetElement.getAttribute("data-value");
    if (temp == "bg-default") {
      removeClassByPrefix(document.querySelector(".m-header"), "bg-");
    } else {
      removeClassByPrefix(document.querySelector(".m-header"), "bg-");
      document
        .querySelector(".m-header > .b-brand > .logo-lg")
        .setAttribute(
          "src",
          "https://dashboardkit.io/bootstrap/assets/images/logo.svg"
        );
      document.querySelector(".m-header").classList.add(temp);
    }
  });
}

var headercolor = document.querySelectorAll(".header-color > a");
for (var h = 0; h < headercolor.length; h++) {
  var c = headercolor[h];

  c.addEventListener("click", function (event) {
    var targetElement = event.target;
    if (targetElement.tagName == "SPAN") {
      targetElement = targetElement.parentNode;
    }
    var temp = targetElement.getAttribute("data-value");
    if (temp == "bg-default") {
      removeClassByPrefix(
        document.querySelector(".pc-header:not(.pc-mob-header)"),
        "bg-"
      );
    } else {
      removeClassByPrefix(
        document.querySelector(".pc-header:not(.pc-mob-header)"),
        "bg-"
      );
      document
        .querySelector(".pc-header:not(.pc-mob-header)")
        .classList.add(temp);
    }
  });
}

/*var custside = document.querySelector("#cust-sidebar");
custside.addEventListener("click", function () {
  if (custside.checked) {
    document.querySelector(".pc-sidebar").classList.add("light-sidebar");
    // document.querySelector(".pc-horizontal .topbar").classList.add("light-sidebar");
  } else {
    document.querySelector(".pc-sidebar").classList.remove("light-sidebar");
    // document.querySelector(".pc-horizontal .topbar").classList.remove("light-sidebar");
  }
});*/

/*var custdarklayout = document.querySelector("#cust-darklayout");
custdarklayout.addEventListener("click", function () {
  if (custdarklayout.checked) {
    document
      .querySelector("#main-style-link")
      .setAttribute("href", "../assets/css/style-dark.css");
  } else {
    document
      .querySelector("#main-style-link")
      .setAttribute("href", "../assets/css/style.css");
  }
});
function removeClassByPrefix(node, prefix) {
  for (let i = 0; i < node.classList.length; i++) {
    let value = node.classList[i];
    if (value.startsWith(prefix)) {
      node.classList.remove(value);
    }
  }
}*/
