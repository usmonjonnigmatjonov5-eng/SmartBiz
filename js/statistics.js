function renderStatistics() {
    const content = document.getElementById("page-content");

    const totalProducts = products.length;
    const totalOrders = orders.length;

    const totalSales = orders
        .filter(order => order.status === "Bajarildi")
        .reduce((sum, order) => sum + order.price * order.quantity, 0);

    const pendingOrders = orders.filter(
        order => order.status === "Kutilmoqda"
    ).length;

    content.innerHTML = `
        <div class="stats">
            <div class="stat-card">
                <p>Jami mahsulotlar</p>
                <h2>${totalProducts}</h2>
            </div>

            <div class="stat-card">
                <p>Jami buyurtmalar</p>
                <h2>${totalOrders}</h2>
            </div>

            <div class="stat-card">
                <p>Umumiy savdo</p>
                <h2>${totalSales.toLocaleString("uz-UZ")} so‘m</h2>
            </div>

            <div class="stat-card">
                <p>Kutilayotgan buyurtmalar</p>
                <h2>${pendingOrders}</h2>
            </div>
        </div>

        <div class="content-box">
            <h2>Buyurtmalar tahlili</h2>
            <p>Bajarilgan: ${
                orders.filter(order => order.status === "Bajarildi").length
            } ta</p>
            <p>Kutilmoqda: ${pendingOrders} ta</p>
        </div>
    `;
}
