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

    // Получаем все формы на странице
    const forms = document.querySelectorAll('form');

    // Функция для очистки ошибки
    function clearError(input) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error')) {
            errorElement.textContent = ""; // Очищаем текст ошибки
        }
        input.classList.remove("input-error"); // Убираем красную рамку
    }

    // Функция для отображения ошибки
    function showError(input, message) {
        let errorElement = input.nextElementSibling;

        // Если ошибка еще не была добавлена, создаем её
        if (!errorElement || !errorElement.classList.contains('error')) {
            errorElement = document.createElement('span');
            errorElement.className = 'error active';
            input.parentNode.appendChild(errorElement);
        }

        errorElement.textContent = message;
        input.classList.add("input-error"); // Добавляем красную рамку
    }

    // Функция для валидации каждого поля
    function validateForm(form) {
        let isFormValid = true;

        const phoneInput = form.querySelector("#phoneInput");
        const passwordInput = form.querySelector("#passwordInput");
        const nameInput = form.querySelector("#nameInput");

        // Валидация телефона
        if (phoneInput && phoneInput.value.trim() === "") {
            showError(phoneInput, "Введите номер телефона");
            isFormValid = false;
        } else if (phoneInput && phoneInput.value.length < 11) {
            showError(phoneInput, "Некорректный номер телефона");
            isFormValid = false;
        } else if (phoneInput) {
            clearError(phoneInput);
        }

        // Валидация пароля
        if (passwordInput && passwordInput.value.trim() === "") {
            showError(passwordInput, "Введите пароль");
            isFormValid = false;
        } else if (passwordInput && passwordInput.value.length < 6) {
            showError(passwordInput, "Пароль должен содержать минимум 6 символов");
            isFormValid = false;
        } else if (passwordInput) {
            clearError(passwordInput);
        }

        // Валидация имени (обязательное поле только для регистрации)
        if (form.id === "authFormSignUp" && nameInput && nameInput.value.trim() === "") {
            showError(nameInput, "Введите имя");
            isFormValid = false;
        } else if (nameInput) {
            clearError(nameInput);
        }

        return isFormValid;
    }

    // Обработчик отправки формы
    forms.forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Отключаем стандартное поведение отправки формы
            const phoneInput = form.querySelector('#phoneInput');
            const passwordInput = form.querySelector('#passwordInput');
            const nameInput = form.querySelector('#nameInput');

            // Очищаем все ошибки перед новой валидацией
            clearError(phoneInput);
            clearError(passwordInput);
            clearError(nameInput);

            // Проверяем валидацию формы
            const isValid = validateForm(form);

            // Если форма валидна, очищаем поля и отправляем
            if (isValid) {
                form.reset(); // Очищаем все поля формы
                console.log('Форма успешно отправлена!');
                // Логика отправки данных на сервер (например, через fetch или XMLHttpRequest)
            }
        });
    });

    // Обработка ввода в поля
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            clearError(input); // Убираем ошибку при изменении поля
        });
    });

});
