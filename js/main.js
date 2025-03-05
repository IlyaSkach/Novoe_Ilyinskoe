// Здесь будет основной JavaScript код
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM загружен");
});

// Глобальные переменные для слайдера
let currentSlide = 0;
let goToSlide;
let slideInterval; // Для хранения интервала
let touchStartX = 0;
let touchEndX = 0;

// Функции для стрелок слайдера
function nextSlide() {
  const slides = document.querySelectorAll(".slider__slide");
  currentSlide = (currentSlide + 1) % slides.length;
  if (goToSlide) goToSlide(currentSlide);
}

function prevSlide() {
  const slides = document.querySelectorAll(".slider__slide");
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  if (goToSlide) goToSlide(currentSlide);
}

// Функции для модального окна
function openModal() {
  const modal = document.getElementById("locationModal");
  if (modal) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    initSlider(); // Инициализируем слайдер при открытии модального окна
  }
}

function closeModal() {
  const modal = document.getElementById("locationModal");
  modal.style.display = "none";
  document.body.style.overflow = "";
}

// Добавляем обработчик для закрытия по клику на крестик
document.addEventListener("DOMContentLoaded", function () {
  const closeButtons = document.querySelectorAll(".modal__close");
  closeButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });
  });

  // Закрытие по клику вне модального окна
  const modal = document.getElementById("locationModal");
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });
});

// Закрытие модального окна при нажатии Esc
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

// Инициализация слайдера
function initSlider() {
  const track = document.querySelector(".slider__track");
  const slides = document.querySelectorAll(".slider__slide");
  const dotsContainer = document.querySelector(".slider__dots");
  currentSlide = 0;

  // Очищаем контейнер с точками перед добавлением новых
  dotsContainer.innerHTML = "";

  // Создаем точки
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("slider__dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  // Обработчики для свайпов
  track.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    function (e) {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    },
    { passive: true }
  );

  // Функция обработки свайпа
  function handleSwipe() {
    const swipeThreshold = 50; // Минимальное расстояние для свайпа
    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Свайп вправо
        prevSlide();
      } else {
        // Свайп влево
        nextSlide();
      }
    }
  }

  // Функция перехода к слайду
  goToSlide = function (index) {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;

    // Обновляем активную точку
    document.querySelectorAll(".slider__dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  };

  // Обработчики клавиш
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      prevSlide();
    } else if (event.key === "ArrowRight") {
      nextSlide();
    }
  });
}

// Инициализируем слайдер при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  initSlider();
});

// Функции для мобильного меню
function toggleMenu() {
  const burger = document.querySelector(".burger-menu");
  const menu = document.querySelector(".mobile-menu");
  const body = document.body;

  burger.classList.toggle("active");
  menu.classList.toggle("active");

  // Добавляем/удаляем оверлей
  let overlay = document.querySelector(".menu-overlay");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "menu-overlay";
    document.body.appendChild(overlay);
  }

  overlay.classList.toggle("active");
  body.style.overflow = body.style.overflow === "hidden" ? "" : "hidden";

  // Закрытие меню при клике на оверлей
  overlay.onclick = function () {
    burger.classList.remove("active");
    menu.classList.remove("active");
    overlay.classList.remove("active");
    body.style.overflow = "";
  };
}

// Закрытие меню при клике на пункт меню
document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll(".nav__link");

  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const burger = document.querySelector(".burger-menu");
      const menu = document.querySelector(".mobile-menu");
      const overlay = document.querySelector(".menu-overlay");

      if (window.innerWidth <= 768) {
        burger.classList.remove("active");
        menu.classList.remove("active");
        if (overlay) {
          overlay.classList.remove("active");
        }
        document.body.style.overflow = "";
      }
    });
  });
});

// Добавляем функцию для анимации при скролле
function handleScrollAnimation() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Элемент появляется, когда его верхняя граница находится ниже 80% высоты окна
    if (elementTop < windowHeight * 0.8) {
      element.classList.add("visible");
    }
  });
}

// Добавляем обработчики событий
document.addEventListener("DOMContentLoaded", function () {
  // Находим все заголовки
  const titles = document.querySelectorAll(
    "h1, h2, .hero__title, .features__title, .contact__title"
  );

  // Добавляем класс для анимации
  titles.forEach((title, index) => {
    title.classList.add("animate-on-scroll");
    // Добавляем разную задержку для разных элементов
    if (index > 0) {
      title.classList.add(`animate-delay-${(index % 3) + 1}`);
    }
  });

  // Запускаем проверку при загрузке страницы
  handleScrollAnimation();

  // Добавляем обработчик скролла
  window.addEventListener("scroll", handleScrollAnimation);
});

// Добавляем функцию для звонка
function callPhone() {
  // Номер телефона в формате для набора
  const phoneNumber = "+9600728557"; // Замените на реальный номер телефона
  window.location.href = `tel:${phoneNumber}`;
}

// Добавляем функцию для открытия Telegram
function openTelegram() {
  // Ваш username в Telegram
  const username = "realesKate"; // Замените на ваш username в Telegram

  // Создаем ссылки для разных платформ
  const webLink = `https://t.me/${username}`;
  const mobileLink = `tg://resolve?domain=${username}`;

  // Пробуем открыть приложение Telegram
  window.location.href = mobileLink;

  // Если приложение не открылось через 100мс, открываем веб-версию
  setTimeout(() => {
    window.location.href = webLink;
  }, 100);
}

// Объединить все обработчики событий
document.addEventListener("DOMContentLoaded", () => {
  initBurgerMenu();
  initSlider();
  initAnimations();
  initModals();
});

// Вынести повторяющиеся функции в утилиты
const utils = {
  toggleClass: (element, className) => element.classList.toggle(className),
  addClass: (element, className) => element.classList.add(className),
  removeClass: (element, className) => element.classList.remove(className),
};

// Найдите функцию отправки формы и добавьте токен
function sendForm(formData) {
    const data = {
        token: 'novoeilinskoe_2024', // Тот же токен, что в PHP
        name: formData.name,
        phone: formData.phone,
        plotId: formData.plotId,
        square: formData.square
    };

    fetch('/send_telegram.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Заявка успешно отправлена!');
        } else {
            alert('Ошибка при отправке заявки');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Произошла ошибка при отправке');
    });
}
