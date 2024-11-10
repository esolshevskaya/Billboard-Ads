const categories = {
    "Транспорт": {
        "Автомобили": ["Легковые", "Грузовые", "Автобусы"],
        "Мотоциклы": ["Вездеходы", "Мопеды", "Снегоходы"],
        "Велосипеды": ["Горные", "Шоссейные", "Электровелосипеды"],
        "Запчасти": ["Для автомобилей", "Для мотоциклов", "Для велосипедов"]
    },
    "Недвижимость": {
        "Квартиры": ["Аренда", "Покупка"],
        "Дома": ["Аренда", "Покупка"],
        "Земельные участки": ["Для строительства", "Садовые", "Сельскохозяйственные"],
        "Коммерческая недвижимость": ["Офисы", "Магазины", "Склады"]
    },
    "Электроника": {
        "Смартфоны": ["Android", "iOS", "Windows Phone"],
        "Ноутбуки": ["Игровые", "Ультрабуки", "Бюджетные"],
        "Телевизоры": ["Смарт ТВ", "4K", "OLED"],
        "Аудиотехника": ["Наушники", "Колонки", "Музыкальные центры"]
    },
    "Услуги": {
        "Ремонт": ["Квартир", "Автомобилей", "Электроники"],
        "Уборка": ["Квартир", "Офисов", "Промышленных помещений"],
        "Консалтинг": ["Бизнес-консалтинг", "Финансовый консалтинг", "IT-консалтинг"],
        "Обучение": ["Онлайн-курсы", "Репетиторы", "Тренинги"]
    },
    "Работа": {
        "Фриланс": ["Дизайн", "Программирование", "Копирайтинг"],
        "Полная занятость": ["IT", "Маркетинг", "Управление"],
        "Частичная занятость": ["Уборка", "Преподавание", "Продажи"]
    },
    "Хобби и отдых": {
        "Спорт": ["Футбол", "Баскетбол", "Теннис"],
        "Творчество": ["Рисование", "Музыка", "Ремесла"],
        "Путешествия": ["Поездки по России", "Зарубежные поездки", "Автостоп"],
        "Кулинария": ["Рецепты", "Кулинарные курсы", "Готовка на костре"]
    },
    "Животные": {
        "Собаки": ["Щенки", "Взрослые", "Породистые"],
        "Кошки": ["Котята", "Взрослые", "Породистые"],
        "Птицы": ["Попугаи", "Голуби", "Канарейки"],
        "Мелкие животные": ["Хомяки", "Крысы", "Кролики"]
    },
    "Личные вещи": {
        "Одежда": ["Мужская", "Женская", "Детская"],
        "Обувь": ["Спортивная", "Повседневная", "Обувь для отдыха"],
        "Аксессуары": ["Сумки", "Ремни", "Украшения"],
        "Косметика": ["Макияж", "Уход за кожей", "Парфюмерия"]
    },
    "Автозапчасти и аксессуары": {
        "Запчасти": ["Двигатели", "Трансмиссии", "Подвески"],
        "Аксессуары": ["Коврики", "Чехлы", "Аудиосистемы"]
    },
    "Бизнес и оборудование": {
        "Оборудование": ["Производственное", "Строительное", "Складское"],
        "Офисные принадлежности": ["Столы", "Кресла", "Техника"],
        "Франшизы": ["Кафе", "Магазины", "Сервисы"]
    },
};

let selectedMainCategory = null;
let selectedSubCategory = null;
let selectedThirdCategory = null;

document.querySelectorAll('#main-category-list .category').forEach(item => {
    item.addEventListener('click', () => {
        const subCategoryList = document.getElementById('sub-category-list');
        const thirdCategoryList = document.getElementById('third-category-list');

        if (selectedMainCategory) {
            selectedMainCategory.classList.remove('selected');
        }

        item.classList.add('selected');
        selectedMainCategory = item;

        subCategoryList.innerHTML = '';
        thirdCategoryList.innerHTML = '';

        const mainTitle = document.createElement('li');
        mainTitle.textContent = item.textContent;
        mainTitle.classList.add('heading');
        subCategoryList.appendChild(mainTitle);

        const subCategories = categories[item.textContent];
        if (subCategories) {
            for (let subCat in subCategories) {
                const li = document.createElement('li');
                li.textContent = subCat;
                li.classList.add('sub-category');
                subCategoryList.appendChild(li);

                li.addEventListener('click', (e) => {
                    e.stopPropagation();

                    if (selectedSubCategory) {
                        selectedSubCategory.classList.remove('selected');
                    }

                    li.classList.add('selected');
                    selectedSubCategory = li;

                    thirdCategoryList.innerHTML = '';

                    const thirdTitle = document.createElement('li');
                    thirdTitle.textContent = subCat;
                    thirdTitle.classList.add('heading');
                    thirdCategoryList.appendChild(thirdTitle);

                    const thirdCategories = subCategories[subCat];
                    thirdCategories.forEach(thirdCat => {
                        const thirdLi = document.createElement('li');
                        thirdLi.textContent = thirdCat;
                        thirdLi.classList.add('third-category');
                        thirdCategoryList.appendChild(thirdLi);

                        thirdLi.addEventListener('click', (e) => {
                            e.stopPropagation();

                            if (selectedThirdCategory) {
                                selectedThirdCategory.classList.remove('selected');
                            }

                            thirdLi.classList.add('selected');
                            selectedThirdCategory = thirdLi;
                        });
                    });
                });
            }
        }
    });
});
