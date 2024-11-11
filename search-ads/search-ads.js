fetch('/categories/categories.json')
    .then(response => response.json())
    .then(categories => {
        const mainCategoryList = document.getElementById('main-category-list');

        // Функция для создания списка категорий
        function createCategoryList(categories, parentElement, level = 1) {
            Object.keys(categories).forEach(categoryName => {
                const categoryLi = document.createElement('li');
                categoryLi.classList.add('category');

                const categoryText = document.createElement('span');
                categoryText.classList.add('category-text');
                categoryText.textContent = categoryName; // Добавляем текст категории
                categoryLi.appendChild(categoryText);

                parentElement.appendChild(categoryLi);

                // Обработчик клика для категории
                categoryLi.addEventListener('click', function (event) {
                    event.stopPropagation(); // Остановить всплытие события

                    // Выделение элемента
                    const allCategories = parentElement.querySelectorAll('.category');
                    allCategories.forEach(item => item.classList.remove('selected')); // Убираем выделение у всех
                    categoryLi.classList.add('selected'); // Добавляем выделение для текущей категории

                    // Toggle для раскрытия подкатегорий
                    categoryLi.classList.toggle('open');

                    // Если уровень 1, то показываем подкатегории второго уровня
                    if (level === 1) {
                        closeOtherCategories(mainCategoryList, categoryLi);
                        showSubCategories(categoryName, categories, categoryLi);
                    } else if (level === 2) {
                        closeOtherCategories(categoryLi.parentElement, categoryLi);
                        showThirdCategories(categoryName, categories, categoryLi);
                    }
                });

                // Если категория имеет подкатегории второго уровня, создаем для них вложенные списки
                if (level === 1 && typeof categories[categoryName] === 'object' && !Array.isArray(categories[categoryName])) {
                    const subCategoryList = document.createElement('ul');
                    categoryLi.appendChild(subCategoryList);
                    createCategoryList(categories[categoryName], subCategoryList, 2);
                } else if (level === 1 && Array.isArray(categories[categoryName])) {
                    // Если подкатегория второго уровня - это массив строк
                    const subCategoryList = document.createElement('ul');
                    categoryLi.appendChild(subCategoryList);
                    categories[categoryName].forEach(subCategory => {
                        const subCategoryLi = document.createElement('li');
                        subCategoryLi.textContent = subCategory;
                        subCategoryList.appendChild(subCategoryLi);
                    });
                }
            });
        }

        // Функция для закрытия других категорий того же уровня
        function closeOtherCategories(parentElement, currentCategoryLi) {
            const allCategories = parentElement.querySelectorAll('.category');
            allCategories.forEach(categoryLi => {
                if (categoryLi !== currentCategoryLi && categoryLi.classList.contains('open')) {
                    categoryLi.classList.remove('open');
                }
            });
        }

        // Функция для отображения подкатегорий второго уровня
        function showSubCategories(categoryName, categories, parentElement) {
            const subCategories = categories[categoryName];

            // Проверяем, есть ли уже вложенные подкатегории
            const existingSubCategoryList = parentElement.querySelector('ul');
            if (existingSubCategoryList) {
                existingSubCategoryList.remove(); // Удаляем старые подкатегории
            }

            // Если подкатегории есть, создаем их
            const subCategoryList = document.createElement('ul');
            parentElement.appendChild(subCategoryList);
            createCategoryList(subCategories, subCategoryList, 2);
        }

        function showThirdCategories(categoryName, categories, parentElement) {
            const thirdCategories = categories[categoryName];

            // Удаляем старые подкатегории третьего уровня, если они существуют
            const existingThirdCategoryList = parentElement.querySelector('ul');
            if (existingThirdCategoryList) {
                existingThirdCategoryList.remove();
            }

            // Создаем новый список для третьего уровня
            const thirdCategoryList = document.createElement('ul');
            parentElement.appendChild(thirdCategoryList);

            // Генерируем элементы третьего уровня
            thirdCategories.forEach(subCategory => {
                const subCategoryLi = document.createElement('li');
                subCategoryLi.classList.add('category-third');
                subCategoryLi.textContent = subCategory;
                thirdCategoryList.appendChild(subCategoryLi);

                // Добавляем обработчик клика для выделения
                subCategoryLi.addEventListener('click', function (event) {
                    event.stopPropagation(); // Останавливаем всплытие события

                    // Убираем выделение у всех элементов третьего уровня
                    const allThirdLevelCategories = parentElement.querySelectorAll('.category-third');
                    allThirdLevelCategories.forEach(item => item.classList.remove('selected'));

                    // Выделяем текущий элемент
                    subCategoryLi.classList.add('selected');
                });
            });
        }


        // Инициализация категорий
        createCategoryList(categories, mainCategoryList);
    })
    .catch(error => console.error('Ошибка при загрузке данных категорий:', error));


// Массив с карточками (можно загружать с сервера или хранить локально)
const cardsData = [
    {
        "img": "/assets/pics/wedding-dress.jpg",
        "name": "Свадебное платье",
        "price": "10 000 ₽",
        "location": "Краснодар, ул. Красная, 176",
        "time": "Сегодня 07:49",
        "category": "Личные вещи"
    },
    {
        "img": "/assets/pics/coffee-machine.png",
        "name": "Кофемашина для бизнеса",
        "price": "150 000 ₽",
        "location": "Краснодар, ул. Красная, 176",
        "time": "Вчера 19:32",
        "category": "Бизнес и оборудование"
    },
    {
        "img": "/assets/pics/major-appliances-repair.jpeg",
        "name": "Ремонт бытовой техники",
        "price": "1 500 ₽",
        "location": "Краснодар, ул. Красная, 176",
        "time": "Сегодня 10:35",
        "category": "Услуги"
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
        "img": "/assets/pics/bosch.jpeg",
        "name": "Стиральная машина Bosch",
        "price": "18 000 ₽",
        "location": "Сочи, ул. Курортный проспект 9",
        "time": "Сегодня 11:55",
        "category": "Электроника"
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
        "img": "/assets/pics/labrador.png",
        "name": "Щенок лабрадора, 2 мес.",
        "price": "35 000 ₽",
        "location": "Екатеринбург, ул. Уралмаш 17",
        "time": "Сегодня 10:15",
        "category": "Животные"
    },
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

    // Генерируем карточки из массива данных
    const cardsHTML = cardsData.map(createCard).join('');

    // Добавляем все карточки после "Новое объявление"
    container.innerHTML += cardsHTML; // Добавление карточек к существующим
}

// Вызов функции рендера карточек
renderCards();
