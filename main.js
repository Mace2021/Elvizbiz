(function ($) {
  // DOM ready
  $(function () {
    // If a link has a dropdown, add sub menu toggle.
    $("nav ul li a:not(:only-child)").click(function (e) {
      $(this).siblings(".nav-dropdown").toggle();
      // Close one dropdown when selecting another
      $(".nav-dropdown").not($(this).siblings()).hide();
      e.stopPropagation();
    });
    // Clicking away from dropdown will remove the dropdown class
    $("html").click(function () {
      $(".nav-dropdown").hide();
    });
    // Toggle open and close nav styles on click
    $("#nav-toggle").click(function () {
      $("nav ul").slideToggle();
    });
    // Hamburger to X toggle
    $("#nav-toggle").click(function () {
      this.classList.toggle("active");
    });
  });
})(jQuery);

const form = document.querySelector("#form");
const btn = document.querySelector("#submit");
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwRsVIqpfHc-xPT_rwdzyAgDGJfzt2cd1izsa4U_BwUey0-P3T8X3ZHYVkAGzZkIWBv/exec";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  btn.disabled = true;
  btn.innerHTML = "Loading...";

  console.log(form);
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      btn.disabled = false;
      btn.innerHTML = "Submit";
      alert("Success!", response);
    })
    .catch((error) => {
      btn.disabled = false;
      btn.innerHTML = "Submit";
      alert("Error!", error.message);
    });
});
