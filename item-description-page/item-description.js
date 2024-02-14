"use strict";

const itemId = localStorage.getItem("itemId");
const imageDiv = document.querySelector(".image-box");
const specificationBox = document.querySelector(".specification-box");
const removeDescriptionDiv = document.querySelector(".remove-description");
const statusMessages = document.getElementById("statusMessages");

const selectedIdFetchApi = async () => {
  try {
    const res = await fetch(
      `https://65bb606a52189914b5bbe878.mockapi.io/items/${itemId}`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status code: ${res.status}`);
    }

    const items = await res.json();

    return items;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const renderCardWithDescription = (item) => {
  statusMessages.innerHTML = "";

  const imageTitle = document.createElement("h4");
  imageTitle.innerText = `${item.brand} ${item.name} ${item.screenResolution} `;
  const imgUrl = document.createElement("img");
  imgUrl.src = item.imgUrlFull;
  imageDiv.append(imageTitle, imgUrl);

  const priceDiv = document.createElement("div");
  priceDiv.classList.add("price-box");
  const priceEurParagraph = document.createElement("p");
  priceEurParagraph.innerText = `\u20AC${item.priceEur} `;
  const addFavoriteButton = document.createElement("button");
  addFavoriteButton.setAttribute("id", "addFavorite");
  addFavoriteButton.innerText = "Add to favorite";
  priceDiv.append(priceEurParagraph, addFavoriteButton);

  const specificationTitle = document.createElement("h4");
  specificationTitle.innerText = "Specification:";
  const dateParagraph = document.createElement("p");
  dateParagraph.innerText = `Released on ${item.date}`;
  const screenParagraph = document.createElement("p");
  screenParagraph.innerText = `${item.screenResolution} Screen`;
  const cpuParagraph = document.createElement("p");
  cpuParagraph.innerText = `${item.cpu} Processor`;
  const gpuParagraph = document.createElement("p");
  gpuParagraph.innerText = `${item.gpu} Graphics card`;
  const internalParagraph = document.createElement("p");
  internalParagraph.innerText = item.internal;
  const locationParagraph = document.createElement("p");
  locationParagraph.innerText = `Location: `;
  const locationSpan = document.createElement("span");
  locationSpan.innerText = `${item.location}`;
  locationParagraph.append(locationSpan);
  const productInfoTitle = document.createElement("h4");
  productInfoTitle.innerText = "Product Information:";
  const productInfoParagraph = document.createElement("p");
  productInfoParagraph.innerText = item.description;
  specificationBox.append(
    priceDiv,
    specificationTitle,
    dateParagraph,
    screenParagraph,
    cpuParagraph,
    gpuParagraph,
    internalParagraph,
    locationParagraph,
    productInfoTitle,
    productInfoParagraph
  );

  const removeParagraph = document.createElement("p");
  const removeSpan = document.createElement("span");
  removeSpan.innerText = "Removing Item from the List: ";
  removeParagraph.innerText =
    'Users are provided with the functionality to remove items from a list. Each item in the list is associated with a "remove" button. By clicking on this button, users can initiate the removal of the corresponding item from the list.';

  const favoriteParagraph = document.createElement("p");
  const favoriteSpan = document.createElement("span");
  favoriteSpan.innerText = "Adding Items to the Favorite List: ";
  favoriteParagraph.innerText =
    "Users are given the capability to add specific items to a favorite items list. By clicking on this button, users express their preference for the selected item, marking it as a favorite.";

  const removeButtonDiv = document.createElement("div");
  removeButtonDiv.classList.add("remove-button");
  const removeButton = document.createElement("button");
  removeButton.setAttribute("id", "remove");
  removeButton.innerText = "Remove item";
  const goBackButton = document.createElement("button");
  goBackButton.setAttribute("id", "goBack");
  goBackButton.innerText = "Go back";

  removeDescriptionDiv.prepend(removeButtonDiv);
  removeButtonDiv.prepend(removeButton, goBackButton);
  removeDescriptionDiv.prepend(removeParagraph, favoriteParagraph);
  removeParagraph.prepend(removeSpan);
  favoriteParagraph.prepend(favoriteSpan);

  removeButton.addEventListener("click", async () => {
    removeApi(itemId);
  });

  goBackButton.addEventListener("click", () => {
    window.location.assign("../index.html");
  });
};

function displayStatus(isOk, text) {
  const statusDiv = document.getElementById("statusMessages");
  const statusText = document.createElement("h1");
  statusDiv.style.color = isOk ? "03d3b2" : "red";
  statusText.innerHTML = text;
  statusDiv.append(statusText);
}

const initPage = async () => {
  const item = await selectedIdFetchApi();
  console.log(item);
  renderCardWithDescription(item);
};

const removeApi = async (itemId) => {
  try {
    const res = await fetch(
      `https://65bb606a52189914b5bbe878.mockapi.io/items/${itemId}`,
      { method: "DELETE" }
    );

    if (!res.ok) {
      throw new Error(`Failed to delete item. Status code: ${res.status}`);
    } else {
      displayStatus(res.ok, "Item has been successfully removed.");
      console.log(`Item with id ${itemId} has been deleted.`);
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1500);
    }
  } catch (error) {
    displayStatus(
      !error.ok,
      `Failed to delete item with id ${itemId}. Status code: ${error.status}`
    );
  }
};

initPage();
