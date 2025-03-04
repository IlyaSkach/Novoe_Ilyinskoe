// Добавляем глобальные переменные
let currentPlot = null;

// Функции для работы с модальным окном бронирования
function openBookingModal() {
  if (!currentPlot) return;

  const modal = document.getElementById("bookingModal");
  const plotIdSpan = document.getElementById("bookingPlotId");

  plotIdSpan.textContent = `№${currentPlot.id}`;
  modal.style.display = "block";
}

function closeBookingModal() {
  const modal = document.getElementById("bookingModal");
  modal.style.display = "none";
}

// Добавляем функцию форматирования телефона
function formatPhoneNumber(input) {
  let value = input.value.replace(/\D/g, ""); // Удаляем все нецифровые символы

  if (value.startsWith("7")) {
    value = value.slice(1); // Убираем лишнюю первую семерку
  }

  let formattedValue = "+7 (";

  if (value.length > 0) {
    formattedValue += value.substring(0, 3); // Код региона
  }
  if (value.length >= 4) {
    formattedValue += ") " + value.substring(3, 6); // Первые три цифры
  }
  if (value.length >= 7) {
    formattedValue += " " + value.substring(6, 8); // Следующие две цифры
  }
  if (value.length >= 9) {
    formattedValue += "-" + value.substring(8, 10); // Последние две цифры
  }

  // Устанавливаем значение обратно в поле ввода
  input.value = formattedValue.slice(0, 18);
}

// Инициализация карты участков
function initEarthMap() {
  const mapOverlay = document.getElementById("mapOverlay");
  const infoPanel = document.getElementById("infoPanel");
  const plotInfo = document.getElementById("plotInfo");
  const closeInfo = document.getElementById("closeInfo");
  let selectedPlot = null;

  // Очищаем предыдущие участки
  mapOverlay.innerHTML = "";

  // Данные об участках
  const plots = [
    //группа 1
    {
      id: 874,
      x: 24,
      y: 40,
      info: "Участок 874",
      square: 10,
      price: null,
    },
    {
      id: 873,
      x: 25,
      y: 35,
      info: "Участок 873",
      square: 10,
      price: null,
    },
    {
      id: 872,
      x: 26,
      y: 31,
      info: "Участок 872",
      square: 10,
      price: null,
    },
    {
      id: 925,
      x: 27,
      y: 27,
      info: "Участок 925",
      square: 10,
      price: null,
    },
    //группа 2
    {
      id: 898,
      x: 35.3,
      y: 51,
      info: "Участок 898",
      square: 7,
      price: null,
    },
    {
      id: 897,
      x: 36,
      y: 47,
      info: "Участок 897",
      square: 10,
      price: null,
    },
    {
      id: 896,
      x: 37,
      y: 43,
      info: "Участок 896",
      square: 10,
      price: null,
    },
    //группа 3
    {
      id: 906,
      x: 43,
      y: 42.5,
      info: "Участок 906",
      square: 10,
      price: null,
    },
    {
      id: 907,
      x: 42,
      y: 46,
      info: "Участок 907",
      square: 10,
      price: null,
    },
    {
      id: 908,
      x: 41,
      y: 50.5,
      info: "Участок 908",
      square: 10,
      price: null,
    },
    {
      id: 909,
      x: 40,
      y: 54.5,
      info: "Участок 909",
      square: 10,
      price: null,
    },
    {
      id: 2271,
      x: 39,
      y: 58.5,
      info: "Участок 2271",
      square: 9.6,
      price: null,
    },
    {
      id: 911,
      x: 47,
      y: 45,
      info: "Участок 911",
      square: 10,
      price: null,
    },
    {
      id: 912,
      x: 46,
      y: 49,
      info: "Участок 912",
      square: 10,
      price: null,
    },
    {
      id: 913,
      x: 45,
      y: 53,
      info: "Участок 913",
      square: 10,
      price: null,
    },
    {
      id: 915,
      x: 44,
      y: 57,
      info: "Участок 915",
      square: 10,
      price: null,
    },
    {
      id: 916,
      x: 43,
      y: 61,
      info: "Участок 916",
      square: 10,
      price: null,
    },
    //группа 4
    {
      id: 899,
      x: 46,
      y: 33,
      info: "Участок 899",
      square: 10,
      price: null,
    },
    {
      id: 900,
      x: 47,
      y: 29,
      info: "Участок 900",
      square: 10,
      price: null,
    },
    {
      id: 901,
      x: 48,
      y: 25,
      info: "Участок 901",
      square: 10,
      price: null,
    },
    {
      id: 902,
      x: 49,
      y: 21,
      info: "Участок 902",
      square: 10,
      price: null,
    },
    {
      id: 903,
      x: 50,
      y: 17,
      info: "Участок 903",
      square: 11.1,
      price: null,
    },
    {
      id: 917,
      x: 49,
      y: 35,
      info: "Участок 917",
      square: 10,
      price: null,
    },
    {
      id: 918,
      x: 50,
      y: 31,
      info: "Участок 918",
      square: 10,
      price: null,
    },
    {
      id: 919,
      x: 51,
      y: 27,
      info: "Участок 919",
      square: 10,
      price: null,
    },
    {
      id: 920,
      x: 52,
      y: 23,
      info: "Участок 920",
      square: 13.8,
      price: null,
    },
    //группа 5
    {
      id: 880,
      x: 38,
      y: 23,
      info: "Участок 880",
      square: 10,
      price: null,
    },
    {
      id: 881,
      x: 39,
      y: 19,
      info: "Участок 881",
      square: 10,
      price: null,
    },
    {
      id: 883,
      x: 41,
      y: 16,
      info: "Участок 883",
      square: 6.7,
      price: null,
    },
    {
      id: 889,
      x: 42,
      y: 26,
      info: "Участок 889",
      square: 10,
      price: null,
    },
    {
      id: 890,
      x: 43,
      y: 22,
      info: "Участок 890",
      square: 10,
      price: null,
    },
    {
      id: 891,
      x: 44,
      y: 18,
      info: "Участок 891",
      square: 10,
      price: null,
    },
    {
      id: 892,
      x: 46,
      y: 14,
      info: "Участок 892",
      square: 8.9,
      price: null,
    },
    //группа 6
    {
      id: 904,
      x: 28,
      y: 22,
      info: "Участок 904",
      square: 10,
      price: null,
    },
    {
      id: 893,
      x: 29,
      y: 17.5,
      info: "Участок 893",
      square: 10,
      price: null,
    },
    {
      id: 882,
      x: 30,
      y: 13,
      info: "Участок 882",
      square: 10,
      price: null,
    },
    {
      id: 2270,
      x: 32,
      y: 10,
      info: "Участок 2270",
      square: 10,
      price: null,
    },
    {
      id: 923,
      x: 34,
      y: 16,
      info: "Участок 923",
      square: 10,
      price: null,
    },
    {
      id: 924,
      x: 35,
      y: 12,
      info: "Участок 891",
      square: 7.5,
      price: null,
    },
  ];

  // Создание маркеров на карте
  plots.forEach((plot) => {
    const plotElement = document.createElement("div");
    plotElement.className = "plot";
    plotElement.style.left = plot.x + "%";
    plotElement.style.top = plot.y + "%";

    plotElement.addEventListener("click", () =>
      showPlotInfo(plot, plotElement)
    );
    mapOverlay.appendChild(plotElement);
  });

  // Показ информации об участке
  function showPlotInfo(plot, element) {
    if (selectedPlot) {
      selectedPlot.classList.remove("selected");
    }
    element.classList.add("selected");
    selectedPlot = element;
    currentPlot = plot; // Сохраняем текущий участок

    // Рассчитываем цену
    const price = plot.square * 12000;

    // Формируем кадастровый номер
    const cadastralNumber = `69:10:0000032:${plot.id}`;

    // Форматируем информацию об участке с HTML
    plotInfo.innerHTML = `
        <div class="plot-info__item">
            <span class="plot-info__label">Номер участка:</span>
            <span class="plot-info__value">${plot.id}</span>
        </div>
        <div class="plot-info__item">
            <span class="plot-info__label">Кадастровый номер:</span>
            <span class="plot-info__value">${cadastralNumber}</span>
        </div>
        <div class="plot-info__item">
            <span class="plot-info__label">Площадь:</span>
            <span class="plot-info__value">${plot.square} соток</span>
        </div>
        <div class="plot-info__item">
            <span class="plot-info__label">Стоимость:</span>
            <span class="plot-info__value">${price} тыс. ₽</span>
        </div>
    `;

    infoPanel.style.display = "block";
  }

  // Закрытие панели информации
  closeInfo.addEventListener("click", () => {
    infoPanel.style.display = "none";
    if (selectedPlot) {
      selectedPlot.classList.remove("selected");
      selectedPlot = null;
    }
  });

  // Добавляем обработчик для кнопки бронирования
  const bookPlotBtn = document.getElementById("bookPlot");
  bookPlotBtn.addEventListener("click", openBookingModal);
}

