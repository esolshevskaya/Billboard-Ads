document.addEventListener('DOMContentLoaded', () => {
    const jsonFilePath = 'categories.json'; // Путь к JSON-файлу

    // Получаем ссылки на элементы списка
    const mainCategoryList = document.getElementById('main-category-list');
    const subCategoryList = document.getElementById('sub-category-list');
    const thirdCategoryList = document.getElementById('third-category-list');
    const searchInput = document.getElementById('search-input'); // Поле поиска

    let categoriesData = {};

    // Функция для загрузки JSON-файла
    async function loadCategories() {
        try {
            const response = await fetch(jsonFilePath);
            if (!response.ok) {
                throw new Error(`Ошибка загрузки JSON: ${response.status}`);
            }
            categoriesData = await response.json();
            populateMainCategories();
        } catch (error) {
            console.error('Ошибка загрузки категорий:', error);
        }
    }

    // Функция для очистки списка
    function clearList(list) {
        list.innerHTML = '';
        list.style.display = 'none';
    }

    // Функция для добавления 'selected' класса
    function setSelected(element, list) {
        const previouslySelected = list.querySelectorAll('li.selected');
        previouslySelected.forEach(item => item.classList.remove('selected'));
        element.classList.add('selected');
    }

    // Функция для создания и добавления иконки и контейнера
    function createCategoryArrow() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('category-arrow-wrapper');

        const arrow = document.createElement('div');
        arrow.classList.add('category-arrow');

        wrapper.appendChild(arrow);

        return wrapper;
    }

    // Функция для заполнения основного списка категорий
    function populateMainCategories() {
        // Добавляем каждую основную категорию как li.category
        Object.keys(categoriesData).forEach(mainCategory => {
            const li = document.createElement('li');
            li.classList.add('category');
            li.textContent = mainCategory;

            // Добавляем иконку с контейнером в каждый элемент категории
            const categoryArrow = createCategoryArrow();
            li.appendChild(categoryArrow);

            // Обработчик для клика по самому li (категории)
            li.addEventListener('click', () => {
                setSelected(li, mainCategoryList);
                populateSubCategories(mainCategory);
            });

            // Обработчик для клика по контейнеру с иконкой
            const container = document.createElement('div');
            container.classList.add('category-container');
            container.appendChild(categoryArrow);

            // При клике на контейнер с иконкой, текст категории вставляется в поле поиска
            container.addEventListener('click', (e) => {
                e.stopPropagation(); // Останавливаем всплытие события, чтобы не срабатывал обработчик на li
                searchInput.value = mainCategory; // Вставляем текст категории в поле поиска
            });

            li.appendChild(container);
            mainCategoryList.appendChild(li);
        });
    }

    // Функция для заполнения подкатегорий
    function populateSubCategories(mainCategory) {
        clearList(subCategoryList);
        clearList(thirdCategoryList);

        const subCategories = Object.keys(categoriesData[mainCategory]);

        if (subCategories.length > 0) {
            subCategoryList.style.display = 'block';
            subCategories.forEach(subCategory => {
                const li = document.createElement('li');
                li.classList.add('category');
                li.textContent = subCategory;

                // Добавляем иконку с контейнером в каждый элемент категории
                const categoryArrow = createCategoryArrow();
                li.appendChild(categoryArrow);

                li.addEventListener('click', () => {
                    setSelected(li, subCategoryList);
                    populateThirdCategories(mainCategory, subCategory);
                });

                // Обработчик для клика по контейнеру подкатегории
                const container = document.createElement('div');
                container.classList.add('category-container');
                container.appendChild(categoryArrow);

                // При клике на контейнер подкатегории, вставляем текст в поле поиска
                container.addEventListener('click', (e) => {
                    e.stopPropagation(); // Останавливаем всплытие события
                    searchInput.value = subCategory; // Вставляем текст подкатегории в поле поиска
                });

                li.appendChild(container);
                subCategoryList.appendChild(li);
            });
        }
    }

    // Функция для заполнения третьих категорий
    function populateThirdCategories(mainCategory, subCategory) {
        clearList(thirdCategoryList);

        const thirdCategories = categoriesData[mainCategory][subCategory];

        if (thirdCategories && thirdCategories.length > 0) {
            thirdCategoryList.style.display = 'block';
            thirdCategories.forEach(thirdCategory => {
                const li = document.createElement('li');
                li.classList.add('category');
                li.textContent = thirdCategory;

                // Добавляем иконку с контейнером в каждый элемент категории
                const categoryArrow = createCategoryArrow();
                li.appendChild(categoryArrow);

                li.addEventListener('click', () => {
                    setSelected(li, thirdCategoryList);
                    console.log(`Выбрана категория третьего уровня: ${thirdCategory}`);
                });

                // Обработчик для клика по контейнеру третьей категории
                const container = document.createElement('div');
                container.classList.add('category-container');
                container.appendChild(categoryArrow);

                // При клике на контейнер третьей категории, вставляем текст в поле поиска
                container.addEventListener('click', (e) => {
                    e.stopPropagation(); // Останавливаем всплытие события
                    searchInput.value = thirdCategory; // Вставляем текст третьей категории в поле поиска
                });

                li.appendChild(container);
                thirdCategoryList.appendChild(li);
            });
        }
    }

    // Инициализация загрузки категорий
    loadCategories();
});
