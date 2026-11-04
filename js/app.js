function navigate(page) {
    const title = document.getElementById("page-title");

    document.querySelectorAll(".sidebar nav a").forEach(link => {
        link.classList.toggle("active", link.dataset.page === page);
    });

    if (page === "products") {
        title.textContent = "Mahsulotlar";
        renderProducts();

    } else if (page === "dashboard") {
        title.textContent = "Dashboard";
        renderDashboard();

    } else if (page === "orders") {
        title.textContent = "Buyurtmalar";
        renderOrders();

    } else if (page === "statistics") {
        title.textContent = "Statistika";
        renderStatistics();
    }
}

document.querySelectorAll(".sidebar nav a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        navigate(link.dataset.page);
    });
});

navigate("dashboard");
