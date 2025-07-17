const verifyError = document.querySelector("#error-verify")
const verifyFormError = document.querySelector("#error-verify-form")

document.querySelector("#verify").addEventListener("click", async () => {
    try {
        const verifyCode = document.querySelector("#verifyCode").value.trim()
        const email = document.querySelector("#email").value.trim()

        if(!verifyCode || !email){
            verifyFormError.textContent = "Completar todos los campos"
            verifyFormError.style.display = "block"
            return
        }

        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, code: verifyCode })
        }

        const url = "/api/auth/verify"
        let response = await fetch(url, opts)
        response = await response.json()
        
        if (response.error) {
            verifyError.textContent = "Codigo incorrecto o ya expirado"
            verifyError.style.display = "block"
        }else{
        location.replace("/login")
        }
    } catch (error) {
        verifyError.textContent = "Error inesperado. Vuelva a intentarlo"
        verifyError.style.display = "block"
    }
})