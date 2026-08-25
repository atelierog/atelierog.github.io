document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     EMAILJS
     ========================================= */

  const PUBLIC_KEY = "tisfWARykoKp6CDyf";
  const SERVICE_ID = "service_i7vdsrr";
  const ADMIN_TEMPLATE = "template_itx7vmu";
  const CUSTOMER_TEMPLATE = "template_apr6ncq";

  if (typeof emailjs !== "undefined") {
    emailjs.init({
      publicKey: PUBLIC_KEY
    });
  }


  /* =========================================
     MOBILE MENU
     ========================================= */

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuButton && nav) {

    menuButton.addEventListener("click", function () {

      const open = nav.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        String(open)
      );

    });

    nav.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {
        nav.classList.remove("open");
        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );
      });

    });

  }


  /* =========================================
     FOOTER YEAR
     ========================================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =========================================
     QUOTE BUILDER
     ========================================= */

  const quoteItems = [];

  const quoteItemsEl =
    document.getElementById("quoteItems");

  const quoteTotalEl =
    document.getElementById("quoteTotal");

  const requestQuote =
    document.getElementById("requestQuote");

  const modal =
    document.getElementById("quoteModal");

  const form =
    document.getElementById("quoteForm");

  const selectedPackage =
    document.getElementById("selectedPackage");

  const status =
    document.getElementById("formStatus");


  /* =========================================
     PRICE FUNCTIONS
     ========================================= */

  function money(number) {

    return Number(number).toLocaleString(
      "en-IN"
    );

  }


  function itemTotal(item) {

    return (
      item.price * item.qty
    ) + item.addonTotal;

  }


  function total() {

    return quoteItems.reduce(
      function (sum, item) {

        return sum + itemTotal(item);

      },
      0
    );

  }


  /* =========================================
     RENDER QUOTE
     ========================================= */

  function renderQuote() {

    if (!quoteItemsEl) return;


    if (!quoteItems.length) {

      quoteItemsEl.innerHTML =
        '<p class="empty-quote">No services selected yet.</p>';

      if (requestQuote) {
        requestQuote.disabled = true;
      }

    } else {

      quoteItemsEl.innerHTML =
        quoteItems.map(function (item, index) {

          const addonText =
            item.addons.length

              ? item.addons.map(function (addon) {

                  return (
                    addon.name +
                    " +₹" +
                    money(addon.price)
                  );

                }).join(" · ")

              : "No extras";


          return `
            <div class="quote-line">

              <div>

                <strong>
                  ${item.name}
                </strong>

                <small>
                  ₹${money(item.price)}
                  base × ${item.qty}
                </small>

                <small>
                  ${addonText}
                </small>

                <small class="quote-delivery">
                  ⏱ Delivery: ${item.delivery}
                </small>

              </div>


              <div class="quote-controls">

                <button
                  type="button"
                  data-minus="${index}">
                  −
                </button>

                <span>
                  ${item.qty}
                </span>

                <button
                  type="button"
                  data-plus="${index}">
                  +
                </button>

                <b>
                  ₹${money(itemTotal(item))}
                </b>

                <button
                  class="remove-item"
                  type="button"
                  data-remove="${index}"
                  aria-label="Remove">
                  ×
                </button>

              </div>

            </div>
          `;

        }).join("");


      if (requestQuote) {
        requestQuote.disabled = false;
      }

    }


    if (quoteTotalEl) {

      quoteTotalEl.textContent =
        money(total());

    }

  }


  /* =========================================
     PLUS / MINUS / REMOVE
     ========================================= */

  if (quoteItemsEl) {

    quoteItemsEl.addEventListener(
      "click",
      function (event) {

        const plus =
          event.target.closest("[data-plus]");

        const minus =
          event.target.closest("[data-minus]");

        const remove =
          event.target.closest("[data-remove]");


        if (plus) {

          const index =
            Number(plus.dataset.plus);

          if (quoteItems[index]) {
            quoteItems[index].qty++;
          }

        }


        if (minus) {

          const index =
            Number(minus.dataset.minus);

          if (quoteItems[index]) {

            quoteItems[index].qty--;

            if (quoteItems[index].qty <= 0) {
              quoteItems.splice(index, 1);
            }

          }

        }


        if (remove) {

          const index =
            Number(remove.dataset.remove);

          quoteItems.splice(index, 1);

        }


        renderQuote();

      }
    );

  }


  /* =========================================
     ADD SERVICE
     ========================================= */

  document
    .querySelectorAll(".add-service")
    .forEach(function (button) {


      button.addEventListener(
        "click",
        function () {


          const itemBody =
            button.closest(".item-body");


          const qtyInput =
            itemBody
              ? itemBody.querySelector(".service-qty")
              : null;


          const qty =
            Math.max(
              1,
              Number(
                qtyInput
                  ? qtyInput.value
                  : 1
              )
            );


          const name =
            button.dataset.service;


          const price =
            Number(
              button.dataset.price || 0
            );


          /* GET CHECKED ADDONS */

          const addons = itemBody
            ? [
                ...itemBody.querySelectorAll(
                  ".service-addon:checked"
                )
              ].map(function (input) {

                return {
                  name:
                    input.dataset.addon ||
                    "Extra",

                  price:
                    Number(
                      input.dataset.price || 0
                    )
                };

              })
            : [];


          const addonTotal =
            addons.reduce(
              function (sum, addon) {

                return (
                  sum + addon.price
                );

              },
              0
            );


          const delivery =
            button.dataset.delivery ||
            "To be confirmed";


          const addonKey =
            addons
              .map(function (addon) {

                return (
                  addon.name +
                  ":" +
                  addon.price
                );

              })
              .sort()
              .join("|");


          /* CHECK IF SAME SERVICE + SAME EXTRAS EXISTS */

          const existing =
            quoteItems.find(
              function (item) {

                return (
                  item.name === name &&
                  item.price === price &&
                  item.addonKey === addonKey
                );

              }
            );


          if (existing) {

            existing.qty += qty;

          } else {

            quoteItems.push({

              name: name,

              price: price,

              qty: qty,

              addons: addons,

              addonTotal: addonTotal,

              addonKey: addonKey,

              delivery: delivery

            });

          }


          renderQuote();


          /* BUTTON FEEDBACK */

          button.textContent =
            "Added ✓";


          setTimeout(
            function () {

              button.textContent =
                "Add Service";

            },
            1000
          );

        }
      );

    });


  /* =========================================
     OPEN REQUEST MODAL
     ========================================= */

  function openModal() {

    if (!quoteItems.length) {
      return;
    }


    const itemText =
      quoteItems.map(function (item) {

        const extras =
          item.addons.length

            ? " | " +
              item.addons.map(
                function (addon) {

                  return (
                    addon.name +
                    " +₹" +
                    money(addon.price)
                  );

                }
              ).join(", ")

            : "";


        return (
          item.name +
          " × " +
          item.qty +
          " — ₹" +
          money(itemTotal(item)) +
          " | Estimated delivery: " +
          item.delivery +
          extras
        );

      }).join("\n");


    const grandTotal =
      total();


    document.getElementById(
      "quoteService"
    ).value =
      "Multiple Services";


    document.getElementById(
      "quotePackage"
    ).value =
      quoteItems.map(
        function (item) {

          return (
            item.name +
            " × " +
            item.qty
          );

        }
      ).join(", ");


    document.getElementById(
      "quotePrice"
    ).value =
      grandTotal;


    document.getElementById(
      "quoteFormTotal"
    ).value =
      grandTotal;


    document.getElementById(
      "quoteSelectedItems"
    ).value =
      itemText;


    document.getElementById(
      "quoteConditions"
    ).value =
      "Estimate based on selected starting prices and extras. Final price confirmed after requirements are reviewed.";


    document.getElementById(
      "quoteId"
    ).value =
      "AOG-" +
      new Date().getFullYear() +
      "-" +
      Math.floor(
        100000 +
        Math.random() * 900000
      );


    if (selectedPackage) {

      selectedPackage.innerHTML = `

        <strong>
          ${quoteItems.length}
          service${quoteItems.length > 1 ? "s" : ""}
          selected
        </strong>

        <div class="modal-items">
          ${itemText.replace(/\n/g, "<br>")}
        </div>

        <strong class="modal-total">
          Estimated total:
          ₹${money(grandTotal)}
        </strong>

      `;

    }


    if (status) {

      status.textContent = "";

      status.className =
        "form-status";

    }


    if (modal) {

      modal.classList.add("open");

      modal.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.style.overflow =
        "hidden";

    }

  }


  /* =========================================
     CLOSE MODAL
     ========================================= */

  function closeModal() {

    if (!modal) return;


    modal.classList.remove("open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow =
      "";

  }


  if (requestQuote) {

    requestQuote.addEventListener(
      "click",
      openModal
    );

  }


  document
    .querySelectorAll("[data-close-quote]")
    .forEach(function (element) {

      element.addEventListener(
        "click",
        closeModal
      );

    });


  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        modal &&
        modal.classList.contains("open")
      ) {

        closeModal();

      }

    }
  );


  /* =========================================
     EMAILJS FORM
     ========================================= */

  if (form) {

    form.addEventListener(
      "submit",
      async function (event) {

        event.preventDefault();


        if (
          typeof emailjs === "undefined"
        ) {

          status.textContent =
            "Email service is not loaded. Please refresh and try again.";

          status.className =
            "form-status error";

          return;

        }


        const button =
          form.querySelector(
            'button[type="submit"]'
          );


        button.disabled = true;

        button.textContent =
          "SENDING...";


        status.textContent =
          "Sending your service request...";

        status.className =
          "form-status";


        const data =
          Object.fromEntries(
            new FormData(form).entries()
          );


        try {

          /* ADMIN EMAIL */

          await emailjs.send(
            SERVICE_ID,
            ADMIN_TEMPLATE,
            data
          );


          /* CUSTOMER EMAIL */

          await emailjs.send(
            SERVICE_ID,
            CUSTOMER_TEMPLATE,
            data
          );


          status.textContent =
            "Service request sent successfully! Check your email.";

          status.className =
            "form-status success";


          form.reset();

          quoteItems.length = 0;

          renderQuote();


          setTimeout(
            closeModal,
            2800
          );


        } catch (error) {

          console.error(
            "EmailJS error:",
            error
          );


          status.textContent =
            "Service request could not be sent. Please try again.";

          status.className =
            "form-status error";

        } finally {

          button.disabled = false;

          button.textContent =
            "Request Service →";

        }

      }
    );

  }


  /* =========================================
     START
     ========================================= */

  renderQuote();

});
