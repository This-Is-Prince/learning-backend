/**
 * All Variables
 */
const signUpBtn = document.querySelector(".signUp") as HTMLButtonElement;
const signUpForm = document.querySelector(".sign-up-form") as HTMLFormElement;
const frontPageInst = document.querySelector(
  ".front-page-ins"
) as HTMLHeadingElement;

// Remove login Token
const removeLoginToken = () => {
  localStorage.removeItem("login-token");
};

window.addEventListener("load", () => {
  let loginToken = localStorage.getItem("login-token");
  if (loginToken) {
    signUpBtn.classList.add("account");
    signUpBtn.innerHTML = `<i class="fas fa-user-circle"></i>`;
  } else {
    signUpBtn.classList.remove("account");
    signUpBtn.textContent = "sign up";
  }
});
signUpBtn.addEventListener("click", () => {
  frontPageInst.classList.add("hide");
  signUpForm.classList.remove("hide");
});
