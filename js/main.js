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
