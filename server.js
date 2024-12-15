const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Указанный путь для сохранения файла
const ordersDirectory = 'C:\\Programmer\\проектскириллом';
const ordersFilePath = path.join(ordersDirectory, 'korzina.txt');

app.use(bodyParser.json());

// Создание директории, если её нет
if (!fs.existsSync(ordersDirectory)) {
    fs.mkdirSync(ordersDirectory, { recursive: true });
}

app.post('/orders', (req, res) => {
    const newOrder = req.body;

    if (!newOrder || !newOrder.name || !newOrder.phone || !newOrder.address || !newOrder.items) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const orderText = `
=== Новый заказ ===
Имя: ${newOrder.name}
Телефон: ${newOrder.phone}
Адрес: ${newOrder.address}
Товары:
${newOrder.items.map(item => `- ${item.name}, Цена: ${item.price} ₽, Количество: ${item.quantity}`).join('\n')}
Итоговая стоимость: ${newOrder.items.reduce((total, item) => total + item.price * item.quantity, 0)} ₽
===================
`;

    fs.appendFile(ordersFilePath, orderText, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to save order to file' });
        }
        res.status(201).json({ message: `Order successfully saved to ${ordersFilePath}` });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Orders will be saved to ${ordersFilePath}`);
});
