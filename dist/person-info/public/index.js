"use strict";
/**
 * All Variables
 */
const signUpBtn = document.querySelector(".signUp");
const signUpForm = document.querySelector(".sign-up-form");
const frontPageInst = document.querySelector(".front-page-ins");
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
    }
    else {
        signUpBtn.classList.remove("account");
        signUpBtn.textContent = "sign up";
    }
});
signUpBtn.addEventListener("click", () => {
    frontPageInst.classList.add("hide");
    signUpForm.classList.remove("hide");
});
signUpForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let form = event.currentTarget;
    let elements = form.elements;
    let registeredObject = {};
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        let name = element.name;
        let value = element.value;
        if (element.type === "radio") {
            if (element.checked) {
                registeredObject[name] = value;
            }
        }
        else if (element.type === "date") {
            registeredObject[name] = new Date(value);
        }
        else if (name === "age") {
            registeredObject[name] = Number(value);
        }
        else {
            registeredObject[name] = value;
        }
    }
    console.log(registeredObject);
    try {
        const response = await fetch("/signup", {
            method: "POST",
            body: JSON.stringify(registeredObject),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        const data = await response.json();
        if (response.status === 202) {
            signUpForm.classList.add("hide");
            signUpBtn.innerHTML = ``;
            signUpBtn.classList.add("account");
            signUpBtn.innerHTML = `<i class="fas fa-user-circle"></i>`;
        }
        else {
            console.log("error");
        }
    }
    catch (error) {
        console.log(error);
    }
    return false;
});
