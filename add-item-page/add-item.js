"use strict";

let newCard;
const addPropertyButton = document.getElementById("add");

const typeInput = document.getElementById("typeInput");
const imgUrlInput = document.getElementById("imgUrlInput");
const brandInput = document.getElementById("brandInput");
const nameInput = document.getElementById("nameInput");
const dateInput = document.getElementById("dateInput");
const screenResolutionInput = document.getElementById("screenResolutionInput");
const priceEurInput = document.getElementById("priceEurInput");
const locationInput = document.getElementById("locationInput");

const internalInput = document.getElementById("internalInput");
const cpuInput = document.getElementById("cpuInput");
const gpuInput = document.getElementById("gpuInput");
const cameraInput = document.getElementById("cameraInput");
const descriptionInput = document.getElementById("descriptionInput");
const imgUrlFullInput = document.getElementById("imgUrlFullInput");
const moreInfoUrlInput = document.getElementById("moreInfoUrlInput");

const statusMessages = document.getElementById("statusMessages");

const types = ["Laptops", "Monitors", "Tablets", "Phones"];

types.forEach((type) => {
  const option = document.createElement("option");
  option.setAttribute("value", type);
  option.innerText = type;
  typeInput.append(option);
});

function displayStatus(isOk, text) {
  const statusDiv = document.getElementById("statusMessages");
  const statusText = document.createElement("h1");
  statusDiv.innerHTML = "";

  statusDiv.style.color = isOk ? "green" : "red";
  statusText.innerHTML = text;
  statusDiv.append(statusText);
}

const createCardObj = () => {
  const inputs = [
    typeInput,
    imgUrlInput,
    brandInput,
    nameInput,
    dateInput,
    screenResolutionInput,
    priceEurInput,
    locationInput,
    internalInput,
    cpuInput,
    gpuInput,
    cameraInput,
    descriptionInput,
    imgUrlFullInput,
    moreInfoUrlInput,
  ];

  const inputsValue = [
    typeInput.value,
    imgUrlInput.value,
    brandInput.value,
    nameInput.value,
    dateInput.value,
    screenResolutionInput.value,
    priceEurInput.value,
    locationInput.value,
    internalInput.value,
    cpuInput.value,
    gpuInput.value,
    cameraInput.value,
    descriptionInput.value,
    imgUrlFullInput.value,
    moreInfoUrlInput.value,
  ];

  const invalidInputs = inputsValue.filter((input) => input.trim().length < 2);

  inputs.forEach((input, index) => {
    input.style.borderColor = invalidInputs.includes(inputsValue[index])
      ? "red"
      : "green";
  });

  if (invalidInputs.length > 0) {
    displayStatus(
      false,
      "Please fill in all fields with at least 2 characters."
    );
    return;
  }

  newCard = {
    type: inputsValue[0],
    imgUrl: inputsValue[1],
    brand: inputsValue[2],
    name: inputsValue[3],
    date: inputsValue[4],
    screenResolution: inputsValue[5],
    priceEur: inputsValue[6],
    location: inputsValue[7],
    internal: inputsValue[8],
    cpu: inputsValue[9],
    gpu: inputsValue[10],
    camera: inputsValue[11],
    description: inputsValue[12],
    imgUrlFull: inputsValue[13],
    moreInfoUrl: inputsValue[14],
  };

  statusMessages.innerHTML = "";

  postCardApi();
};

const postCardApi = async () => {
  try {
    const response = await fetch(
      "https://65bb606a52189914b5bbe878.mockapi.io/items",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    displayStatus(true, "Item successfully added.");
    setTimeout(() => {
      window.location.assign("../index.html");
    }, 1500);
  } catch (error) {
    displayStatus(
      false,
      `Something went wrong. Server returned: ${error.message || error}.`
    );
  }
};

addPropertyButton.addEventListener("click", createCardObj);
