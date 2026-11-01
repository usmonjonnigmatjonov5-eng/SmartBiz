let orders = [
    {
        id: 1,
        customer: "Ali",
        product: "iPhone 15",
        quantity: 1,
        price: 12000000,
        status: "Kutilmoqda"
    },
    {
        id: 2,
        customer: "Vali",
        product: "Samsung S24",
        quantity: 2,
        price: 10500000,
        status: "Bajarildi"
    }
];

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
                    </tr>
                </thead>
                <tbody>
                    ${orders.map(order => `
                        <tr>
                            <td>${order.customer}</td>
                            <td>${order.product}</td>
                            <td>${order.quantity}</td>
                            <td>${(order.price * order.quantity).toLocaleString("uz-UZ")} so‘m</td>
                            <td>${order.status}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
}

function addOrder() {
    const customer = prompt("Mijoz ismini kiriting:");
    if (!customer) return;

    const product = prompt("Mahsulot nomini kiriting:");
    if (!product) return;

    const quantity = Number(prompt("Mahsulot sonini kiriting:"));
    if (!Number.isInteger(quantity) || quantity < 1) {
        alert("Mahsulot soni noto‘g‘ri!");
        return;
    }

    const price = Number(prompt("Bir dona mahsulot narxini kiriting:"));
    if (!Number.isFinite(price) || price < 1) {
        alert("Narx noto‘g‘ri!");
        return;
    }

    orders.push({
        id: Date.now(),
        customer,
        product,
        quantity,
        price,
        status: "Kutilmoqda"
    });

    renderOrders();
    alert("Buyurtma muvaffaqiyatli qo‘shildi!");
}
