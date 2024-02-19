"use strict";

import { userLogin } from "./src/user-login.js";
import {
  openLoginModal,
  closeLoginModal,
  closeMenuWrapper,
} from "./src/menu-wrapper.js";
import { contactWindow } from "./src/contact-window.js";

const sendFormButton = document.getElementById("formBtn");

const sortSection = document.querySelector(".sort-section");
const mainSection = document.querySelector(".main-section");
const cardsContainer = document.querySelector(".cards-container");
const navbar = document.querySelector(".navbar");
const menuWrapper = document.querySelector(".menu-wrapper");
const titleType = document.querySelector(".title-type");
const typeWrapper = document.querySelector(".title-wrapper");
const typeIconWrapper = document.getElementById("typeIconWrapper");
const favoritesList = document.getElementById("favoritesList");

const foundedItems = document.getElementById("foundItems");
const sortSelectedElement = document.getElementById("sort");
const loginWrapper = document.getElementById("loginWrapper");
const loginButton = document.getElementById("loginBtn");
const loginModalButton = document.getElementById("loginCloseBtn");

const laptopCheckbox = document.getElementById("laptops");
const monitorCheckbox = document.getElementById("monitors");
const tabletCheckbox = document.getElementById("tablets");
const phoneCheckbox = document.getElementById("phones");

let itemsData = [];
let selectedType = [];

