export function menuDelegation() {
  console.log("menuDelegation");

  ["touch", "click", "mouseover"].forEach((evt) => {
    document.querySelectorAll(".menu_et").forEach((et) => {
      et.addEventListener(evt, showBcSection);
    });
  });
  ["touch", "click", "mouseover"].forEach((evt) => {
    document.querySelectorAll(".menu_to").forEach((to) => {
      to.addEventListener(evt, showKeySection);
    });
  });
}

function showBcSection() {
  console.log("showBcSection");
  document.querySelector("#bc_site").classList.remove("hide");
  document.querySelector("#key_site").classList.add("hide");
  document.querySelector(".wrap_mobile").classList.add("yellow");
}
function showKeySection() {
  console.log("showKeySection");
  document.querySelector("#bc_site").classList.add("hide");
  document.querySelector("#key_site").classList.remove("hide");
  document.querySelector(".wrap_mobile").classList.remove("yellow");
}
