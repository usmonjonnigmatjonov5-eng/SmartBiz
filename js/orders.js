let orders = JSON.parse(localStorage.getItem("smartbiz_orders")) || [
    {
        id: 1,
        customer: "Ali",
        product: "iPhone 15",
        productId: 1,
        quantity: 1,
        price: 12000000,
        status: "Kutilmoqda"
    },
    {
        id: 2,
        customer: "Vali",
        product: "Samsung S24",
        productId: 2,
        quantity: 2,
        price: 10500000,
        status: "Bajarildi"
    }
];

function saveOrders() {
    localStorage.setItem("smartbiz_orders", JSON.stringify(orders));
}

function renderOrders() {
    const content = document.getElementById("page-content");

    content.innerHTML = `
        <div class="products-header">
            <div>
                <h2>Buyurtmalar ro‘yxati</h2>
                <p>Barcha buyurtmalarni boshqaring</p>
            </div>
            <button class="add-btn" onclick="addOrder()">
                + Buyurtma qo‘shish
            </button>
        </div>

        <div class="table-box">
            <table>
                <thead>
                    <tr>
                        <th>Mijoz</th>
                        <th>Mahsulot</th>
                        <th>Soni</th>
                        <th>Umumiy narx</th>
                        <th>Holati</th>
                        <th>Amallar</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.map(order => `
                        <tr>
                            <td>${order.customer}</td>
                            <td>${order.product}</td>
                            <td>${order.quantity}</td>
                            <td>${(order.price * order.quantity).toLocaleString("uz-UZ")} so‘m</td>
                            <td>
                                <span class="${order.status === "Bajarildi" ? "in-stock" : "low-stock"}">
                                    ${order.status}
                                </span>
                            </td>
                            <td>
                                ${order.status === "Kutilmoqda" ? `
                                    <button class="action-btn edit-btn"
                                        onclick="changeOrderStatus(${order.id})">
                                        Bajarildi
                                    </button>
                                ` : "Yakunlangan"}
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
}

function addOrder() {
    if (!products || products.length === 0) {
        alert("Avval mahsulot qo‘shing!");
        return;
    }

    const content = document.getElementById("page-content");

    const options = products.map(product => `
        <option value="${product.id}" ${product.quantity < 1 ? "disabled" : ""}>
            ${product.name} — ${product.price.toLocaleString("uz-UZ")} so‘m
            (Omborda: ${product.quantity})
        </option>
    `).join("");

    content.insertAdjacentHTML("beforeend", `
        <div class="modal-overlay" id="order-modal">
            <div class="modal-box">
                <h2>Yangi buyurtma</h2>
                <p class="modal-description">Buyurtma ma’lumotlarini kiriting</p>

                <form onsubmit="saveNewOrder(event)">
                    <label>Mijoz ismi</label>
                    <input type="text" id="order-customer"
                        placeholder="Mijoz ismini kiriting" required>

                    <label>Mahsulot</label>
                    <select id="order-product" required>
                        <option value="">Mahsulotni tanlang</option>
                        ${options}
                    </select>

                    <label>Mahsulot soni</label>
                    <input type="number" id="order-quantity"
                        placeholder="Mahsulot soni" min="1" required>

                    <div class="modal-actions">
                        <button type="button" class="cancel-btn"
                            onclick="closeOrderModal()">Bekor qilish</button>
                        <button type="submit" class="add-btn">Buyurtma berish</button>
                    </div>
                </form>
            </div>
        </div>
    `);
}

function saveNewOrder(event) {
    event.preventDefault();

    const customer = document.getElementById("order-customer").value.trim();
    const productId = Number(document.getElementById("order-product").value);
    const quantity = Number(document.getElementById("order-quantity").value);

    const selectedProduct = products.find(product => product.id === productId);

    if (!customer || !selectedProduct) {
        alert("Ma’lumotlarni to‘g‘ri kiriting!");
        return;
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
        alert("Mahsulot soni noto‘g‘ri!");
        return;
    }

    if (quantity > selectedProduct.quantity) {
        alert("Omborda buncha mahsulot yo‘q!");
        return;
    }

    orders.push({
        id: Date.now(),
        customer,
        product: selectedProduct.name,
        productId: selectedProduct.id,
        quantity,
        price: selectedProduct.price,
        status: "Kutilmoqda"
    });

    saveOrders();
    renderOrders();

    alert("Buyurtma muvaffaqiyatli qo‘shildi!");
}

function closeOrderModal() {
    document.getElementById("order-modal")?.remove();
}

function changeOrderStatus(id) {
    const order = orders.find(item => item.id === id);
    if (!order) return;

    if (order.status === "Bajarildi") {
        alert("Bu buyurtma allaqachon bajarilgan!");
        return;
    }

    const product = products.find(item => item.id === order.productId);

    if (!product) {
        alert("Mahsulot topilmadi!");
        return;
    }

    if (product.quantity < order.quantity) {
        alert("Omborda mahsulot yetarli emas!");
        return;
    }

    if (!confirm("Buyurtmani bajarilgan deb belgilaysizmi?")) return;

    product.quantity -= order.quantity;
    order.status = "Bajarildi";

    saveProducts();
    saveOrders();

    renderOrders();

    alert("Buyurtma bajarildi! Ombordagi mahsulot soni yangilandi.");
}
