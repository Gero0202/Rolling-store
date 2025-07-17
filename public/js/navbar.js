const isOnline = async () => {
    try {
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        const url = "/api/auth/online";
        let response = await fetch(url, opts);
        response = await response.json();

        const selector = document.querySelector("#button-signout");
        
        if (response.response?.user?.email) {
            selector.innerHTML = `
                <a href="/profile">PERFIL</a>
                <button id="signout-button">Sign Out</button>
                
            `;
            
            if(response.response.user.rol === "user"){
                const nav = document.querySelector("nav ul");
                const cart = document.createElement("li");
                cart.innerHTML = `
                    <li class="carrito">
                        <a href="/cart">
                        <i class="fa-solid fa-cart-shopping"></i>
                        </a>
                    </li>
                `
                nav.appendChild(cart);

            }

            if (response.response.user.rol === "admin") {
                const nav = document.querySelector("nav ul");
                const productLink = document.createElement("li");
                productLink.innerHTML = `<a href="/register-product">PRODUCTO NUEVO</a>`;
                nav.insertBefore(productLink, nav.children[3]);    
            }
            const signoutBtn = document.querySelector("#signout-button");
            if (signoutBtn) {
                signoutBtn.addEventListener("click", async () => {
                    try {
                        const opts = {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },

                        };
                        const url = "/api/auth/signout";
                        await fetch(url, opts);
                        location.replace("/");
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
        } else {
            selector.innerHTML = `
                <a href="/register">REGISTER</a>
                <a href="/login">LOGIN</a>
            `;
        }
    } catch (error) {
        console.log("Error catch", error);
    }
};



isOnline()