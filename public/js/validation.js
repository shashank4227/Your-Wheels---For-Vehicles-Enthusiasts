function ValidateLoginForm() {
  RemoveAllErrorMessage();

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var PasswordValidationMessage;
  var emailValidationMessage;

  emailValidationMessage = isValidEmail(email);
  if (emailValidationMessage != "valid") {
    ShowErrorMessage("email", emailValidationMessage);
    return false;
  }

  PasswordValidationMessage = isValidPassword(password);
  if (PasswordValidationMessage != "valid") {
    ShowErrorMessage("password", PasswordValidationMessage);
    return false;
  }

  return true;
}

function ValidateRegistrationForm() {
  RemoveAllErrorMessage();

  var username = document.getElementById("userame").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  var PasswordValidationMessage;
  var ConfirmPasswordMessage;
  var emailValidationMessage;

  if (username == "") {
    ShowErrorMessage("username", "Please fill the filed.");
    return false;
  } else if (username.length < 3 || username.length > 20) {
    ShowErrorMessage(
      "RegiName",
      "Name should be minimum 3 and maximum 20 characters long."
    );
    return false;
  }

  emailValidationMessage = isValidEmail(email);

  if (emailValidationMessage != "valid") {
    ShowErrorMessage("email", emailValidationMessage);
    return false;
  }

  PasswordValidationMessage = isValidPassword(password);
  if (PasswordValidationMessage != "valid") {
    ShowErrorMessage("password", PasswordValidationMessage);
    return false;
  }

  ConfirmPasswordMessage = isValidPassword(confirmPassword);
  if (ConfirmPasswordMessage != "valid") {
    ShowErrorMessage("confirmPassword", ConfirmPasswordMessage);
    return false;
  }

  if (password != confirmPassword) {
    ShowErrorMessage("confirmPassword", "Password not match.");
    return false;
  }

  return true;
}

function RemoveAllErrorMessage() {
  var allErrorMessage = document.getElementsByClassName("error-message");
  var allErrorFiled = document.getElementsByClassName("error-input");
  var i;

  for (i = allErrorMessage.length - 1; i >= 0; i--) {
    allErrorMessage[i].remove();
  }

  for (i = allErrorFiled.length - 1; i >= 0; i--) {
    allErrorFiled[i].classList.remove("error-input");
  }
}

function ShowErrorMessage(InputBoxID, Message) {
  var InputBox = document.getElementById(InputBoxID);
  InputBox.classList.add("error-input");
  InputBox.focus();

  var ErrorMessageElement = document.createElement("p");
  ErrorMessageElement.innerHTML = Message;
  ErrorMessageElement.classList.add("error-message");
  ErrorMessageElement.setAttribute("id", InputBoxID + "-error");

  InputBox.parentNode.insertBefore(ErrorMessageElement, InputBox.nextSibling);
}

function isValidEmail(loginEmail) {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (loginEmail == "") {
    return "Please fill the field.";
  }

  if (emailRegex.test(loginEmail) == false) {
    return "This is not a valid email.";
  }

  return "valid";
}

function isValidPassword(loginPassword) {
  const minLength = 8;
  const maxLength = 32;
  const letterNumberRegexSpecialChar =
    /^(?=.[a-zA-Z])(?=.\d)(?=.[!@#$%^&])[a-zA-Z\d!@#$%^&*]{8,}$/;

  if (loginPassword == "") {
    return "Please fill the field.";
  }

  if (loginPassword.length < minLength || loginPassword.length > maxLength) {
    return "Password length should be minimum 8 & maximum 32 characters.";
  }

  if (!letterNumberRegexSpecialChar.test(loginPassword)) {
    return "Password should contain alphabetic, numeric and special characters.";
  }
  return "valid";
}
