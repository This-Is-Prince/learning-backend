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
/**
 * Form Submit
 */
signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let form = event.currentTarget as HTMLFormElement;
  let arr = [];
  let data = new FormData(form);
  // let registerObj = {
  //   fname: data.get("fname"),
  //   lname: data.get("lname"),
  //   age: Number(data.get("age")),
  //   email: data.get("email"),
  //   phone: Number(data.get("phone")),
  //   roll: Number(data.get("roll")),
  //   date: new Date(data.get("date")!),
  //   gender: '',
  // };

  return false;
});
