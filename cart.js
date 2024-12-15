let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});

function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.innerHTML = `
            <p>${item.name}</p>
            <p>Цена: ${item.price} ₽</p>
            <p>Количество: ${item.quantity}</p>
        `;
        cartItemsContainer.appendChild(itemElement);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice;
}

function saveOrder() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    if (!name || !phone || !address || cart.length === 0) {
        alert("Заполните все поля и добавьте товары в корзину.");
        return;
    }

    const orderDetails = `
=== Новый заказ ===
Имя: ${name}
Телефон: ${phone}
Адрес: ${address}
Товары:
${cart.map(item => `- ${item.name}, Цена: ${item.price} ₽, Количество: ${item.quantity}`).join("\n")}
Итоговая стоимость: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)} ₽
===================
`;

    const blob = new Blob([orderDetails], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "korzina.txt";
    link.click();

    alert("Заказ сохранён в файл korzina.txt");
    localStorage.removeItem("cart");
    cart = [];
    renderCart();
}
