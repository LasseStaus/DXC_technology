"use strict";
window.addEventListener("DOMContentLoaded", init);
import "@babel/polyfill";
import { test } from "./modules/test";
import { menuDelegation } from "./modules/menu";
import { setupForm } from "./modules/form";
import { get } from "./modules/form";
//import { endpoint, apiKey } from "./modules/settings";

function init() {
  setupForm();
  //get();
  menuDelegation();
}
