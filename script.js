"use strict";
const cardsContainer = document.querySelector(".cards-container");
const foundedItems = document.getElementById("foundItems");

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
    // phonesData = phones;
    return items;
  } catch (error) {
    console.error(error);
    return [];
  }
};

//   const deleteAndRefresh = async (phoneId) => {
//     try {
//       const res = await fetch(
//         `https://65bb606a52189914b5bbe878.mockapi.io/phones/${phoneId}`,
//         { method: "DELETE" }
//       );

//       if (!res.ok) {
//         throw new Error(
//           `Failed to delete phone with id ${phoneId}. Status code: ${res.status}`
//         );
//       }

//       console.log(`Phone with id ${phoneId} has been deleted.`);
//       await initPage();
//     } catch (error) {
//       console.error(error);
//     }
//   };

const initPage = async () => {
  const items = await fetchApi();
  console.log(items);
  renderCards(items);
};

const renderCards = (itemsArray) => {
  cardsContainer.innerHTML = "";

  itemsArray.forEach((item) => {
    const itemId = item.id;

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("item-card");
    cardDiv.dataset.itemId = itemId;

    // cardDiv.addEventListener("mouseenter", () => {
    //   techSpecLinkA.style.display = "block";
    //   removeButton.style.display = "flex";
    // });

    // cardDiv.addEventListener("mouseleave", () => {
    //   techSpecLinkA.style.display = "none";
    //   removeButton.style.display = "none";
    // });

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image-box");

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
    locationParagraph.innerText = `Location: ${item.location}`;

    const priceDiv = document.createElement("div");
    priceDiv.classList.add("price-box");

    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("description-box");

    const priceEurParagraph = document.createElement("p");
    priceEurParagraph.innerText = `\u20AC${item.priceEur} `;

    const viewButton = document.createElement("button");
    viewButton.setAttribute("id", "view-btn");
    viewButton.innerText = "View product";

    cardsContainer.append(cardDiv);
    cardDiv.append(imageDiv, mainDiv, priceDiv);
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
    priceDiv.append(descriptionDiv);
    descriptionDiv.append(priceEurParagraph, viewButton);
  });
};

initPage();
