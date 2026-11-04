function renderDashboard() {
    const content = document.getElementById("page-content");

    const totalProducts = products.length;
    const totalOrders = orders.length;

    const totalSales = orders
        .filter(order => order.status === "Bajarildi")
        .reduce((sum, order) => sum + order.price * order.quantity, 0);

    const pendingOrders = orders.filter(
        order => order.status === "Kutilmoqda"
    ).length;

    const lowStock = products.filter(
        product => product.quantity <= 5
    ).length;

    content.innerHTML = `
        <div class="stats">
            <div class="stat-card">
                <p>Jami mahsulotlar</p>
                <h2>${totalProducts}</h2>
            </div>

            <div class="stat-card">
                <p>Buyurtmalar</p>
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
            <h2>SmartBiz tizimiga xush kelibsiz!</h2>
            <p>Do‘koningizni bir joydan boshqaring.</p>
        </div>

        <div class="content-box">
            <h2>Ombor holati</h2>
            <p>Jami mahsulot: ${totalProducts} ta</p>
            <p>Kam qolgan mahsulotlar: ${lowStock} ta</p>
            <p>Bajarilgan buyurtmalar: ${totalOrders - pendingOrders} ta</p>
        </div>
    `;
}
