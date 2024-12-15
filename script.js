const partsCatalog = {
    mercedes: [
        { name: "Тормозные диски", price: 5000 },
        { name: "Масляный фильтр", price: 700 }
    ],
    bmw: [
        { name: "Аккумулятор", price: 9000 },
        { name: "Радиатор", price: 10000 }
    ]
};

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const brand = params.get("brand");
    const brandTitle = document.getElementById("brand-title");
    const partsContainer = document.getElementById("parts-grid");

    if (brand && partsCatalog[brand]) {
        brandTitle.textContent = `Каталог запчастей для ${brand.toUpperCase()}`;
        partsCatalog[brand].forEach((part, index) => {
            const partElement = document.createElement("div");
            partElement.className = "part-item";
            partElement.innerHTML = `
                <h3>${part.name}</h3>
                <span>${part.price} ₽</span>
                <input type="number" value="1" min="1" id="qty-${index}" class="quantity">
                <button onclick="addToCart('${part.name}', ${part.price}, ${index})">Купить</button>
            `;
            partsContainer.appendChild(partElement);
        });
    } else {
        brandTitle.textContent = "Марка не найдена";
        partsContainer.innerHTML = "<p>Запчасти для данной марки отсутствуют.</p>";
    }
});

function addToCart(name, price, index) {
    const quantity = parseInt(document.getElementById(`qty-${index}`).value) || 1;
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }

    alert(`${name} добавлено в корзину (${quantity} шт.)`);
    console.log(cart);
}
