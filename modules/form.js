export const endpoint = "https://frontendspring20-4521.restdb.io/rest/dxctechnology";
export const apiKey = "5e956df0436377171a0c2302";
let formIsValid;
let data;
let position;
let count = 0;

export function formDelegation() {
  console.log("formDelegation");
  document.querySelector(".container1").addEventListener("scroll", setPosition);
  if (innerWidth >= 1000) {
    document.querySelector("#the_form").style.alignItems = "initial";
  }
  document.querySelector(".signUp").addEventListener("click", readMore);
  document.querySelector("#bc_site").style.position = "fixed";
}

function setPosition() {
  const container = document.querySelector(".container1");
  position = container.scrollTop / (container.scrollHeight - container.clientHeight);
}

function readMore() {
  console.log("readMore");
  document.querySelector(".button_wrap").classList.add("hide");
  document.querySelector("#the_form").classList.add("flex");
  document.querySelector("#the_form").classList.remove("hide");
  document.querySelector(".theFormText").scrollIntoView();
  document.querySelector("#bc_site").style.position = "static";
}

export function checkIfValid(formElements) {
  if (form.checkValidity()) {
    get();
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

function loopData(data) {
  const email = document.querySelector("#email").value;
  if (count === 1) {
    console.log("not unique");
    console.log("input: " + email + " " + "bd: " + data.work_email);
    document.querySelector("#email").classList.add("invalid");
    document.querySelector(".mail").textContent = "|| Not unique. Go to 'already submitted'";
    window.addEventListener("keyup", function () {
      document.querySelector("#email").classList.remove("invalid");
    });
  }
  if (count === 0) {
    console.log("not");
    postCard({
      first_name: form.elements.first_name.value,
      last_name: form.elements.last_name.value,
      work_email: form.elements.work_email.value,
      company: form.elements.company.value,
      country: form.elements.country.value,
      job_title: form.elements.job_title.value,
      login_amount: 1,
    });
    form.reset();
    document.querySelector("#the_form").classList.remove("flex");
    document.querySelector("#the_form").classList.add("hide");
    document.querySelector("#the_form_check").classList.remove("flex");
    document.querySelector("#the_form_check").classList.add("hide");
    document.querySelector(".container1").style.overflow = "scroll";
    document.querySelector(".container1").removeEventListener("scroll", setPosition);
    document.querySelector("#bc_site").classList.remove("hide");
    document.querySelector(".theFormText").classList.add("hide");
    document.querySelector("header").classList.remove("hide");
  }
  count = 0;
}

async function postCard(payload) {
  console.log("post");
  const postData = JSON.stringify(payload);
  let response = await fetch(endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  });
  data = await response.json();
  console.log(data);
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
  const firstForm = document.querySelector("#the_form");
  let response = await fetch(endpoint, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  });
  data = await response.json();
  if (firstForm.classList[0] == "flex") {
    console.log("first form");
    data.forEach((data) => {
      const email = document.querySelector("#email").value;
      if (email == data.work_email) {
        count++;
        console.log("JA");
      } else {
        console.log("IKKE");
      }
    });
    console.log(count);
    loopData(data);
  } else {
    console.log("second form");
    data.forEach(checkData);
  }
  console.log(data);
}

function checkData(data) {
  console.log("checkData");
  const email = document.querySelector("#check_email").value;
  if (email == data.work_email) {
    console.log("Already used");
    console.log("input: " + email + " " + "bd: " + data.work_email);
    document.querySelector(".welcome").classList.remove("hidden");
    document.querySelector(".welcome").textContent = "Welcome back " + data.first_name;
    document.querySelector("#the_form_check .invalid_text").style.display = "none";
    setTimeout(() => {
      document.querySelector(".welcome").classList.add("hidden");
      document.querySelectorAll(".startHide").forEach((section) => {
        section.classList.remove("hide");
      });
      document.querySelector("#the_form_check").classList.add("hide");
      document.querySelector("#the_form_check").classList.remove("flex");
      //document.querySelector(".container1").style.overflow = "scroll";
      document.querySelector(".container1").removeEventListener("scroll", setPosition);
      document.querySelector("#bc_site").classList.remove("hide");
      document.querySelector(".theFormText").classList.add("hide");
      document.querySelector("header").classList.remove("hide");
    }, 2000);
    put(
      {
        first_name: data.first_name.value,
        last_name: data.last_name.value,
        work_email: data.work_email.value,
        company: data.company.value,
        country: data.country.value,
        job_title: data.job_title.value,
        //login_amount: amount,
        $inc: { login_amount: 1 },
      },
      //id sendes videre til put, så vi redigerer i det korrekte objekt.
      data._id
    );
  } else {
    console.log(email);
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
