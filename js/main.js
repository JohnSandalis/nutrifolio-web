const headerEl = document.querySelector(".header");
const btnNavEl = document.querySelector(".nav__btn");
const faqButtons = document.querySelectorAll(
  "button[aria-expanded][aria-controls]"
);
// Mobile navigation
const overlay = document.querySelector(".overlay");
const mobileNav = function () {
  btnNavEl.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
    overlay.classList.toggle("hidden");
  });
};

const closeNav = function () {
  headerEl.classList.remove("nav-open");
  overlay.classList.add("hidden");
};

overlay.addEventListener("click", function () {
  closeNav();
});

// Sticky nav
const heroEl = document.querySelector(".hero-section");

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    headerEl.classList.add("sticky");
    headerEl.classList.add("fadeInTop");
  } else {
    headerEl.classList.remove("fadeInTop");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: "-61px",
});

const observeNav = function () {
  window.addEventListener("scroll", () => {
    headerEl.classList.contains("sticky") && window.scrollY <= 80
      ? headerEl.classList.remove("sticky")
      : "";

    headerEl.classList.contains("nav-open") ? closeNav() : "";
  });
};

// Smooth link scrolling
const linksList = document.querySelectorAll(".nav__list--link");
const sectionsList = document.querySelectorAll("section");

const smoothScrolling = function () {
  linksList.forEach((link) => {
    if (link.name === "hero") {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    } else {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        sectionsList.forEach((section) => {
          section.id === link.name
            ? section.scrollIntoView({ behavior: "smooth" })
            : "";
        });
      });
    }
  });
};

// FAQ Section
class DisclosureButton {
  constructor(buttonNode) {
    this.buttonNode = buttonNode;
    this.controlledNode = false;

    var id = this.buttonNode.getAttribute("aria-controls");

    if (id) {
      this.controlledNode = document.getElementById(id);
    }

    this.buttonNode.setAttribute("aria-expanded", "false");
    this.hideContent();

    this.buttonNode.addEventListener("click", this.onClick.bind(this));
    this.buttonNode.addEventListener("focus", this.onFocus.bind(this));
    this.buttonNode.addEventListener("blur", this.onBlur.bind(this));
  }

  showContent() {
    if (this.controlledNode) {
      this.controlledNode.style.display = "block";
      this.buttonNode.children[0].src = "icons/remove-circle.svg";
    }
  }

  hideContent() {
    if (this.controlledNode) {
      this.controlledNode.style.display = "none";
      this.buttonNode.children[0].src = "icons/add-circle.svg";
    }
  }

  toggleExpand() {
    if (this.buttonNode.getAttribute("aria-expanded") === "true") {
      this.buttonNode.setAttribute("aria-expanded", "false");
      this.hideContent();
    } else {
      this.buttonNode.setAttribute("aria-expanded", "true");
      this.showContent();
    }
  }

  onClick() {
    this.toggleExpand();
  }

  onFocus() {
    this.buttonNode.classList.add("focus");
  }

  onBlur() {
    this.buttonNode.classList.remove("focus");
  }
}

window.addEventListener(
  "load",
  function () {
    // Mobile navigation
    mobileNav();

    // Sticky Nav
    headerObserver.observe(heroEl);
    observeNav();

    // Smooth Scrolling
    smoothScrolling();

    // FAQ Buttons
    faqButtons.forEach((faqButton) => {
      new DisclosureButton(faqButton);
    });
  },
  false
);
