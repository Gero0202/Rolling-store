const socket = io()

socket.on("products", data => {
    const productsContainer = document.querySelector("#products");

    if (productsContainer) {
        const productsTemplate = data.map(each => ` 
             <div class="product">
                <img src="${each.thumbnails[0]  ? each.thumbnails : 'https://i.pinimg.com/736x/00/22/f7/0022f79582483ded38a7011bc101f34a.jpg'}" alt="${each.title}">
                <h2>${each.title}</h2>
                <p><strong>Stock:</strong> ${each.stock}</p>
                <p><strong>Precio:</strong> $${each.price}</p>
                <p><strong>Categoría:</strong> ${each.category}</p>
            </div>
        `).join("");
        productsContainer.innerHTML = productsTemplate;
    } else {
        console.error('No se encontró el contenedor #products');
    }
})

document.querySelector("#register").addEventListener("click", async () =>{
    const title = document.querySelector("#title").value;
    const price = parseFloat(document.querySelector("#price").value); 
    const thumbnails = document.querySelector("#thumbnails").value;
    const stock = parseInt(document.querySelector("#stock").value, 10);
    const category = document.querySelector("#category").value;
    const categoryError = document.getElementById("category-error");

    const validCategories = ['vinilo', 'cd'];
    if (!validCategories.includes(category.toLowerCase())) {
        categoryError.textContent = "Las categorias válidas son vinilo y cd.";
        categoryError.style.display = "block";
        return;
    } else {
        categoryError.style.display = "none";
    }

    const product = {
        title,
        price,
        thumbnails,
        stock,
        category
    }
    socket.emit("new-product", product)

    document.querySelector("#title").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#thumbnails").value = "";
    document.querySelector("#stock").value = "";
    document.querySelector("#category").value = "";
  
})