const headerEl = document.querySelector(".header");
const btnNavEl = document.querySelector(".nav__btn");
const faqButtons = document.querySelectorAll(
  "button[aria-expanded][aria-controls]"
);

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
    btnNavEl.addEventListener("click", function () {
      headerEl.classList.toggle("nav-open");
    });

    // FAQ Buttons
    for (var i = 0; i < faqButtons.length; i++) {
      new DisclosureButton(faqButtons[i]);
    }
  },
  false
);
