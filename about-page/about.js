"use strict";

import { userLogin } from "../src/user-login.js";
import {
  openLoginModal,
  closeLoginModal,
  closeMenuWrapper,
} from "../src/menu-wrapper.js";
import { contactWindow } from "../src/contact-window.js";

const sendFormButton = document.getElementById("formBtn");
const loginButton = document.getElementById("loginBtn");
const menuWrapper = document.querySelector(".menu-wrapper");
const loginModalButton = document.getElementById("loginCloseBtn");
const sortSection = document.querySelector(".sort-section");
const mainSection = document.querySelector(".main-section");
const navbar = document.querySelector(".navbar");

loginButton.addEventListener("click", userLogin);
menuWrapper.addEventListener("click", () => {
  navbar.classList.toggle("navbar-active");
});

loginWrapper.addEventListener("click", openLoginModal);

loginModalButton.addEventListener("click", closeLoginModal);
sortSection.addEventListener("click", closeLoginModal);
mainSection.addEventListener("click", closeLoginModal);

sortSection.addEventListener("click", closeMenuWrapper);
mainSection.addEventListener("click", closeMenuWrapper);

sendFormButton.addEventListener("click", contactWindow);