// Обновляем обработчики событий
document.addEventListener("DOMContentLoaded", function () {
  // Добавляем обработчик для поля телефона
  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("input", function () {
    formatPhoneNumber(this);
  });

  // Форма бронирования
  const bookingForm = document.getElementById("bookingForm");
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const phonePattern = /^\+7\s\(\d{3}\)\s\d{3}\s\d{2}-\d{2}$/;

    if (!name || !phonePattern.test(phone)) {
      showMessagePopup("Пожалуйста, введите корректное имя и номер телефона");
      return;
    }

    // Формируем данные для отправки
    const formData = {
      name: name,
      phone: phone,
      plotId: currentPlot.id,
      square: currentPlot.square,
    };

    // Отправляем через наш прокси-сервер
    fetch("send_telegram.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Закрываем все модальные окна
          closeBookingModal();
          const closeInfo = document.getElementById("closeInfo");
          closeInfo.click();

          // Показываем сообщение об успешном бронировании
          showMessagePopup(
            `Спасибо, ${name}! Мы свяжемся с вами в ближайшее время.`
          );
        } else {
          showMessagePopup(
            "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже."
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        showMessagePopup(
          "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже."
        );
      });
  });

  // Закрытие модального окна при клике вне его
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("bookingModal");
    if (event.target === modal) {
      closeBookingModal();
    }
  });
});

// Остальные функции остаются без изменений
function goToEarthTest() {
  const earthMap = document.getElementById("earthMap");
  earthMap.style.display = "block";
  document.body.style.overflow = "hidden";
  initEarthMap();
}

function closeEarthMap() {
  const earthMap = document.getElementById("earthMap");
  earthMap.style.display = "none";
  document.body.style.overflow = "";
}

// Добавляем функции для работы с поп-апом сообщений
function showMessagePopup(message) {
  const popup = document.getElementById("messagePopup");
  const messageText = popup.querySelector(".message-popup__text");
  messageText.textContent = message;
  popup.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeMessagePopup() {
  const popup = document.getElementById("messagePopup");
  popup.style.display = "none";
  document.body.style.overflow = "";
}

// Добавляем закрытие поп-апа по клику вне его
window.addEventListener("click", function (event) {
  const popup = document.getElementById("messagePopup");
  if (event.target === popup) {
    closeMessagePopup();
  }
});
