"use strict";

const collapsibleCardEl = document.querySelector("#collapsible-card");
const showCollapsibleCardEl = collapsibleCardEl?.querySelector(".show");
const formEl = document.querySelector("#form-fill");
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxcc1uOGj8_dIrST5cpch-NYB1OnHKbDUeG1Zwejr17cGla5sODJ0PtQDu3pWkRqYPj5Q/exec";
const chevronUpMarkup = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="32"
  height="32"
  fill="white"
  class="bi bi-chevron-up"
  viewBox="0 0 16 16"
>
  <path
    fill-rule="evenodd"
    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
  />
</svg>`;
const chevronDownMarkup = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="32"
  height="32"
  fill="white"
  class="bi bi-chevron-down"
  viewBox="0 0 16 16"
>
  <path
    fill-rule="evenodd"
    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
  />
</svg>`;

// Navbar
$(document).on("scroll", function () {
  if ($(document).scrollTop() > 100) {
    $("nav").addClass("shrink");
  } else {
    $("nav").removeClass("shrink");
  }
  if ($(document).scrollTop() > 450) {
    $("a.navbar-brand").addClass("shrink-brand");
    $("img.navbar-logo").addClass("shrink-brand");
  } else {
    $("a.navbar-brand").removeClass("shrink-brand");
    $("img.navbar-logo").removeClass("shrink-brand");
  }
});

// Initial Collapsible Card Button Icon State
if (showCollapsibleCardEl) {
  const closestRow = showCollapsibleCardEl.closest(".row");
  const collapsibleCardBtnEl = closestRow.querySelector(".btn");
  collapsibleCardBtnEl.innerHTML = chevronUpMarkup;
}

// Change Collapsible Card Button Icon Handler
collapsibleCardEl?.addEventListener("click", function (e) {
  const selectedEl = e.target.closest(".card");

  if (!selectedEl) {
    return;
  }

  const allButtonsEl = this.querySelectorAll(".btn");
  allButtonsEl.forEach((btn) => {
    btn.innerHTML = chevronDownMarkup;
  });

  if (selectedEl.classList.contains("collapsed")) {
    return;
  }

  const selectedElBtn = selectedEl.querySelector(".btn");

  selectedElBtn.innerHTML = chevronUpMarkup;
});

// Form Submit Handler
formEl?.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(formEl);

  Swal.fire({
    didOpen: () => {
      Swal.showLoading();
    },
    customClass: {
      loader: "spinner",
    },
  });

  fetch(scriptURL, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      Swal.fire({
        icon: "success",
        title: "Your message has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      for (const inputE1 of formEl) {
        inputE1.value = "";
      }
    })
    .catch((error) => console.error("Error!", error.message));
});
