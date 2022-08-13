const headerEl = document.querySelector(".header");
const btnNavEl = document.querySelector(".nav__btn");
// Mobile navigation
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});
