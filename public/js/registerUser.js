const errorMessageForm = document.querySelector("#error-message-form");
const incompletedForm = document.querySelector("#incompleted-form");
const registerButton = document.querySelector("#register"); // Obtén el botón

const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePasswordBtn");


togglePasswordBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password"

    passwordInput.type = isPassword ? "text" : "password"

    togglePasswordBtn.textContent = isPassword ? "🙈" : "👁️";

    togglePasswordBtn.setAttribute("aria-pressed", isPassword)

    togglePasswordBtn.setAttribute(
        "aria-label",
        isPassword ? "Ocultar contraseña" : "Mostrar contraseña"
    )
})

async function handleRegister() {
    errorMessageForm.style.display = "none";
    incompletedForm.style.display = "none";
    errorMessageForm.textContent = "";
    incompletedForm.textContent = "";

    const name = document.querySelector("#name").value;
    const city = document.querySelector("#city").value;
    const date = document.querySelector("#date").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;


    if (!email || !city || !password) {
        incompletedForm.textContent = "Todos los campos obligatorios (ciudad, email, contraseña) deben completarse.";
        incompletedForm.style.display = "block";
        return;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessageForm.textContent = "El formato del email no es valido.";
        errorMessageForm.style.display = "block";
        return;
    }


    if (password.length < 6) {
        errorMessageForm.textContent = "La contraseña debe tener al menos 8 caracteres.";
        errorMessageForm.style.display = "block";
        return;
    }

    registerButton.disabled = true;
    registerButton.value = "Registrando...";

    try {
        const data = { name, city, date, email, password };
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };
        const url = "/api/auth/register";

        let response = await fetch(url, opts);
        const responseData = await response.json();

        if (!response.ok) {
            errorMessageForm.textContent = responseData.message || "Error al registrar el usuario.";
            errorMessageForm.style.display = "block";
        } else {
            location.replace("/verify");
        }
    } catch (error) {
        console.error("Error al comunicarse con el servidor:", error);
        errorMessageForm.textContent = "Error inesperado. Intenta de nuevo.";
        errorMessageForm.style.display = "block";
    } finally {
        registerButton.disabled = false;
        registerButton.value = "Register";
    }
}

document.querySelector("#register").addEventListener("click", handleRegister);


document.querySelectorAll("#form-register input").forEach((input) => {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleRegister();
        }
    });
});

