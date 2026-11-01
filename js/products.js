
// Mahsulotlarni localStorage'dan olish
let products = JSON.parse(localStorage.getItem("smartbiz_products")) || [
    { id: 1, name: "iPhone 15", category: "Telefon", price: 12000000, quantity: 8 },
    { id: 2, name: "Samsung S24", category: "Telefon", price: 10500000, quantity: 5 },
    { id: 3, name: "AirPods Pro", category: "Aksessuar", price: 2500000, quantity: 12 },
    { id: 4, name: "MacBook Air", category: "Noutbuk", price: 15000000, quantity: 3 }
];

// O'zgarishlarni saqlash
function saveProducts() {
    localStorage.setItem("smartbiz_products", JSON.stringify(products));
}

function renderProducts() {
    const content = document.getElementById("page-content");

    content.innerHTML = `
        <div class="products-header">
            <div>
                <h2>Mahsulotlar</h2>
                <p>Do‘kondagi barcha mahsulotlar</p>
            </div>
            <button class="add-btn" onclick="addProduct()">
                + Mahsulot qo‘shish
            </button>
        </div>

        <input
            type="text"
            id="search"
            class="search"
            placeholder="Mahsulot qidirish..."
            oninput="searchProducts()"
        >

        <div class="table-box">
            <table>
                <thead>
                    <tr>
                        <th>Mahsulot</th>
                        <th>Kategoriya</th>
                        <th>Narxi</th>
                        <th>Soni</th>
                        <th>Holati</th>
                        <th>Amallar</th>
                    </tr>
                </thead>
                <tbody id="product-list"></tbody>
            </table>
        </div>
    `;

    displayProducts(products);
}

function displayProducts(data) {
    const list = document.getElementById("product-list");

    list.innerHTML = data.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price.toLocaleString("uz-UZ")} so‘m</td>
            <td>${product.quantity}</td>
            <td>
                <span class="${product.quantity <= 5 ? "low-stock" : "in-stock"}">
                    ${product.quantity <= 5 ? "Kam qolgan" : "Mavjud"}
                </span>
            </td>
            <td>
                <button class="action-btn edit-btn"
                    onclick="editProduct(${product.id})">
                    ✏️ Tahrirlash
                </button>

                <button class="action-btn delete-btn"
                    onclick="deleteProduct(${product.id})">
                    🗑️ O‘chirish
                </button>
            </td>
        </tr>
    `).join("");
}

function searchProducts() {
    const value = document.getElementById("search").value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value)
    );

    displayProducts(filtered);
}

function addProduct() {
    const name = prompt("Mahsulot nomi:");
    if (!name || !name.trim()) return;

    const price = Number(prompt("Mahsulot narxi:"));
    if (!Number.isFinite(price) || price <= 0) {
        return alert("Narx noto‘g‘ri!");
    }

    const quantity = Number(prompt("Mahsulot soni:"));
    if (!Number.isInteger(quantity) || quantity < 0) {
        return alert("Soni noto‘g‘ri!");
    }

    const category = prompt("Kategoriya:") || "Boshqa";

    products.push({
        id: Date.now(),
        name: name.trim(),
        category: category.trim(),
        price,
        quantity
    });

    saveProducts();
    renderProducts();
}

function editProduct(id) {
    const product = products.find(item => item.id === id);
    if (!product) return;

    const name = prompt("Yangi nom:", product.name);
    if (!name || !name.trim()) return;

    const price = Number(prompt("Yangi narx:", product.price));
    if (!Number.isFinite(price) || price <= 0) {
        return alert("Narx noto‘g‘ri!");
    }

    const quantity = Number(prompt("Yangi soni:", product.quantity));
    if (!Number.isInteger(quantity) || quantity < 0) {
        return alert("Soni noto‘g‘ri!");
    }

    const category = prompt("Yangi kategoriya:", product.category);
    if (category === null) return;

    product.name = name.trim();
    product.price = price;
    product.quantity = quantity;
    product.category = category.trim() || "Boshqa";

    saveProducts();
    renderProducts();
}

function deleteProduct(id) {
    const confirmDelete = confirm("Bu mahsulotni o‘chirmoqchimisiz?");
    if (!confirmDelete) return;

    products = products.filter(product => product.id !== id);

    saveProducts();
    renderProducts();
}