const fetchApi = async () => {
  try {
    const res = await fetch(
      "https://65bb606a52189914b5bbe878.mockapi.io/items"
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status code: ${res.status}`);
    }

    const items = await res.json();
    items.sort((a, b) => a.priceEur - b.priceEur);
    foundedItems.innerText = items.length;
    itemsData = items;
    return items;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const toggleFavorite = async (itemId, isFavorite) => {
  try {
    const res = await fetch(
      `https://65bb606a52189914b5bbe878.mockapi.io/items/${itemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isFavorite }),
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to toggle favorite status. Status code: ${res.status}`
      );
    } else {
      console.log(
        `Item with id ${itemId} has been ${
          isFavorite ? "added to" : "removed from"
        } favorites.`
      );
      const cardDiv = document.querySelector(`[data-item-id="${itemId}"]`);
      updateStarIcon(cardDiv, isFavorite);

      const updatedItemsData = itemsData.map((item) => {
        if (item.id === itemId) {
          return { ...item, isFavorite };
        }
        return item;
      });

      itemsData = updatedItemsData;
    }
  } catch (error) {
    console.log(
      `Failed to toggle favorite status for item with id ${itemId}. Status code: ${error.status}`
    );
  }
};

const updateStarIcon = (starImage, isFavorite) => {
  const emptyStarIconPath = "./assets/empty_favorite_star_icon.svg";
  const fullStartIconPath = "./assets/full_favorite_star_icon.svg";

  const newIconSrc = isFavorite ? fullStartIconPath : emptyStarIconPath;

  starImage.setAttribute("src", newIconSrc);
};

const renderCards = (itemsArray) => {
  cardsContainer.innerHTML = "";

  itemsArray.forEach((item) => {
    const itemId = item.id;
    const isFavorite = item.isFavorite;

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("item-card");
    cardDiv.dataset.itemId = itemId;

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image-box");

    const leftBox = document.createElement("div");
    leftBox.classList.add("left-box");

    const imgUrl = document.createElement("img");
    imgUrl.src = item.imgUrl;

    const mainDiv = document.createElement("div");
    mainDiv.classList.add("main-box");

    const itemTitleDiv = document.createElement("div");
    itemTitleDiv.classList.add("item-title");

    const itemTitleHeading = document.createElement("h4");
    itemTitleHeading.innerText = `${item.brand} ${item.name} ${item.screenResolution} `;

    const specificationDiv = document.createElement("div");
    specificationDiv.classList.add("specification-box");

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

    const priceDiv = document.createElement("div");
    priceDiv.classList.add("price-box");

    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("description-box");

    const favoritePriceDiv = document.createElement("div");
    favoritePriceDiv.classList.add("favorite-price");

    const priceEurParagraph = document.createElement("p");
    priceEurParagraph.innerText = `\u20AC${item.priceEur} `;

    const favoriteStarImage = document.createElement("img");
    favoriteStarImage.src = isFavorite
      ? "./assets/full_favorite_star_icon.svg"
      : "./assets/empty_favorite_star_icon.svg";

    favoriteStarImage.addEventListener("click", async () => {
      await toggleFavorite(itemId, !item.isFavorite);

      item.isFavorite = !item.isFavorite;

      updateStarIcon(favoriteStarImage, item.isFavorite);
    });

    updateStarIcon(favoriteStarImage, isFavorite);

    const viewButton = document.createElement("button");
    viewButton.setAttribute("id", "view-btn");
    viewButton.innerText = "View product";

    const navigateToDescriptionPage = (itemId) => {
      const itemPageUrl = `./item-description-page/item-description.html?id=${itemId}`;
      window.location.href = itemPageUrl;
    };

    cardDiv.addEventListener("click", (event) => {
      const clickedButton = event.target.closest("#view-btn");
      const clickedImage = event.target.closest(".image-box");

      if (clickedButton) {
        localStorage.setItem("itemId", item.id);
        navigateToDescriptionPage(item.id);
      } else if (clickedImage) {
        localStorage.setItem("itemId", item.id);
        navigateToDescriptionPage(item.id);
      }
    });

    cardsContainer.append(cardDiv);
    leftBox.append(imageDiv, mainDiv);
    cardDiv.append(leftBox, priceDiv);
    imageDiv.append(imgUrl);
    mainDiv.append(itemTitleDiv, specificationDiv);
    itemTitleDiv.append(itemTitleHeading);
    specificationDiv.append(
      dateParagraph,
      screenParagraph,
      cpuParagraph,
      gpuParagraph,
      internalParagraph,
      locationParagraph
    );
    locationParagraph.append(locationSpan);
    priceDiv.append(descriptionDiv);
    descriptionDiv.append(favoritePriceDiv, viewButton);
    favoritePriceDiv.append(priceEurParagraph, favoriteStarImage);
  });
};

const initPage = async () => {
  const items = await fetchApi();
  console.log(items);
  renderCards(items);
};

const handleCheckboxChange = async () => {
  selectedType = Array.from(
    document.querySelectorAll('input[name="type"]:checked')
  ).map((checkbox) => checkbox.value);

  const selectedSortOption = sortSelectedElement.value;
  await filterAndRender(selectedType, selectedSortOption);
};

laptopCheckbox.addEventListener("change", handleCheckboxChange);
monitorCheckbox.addEventListener("change", handleCheckboxChange);
tabletCheckbox.addEventListener("change", handleCheckboxChange);
phoneCheckbox.addEventListener("change", handleCheckboxChange);

const filterAndRender = async (
  selectedType,
  selectedSortOption,
  showFavorites
) => {
  let filteredItems = [...itemsData];

  if (showFavorites) {
    filteredItems = filteredItems.filter((item) => item.isFavorite);
  } else if (selectedType.length > 0 && !selectedType.includes("All")) {
    filteredItems = filteredItems.filter((item) =>
      selectedType.includes(item.type)
    );
  }

  const sortingFunction = sortFunctions[selectedSortOption] || ((a, b) => 0);
  const sortedItems = filteredItems.sort(sortingFunction);

  renderCards(sortedItems);

  foundedItems.innerText = sortedItems.length;
};

const sortFunctions = {
  sortPriceAs: (a, b) => a.priceEur - b.priceEur,
  sortPriceDes: (a, b) => b.priceEur - a.priceEur,
  sortName: (a, b) => a.brand.localeCompare(b.brand),
};

sortSelectedElement.addEventListener("change", async () => {
  const selectedSortOption = sortSelectedElement.value;
  await filterAndRender(selectedType, selectedSortOption);
});

initPage();

loginButton.addEventListener("click", userLogin);
menuWrapper.addEventListener("click", () => {
  navbar.classList.toggle("navbar-active");
});

typeWrapper.addEventListener("click", () => {
  titleType.classList.toggle("title-type-active");

  const currentIconSrc = typeIconWrapper.getAttribute("src");
  const plusIconPath = "./assets/plus_icon.svg";
  const minusIconPath = "./assets/minus_round_icon.svg";

  const newIconSrc =
    currentIconSrc === plusIconPath ? minusIconPath : plusIconPath;

  typeIconWrapper.setAttribute("src", newIconSrc);
});

favoritesList.addEventListener("click", async () => {
  selectedType = ["All"];
  const selectedSortOption = sortSelectedElement.value;
  await filterAndRender(selectedType, selectedSortOption, true);
});

loginWrapper.addEventListener("click", openLoginModal);

loginModalButton.addEventListener("click", closeLoginModal);
sortSection.addEventListener("click", closeLoginModal);
mainSection.addEventListener("click", closeLoginModal);

sortSection.addEventListener("click", closeMenuWrapper);
mainSection.addEventListener("click", closeMenuWrapper);

sendFormButton.addEventListener("click", contactWindow);
