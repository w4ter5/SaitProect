const partsCatalog = {
    mercedes: [
        { name: "Тормозные диски", price: 5000 },
        { name: "Масляный фильтр", price: 700 },
        { name: "Амортизаторы", price: 4500 },
        { name: "Ремень ГРМ", price: 3500 },
        { name: "Стартер", price: 8000 },
        { name: "Сцепление", price: 6000 },
        { name: "Свечи зажигания", price: 400 }
    ],
    bmw: [
        { name: "Топливный насос", price: 7000 },
        { name: "Аккумулятор", price: 9000 },
        { name: "ШРУС", price: 5500 },
        { name: "Радиатор", price: 10000 },
        { name: "Термостат", price: 2500 },
        { name: "Колодки", price: 3000 },
        { name: "Фильтр салона", price: 1200 }
    ],
    audi: [
        { name: "Фара передняя", price: 15000 },
        { name: "Генератор", price: 12000 },
        { name: "Датчик ABS", price: 3500 },
        { name: "Маховик", price: 11000 },
        { name: "Задние фонари", price: 8000 },
        { name: "Водяной насос", price: 4500 },
        { name: "Тормозной цилиндр", price: 4000 }
    ],
    toyota: [
        { name: "Стабилизатор", price: 6000 },
        { name: "Крышка багажника", price: 14000 },
        { name: "Радиатор охлаждения", price: 9500 },
        { name: "Блок управления", price: 20000 },
        { name: "Катушки зажигания", price: 3500 },
        { name: "Сайлентблоки", price: 1500 },
        { name: "Фильтр топлива", price: 1000 }
    ],
    lexus: [
        { name: "Передний бампер", price: 20000 },
        { name: "Дроссельная заслонка", price: 14000 },
        { name: "Подшипники", price: 6000 },
        { name: "Зеркала", price: 7000 },
        { name: "Стеклоочистители", price: 2500 },
        { name: "Коробка передач", price: 75000 },
        { name: "Рулевая рейка", price: 25000 }
    ]
};

let cart = JSON.parse(localStorage.getItem('cart')) || [];

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
    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}
