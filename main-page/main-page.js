// Массив с карточками (можно загружать с сервера или хранить локально)
const cardsData = [
    {
        "img": "/assets/pics/guitar.png",
        "name": "Гитара Fender",
        "price": "20 000 ₽",
        "location": "Москва, район Измайлово",
        "time": "Сегодня 14:12",
        "category": "Хобби и отдых"
    },
    {
        "img": "/assets/pics/demon-cat.jpeg",
        "name": "Бесноватый котёнок",
        "price": "25 000 ₽",
        "location": "Севастополь, ул. Потусторонняя 66",
        "time": "Сегодня 13:01",
        "category": "Животные"
    },
    {
        "img": "/assets/pics/driver.jpg",
        "name": "Водитель такси",
        "price": "60 000 ₽",
        "location": "Екатеринбург, район Втузгородок",
        "time": "Сегодня 08:45",
        "category": "Работа"
    },
    {
        "img": "/assets/pics/macbook1.jpeg",
        "name": "Macbook pro 13 2020 m1 8/256",
        "price": "65 000 ₽",
        "location": "Севастополь, ул. Гоголя, 33Б",
        "time": "Вчера 21:05",
        "category": "Электроника"
    },
    {
        "img": "/assets/pics/iphone.jpg",
        "name": "iPhone 13 Pro",
        "price": "80 000 ₽",
        "location": "Казань, ул. Проспект Победы 11",
        "time": "Сегодня 09:32",
        "category": "Электроника"
    },
    {
        "img": "/assets/pics/massage.jpeg",
        "name": "Массаж на дому",
        "price": "1 500 ₽",
        "location": "Новосибирск, ул. Красный проспект 12",
        "time": "Сегодня 14:36",
        "category": "Услуги"
    },
    {
        "img": "/assets/pics/labrador.png",
        "name": "Щенок лабрадора, 2 мес.",
        "price": "35 000 ₽",
        "location": "Екатеринбург, ул. Уралмаш 17",
        "time": "Сегодня 10:15",
        "category": "Животные"
    },
    {
        "img": "/assets/pics/bosch.jpeg",
        "name": "Стиральная машина Bosch",
        "price": "18 000 ₽",
        "location": "Сочи, ул. Курортный проспект 9",
        "time": "Сегодня 11:55",
        "category": "Электроника"
    },
    {
        "img": "/assets/pics/grill.jpg",
        "name": "Профессиональный гриль для кафе",
        "price": "80 000 ₽",
        "location": "Ростов-на-Дону, Железнодорожный район",
        "time": "Вчера 13:43",
        "category": "Бизнес и оборудование"
    },
    {
        "img": "/assets/pics/apartment-spb.jpg",
        "name": "Квартира в центре, 2-комн.",
        "price": "15 000 000 ₽",
        "location": "Санкт-Петербург, Невский проспект 11",
        "time": "Вчера 12:00",
        "category": "Недвижимость"
    },
    {
        "img": "/assets/pics/lego-city.jpg",
        "name": "Конструктор LEGO City",
        "price": "3 500 ₽",
        "location": "Челябинск, Металлургический район",
        "time": "Сегодня 15:00",
        "category": "Хобби и отдых"
    },
    {
        "img": "/assets/pics/jacket.jpeg",
        "name": "Кожаная куртка мужская",
        "price": "5 000 ₽",
        "location": "Москва, район Бутово",
        "time": "Сегодня 12:30",
        "category": "Личные вещи"
    },
    {
        "img": "/assets/pics/plumber.png",
        "name": "Услуги сантехника",
        "price": "1 000 ₽",
        "location": "Самара, Промышленный район",
        "time": "Сегодня 07:50",
        "category": "Услуги"
    },
    {
        "img": "/assets/pics/motorbike-yamaha.jpg",
        "name": "Мотоцикл Yamaha MT-07",
        "price": "480 000 ₽",
        "location": "Тюмень, Центральный район",
        "time": "Сегодня 08:15",
        "category": "Транспорт"
    },
    {
        "img": "/assets/pics/house-river.jpg",
        "name": "Дом на берегу реки, 200 м²",
        "price": "25 000 000 ₽",
        "location": "Воронеж, Левобережный район",
        "time": "Сегодня 16:00",
        "category": "Недвижимость"
    },
    {
        "img": "/assets/pics/tires.png",
        "name": "Шины зимние Nokian 225/50R17",
        "price": "16 000 ₽",
        "location": "Краснодар, ул. Северная 18",
        "time": "Вчера 18:42",
        "category": "Автозапчасти и аксессуары"
    }
];

// Функция для создания карточки
function createCard(card) {
    return `
        <div class="card">
            <img src="${card.img}" alt="${card.name}">
            <div class="name">${card.name}</div>
            <div class="price">${card.price}</div>
            <div class="location">${card.location}</div>
            <div class="time">${card.time}</div>
        </div>
    `;
}

// Функция для добавления всех карточек в контейнер
function renderCards() {
    const container = document.getElementById('cards-container');
    container.innerHTML = cardsData.map(createCard).join(''); // Генерация всех карточек
}

// Вызов функции рендера карточек
renderCards();