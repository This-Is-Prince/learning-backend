const formDOM = document.querySelector(".form") as HTMLFormElement;
const usernameInputDOM = document.querySelector(
  ".username-input"
) as HTMLInputElement;
const passwordInputDOM = document.querySelector(
  ".password-input"
) as HTMLInputElement;
const formAlertDOM = document.querySelector(".form-alert") as HTMLDivElement;
const resultDOM = document.querySelector(".result") as HTMLDivElement;
const btnDOM = document.querySelector("#data") as HTMLButtonElement;
const tokenDOM = document.querySelector(".token") as HTMLParagraphElement;

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

    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = data.msg;

    formAlertDOM.classList.add("text-success");
    usernameInputDOM.value = "";
    passwordInputDOM.value = "";

    localStorage.setItem("token", data.token);
    resultDOM.innerHTML = "";
    tokenDOM.textContent = "token present";
    tokenDOM.classList.add("text-success");
  } catch (error: any) {
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = error.response.data.msg;
    localStorage.removeItem("token");
    resultDOM.innerHTML = "";
    tokenDOM.textContent = "no token present";
    tokenDOM.classList.remove("text-success");
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
    console.log(data);

    resultDOM.innerHTML = `<h5>${data.msg}</h5><p>${data.secret}</p>`;

    data.secret;
  } catch (error: any) {
    localStorage.removeItem("token");
    resultDOM.innerHTML = `<p>${error.response.data.msg}</p>`;
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
