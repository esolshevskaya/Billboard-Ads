document.addEventListener('DOMContentLoaded', function() {
    console.log('header.js загружается...'); // Для отладки

    fetch('/header/header.html')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            // Вставка содержимого шапки
            document.getElementById('header-placeholder').innerHTML = data;
            console.log('Заголовок загружен'); // Для отладки

            // Динамическое подключение стилей
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/header/header.css';
            document.head.appendChild(link);
        })
        .catch(error => console.error('Ошибка загрузки заголовка:', error));
});
