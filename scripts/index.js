// Esta es la base de datos de nuestros usuarios
const baseDeDatos = {
  usuarios: [
    {
      id: 1,
      name: "Steve Jobs",
      email: "steve@jobs.com",
      password: "Steve123",
    },
    {
      id: 2,
      name: "Ervin Howell",
      email: "shanna@melissa.tv",
      password: "Ervin345",
    },
    {
      id: 3,
      name: "Clementine Bauch",
      email: "nathan@yesenia.net",
      password: "Floppy39876",
    },
    {
      id: 4,
      name: "Patricia Lebsack",
      email: "julianne.oconner@kory.org",
      password: "MysuperPassword345",
    },
  ],
};

// ACTIVIDAD

// Paso a paso:

// 1) Al momento de que la persona inicia sesión, si las validaciones que ya tenemos implementadas
// han sido exitosas, deberemos almacenar la información del usuario en el LocalStorage.

// 2) Al mensaje de bienvenida que ya teníamos implementado, deberemos agregarle el nombre de la
// persona y un botón de "Cerrar Sesión".

// 3) Una vez iniciada la sesión, la misma se deberá mantener en ese estado para el caso de que la persona
// recargue la página. Para ello, deberás validar si existe información del usuario al momento en
// que se produce la carga de la página, y en base a dicha condción decidir que elementos mostrar.

// 3) Para el caso de que la persona haga click en el botón "Cerrar Sesión", se deberá eliminar
// la información del usuario, mostrar un mensaje indicando que se ha cerrado la sesión, y recargar
// la página para mostrar nuevamente el formulario de login.

/*
TIPS:
  - Para lograr los objetivos de este ejercicio, deberás valerte de algunos eventos y métodos que vimos en
    las clases anteriores. Te invitamos a que revises los recursos en caso de que tengas dudas, ya que allí
    encontrarás todas las respuestas que necesitas para completar la actividad.

  - Recuerda que puedes seleccionar y manipular los elementos del archivo index.html, usando los
    recursos que Javascript te ofrece para ello. Además, en el archivo styles.css tiene algunas clases y
    estilos predefinidos para ayudarte a completar la actividad.

  - Al momento de guardar información del usuario en el navegador, recuerda que debemos almacenar solo la
    información necesaria, y EN NINGUN CASO DEBEMOS GUARDAR LA CONTRASEÑA. Por ello, deberás seleccionar y
    separar la información que tienes que almacenar, a partir del objeto que contiene la información del
    usuario.

   ¡Manos a la obra!
 */

document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.querySelector(".login-btn");
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");
  const errorContainer = document.getElementById("error-container");
  const form = document.querySelector("form");
  const loader = document.getElementById("loader");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{5,}$/;

  const errorMessages = {
    email: "El email ingresado no es válido",
    password: "La contraseña debe tener al menos una mayúscula, un número y al menos 5 caracteres",
    authentication: "Los datos ingresados no corresponden a una persona registrada",
  };

  const showErrorMessage = (field) => {
    errorContainer.textContent = errorMessages[field];
    errorContainer.classList.add("error");
    errorContainer.classList.remove("hidden");
  };

  const hideErrorMessage = () => {
    errorContainer.classList.remove("error");
    errorContainer.classList.add("hidden");
  };

  const storeUserInLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const getUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  };

  const createUserInfoContainer = (user) => {
    const userInfoContainer = document.createElement("div");
    userInfoContainer.id = "user-info-container";
    const welcomeMessage = document.createElement("p");
    welcomeMessage.textContent = `¡Bienvenido al sitio, ${user.name}!`;
    const logoutButton = document.createElement("button");
    logoutButton.textContent = "Cerrar Sesión";
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("user");
      location.reload();
    });
    userInfoContainer.appendChild(welcomeMessage);
    userInfoContainer.appendChild(logoutButton);
    return userInfoContainer;
  };

  const renderLoggedInState = (user) => {
    const userInfoContainer = createUserInfoContainer(user);
    const mainElement = document.querySelector("main");
    mainElement.appendChild(userInfoContainer); // Agregamos el contenedor al <main>
    form.classList.add("hidden");
  };

  const authenticateUser = () => {
    hideErrorMessage();

    const emailValid = emailRegex.test(emailInput.value);
    const passwordValid = passwordRegex.test(passwordInput.value);

    if (emailValid && passwordValid) {
      const authenticatedUser = baseDeDatos.usuarios.find(
        (user) => user.email === emailInput.value && user.password === passwordInput.value
      );

      if (authenticatedUser) {
        storeUserInLocalStorage(authenticatedUser);
        form.classList.add("hidden");
        loader.classList.remove("hidden");
        setTimeout(() => {
          loader.classList.add("hidden");
          const storedUser = getUserFromLocalStorage();
          if (storedUser) {
            renderLoggedInState(storedUser);
          }
        }, 3000);
      } else {
        showErrorMessage("authentication");
      }
    } else if (!emailValid) {
      showErrorMessage("email");
    } else if (!passwordValid) {
      showErrorMessage("password");
    }
  };

  const init = () => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      renderLoggedInState(storedUser);
    } else {
      loginButton.addEventListener("click", authenticateUser);
    }
  };

  init();
});
