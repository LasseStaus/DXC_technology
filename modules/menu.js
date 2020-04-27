export function menuDelegation() {
  console.log("menuDelegation");

  ["touch", "click", "mouseover"].forEach((evt) => {
    document.querySelectorAll(".menu_et").forEach((et) => {
      et.addEventListener(evt, showBcSection);
    });
    console.log("vend et");
  });
  document.querySelectorAll(".primary").forEach((button) => {
    button.addEventListener("click", () => {
      setTimeout(() => {
        activateSecondLink();
      }, 3000);
    });
  });
}

function activateSecondLink() {
  console.log("activateSecondLink");
  const form1 = document.querySelector("#the_form");
  const form2 = document.querySelector("#the_form_check");
  console.log(form1.classList[0]);
  console.log(form2.classList[0]);
  if (form1.classList[0] == "hide" && form2.classList[0] == "hide") {
    ["touch", "click", "mouseover"].forEach((evt) => {
      document.querySelectorAll(".menu_to").forEach((to) => {
        to.addEventListener(evt, showKeySection);
      });
      console.log("vend to");
    });
  }
}

function showBcSection() {
  console.log("showBcSection");
  document.querySelector("#bc_site").classList.remove("hide");
  document.querySelector("#key_site").classList.add("hide");
  document.querySelector(".wrap_mobile").classList.add("yellow");
  document.querySelectorAll(".hjorne").forEach((e) => {
    e.classList.remove("hjorne1");
  });
  document.querySelectorAll(".hjorne").forEach((e) => {
    e.classList.add("hjorne2");
  });
  document.querySelectorAll(".black_desk").forEach((desk) => {
    desk.classList.add("hide");
  });
  document.querySelectorAll(".white_desk").forEach((desk) => {
    desk.classList.remove("hide");
  });
}
function showKeySection() {
  console.log("showKeySection");
  document.querySelector("#bc_site").classList.add("hide");
  document.querySelector("#key_site").classList.remove("hide");
  document.querySelector(".wrap_mobile").classList.remove("yellow");
  document.querySelectorAll(".hjorne").forEach((e) => {
    e.classList.add("hjorne1");
  });
  document.querySelectorAll(".hjorne").forEach((e) => {
    e.classList.remove("hjorne2");
  });
  document.querySelectorAll(".black_desk").forEach((desk) => {
    desk.classList.remove("hide");
  });
  document.querySelectorAll(".white_desk").forEach((desk) => {
    desk.classList.add("hide");
  });
}
