// Здесь будет основной JavaScript код
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM загружен");
});

// Глобальные переменные для слайдера
let currentSlide = 0;
let goToSlide;

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
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
}

// Закрытие модального окна при клике вне его
window.onclick = function (event) {
  const modal = document.getElementById("locationModal");
  if (event.target === modal) {
    closeModal();
  }
};

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

  // Функция перехода к слайду
  goToSlide = function (index) {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;

    // Обновляем активную точку
    document.querySelectorAll(".slider__dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  };

  // Автоматическое переключение слайдов
  let slideInterval = setInterval(() => {
    nextSlide();
  }, 5000);

  // Останавливаем автопереключение при наведении мыши
  track.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
  });

  // Возобновляем автопереключение когда мышь уходит
  track.addEventListener("mouseleave", () => {
    slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);
  });

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

// Добавьте эти функции в начало файла
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
