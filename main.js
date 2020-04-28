"use strict";
window.addEventListener("DOMContentLoaded", init);
import "@babel/polyfill";
import { menuDelegation } from "./modules/menu";
import { checkIfValid } from "./modules/form";
import { checkIfSubitted } from "./modules/form";
import { formDelegation } from "./modules/form";

//import { endpoint, apiKey } from "./modules/settings";
let counter = 0;
function init() {
  setupForm();
  //get();
  menuDelegation();
  formDelegation();
  document.querySelector("body").scrollTo(0, 0);
  resetBackButton();
}
function resetBackButton() {
  console.log(resetBackButton);
  (function (window, location) {
    history.replaceState(null, document.title, location.pathname + "#!/stealingyourhistory");
    history.pushState(null, document.title, location.pathname);

    window.addEventListener(
      "popstate",
      function () {
        if (location.hash === "#!/stealingyourhistory") {
          history.replaceState(null, document.title, location.pathname);
          setTimeout(function () {
            location.replace("index.html");
          }, 0);
        }
      },
      false
    );
  })(window, location);
}

function setupForm() {
  const form = document.querySelector("form");
  window.form = form;
  const elements = form.elements;
  window.elements = elements;

  form.setAttribute("novalidate", true);
  /* elements.date.value = 12; */
  document.querySelector(".save").addEventListener("click", (e) => {
    counter = 0;
    console.log(counter);
    e.preventDefault();
    const formElements = form.querySelectorAll("input");
    formElements.forEach((el) => {
      el.classList.remove("invalid");
    });
    checkIfValid(formElements);
    //const invalid = document.querySelector(".invalid");

    setTimeout(() => {
      document.querySelectorAll("input").forEach((input) => {
        if (input.classList[0] == "invalid") {
          console.log("invalid");
          counter++;
        }
      });
      console.log(counter);
      checkInput();
    }, 2500);
  });

  document.querySelector(".submitted").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#the_form").classList.remove("flex");
    document.querySelector("#the_form").classList.add("hide");
    document.querySelector("#the_form_check").classList.remove("hide");
    document.querySelector("#the_form_check").classList.add("flex");
    form.reset();
    const formElements = form.querySelectorAll("input");
    formElements.forEach((el) => {
      el.classList.remove("invalid");
    });
  });

  document.querySelector(".go_back").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#check_email").classList.remove("invalid");
    document.querySelector("#check_email").value = "";
    document.querySelector("#the_form").classList.add("flex");
    document.querySelector("#the_form").classList.remove("hide");
    document.querySelector("#the_form_check").classList.add("hide");
    document.querySelector("#the_form_check").classList.remove("flex");
    document.querySelector(".theFormText").scrollIntoView();
  });
  document.querySelector(".check_email").addEventListener("click", (e) => {
    const formElements = form.querySelectorAll("input");
    e.preventDefault();
    checkIfSubitted(formElements);
  });
}

function checkInput() {
  console.log("checkInput");
  if (counter == 0) {
    console.log("checkInput valid");
    document.querySelector(".save").removeEventListener("click", (e) => {});
    document.querySelectorAll(".startHide").forEach((section) => {
      section.classList.remove("hide");
    });
    document.querySelector("header").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    console.log("checkInput invalid");
    document.querySelector(".save").removeEventListener("click", (e) => {});
    counter = 0;
    document.querySelectorAll("input").forEach((el) => {
      el.addEventListener("keyup", function () {
        this.classList.remove("invalid");
      });
    });
  }
}
