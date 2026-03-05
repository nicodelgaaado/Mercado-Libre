// Arreglo base de productos para la busqueda dinamica.
const products = [
    { id: 1, name: "Laptop Lenovo IdeaPad 15", category: "Computacion", brand: "Lenovo", price: "$2.399.900" },
    { id: 2, name: "Celular Samsung Galaxy A55", category: "Celulares", brand: "Samsung", price: "$1.699.900" },
    { id: 3, name: "Auriculares inalambricos Sony WH-CH520", category: "Audio", brand: "Sony", price: "$249.900" },
    { id: 4, name: "Smart TV LG 50 pulgadas 4K", category: "Televisores", brand: "LG", price: "$1.999.900" },
    { id: 5, name: "Mouse Logitech G305", category: "Accesorios", brand: "Logitech", price: "$169.900" },
    { id: 6, name: "Silla ergonomica de oficina", category: "Hogar", brand: "HomePro", price: "$589.900" },
    { id: 7, name: "Consola PlayStation 5", category: "Videojuegos", brand: "Sony", price: "$2.999.900" },
    { id: 8, name: "Cafetera Nespresso Essenza Mini", category: "Electrodomesticos", brand: "Nespresso", price: "$459.900" }
];

const startShoppingButton = document.getElementById("startShoppingButton");
const productSearchInput = document.getElementById("productSearchInput");
const productsContainer = document.getElementById("productsContainer");
const productsSection = document.getElementById("productos-buscador");

// Crea cada tarjeta de producto en el DOM usando createElement().
function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "product-card";

    const title = document.createElement("h3");
    title.className = "product-card-title";
    title.textContent = product.name;

    const details = document.createElement("p");
    details.className = "product-card-description";
    details.textContent = `Categoria: ${product.category} | Marca: ${product.brand}`;

    const price = document.createElement("strong");
    price.className = "product-card-price";
    price.textContent = product.price;

    card.appendChild(title);
    card.appendChild(details);
    card.appendChild(price);

    return card;
}

// Renderiza resultados y estado vacio de la busqueda.
function renderProducts(productList) {
    productsContainer.innerHTML = "";

    if (productList.length === 0) {
        const emptyState = document.createElement("p");
        emptyState.className = "products-empty-state";
        emptyState.textContent = "No se encontraron productos para tu busqueda.";
        productsContainer.appendChild(emptyState);
        return;
    }

    productList.forEach((product) => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

// Filtra productos con filter() e includes() por nombre, categoria o marca.
function filterProducts(searchTerm) {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    if (!normalizedTerm) {
        return products;
    }

    return products.filter((product) => {
        return (
            product.name.toLowerCase().includes(normalizedTerm) ||
            product.category.toLowerCase().includes(normalizedTerm) ||
            product.brand.toLowerCase().includes(normalizedTerm)
        );
    });
}

// Desplaza al usuario a la seccion de productos al hacer click en el CTA.
function handleStartShoppingClick() {
    productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Escucha cambios del input y actualiza resultados en tiempo real.
function handleSearchInput(event) {
    const filteredProducts = filterProducts(event.target.value);
    renderProducts(filteredProducts);
}

// Inicializa eventos y primer render sin afectar otras secciones.
function initProductSearch() {
    if (!startShoppingButton || !productSearchInput || !productsContainer || !productsSection) {
        return;
    }

    startShoppingButton.addEventListener("click", handleStartShoppingClick);
    productSearchInput.addEventListener("input", handleSearchInput);

    renderProducts(products);
}

initProductSearch();
