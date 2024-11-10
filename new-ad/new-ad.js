// Найдем элементы
const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('images');
const previewContainer = document.getElementById('image-preview');

// Открытие файлового менеджера при нажатии на кнопку
uploadBtn.addEventListener('click', function() {
    fileInput.click();
});

// Отображение миниатюр при выборе изображений
fileInput.addEventListener('change', function(event) {
    // Очищаем контейнер перед добавлением новых миниатюр
    previewContainer.innerHTML = '';

    // Получаем список выбранных файлов
    const files = event.target.files;

    // Если файлы выбраны, показываем контейнер
    if (files.length > 0) {
        previewContainer.style.display = 'block'; // Показываем контейнер
    } else {
        previewContainer.style.display = 'none'; // Скрываем контейнер, если ничего не выбрано
    }

    // Проверяем количество файлов (не более 10)
    if (files.length > 10) {
        alert('Вы можете загрузить не более 10 картинок.');
        return;
    }

    // Проходим по каждому файлу и создаем миниатюру
    Array.from(files).forEach(file => {
        const reader = new FileReader();

        reader.onload = function(e) {
            // Создаем блок для загруженного изображения
            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');

            // Создаем элемент изображения и добавляем его в контейнер
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('uploaded-image');

            // Блок с информацией (имя файла, размер, кнопка удаления)
            const imageInfo = document.createElement('div');
            imageInfo.classList.add('image-info');

            const fileName = document.createElement('span');
            fileName.classList.add('image-name');
            fileName.textContent = file.name;  // Имя файла

            const fileSize = document.createElement('span');
            fileSize.classList.add('image-size');
            fileSize.textContent = `${(file.size / 1024).toFixed(1)} KB`;  // Размер файла в КБ

            // Кнопка удаления изображения
            const removeBtn = document.createElement('button');
            removeBtn.classList.add('remove-image-btn');
            removeBtn.innerHTML = '&times;';
            removeBtn.addEventListener('click', function() {
                imageItem.remove();  // Удаление изображения
                // Если в контейнере больше нет изображений, скрываем его
                if (previewContainer.children.length === 0) {
                    previewContainer.style.display = 'none';  // Скрываем контейнер, если изображений нет
                }
            });

            // Добавляем информацию о файле и кнопку удаления
            imageInfo.appendChild(fileName);
            imageInfo.appendChild(fileSize);
            imageInfo.appendChild(removeBtn);

            // Собираем все элементы и добавляем в previewContainer
            imageItem.appendChild(img);
            imageItem.appendChild(imageInfo);
            previewContainer.appendChild(imageItem);
        };

        reader.readAsDataURL(file);  // Чтение файла
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const categorySelect = document.getElementById('category');
    const subcategorySelect = document.getElementById('subcategory');

    // Обновление подкатегорий в зависимости от категории
    categorySelect.addEventListener('change', function () {
        subcategorySelect.disabled = false;
        subcategorySelect.innerHTML = '<option value="" disabled selected hidden>Нажмите, чтобы выбрать</option>';

        let options = [];
        if (this.value === 'home') options = ['Мебель', 'Садовые инструменты'];
        if (this.value === 'electronics') options = ['Телефоны', 'Ноутбуки'];
        if (this.value === 'vehicles') options = ['Легковые автомобили', 'Мотоциклы'];

        options.forEach(optionText => {
            const option = document.createElement('option');
            option.text = optionText;
            option.value = optionText.toLowerCase().replace(/\s/g, '-');
            subcategorySelect.add(option);
        });

        const warning = categorySelect.parentElement.querySelector('.warning');
        warning.style.display = 'none'; // Убираем предупреждение для категории
    });

    // Проверка обязательных полей при отправке формы
    document.querySelector('.ad-form').addEventListener('submit', function (event) {
        const requiredFields = document.querySelectorAll('.form-group select[required], .form-group input[required]');
        let formIsValid = true;

        requiredFields.forEach(field => {
            const warning = field.parentElement.querySelector('.warning');

            if (!field.value.trim()) {
                if (warning) warning.style.display = 'block';  // показываем предупреждение
            } else {
                if (warning) warning.style.display = 'none';  // скрываем предупреждение
            }

        });

        if (!formIsValid) {
            event.preventDefault();
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.ad-form').addEventListener('submit', function (event) {
        const requiredFields = document.querySelectorAll('.form-group select[required], .form-group input[required]');
        let formIsValid = true;

        requiredFields.forEach(field => {
            const warning = field.parentElement.querySelector('.warning');
            if (!field.value.trim()) {
                if (warning) warning.style.display = 'block';  // показываем предупреждение
                formIsValid = false;
            } else {
                if (warning) warning.style.display = 'none';  // скрываем предупреждение
            }
        });

        if (!formIsValid) {
            event.preventDefault(); // предотвратить отправку формы, если поля не заполнены
        }
    });
});
