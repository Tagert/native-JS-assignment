"use strict";

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
  statusDiv.style.color = isOk ? "03d3b2" : "red";
  statusText.innerHTML = text;
  statusDiv.append(statusText);
}

const createCardObj = () => {
  const typeInputValue = document.getElementById("typeInput").value;
  const imgUrlInputValue = document.getElementById("imgUrlInput").value;
  const brandInputValue = document.getElementById("brandInput").value;
  const nameInputValue = document.getElementById("nameInput").value;
  const dateInputValue = document.getElementById("dateInput").value;
  const screenResolutionInputValue = document.getElementById(
    "screenResolutionInput"
  ).value;
  const priceEurInputValue = document.getElementById("priceEurInput").value;
  const locationInputValue = document.getElementById("locationInput").value;

  const internalInputValue = document.getElementById("internalInput").value;
  const cpuInputValue = document.getElementById("cpuInput").value;
  const gpuInputValue = document.getElementById("gpuInput").value;
  const cameraInputValue = document.getElementById("cameraInput").value;
  const descriptionInputValue =
    document.getElementById("descriptionInput").value;
  const imgUrlFullInputValue = document.getElementById("imgUrlFullInput").value;
  const moreInfoUrlInputValue =
    document.getElementById("moreInfoUrlInput").value;

  const newCard = {
    type: typeInputValue,
    imgUrl: imgUrlInputValue,
    brand: brandInputValue,
    name: nameInputValue,
    date: dateInputValue,
    screenResolution: screenResolutionInputValue,
    priceEur: priceEurInputValue,
    location: locationInputValue,
    internal: internalInputValue,
    cpu: cpuInputValue,
    gpu: gpuInputValue,
    camera: cameraInputValue,
    description: descriptionInputValue,
    imgUrlFull: imgUrlFullInputValue,
    moreInfoUrl: moreInfoUrlInputValue,
  };

  statusMessages.innerHTML = "";

  fetch("https://65bb606a52189914b5bbe878.mockapi.io/items", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCard),
  })
    .then((res) => {
      if (res.ok) {
        displayStatus(res.ok, "Property successfully added.");
        setTimeout(() => {
          window.location.assign("../index.html");
        }, 2000);
      } else {
        throw new Error(res.statusText);
      }
    })
    .catch((error) => {
      displayStatus(false, `Something went wrong. Server returned: ${error}.`);
    });
};

addPropertyButton.addEventListener("click", createCardObj);
