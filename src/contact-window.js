"use strict";

const contactWindow = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const messageInputRegex = /^.{5,}$/;

  const email = document.getElementById("email");
  const messageInput = document.getElementById("messageInput");
  const emailValue = document.getElementById("email").value;
  const messageInputValue = document.getElementById("messageInput").value;
  const errorMessage = document.querySelector(".errorMessage");

  const isValidEmail = emailRegex.test(emailValue);
  const isValidMessage = messageInputRegex.test(messageInputValue);

  const resetLoginWindow = () => {
    email.setAttribute("style", "border: 0.1rem solid black;");
    messageInput.setAttribute("style", "border: 0.1rem solid black;");
    errorMessage.textContent = "";
    email.value = "";
    messageInput.value = "";
  };

  if (isValidEmail && isValidMessage) {
    errorMessage.textContent = "Sent.";
    errorMessage.style.color = "green";
    messageInput.setAttribute("style", "border: 0.1rem solid green;");
    setTimeout(resetLoginWindow, 2000);
    console.log(errorMessage);
  } else {
    errorMessage.textContent = "";
  }

  if (emailValue === "") {
    errorMessage.textContent = "Please enter an email.";
    errorMessage.style.color = "brown";
  } else if (!isValidEmail) {
    errorMessage.textContent = "Use @ and .com";
    errorMessage.style.color = "brown";
  } else {
    email.setAttribute("style", "border: 0.1rem solid green;");
    errorMessage.textContent = "";
  }
};

export { contactWindow };
