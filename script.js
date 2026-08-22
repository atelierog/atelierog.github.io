document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     MOBILE MENU
  ========================= */

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }


  /* =========================
     COPYRIGHT YEAR
  ========================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =========================
     EMAILJS
  ========================= */

  const EMAILJS_PUBLIC_KEY = "tisfWARykoKp6CDyf";
  const EMAILJS_SERVICE_ID = "service_i7vdsrr";

  const ADMIN_TEMPLATE_ID = "template_itx7vmu";
  const CUSTOMER_TEMPLATE_ID = "template_apr6ncq";


  /* =========================
     QUOTATION MODAL
  ========================= */

  const modal = document.getElementById("quoteModal");
  const quoteForm = document.getElementById("quoteForm");
  const selectedPackage = document.getElementById("selectedPackage");
  const formStatus = document.getElementById("formStatus");

  if (!modal || !quoteForm) {
    console.log("Atelier OG: quotation form not found.");
    return;
  }


  /* =========================
     OPEN QUOTATION
  ========================= */

  const packageButtons =
    document.querySelectorAll(".package-card");

  packageButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const service =
        button.getAttribute("data-service") || "";

      const packageName =
        button.getAttribute("data-package") || "";

      const price =
        button.getAttribute("data-price") || "";

      const conditions =
        button.getAttribute("data-conditions") || "";


      document.getElementById("quoteService").value = service;

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
        " · <span>₹" +
        price +
        "</span></div>" +

        "<small>" +
        conditions +
        "</small>";


      formStatus.textContent = "";

      modal.classList.add("open");

      modal.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.style.overflow = "hidden";


      const nameInput =
        quoteForm.querySelector(
          'input[name="name"]'
        );

      if (nameInput) {
        setTimeout(function () {
          nameInput.focus();
        }, 100);
      }

    });

  });


  /* =========================
     CLOSE QUOTATION
  ========================= */

  const closeButtons =
    document.querySelectorAll(
      "[data-close-quote]"
    );

  closeButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        modal.classList.remove("open");

        modal.setAttribute(
          "aria-hidden",
          "true"
        );

        document.body.style.overflow = "";

      }
    );

  });


  /* ESCAPE KEY */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        modal.classList.contains("open")
      ) {

        modal.classList.remove("open");

        modal.setAttribute(
          "aria-hidden",
          "true"
        );

        document.body.style.overflow = "";

      }

    }
  );


  /* =========================
     FORM SUBMISSION
  ========================= */

  quoteForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      /* Check EmailJS */

      if (
        typeof emailjs === "undefined"
      ) {

        formStatus.textContent =
          "Email service is not loaded. Please refresh the page and try again.";

        formStatus.className =
          "form-status error";

        return;

      }


      const submitButton =
        quoteForm.querySelector(
          'button[type="submit"]'
        );


      if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
          "Sending...";

      }


      formStatus.textContent = "";


      /* Collect form data */

      const formData =
        new FormData(quoteForm);

      const data = {};

      formData.forEach(
        function (value, key) {

          data[key] = value;

        }
      );


      /* Generate quotation ID */

      data.quote_id =
        "AOG-" +
        Date.now();


      /* =========================
         SEND EMAILS
      ========================= */

      emailjs
        .send(
          EMAILJS_SERVICE_ID,
          ADMIN_TEMPLATE_ID,
          data
        )

        .then(function () {

          return emailjs.send(
            EMAILJS_SERVICE_ID,
            CUSTOMER_TEMPLATE_ID,
            data
          );

        })

        .then(function () {

          formStatus.textContent =
            "Success! Your quotation has been sent to your email.";

          formStatus.className =
            "form-status success";


          quoteForm.reset();


          if (submitButton) {

            submitButton.disabled = false;

            submitButton.textContent =
              "Send Quotation Request →";

          }


          setTimeout(
            function () {

              modal.classList.remove("open");

              modal.setAttribute(
                "aria-hidden",
                "true"
              );

              document.body.style.overflow = "";

            },
            3000
          );

        })

        .catch(function (error) {

          console.error(
            "EmailJS Error:",
            error
          );


          formStatus.textContent =
            "Something went wrong. Please try again.";

          formStatus.className =
            "form-status error";


          if (submitButton) {

            submitButton.disabled = false;

            submitButton.textContent =
              "Send Quotation Request →";

          }

        });

    }
  );

});
