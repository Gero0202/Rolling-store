const errorMessageLog = document.querySelector("#error-message-login")

const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePasswordBtn");


togglePasswordBtn.addEventListener("click", () =>{
    const isPassword = passwordInput.type === "password"

    passwordInput.type = isPassword ? "text" : "password"

    togglePasswordBtn.textContent = isPassword ? "🙈" : "👁️";

    togglePasswordBtn.setAttribute("aria-pressed", isPassword)

    togglePasswordBtn.setAttribute(
        "aria-label",
        isPassword ? "Ocultar contraseña" : "Mostrar contraseña"
    )
})


// Función que maneja el login (extraida para usar en click y en Enter)
async function handleLogin() {
    try {
        const data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        };

        if (!data.password || typeof data.password !== "string" || !data.email || typeof data.email !== "string") {
            errorMessageLog.textContent = "Campos incompletos o invalidos.";
            errorMessageLog.style.display = "block";
            return;
        }

        
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };
        const url = "/api/auth/login";
        let response = await fetch(url, opts);

        if (!response.ok) {
            // Manejo error HTTP
            if (response.status === 429) {
                errorMessageLog.textContent = "Demasiados intentos. Intenta más tarde.";
            } else {
                errorMessageLog.textContent = "Error al ingresar";
            }
            errorMessageLog.style.display = "block";
        } else {
            const responseData = await response.json();
            if (responseData.error) {
                errorMessageLog.textContent = "Error al ingresar";
                errorMessageLog.style.display = "block";
            } else {
                location.replace("/");
            }
        }
    } catch (error) {
        console.log(error);
        errorMessageLog.textContent = "Error inesperado intenta de nuevo";
        errorMessageLog.style.display = "block";
    }
}


document.querySelector("#login").addEventListener("click", () => {
    handleLogin();
});

document.querySelectorAll("#email, #password").forEach((input) => {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleLogin();
        }
    });
});


document.querySelector("#go-to-verify").addEventListener("click", () => {
    location.href = "/verify";
});