document.addEventListener('DOMContentLoaded', () => {
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

// Обработчик для телефона, чтобы корректно обрабатывать ввод
const phoneInput = document.getElementById("phoneInput");
if (phoneInput) {
    phoneInput.addEventListener('input', (event) => {
        let value = phoneInput.value;

        // Разрешаем только цифры, +, -, (, и )
        value = value.replace(/[^+\d()-]/g, '');

        // Ограничиваем "+" только на первой позиции
        if (value.indexOf('+') > 0) {
            value = value.replace(/\+/g, ''); // Удаляем любые "+" не на первом месте
        }

        // Убираем лишние цифры, если их больше 11
        const digitsOnly = value.replace(/\D/g, ''); // Только цифры
        if (digitsOnly.length > 11) {
            // Сохраняем символы +, -, и скобки, но обрезаем лишние цифры
            let truncatedValue = '';
            let digitCount = 0;

            for (let char of value) {
                if (/\d/.test(char)) { // Если это цифра
                    if (digitCount < 11) {
                        truncatedValue += char;
                        digitCount++;
                    }
                } else {
                    truncatedValue += char; // Добавляем разрешенные символы
                }
            }
            value = truncatedValue;
        }
        phoneInput.value = value;
    });
}
