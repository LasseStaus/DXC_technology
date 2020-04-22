"use strict";
window.addEventListener("DOMContentLoaded", init);

import { test } from "./modules/test";
test("h1");

function init() {
  console.log("init");
}
