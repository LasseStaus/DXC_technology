export const endpoint = "https://frontendspring20-4521.restdb.io/rest/dxctechnology";
export const apiKey = "5e956df0436377171a0c2302";
let formIsValid;

export function setupForm() {
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
    const formElements = form.querySelectorAll("input");
    document.querySelector("#the_form").classList.remove("flex");
    document.querySelector("#the_form").classList.add("hide");
  });

  document.querySelector(".go_back").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#check_email").classList.remove("invalid");
    document.querySelector("#the_form").classList.add("flex");
    document.querySelector("#the_form").classList.remove("hide");
  });
  document.querySelector(".check_email").addEventListener("click", (e) => {
    e.preventDefault();
    const formElements = form.querySelectorAll("input");
    checkIfSubitted(formElements);
  });

  function checkIfValid(formElements) {
    if (form.checkValidity()) {
      console.log(form.elements);
      if (form.dataset.state === "post") {
        postCard({
          first_name: form.elements.first_name.value,
          last_name: form.elements.last_name.value,
          work_email: form.elements.work_email.value,
          phone_number: form.elements.phone_number.value,
          country: form.elements.country.value,
          job_title: form.elements.job_title.value,
        });
      } else {
        putCard(
          {
            title: form.elements.title.value,
            description: form.elements.description.value,
          },
          form.dataset.id
        );
      }
      form.reset();
      document.querySelector("#the_form").classList.remove("flex");
      document.querySelector("#the_form").classList.add("hide");
      document.querySelector("#the_form_check").classList.remove("flex");
      document.querySelector("#the_form_check").classList.add("hide");
      //send to restdb/api
    } else {
      formElements.forEach((el) => {
        console.log(el);
        if (!el.checkValidity()) {
          el.classList.add("invalid");
        }
      });
    }
  }
}
function postCard(payLoad) {
  console.log("hej");
  const postData = JSON.stringify(payLoad);
  console.log(payLoad);
  fetch(endpoint, {
    method: "post",
    headers: { "Content-Type": "application/json; charset=utf-8", "x-apikey": apiKey, "cache-control": "no-cache" },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      //showCard(data);
    });
  console.log("submitted");
}

function checkIfSubitted(formElements) {
  const checkMail = document.querySelector(".check_email");
  const isValid = form.checkValidity();
  console.log("checkIfSubitted");
  form.setAttribute("novalidate", true);
  console.log("checkIfSubitted");
  if (checkMail.length === 0) {
    console.log("0");
    formIsValid = false;
    document.querySelector("#check_email").classList.add("invalid");
  } else {
    formIsValid = true;
  }
  if (isValid && formIsValid) {
    console.log("all good");
    document.querySelector("#check_email").classList.add("invalid");
  } else {
    console.log("invalid");
    if (checkMail.value == "") {
      console.log("0 chara");
      document.querySelector("#check_email").classList.add("invalid");
    } else {
      if (
        //INDSÆT VALIDERING, DER SKAL TJEKKE OM EMAILEN ER BRUGT FØR
        0
      ) {
        document.querySelector("#the_form_check").classList.add("hide");
        document.querySelector("#the_form_check").classList.remove("flex");
      }
    }
  }
}
