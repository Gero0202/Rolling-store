const addToCartBtn = document.getElementById("addToCartBtn");
const cartMessage = document.getElementById("cart-message");

if (addToCartBtn) {
    addToCartBtn.addEventListener("click", async () => {
        const productId = addToCartBtn.getAttribute("data-product-id");

        cartMessage.innerHTML = "";
        cartMessage.style.color = '#e6e6e6';

        //DESABILITAMOS BOTON + MENSAJE 
        addToCartBtn.disabled = true
        addToCartBtn.textContent = "Agregando..."

        if (!productId || typeof productId !== "string") {
            cartMessage.innerHTML = "<p style='color: #ffcc00;'>⚠️ ID de producto no válido.</p>";
            addToCartBtn.disabled = false
            addToCartBtn.textContent = "Agregar al carrito"
            return
        }

        try {
            const addResponse = await fetch(`/cart/add/${productId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ quantity: 1 })
            });

            const addData = await addResponse.text();
            if (addResponse.ok) {
                cartMessage.innerHTML = `<p style="color: #4CAF50;">${addData.message || "Producto agregado al carrito exitosamente."}</p>`;
            } else {
                cartMessage.innerHTML = `<p style="color: #ff0000;">Error: ${errorData.message || "No se pudo agregar el producto al carrito."}</p>`;
            }
        } catch (error) {
            console.error("Error al comunicarse con el servidor:", error)
            cartMessage.innerHTML = "<p style='color: red;'>Hubo un problema al agregar el producto.</p>";
        }finally{
            addToCartBtn.disabled = false
            addToCartBtn.textContent = "Agregar al carrito"
        }
    });
}


