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
  signUpBtn.innerHTML = ``;
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
interface RegisteredObjectType {
  [key: string]: string | Date | number;
}
signUpForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let form = event.currentTarget as HTMLFormElement;
  let elements = form.elements;
  let registeredObject: RegisteredObjectType = {};

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i] as HTMLInputElement;
    let name = element.name;
    let value = element.value;
    let type = element.type;
    if (type === "radio") {
      if (element.checked) {
        registeredObject[name] = value;
      }
    } else if (type === "date") {
      registeredObject[name] = new Date(value);
    } else if (name === "age") {
      registeredObject[name] = Number(value);
    } else if (type !== "submit") {
      registeredObject[name] = value;
    }
  }
  try {
    const response = await fetch("/api/v1/signup", {
      method: "POST",
      body: JSON.stringify(registeredObject),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    const data = await response.json();
    if (response.status === 201) {
      signUpForm.classList.add("hide");
      signUpBtn.innerHTML = ``;
      signUpBtn.classList.add("account");
      signUpBtn.innerHTML = `<i class="fas fa-user-circle"></i>`;
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(error);
  }
  return false;
});
