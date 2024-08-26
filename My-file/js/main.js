let nameContainer = document.querySelector(".name");
let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");

let emailContainer = document.querySelector(".email");
let email = document.querySelector(".email input");

let queryTypeContainer = document.querySelector(".query-type");
let typeInput = document.querySelectorAll(".query-type .input");

let messageContainer = document.querySelector(".message");
let message = document.querySelector(".message textarea");

let policyContainer = document.querySelector(".policy");
let policyInput = document.querySelector(".policy input");
let policyChecked = document.querySelector(".policy .input");

let successMessage = document.querySelector(".message-success");

let submitButton = document.querySelector(".submit");

typeInput.forEach((type) => {
  type.onclick = function () {
    for (let i = 0; i < typeInput.length; i++) {
      typeInput[i].classList.remove("clicked");
    }
    this.classList.add("clicked");
  };
});

policyChecked.onclick = function () {
  policyChecked.classList.toggle("clicked", policyInput.checked);
};

submitButton.onclick = function () {
  // Validation for full name
  let firstNameInput = firstName.value.trim();
  let lastNameInput = lastName.value.trim();

  let firstNameValid = validateFirstName(firstNameInput);
  let lastNameValid = validateLastName(lastNameInput); // Correct function call here

  // Clear previous errors
  clearErrors();

  // Validate first name
  if (!firstNameValid) {
    let firstNameP = document.createElement("p");
    firstNameP.classList.add("error");
    firstNameP.innerHTML =
      "This field is required and must start with an uppercase letter.";
    nameContainer.querySelector(".first").appendChild(firstNameP);
    nameContainer.querySelector(".first").classList.add("error");
  }

  // Validate last name
  if (!lastNameValid) {
    let lastNameP = document.createElement("p");
    lastNameP.classList.add("error");
    lastNameP.innerHTML =
      "This field is required and must start with an uppercase letter.";
    nameContainer.querySelector(".last").appendChild(lastNameP);
    nameContainer.querySelector(".last").classList.add("error");
  }

  // Validate email
  let emailInput = email.value.trim();
  let emailValid = validateEmail(emailInput);

  if (!emailValid) {
    let emailP = document.createElement("p");
    emailP.classList.add("error");
    emailP.innerHTML = "Please enter a valid email address.";
    emailContainer.appendChild(emailP);
    emailContainer.classList.add("error");
  }

  let typeInputValid = validateTypeInput();
  if (!typeInputValid) {
    let typeInputP = document.createElement("p");
    typeInputP.classList.add("error");
    typeInputP.innerHTML = "Please select a query type.";
    queryTypeContainer.appendChild(typeInputP);
    queryTypeContainer.classList.add("error");
  }

  let messageInput = message.value;
  let messageValid = validateMessage(messageInput);
  if (!messageValid) {
    let messageP = document.createElement("p");
    messageP.classList.add("error");
    messageP.innerHTML = "Please select a query type.";
    messageContainer.appendChild(messageP);
    messageContainer.classList.add("error");
  }

  let policyValid = 1;
  if (!policyChecked.classList.contains("clicked")) {
    let policyP = document.createElement("p");
    policyP.classList.add("error");
    policyP.innerHTML =
      "To submit this form, please consent to being contacted.";
    policyContainer.appendChild(policyP);
    policyContainer.classList.add("error");
    policyValid = 0;
  }

  // Show success message if all fields are valid
  if (
    firstNameValid &&
    lastNameValid &&
    emailValid &&
    typeInputValid &&
    messageValid &&
    policyValid
  ) {
    setTimeout(() => {
      successMessage.classList.add("show");
      setTimeout(() => {
        successMessage.classList.remove("show");
        window.location.reload();
      }, 6000);
    }, 0);
  }
};

// Function to clear all previous error messages
function clearErrors() {
  let errorMessages = document.querySelectorAll("p.error");
  errorMessages.forEach((error) => error.remove());

  let errorContainers = document.querySelectorAll(".error");
  errorContainers.forEach((container) => container.classList.remove("error"));
}

function validateFirstName(firstName) {
  // Check if the firstName is not empty, is only alphabetic, and starts with an uppercase letter.
  if (
    typeof firstName !== "string" ||
    firstName.length < 2 ||
    firstName.length > 50
  ) {
    return false;
  }

  // Regular expression to check for only letters and start with an uppercase letter.
  const nameRegex = /^[A-Z][a-zA-Z]*$/;
  return nameRegex.test(firstName);
}

function validateLastName(lastName) {
  // Check if the lastName is not empty, is only alphabetic, and starts with an uppercase letter.
  if (
    typeof lastName !== "string" ||
    lastName.length < 2 ||
    lastName.length > 50
  ) {
    return false;
  }

  // Regular expression to check for only letters and start with an uppercase letter.
  const nameRegex = /^[A-Z][a-zA-Z]*$/;
  return nameRegex.test(lastName);
}

function validateEmail(email) {
  // Regular expression to validate an email address.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regular expression.
  return emailRegex.test(email);
}

function validateTypeInput() {
  let bool = 0;
  typeInput.forEach((type) => {
    if (type.classList.contains("clicked")) bool = 1;
  });
  if (bool === 1) return true;
  else return false;
}

function validateMessage(message) {
  // "Message must be between 1 and 1000 characters and contain only letters, numbers, and basic punctuation."
  const regex = /^[a-zA-Z0-9 .,!?'-]{1,1000}$/;
  return regex.test(message);
}
