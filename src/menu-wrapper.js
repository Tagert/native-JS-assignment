"use strict";

const navbar = document.querySelector(".navbar");
const sortSection = document.querySelector(".sort-section");
const mainSection = document.querySelector(".main-section");
const footerSection = document.querySelector(".contact-footer");
const loginCard = document.querySelector(".login-card");

const openLoginModal = () => {
  navbar.classList.remove("navbar-active");
  sortSection.classList.toggle("blur");
  mainSection.classList.toggle("blur");
  footerSection.classList.toggle("blur");
  loginCard.classList.toggle("active-login-card");

  loginCard.style.filter = "blur(0)";
};

const closeLoginModal = () => {
  sortSection.classList.remove("blur");
  mainSection.classList.remove("blur");
  footerSection.classList.remove("blur");
  loginCard.classList.remove("active-login-card");
};

const closeMenuWrapper = () => {
  navbar.classList.remove("navbar-active");
};

export { openLoginModal, closeLoginModal, closeMenuWrapper };
