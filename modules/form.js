export const endpoint = "https://frontendspring20-4521.restdb.io/rest/dxctechnology";
export const apiKey = "5e956df0436377171a0c2302";
let formIsValid;
let data;
let position;

export function formDelegation() {
  console.log("formDelegation");
  document.querySelector(".container").addEventListener("scroll", setPosition);
  if (innerWidth >= 1000) {
    document.querySelector("#the_form").style.alignItems = "initial";
  }
}

function setPosition() {
  const container = document.querySelector(".container");
  position = container.scrollTop / (container.scrollHeight - container.clientHeight);
  console.log(position);
  if (innerWidth < 500) {
    console.log("<500");
    if (position >= 0.15) {
      stopScroll();
    }
  } else if (innerWidth < 900) {
    console.log("<1000");
    if (position >= 0.16) {
      stopScroll();
    }
  } else if (innerWidth < 1300) {
    console.log("<1000");
    if (position >= 0.2) {
      stopScroll();
    }
  } else if (innerWidth < 2500) {
    console.log("<1500");
    if (position >= 0.35) {
      stopScroll();
    }
  }
}

function stopScroll() {
  document.querySelector("#bc_site").classList.add("hide");
  document.querySelectorAll("nav").forEach((nav) => {
    nav.classList.add("hide");
  });
  document.querySelector(".container").removeEventListener("scroll", setPosition);
  document.querySelector(".container").style.overflow = "hidden";
  setTimeout(() => {
    document.querySelector(".container").style.overflow = "scroll";
  }, 500);
  document.querySelector(".theFormText").style.marginTop = "0";
  document.querySelector(".initial_form").style.marginTop = "0";
  document.querySelector("#the_form").style.transform = "translateY(0px)";
  document.querySelector("#the_form_check").style.transform = "translateY(0px)";
  document.querySelector(".theFormText").scrollIntoView();
}

export function checkIfValid(formElements) {
  if (form.checkValidity()) {
    const email = document.querySelector("#check_email").value;
    data = get();
    console.log(data);
    if (email == data.work_email) {
      console.log("not unique");
      document.querySelector("#check_email").classList.add("invalid");
    } else {
      console.log(form.elements);
      postCard({
        first_name: form.elements.first_name.value,
        last_name: form.elements.last_name.value,
        work_email: form.elements.work_email.value,
        phone_number: form.elements.phone_number.value,
        country: form.elements.country.value,
        job_title: form.elements.job_title.value,
        login_amount: 1,
      });
      form.reset();
      document.querySelector("#the_form").classList.remove("flex");
      document.querySelector("#the_form").classList.add("hide");
      document.querySelector("#the_form_check").classList.remove("flex");
      document.querySelector("#the_form_check").classList.add("hide");
      document.querySelector(".container").style.overflow = "scroll";
      document.querySelector(".container").removeEventListener("scroll", setPosition);
      document.querySelector("#bc_site").classList.remove("hide");
      document.querySelector(".theFormText").classList.add("hide");

      if (innerWidth > 1000) {
        document.querySelector(".desktop").classList.remove("hide");
      } else {
        document.querySelector(".mobile").classList.remove("hide");
      }
    } //send to restdb/api
  } else {
    formElements.forEach((el) => {
      console.log(el);
      if (!el.checkValidity()) {
        el.classList.add("invalid");
      }
    });
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
    });
  console.log("submitted");
}

export function checkIfSubitted() {
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
    if (checkMail.length === 0) {
      console.log("0 chara");
      document.querySelector("#check_email").classList.add("invalid");
    } else {
      get();
    }
  }
}
async function get() {
  console.log("get");
  let response = await fetch(endpoint, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  });
  data = await response.json();
  data.forEach(checkData);
  return data;
}

function checkData(data) {
  console.log("checkData");
  const email = document.querySelector("#check_email").value;
  if (email == data.work_email) {
    console.log("Already used");
    console.log("input: " + email + " " + "bd: " + data.work_email);
    document.querySelector("#the_form_check").classList.add("hide");
    document.querySelector("#the_form_check").classList.remove("flex");
    document.querySelector(".container").style.overflow = "scroll";
    document.querySelector(".container").removeEventListener("scroll", setPosition);
    document.querySelector("#bc_site").classList.remove("hide");
    document.querySelector(".theFormText").classList.add("hide");

    //send til put(data)

    //find entry i db der matcher email (id) get input_amout og increase login_amount med +1
    put(
      //login_amount: amount,
      { $inc: { login_amount: 1 } },
      //id sendes videre til put, så vi redigerer i det korrekte objekt.
      data._id
    );
    if (innerWidth > 1000) {
      document.querySelector(".desktop").classList.remove("hide");
    } else {
      document.querySelector(".mobile").classList.remove("hide");
    }
  } else if (((email == data.work_email) == Array.length) == 0) {
    console.log("does not match");
    document.querySelector("#check_email").classList.add("invalid");
    window.addEventListener("keyup", function () {
      document.querySelector("#check_email").classList.remove("invalid");
    });
  }
}

async function put(payload, id) {
  console.log("put");
  const postData = JSON.stringify(payload);
  //Sikrer det er det rigtige id der redigeres
  let response = await fetch(`${endpoint}/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  });
  //objektet ændres i db
  data = await response.json();
  //console.log(data);
}
