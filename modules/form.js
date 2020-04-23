export const endpoint = "https://frontendspring20-4521.restdb.io/rest/dxctechnology";
export const apiKey = "5e956df0436377171a0c2302";

export function setupForm() {
  const form = document.querySelector("form");
  window.form = form;
  const elements = form.elements;
  window.elements = elements;

  form.setAttribute("novalidate", true);
  /* elements.date.value = 12; */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formElements = form.querySelectorAll("input");
    formElements.forEach((el) => {
      el.classList.remove("invalid");
    });

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
      //send to restdb/api
    } else {
      formElements.forEach((el) => {
        console.log(el);
        if (!el.checkValidity()) {
          el.classList.add("invalid");
        }
      });
    }
  });
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
      showCard(data);
    });
  console.log("submitted");
}

export function get() {
  fetch(endpoint, {
    method: "get",
    headers: { accept: "application/json", "x-apikey": apiKey, "cache-control": "no-cache" },
  })
    .then((e) => e.json())
    .then((data) => {
      data.forEach(showCard);
      console.log(data);
    });
  console.log("get");
}
const template = document.querySelector("template").content;
const cardContainer = document.querySelector("#cardlist > .container");

function showCard(card) {
  console.log(card);

  const clone = template.cloneNode(true);

  clone.querySelector("article").dataset.id = card._id;
  clone.querySelector(".first_name").textContent = card.first_name;
  clone.querySelector(".last_name").textContent = card.last_name;
  clone.querySelector(".work_email").textContent = card.work_email;
  clone.querySelector(".phone_number").textContent = card.phone_number;
  clone.querySelector(".country").textContent = card.country;
  clone.querySelector(".job_title").textContent = card.job_title;

  clone.querySelector(`[data-action="delete"]`).addEventListener("click", (e) => deleteCard(card._id));

  cardContainer.appendChild(clone);
  console.log("appended all + new clone");
}

/* function getSingleCard(id, callback) {
    console.log(id);
    fetch(`${endpoint}/${id}`, {
      method: "get",
      headers: { "Content-Type": "application/json; charset=utf-8", "x-apikey": apiKey, "cache-control": "no-cache" },
    })
      .then((res) => res.json())
      .then((data) => callback(data));
  } */
/* 
  function setupFormForEdit(data) {
    console.log("hi mom");
    const form = document.querySelector("form");
    form.dataset.state = "edit";
    form.dataset.id = data._id;
    form.elements.title.value = data.title;
    form.elements.description.value = data.description;
    form.elements.date.value = data.date;
    form.elements.number.value = data.number;
  } */

function deleteCard(id) {
  console.log("deleted this card", id);

  fetch(`${endpoint}/${id}`, {
    method: "delete",
    headers: { "Content-Type": "application/json; charset=utf-8", "x-apikey": apiKey, "cache-control": "no-cache" },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
  document.querySelector(`article[data-id="${id}"]`).remove();
}

function putCard(payLoad, id) {
  console.log("put function");
  const postData = JSON.stringify(payLoad);
  fetch(`${endpoint}/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json; charset=utf-8", "x-apikey": apiKey, "cache-control": "no-cache" },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
