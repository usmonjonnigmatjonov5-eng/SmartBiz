function renderStatistics() {
    const content = document.getElementById("page-content");

    const totalProducts = products.length;
    const totalOrders = orders.length;

    const totalSales = orders
        .filter(order => order.status === "Bajarildi")
        .reduce((sum, order) => sum + order.price * order.quantity, 0);

    const completedOrders = orders.filter(
        order => order.status === "Bajarildi"
    ).length;

    const pendingOrders = orders.filter(
        order => order.status === "Kutilmoqda"
    ).length;

    const lowStock = products.filter(
        product => product.quantity <= 5
    ).length;

    const maxOrders = Math.max(completedOrders, pendingOrders, 1);
    const completedWidth = completedOrders / maxOrders * 100;
    const pendingWidth = pendingOrders / maxOrders * 100;

    const categories = ["Telefon", "Noutbuk", "Aksessuar", "Boshqa"];

    const categoryData = categories.map(category => ({
        name: category,
        count: products.filter(product => product.category === category).length
    }));

    const maxCategory = Math.max(
        ...categoryData.map(item => item.count),
        1
    );

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
                <p>Kam qolgan mahsulotlar</p>
                <h2>${lowStock}</h2>
            </div>
        </div>

        <div class="content-box">
            <h2>Buyurtmalar tahlili</h2>

            <p>Bajarilgan: ${completedOrders} ta</p>
            <div class="chart-track">
                <div class="chart-bar completed-bar"
                    style="width: ${completedWidth}%"></div>
            </div>

            <p>Kutilmoqda: ${pendingOrders} ta</p>
            <div class="chart-track">
                <div class="chart-bar pending-bar"
                    style="width: ${pendingWidth}%"></div>
            </div>
        </div>

        <div class="content-box">
            <h2>Kategoriyalar bo‘yicha mahsulotlar</h2>

            ${categoryData.map(item => `
                <div class="category-row">
                    <p>${item.name}: ${item.count} ta</p>
                    <div class="chart-track">
                        <div class="chart-bar category-bar"
                            style="width: ${item.count / maxCategory * 100}%"></div>
                    </div>
                </div>
            `).join("")}
        </div>
    `;
}
