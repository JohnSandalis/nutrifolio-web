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
const navLinks = document.querySelectorAll(".nav__list--link");
const footerLinks = document.querySelectorAll(".links-col__link");
const linksList = [...navLinks, ...footerLinks];
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
      this.controlledNode.classList.remove("HideAwayTop");
      this.controlledNode.classList.add("RevealInTop");
      this.buttonNode.children[0].style.display = "none";
      this.buttonNode.children[1].style.display = "block";
    }
  }

  hideContent() {
    if (this.controlledNode) {
      this.controlledNode.classList.remove("RevealInTop");
      this.controlledNode.classList.add("HideAwayTop");
      this.buttonNode.children[0].style.display = "block";
      this.buttonNode.children[1].style.display = "none";
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

const animations = function () {
  const heroContainerEl = document.querySelector(".hero__container");
  const sectionTitleEls = document.querySelectorAll(".section-title");
  const sectionSubtitleEls = document.querySelectorAll(".section-subtitle");
  const hiwStepEls = document.querySelectorAll(".hiw__step");
  const supporterEls = document.querySelectorAll(".supported-by__link");
  const benefitEls = document.querySelectorAll(".benefit");
  const faqEl = document.getElementsByClassName("faq");

  ScrollReveal({ distance: "60px", duration: 1000, delay: 200 });

  ScrollReveal().reveal(heroContainerEl.children[0], {
    distance: "120px",
    origin: "left",
  });
  ScrollReveal().reveal(heroContainerEl.children[1], {
    distance: "120px",
    origin: "right",
  });
  let titlesCount = 0;
  sectionTitleEls.forEach((sectionTitle) => {
    titlesCount++;
    ScrollReveal().reveal(sectionTitle, {
      delay: 100 * titlesCount,
      origin: "bottom",
    });
  });
  let subtitlesCount = 0;
  sectionSubtitleEls.forEach((sectionSubtitle) => {
    subtitlesCount++;
    ScrollReveal().reveal(sectionSubtitle, {
      delay: 100 * subtitlesCount,
      origin: "bottom",
    });
  });
  hiwStepEls.forEach((hiwStep) => {
    ScrollReveal().reveal(hiwStep, {
      origin: "bottom",
    });
  });
  let supportersCount = 0;
  supporterEls.forEach((supporter) => {
    supportersCount++;
    ScrollReveal().reveal(supporter, {
      delay: supportersCount * 200 + 200,
      distance: 0,
    });
  });
  let benefitsCount = 0;
  benefitEls.forEach((benefit) => {
    benefitsCount++;
    ScrollReveal().reveal(benefit, {
      delay: benefitsCount * 200 + 300,
      origin: "bottom",
    });
  });
  ScrollReveal().reveal(faqEl, {
    delay: 500,
    origin: "bottom",
  });
};

// Preloader
const preloader = document.querySelector(".loader");

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

    // Animations
    animations();

    // Remove preloader
    setTimeout(function () {
      preloader.style.display = "none";
    }, 100);
  },
  false
);
