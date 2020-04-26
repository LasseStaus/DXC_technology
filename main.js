"use strict";
window.addEventListener("DOMContentLoaded", init);
import "@babel/polyfill";
import { test } from "./modules/test";
import { menuDelegation } from "./modules/menu";
import { checkIfValid } from "./modules/form";
import { checkIfSubitted } from "./modules/form";
import { formDelegation } from "./modules/form";
import { get } from "./modules/form";
//import { endpoint, apiKey } from "./modules/settings";

function init() {
  setupForm();
  //get();
  menuDelegation();
  formDelegation();
  document.querySelector("body").scrollTo(0, 0);
}
function setupForm() {
  const form = document.querySelector("form");
  window.form = form;
  const elements = form.elements;
  window.elements = elements;

  form.setAttribute("novalidate", true);
  /* elements.date.value = 12; */
  document.querySelector(".save").addEventListener("click", (e) => {
    e.preventDefault();
    const formElements = form.querySelectorAll("input");
    formElements.forEach((el) => {
      el.classList.remove("invalid");
    });

    checkIfValid(formElements);
  });
  document.querySelector(".submitted").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#the_form").classList.remove("flex");
    document.querySelector("#the_form").classList.add("hide");
    document.querySelector("#the_form_check").classList.remove("hide");
  });

  document.querySelector(".go_back").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#check_email").classList.remove("invalid");
    document.querySelector("#check_email").value = "";
    document.querySelector("#the_form").classList.add("flex");
    document.querySelector("#the_form").classList.remove("hide");
    document.querySelector("#the_form_check").classList.add("hide");
  });
  document.querySelector(".check_email").addEventListener("click", (e) => {
    e.preventDefault();
    const formElements = form.querySelectorAll("input");
    checkIfSubitted(formElements);
  });
}
