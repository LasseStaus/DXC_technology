"use strict";
window.addEventListener("DOMContentLoaded", init);

import { test } from "./modules/test";
import { menuDelegation } from "./modules/menu";
import { setupForm } from "./modules/form";
import { get } from "./modules/form";
//import { endpoint, apiKey } from "./modules/settings";
//test(".test h1");

function init() {
  setupForm();
  get();
  menuDelegation();
}
