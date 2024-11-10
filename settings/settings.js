const phoneNumberInput = document.getElementById("phone-number");

phoneNumberInput.addEventListener("input", (e) => {
    const input = e.target;
    let value = input.value.replace(/\D/g, "").substring(1); // Удаляем все, кроме цифр и игнорируем первый символ
    let formattedValue = "+7 (";

    if (value.length > 0) formattedValue += value.substring(0, 3);
    if (value.length >= 4) formattedValue += ") " + value.substring(3, 6);
    if (value.length >= 7) formattedValue += "-" + value.substring(6, 8);
    if (value.length >= 9) formattedValue += "-" + value.substring(8, 10);

    input.value = formattedValue;
});

// Устанавливаем маску при фокусе, если поле пустое
phoneNumberInput.addEventListener("focus", (e) => {
    if (e.target.value === "") {
        e.target.value = "+7 (";
    }
});

// Если поле оставлено пустым, сбрасываем его значение
phoneNumberInput.addEventListener("blur", (e) => {
    if (e.target.value === "+7 (") {
        e.target.value = "";
    }
});
