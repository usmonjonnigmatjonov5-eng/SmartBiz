let products = JSON.parse(localStorage.getItem("smartbiz_products")) || [
    { id: 1, name: "iPhone 15", category: "Telefon", price: 12000000, quantity: 8 },
    { id: 2, name: "Samsung S24", category: "Telefon", price: 10500000, quantity: 5 },
    { id: 3, name: "AirPods Pro", category: "Aksessuar", price: 2500000, quantity: 12 },
    { id: 4, name: "MacBook Air", category: "Noutbuk", price: 15000000, quantity: 3 }
];

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
    const content = document.getElementById("page-content");

    content.insertAdjacentHTML("beforeend", `
        <div class="modal-overlay" id="product-modal">
            <div class="modal-box">
                <h2>Yangi mahsulot qo‘shish</h2>
                <p class="modal-description">Mahsulot ma’lumotlarini kiriting</p>

                <form onsubmit="saveNewProduct(event)">
                    <label>Mahsulot nomi</label>
                    <input type="text" id="new-product-name"
                        placeholder="Masalan: iPhone 16" required>

                    <label>Kategoriya</label>
                    <select id="new-product-category" required>
                        <option value="">Kategoriyani tanlang</option>
                        <option value="Telefon">Telefon</option>
                        <option value="Noutbuk">Noutbuk</option>
                        <option value="Aksessuar">Aksessuar</option>
                        <option value="Boshqa">Boshqa</option>
                    </select>

                    <label>Narxi (so‘m)</label>
                    <input type="number" id="new-product-price"
                        placeholder="Masalan: 12000000" min="1" required>

                    <label>Mahsulot soni</label>
                    <input type="number" id="new-product-quantity"
                        placeholder="Masalan: 10" min="0" required>

                    <div class="modal-actions">
                        <button type="button" class="cancel-btn"
                            onclick="closeProductModal()">Bekor qilish</button>
                        <button type="submit" class="add-btn">Saqlash</button>
                    </div>
                </form>
            </div>
        </div>
    `);
}

function saveNewProduct(event) {
    event.preventDefault();

    const name = document.getElementById("new-product-name").value.trim();
    const category = document.getElementById("new-product-category").value;
    const price = Number(document.getElementById("new-product-price").value);
    const quantity = Number(document.getElementById("new-product-quantity").value);

    if (!name || !category || !Number.isFinite(price) || price <= 0 ||
        !Number.isInteger(quantity) || quantity < 0) {
        alert("Ma’lumotlarni to‘g‘ri kiriting!");
        return;
    }

    products.push({
        id: Date.now(),
        name,
        category,
        price,
        quantity
    });

    saveProducts();
    renderProducts();

    alert("Mahsulot muvaffaqiyatli qo‘shildi!");
}

function closeProductModal() {
    document.getElementById("product-modal")?.remove();
}

function editProduct(id) {
    const product = products.find(item => item.id === id);
    if (!product) return;

    const content = document.getElementById("page-content");

    content.insertAdjacentHTML("beforeend", `
        <div class="modal-overlay" id="edit-product-modal">
            <div class="modal-box">
                <h2>Mahsulotni tahrirlash</h2>
                <p class="modal-description">Ma’lumotlarni yangilang</p>

                <form onsubmit="saveEditedProduct(event, ${product.id})">
                    <label>Mahsulot nomi</label>
                    <input type="text" id="edit-name"
                        value="${product.name}" required>

                    <label>Kategoriya</label>
                    <select id="edit-category" required>
                        ${["Telefon", "Noutbuk", "Aksessuar", "Boshqa"].map(category => `
                            <option value="${category}"
                                ${product.category === category ? "selected" : ""}>
                                ${category}
                            </option>
                        `).join("")}
                    </select>

                    <label>Narxi (so‘m)</label>
                    <input type="number" id="edit-price"
                        value="${product.price}" min="1" required>

                    <label>Mahsulot soni</label>
                    <input type="number" id="edit-quantity"
                        value="${product.quantity}" min="0" required>

                    <div class="modal-actions">
                        <button type="button" class="cancel-btn"
                            onclick="closeEditProductModal()">
                            Bekor qilish
                        </button>
                        <button type="submit" class="add-btn">
                            Saqlash
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `);
}

function saveEditedProduct(event, id) {
    event.preventDefault();

    const product = products.find(item => item.id === id);
    if (!product) return;

    const name = document.getElementById("edit-name").value.trim();
    const category = document.getElementById("edit-category").value;
    const price = Number(document.getElementById("edit-price").value);
    const quantity = Number(document.getElementById("edit-quantity").value);

    if (!name || !category || !Number.isFinite(price) || price <= 0 ||
        !Number.isInteger(quantity) || quantity < 0) {
        alert("Ma’lumotlarni to‘g‘ri kiriting!");
        return;
    }

    product.name = name;
    product.category = category;
    product.price = price;
    product.quantity = quantity;

    saveProducts();
    closeEditProductModal();
    renderProducts();

    alert("Mahsulot muvaffaqiyatli tahrirlandi!");
}

function closeEditProductModal() {
    document.getElementById("edit-product-modal")?.remove();
}

function deleteProduct(id) {
    if (!confirm("Bu mahsulotni o‘chirmoqchimisiz?")) return;

    products = products.filter(product => product.id !== id);

    saveProducts();
    renderProducts();

    alert("Mahsulot o‘chirildi!");
}
