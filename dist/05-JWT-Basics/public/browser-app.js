"use strict";
const formDOM = document.querySelector(".form");
const usernameInputDOM = document.querySelector(".username-input");
const passwordInputDOM = document.querySelector(".password-input");
const formAlertDOM = document.querySelector(".form-alert");
const resultDOM = document.querySelector(".result");
const btnDOM = document.querySelector("#data");
const tokenDOM = document.querySelector(".token");
formDOM.addEventListener("submit", async (e) => {
    formAlertDOM.classList.remove("text-success");
    tokenDOM.classList.remove("text-success");
    e.preventDefault();
    const username = usernameInputDOM.value;
    const password = passwordInputDOM.value;
    try {
        const response = await fetch("/api/v1/login", {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        const data = await response.json();
        if (response.status !== 200) {
            formAlertDOM.style.display = "block";
            formAlertDOM.textContent = data.msg;
            localStorage.removeItem("token");
            resultDOM.innerHTML = "";
            tokenDOM.textContent = "no token present";
            tokenDOM.classList.remove("text-success");
        }
        else {
            formAlertDOM.style.display = "block";
            formAlertDOM.textContent = data.msg;
            formAlertDOM.classList.add("text-success");
            usernameInputDOM.value = "";
            passwordInputDOM.value = "";
            localStorage.setItem("token", data.token);
            resultDOM.innerHTML = "";
            tokenDOM.textContent = "token present";
            tokenDOM.classList.add("text-success");
        }
    }
    catch (error) {
        console.log(error);
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
    }, 2000);
});
btnDOM.addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch("/api/v1/dashboard", {
            method: "GET",
            headers: new Headers({ Authorization: `Bearer ${token}` }),
        });
        const data = await response.json();
        if (response.status !== 200) {
            localStorage.removeItem("token");
            resultDOM.innerHTML = `<p>${data.msg}</p>`;
        }
        else {
            resultDOM.innerHTML = `<h5>${data.msg}</h5><p>${data.secret}</p>`;
        }
    }
    catch (error) {
        console.log(error);
    }
});
const checkToken = () => {
    tokenDOM.classList.remove("text-success");
    const token = localStorage.getItem("token");
    if (token) {
        tokenDOM.textContent = "token present";
        tokenDOM.classList.add("text-success");
    }
};
checkToken();
