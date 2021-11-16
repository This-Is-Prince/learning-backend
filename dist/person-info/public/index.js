"use strict";
/**
 * All Variables
 */
const signUpBtn = document.querySelector(".signUp");
// Remove login Token
const removeLoginToken = () => {
    localStorage.removeItem("login-token");
};
window.addEventListener("load", () => {
    let loginToken = localStorage.getItem("login-token");
    if (loginToken) {
        signUpBtn.classList.add("account");
        signUpBtn.innerHTML = `<i class="fas fa-user-circle"></i>`;
    }
    else {
        signUpBtn.classList.remove("account");
        signUpBtn.textContent = "sign up";
    }
});
