document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     EMAILJS SETTINGS
  ========================= */

  const PUBLIC_KEY = "tisfWARykoKp6CDyf";
  const SERVICE_ID = "service_i7vdsrr";

  const ADMIN_TEMPLATE = "template_itx7vmu";
  const CUSTOMER_TEMPLATE = "template_apr6ncq";


  /* =========================
     INITIALIZE EMAILJS
  ========================= */

  if (typeof emailjs === "undefined") {

    console.error("EMAILJS LIBRARY NOT FOUND");

  } else {

    emailjs.init({
      publicKey: PUBLIC_KEY
    });

    console.log("EMAILJS INITIALIZED");

  }


  /* =========================
     MOBILE MENU
  ========================= */

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuButton && nav) {

    menuButton.addEventListener("click", function () {
      nav.classList.toggle("open");
    });

  }


  /* =========================
     YEAR
  ========================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =========================
     QUOTATION ELEMENTS
  ========================= */

  const modal = document.getElementById("quoteModal");
  const form = document.getElementById("quoteForm");

  const selectedPackage =
    document.getElementById("selectedPackage");

  const status =
    document.getElementById("formStatus");


  if (!modal || !form) {

    console.error("QUOTE FORM NOT FOUND");

    return;

  }


  /* =========================
     PACKAGE BUTTONS
  ========================= */

  document.querySelectorAll(".package-card").forEach(function (button) {

    button.addEventListener("click", function () {

      const service = button.dataset.service || "";
      const packageName = button.dataset.package || "";
      const price = button.dataset.price || "";
      const conditions = button.dataset.conditions || "";


      document.getElementById("quoteService").value =
        service;

      document.getElementById("quotePackage").value =
        packageName;

      document.getElementById("quotePrice").value =
        price;

      document.getElementById("quoteConditions").value =
        conditions;


      selectedPackage.innerHTML =

        "<strong>" +
        service +
        "</strong>" +

        "<div>" +
        packageName +
        " · ₹" +
        price +
        "</div>" +

        "<small>" +
        conditions +
        "</small>";


      status.textContent = "";

      modal.classList.add("open");

      modal.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.style.overflow = "hidden";

    });

  });


  /* =========================
     CLOSE MODAL
  ========================= */

  document.querySelectorAll("[data-close-quote]")
    .forEach(function (button) {

      button.addEventListener("click", function () {

        modal.classList.remove("open");

        modal.setAttribute(
          "aria-hidden",
          "true"
        );

        document.body.style.overflow = "";

      });

    });


  /* =========================
     FORM SUBMIT
  ========================= */

  form.addEventListener("submit", function (event) {

    event.preventDefault();


    if (typeof emailjs === "undefined") {

      status.textContent =
        "EmailJS is not loaded. Please refresh the page.";

      status.className =
        "form-status error";

      return;

    }


    const button =
      form.querySelector(
        'button[type="submit"]'
      );


    button.disabled = true;
    button.textContent = "SENDING...";

    status.textContent =
      "Sending request...";

    status.className =
      "form-status";


    /* =========================
       COLLECT FORM DATA
    ========================= */

    const formData =
      new FormData(form);

    const params = {};


    formData.forEach(function (value, key) {

      params[key] = value;

    });


    params.quote_id =
      "AOG-" +
      Date.now();


    console.log(
      "ATELIER OG FORM DATA:",
      params
    );


    /* =========================
       STEP 1
       SEND TO ATELIER OG
    ========================= */

    console.log(
      "STEP 1: Sending admin email..."
    );


    emailjs.send(
      SERVICE_ID,
      ADMIN_TEMPLATE,
      params

    ).then(function (response) {

      console.log(
        "STEP 1 SUCCESS:",
        response
      );


      status.textContent =
        "Request received. Sending your quotation...";


      /* =========================
         STEP 2
         SEND TO CUSTOMER
      ========================= */

      console.log(
        "STEP 2: Sending customer email..."
      );


      return emailjs.send(
        SERVICE_ID,
        CUSTOMER_TEMPLATE,
        params
      );


    }).then(function (response) {

      console.log(
        "STEP 2 SUCCESS:",
        response
      );


      status.textContent =
        "SUCCESS! Check your email for the quotation.";

      status.className =
        "form-status success";


      button.disabled = false;

      button.textContent =
        "SEND QUOTATION REQUEST →";


    }).catch(function (error) {

      console.error(
        "================================"
      );

      console.error(
        "EMAILJS ERROR"
      );

      console.error(
        error
      );

      console.error(
        "STATUS:",
        error.status
      );

      console.error(
        "TEXT:",
        error.text
      );

      console.error(
        "================================"
      );


      status.textContent =
        "Email error: " +
        (error.text || "Please check EmailJS settings.");

      status.className =
        "form-status error";


      button.disabled = false;

      button.textContent =
        "SEND QUOTATION REQUEST →";

    });

  });

});
