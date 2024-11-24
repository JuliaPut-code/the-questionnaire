const form = document.querySelector(".form");
const button = document.getElementById("button");
const clearButton = document.getElementById("clear");
const nameInput = document.getElementById("name");
const secondNameInput = document.getElementById("secondName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const agreeInput = document.getElementById("agree");

function showNotification(message, isSuccess = true) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.position = "fixed";
  notification.style.top = "20px";
  notification.style.left = "50%";
  notification.style.transform = "translateX(-50%)";
  notification.style.padding = "10px 20px";
  notification.style.borderRadius = "5px";
  notification.style.color = "#fff";
  notification.style.fontSize = "16px";
  notification.style.zIndex = 1000;

  if (isSuccess) {
    notification.style.backgroundColor = "#28a745";
  } else {
    notification.style.backgroundColor = "#dc3545";
  }

  document.body.append(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

form.addEventListener("submit", (event) => {
  // Предотвращает действие браузера по умолчанию. В данном случае — отправку формы
  // https://learn.javascript.ru/default-browser-action
  event.preventDefault();

  // Здесь твой код
  const name = nameInput.value;
  const secondName = secondNameInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;
  const agree = agreeInput.checked;

  fetch(`https://polinashneider.space/user`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer: JuliaPut-code'
    },
    body: JSON.stringify({
      name: name,
      secondName: secondName,
      phone: phone,
      email: email,
      agree: agree
    }),
  })
    .then(response => {
      if (response.ok) {
        showNotification("Данные успешно отправлены!", true);
        form.reset();
      } else {
        showNotification("Произошла ошибка при отправке данных.", false);
      }
    })
    .catch(error => {
      showNotification("Произошла ошибка при отправке данных: " + error.message, false);
    });
});

clearButton.addEventListener("click", () => {
  form.reset();
});