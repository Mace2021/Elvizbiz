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

const scriptURL =("https://script.google.com/macros/s/AKfycbwBMHFvG6pfZliVQrajBR-72NCv_0tTeXB1wpc-QAX3gd8KdTZnlAyHEp-rfjf7-4yt/exec");

const form = document.querySelector("#form");
const submitButton = document.querySelector("#submit");
form.addEventListener("submit", (e) => {
  submitButton.disabled = true;
  e.preventDefault();
  let requestBody = new FormData(form);
  fetch(scriptURL, { method: "POST", body: requestBody })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      console.log(data);
      alert("Success!");
      form.reset();
      submitButton.disabled = false;
    })
    .catch((error) => {
      console.error(error);
      alert("Error! " + error.message);
      submitButton.disabled = false;
    });
});
