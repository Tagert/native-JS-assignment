"use strict";

const sortSection = document.querySelector(".sort-section");
const mainSection = document.querySelector(".main-section");
const footerSection = document.querySelector(".contact-footer");

const userLogin = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^.{6,}$/;

  const userName = document.getElementById("userName");
  const password = document.getElementById("password");
  const userNameValue = document.getElementById("userName").value;
  const passwordValue = document.getElementById("password").value;
  const errorElement = document.querySelector(".error");
  const userNameInfo = document.querySelector(".username-info");
  const passwordInfo = document.querySelector(".password-info");
  const loginCard = document.querySelector(".login-card");

  const isValidEmail = emailRegex.test(userNameValue);
  const isValidPassword = passwordRegex.test(passwordValue);

  const resetLoginWindow = () => {
    sortSection.classList.remove("blur");
    mainSection.classList.remove("blur");
    footerSection.classList.remove("blur");
    loginCard.classList.remove("active-login-card");
    userName.setAttribute("style", "border: 0.1rem solid black;");
    password.setAttribute("style", "border: 0.1rem solid black;");
    errorElement.textContent = "";
    userName.value = "";
    password.value = "";
    userNameInfo.textContent = "";
    passwordInfo.textContent = "";
  };

  if (isValidEmail && isValidPassword) {
    localStorage.setItem("userName", userNameValue);
    errorElement.textContent = "Login was successful.";
    errorElement.style.color = "green";
    setTimeout(resetLoginWindow, 2000);
  } else {
    errorElement.textContent = "";
  }

  if (userNameValue === "") {
    userNameInfo.textContent = "Please enter an email.";
    userNameInfo.style.color = "brown";
  } else if (!isValidEmail) {
    userNameInfo.textContent = "Please provide a properly formatted email.";
    userNameInfo.style.color = "brown";
  } else {
    userName.setAttribute("style", "border: 0.1rem solid green;");
    userNameInfo.textContent = "";
  }

  if (passwordValue === "") {
    passwordInfo.textContent = "Please enter a password.";
    passwordInfo.style.color = "brown";
  } else if (!isValidPassword) {
    passwordInfo.textContent = "Password must be at least 6 characters";
    passwordInfo.style.color = "brown";
  } else {
    password.setAttribute("style", "border: 0.1rem solid green;");
    passwordInfo.textContent = "";
  }
};

export { userLogin };
