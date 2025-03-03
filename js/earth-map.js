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
      info: "Участок 875",
      square: 10,
      price: null,
    },
    {
      id: 872,
      x: 26,
      y: 31,
      info: "Участок 876",
      square: 10,
      price: null,
    },
    {
      id: 925,
      x: 27,
      y: 27,
      info: "Участок 877",
      square: 10,
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
      alert("Пожалуйста, введите корректное имя и номер телефона");
      return;
    }

    const formData = {
      plotId: currentPlot.id,
      name: name,
      phone: phone,
    };

    // Здесь можно добавить отправку данных на сервер
    console.log("Данные для бронирования:", formData);

    // Закрываем все модальные окна
    closeBookingModal();
    const closeInfo = document.getElementById("closeInfo");
    closeInfo.click();

    // Показываем сообщение об успешном бронировании
    alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
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
