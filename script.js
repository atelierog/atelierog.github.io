document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     MOBILE MENU
  ========================= */

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
      });
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
     EMAILJS SETUP
  ========================= */

  const PUBLIC_KEY = "tisfWARykoKp6CDyf";
  const SERVICE_ID = "service_i7vdsrr";

  const ADMIN_TEMPLATE = "template_itx7vmu";
  const CUSTOMER_TEMPLATE = "template_apr6ncq";


  if (typeof emailjs !== "undefined") {

    emailjs.init({
      publicKey: PUBLIC_KEY
    });

    console.log("Atelier OG: EmailJS initialized.");

  } else {

    console.error("Atelier OG: EmailJS library not loaded.");

  }


  /* =========================
     QUOTATION MODAL
  ========================= */

  const modal = document.getElementById("quoteModal");
  const form = document.getElementById("quoteForm");
  const selectedPackage =
    document.getElementById("selectedPackage");

  const status =
    document.getElementById("formStatus");


  if (!modal || !form) {

    console.error(
      "Atelier OG: quoteModal or quoteForm not found."
    );

    return;
  }


  /* =========================
     PACKAGE BUTTONS
  ========================= */

  document
    .querySelectorAll(".package-card")
    .forEach(function (button) {

      button.addEventListener("click", function () {

        const service =
          button.dataset.service || "";

        const packageName =
          button.dataset.package || "";

        const price =
          button.dataset.price || "";

        const conditions =
          button.dataset.conditions || "";


        document.getElementById(
          "quoteService"
        ).value = service;

        document.getElementById(
          "quotePackage"
        ).value = packageName;

        document.getElementById(
          "quotePrice"
        ).value = price;

        document.getElementById(
          "quoteConditions"
        ).value = conditions;


        if (selectedPackage) {

          selectedPackage.innerHTML = `
            <strong>${service}</strong>
            <div>
              ${packageName} · ₹${price}
            </div>
            <small>
              ${conditions}
            </small>
          `;

        }


        if (status) {
          status.textContent = "";
          status.className = "form-status";
        }


        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

      });

    });


  /* =========================
     CLOSE MODAL
  ========================= */

  document
    .querySelectorAll("[data-close-quote]")
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
     SEND FORM
  ========================= */

  form.addEventListener("submit", function (event) {

    event.preventDefault();


    if (typeof emailjs === "undefined") {

      status.textContent =
        "Email service is not loaded. Please refresh the page.";

      status.className =
        "form-status error";

      return;

    }


    const button =
      form.querySelector(
        'button[type="submit"]'
      );


    if (button) {

      button.disabled = true;

      button.textContent =
        "SENDING...";

    }


    status.textContent =
      "Sending your quotation...";

    status.className =
      "form-status";


    /* =========================
       COLLECT DATA
    ========================= */

    const formData =
      new FormData(form);

    const params = {};


    formData.forEach(function (value, key) {

      params[key] = value;

    });


    /* =========================
       QUOTATION NUMBER
    ========================= */

    params.quote_id =
      "AOG-" +
      new Date().getFullYear() +
      "-" +
      Math.floor(
        100000 + Math.random() * 900000
      );


    console.log(
      "Sending Atelier OG quotation:",
      params
    );


    /* =========================
       SEND TO ATELIER OG
    ========================= */

    emailjs
      .send(
        SERVICE_ID,
        ADMIN_TEMPLATE,
        params
      )

      .then(function (response) {

        console.log(
          "Admin email sent:",
          response
        );


        /* =========================
           SEND TO CUSTOMER
        ========================= */

        return emailjs.send(
          SERVICE_ID,
          CUSTOMER_TEMPLATE,
          params
        );

      })

      .then(function (response) {

        console.log(
          "Customer email sent:",
          response
        );


        status.textContent =
          "Quotation sent successfully! Check your email.";

        status.className =
          "form-status success";


        if (button) {

          button.disabled = false;

          button.textContent =
            "SEND QUOTATION REQUEST →";

        }


        setTimeout(function () {

          form.reset();

          modal.classList.remove("open");

          modal.setAttribute(
            "aria-hidden",
            "true"
          );

          document.body.style.overflow = "";

        }, 3000);

      })

      .catch(function (error) {

        console.error(
          "EMAILJS ERROR:",
          error
        );


        status.textContent =
          "Email could not be sent. Please try again.";

        status.className =
          "form-status error";


        if (button) {

          button.disabled = false;

          button.textContent =
            "SEND QUOTATION REQUEST →";

        }

      });

  });

});
