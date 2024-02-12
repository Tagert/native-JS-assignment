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
    return items;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const renderCards = (itemsArray) => {
  cardsContainer.innerHTML = "";

  itemsArray.forEach((item) => {
    const itemId = item.id;

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("item-card");
    cardDiv.dataset.itemId = itemId;

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

    //redirect to another page
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

cardsContainer.addEventListener("click", async (event) => {
  const removeButton = event.target.closest(".btn");
  if (removeButton) {
    const cardDiv = removeButton.closest(".phone-card");
    const phoneId = cardDiv.dataset.phoneId;
    await deleteAndRefresh(phoneId);
  }
});

const initPage = async () => {
  const items = await fetchApi();
  console.log(items);
  renderCards(items);
};

// const userLogin = () => {
//   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   const passwordRegex = /^.{6,}$/;

//   const userName = document.getElementById("userName");
//   const password = document.getElementById("password");
//   const userNameValue = document.getElementById("userName").value;
//   const passwordValue = document.getElementById("password").value;
//   const errorElement = document.querySelector(".error");
//   const userNameInfo = document.querySelector(".username-info");
//   const passwordInfo = document.querySelector(".password-info");
//   const loginCard = document.querySelector(".login-card");

//   const isValidEmail = emailRegex.test(userNameValue);
//   const isValidPassword = passwordRegex.test(passwordValue);

//   const resetLoginWindow = () => {
//     loginCard.classList.remove("active-login-card");
//     userName.setAttribute("style", "border: 0.1rem solid black;");
//     password.setAttribute("style", "border: 0.1rem solid black;");
//     errorElement.textContent = "";
//     userName.value = "";
//     password.value = "";
//     userNameInfo.textContent = "";
//     passwordInfo.textContent = "";
//   };

//   if (isValidEmail && isValidPassword) {
//     localStorage.setItem("userName", userNameValue);
//     errorElement.textContent = "Login was successful.";
//     errorElement.style.color = "green";
//     setTimeout(resetLoginWindow, 2000);
//   } else {
//     errorElement.textContent = "";
//   }

//   if (userNameValue === "") {
//     userNameInfo.textContent = "Please enter an email.";
//     userNameInfo.style.color = "brown";
//   } else if (!isValidEmail) {
//     userNameInfo.textContent = "Please provide a properly formatted email.";
//     userNameInfo.style.color = "brown";
//   } else {
//     userName.setAttribute("style", "border: 0.1rem solid green;");
//     userNameInfo.textContent = "";
//   }

//   if (passwordValue === "") {
//     passwordInfo.textContent = "Please enter a password.";
//     passwordInfo.style.color = "brown";
//   } else if (!isValidPassword) {
//     passwordInfo.textContent = "Password must be at least 6 characters";
//     passwordInfo.style.color = "brown";
//   } else {
//     password.setAttribute("style", "border: 0.1rem solid green;");
//     passwordInfo.textContent = "";
//   }

//   return "test";
// };

initPage();
