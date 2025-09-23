// class Burger {
//   #selectors = {
//     burger: "[data-js-burger]",
//     menu: "[data-js-menu]",
//     menuLink: "[data-js-menu-link]",
//     overlay: "[data-js-overlay]",
//   };

//   #stateClasses = {
//     active: "is-active",
//     disableScroll: "disable-scroll",
//   };

//   #elements = {};

//   constructor() {
//     this.#initElements();
//     if (!this.#isValid()) return;
//     this.#bindEvents();
//   }

//   #initElements() {
//     const { burger, menu, overlay, menuLink } = this.#selectors;

//     this.#elements = {
//       burger: document.querySelector(burger),
//       menu: document.querySelector(menu),
//       overlay: document.querySelector(overlay),
//       menuLinks: document.querySelector(menu)?.querySelectorAll(menuLink) ?? [],
//       body: document.body,
//     };
//   }

//   #isValid() {
//     const requiredElements = ["burger", "menu", "overlay"];
//     return requiredElements.every((key) => {
//       if (!this.#elements[key]) {
//         console.warn(`Burger error: ${key} not found.`);
//         return false;
//       }
//       return true;
//     });
//   }

//   #toggleClasses(action = "toggle") {
//     const { active, disableScroll } = this.#stateClasses;
//     const { burger, menu, overlay, body } = this.#elements;

//     [
//       [burger, active],
//       [menu, active],
//       [overlay, active],
//       [body, disableScroll],
//     ].forEach(([element, className]) => element?.classList[action](className));
//   }

//   #bindEvents() {
//     const { burger, overlay, menu, menuLinks } = this.#elements;
//     const { menuLinks: menuLinksSelector } = this.#selectors;

//     burger.addEventListener("click", () => this.#toggleClasses());
//     overlay.addEventListener("click", () => this.#toggleClasses("remove"));
//     menu.addEventListener("click", ({ target }) => {
//       if (target.closest(menuLinksSelector)) {
//         this.#toggleClasses("remove");
//       }
//     });
//   }
// }

// export default Burger;


class Burger {
  #selectors = {
    burger: "[data-js-burger]",
    menu: "[data-js-menu]",
    menuLink: "[data-js-menu-link]",
    overlay: "[data-js-overlay]",
    header: "header", // 👈 добавляем селектор для header
  };

  #stateClasses = {
    active: "is-active",
    disableScroll: "disable-scroll",
  };

  #elements = {};

  constructor() {
    this.#initElements();
    if (!this.#isValid()) return;
    this.#bindEvents();
  }

  #initElements() {
    const { burger, menu, overlay, menuLink, header } = this.#selectors;

    this.#elements = {
      burger: document.querySelector(burger),
      menu: document.querySelector(menu),
      overlay: document.querySelector(overlay),
      menuLinks: document.querySelector(menu)?.querySelectorAll(menuLink) ?? [],
      header: document.querySelector(header), // 👈 сохраняем header
      body: document.body,
    };
  }

  #isValid() {
    const requiredElements = ["burger", "menu", "overlay"];
    return requiredElements.every((key) => {
      if (!this.#elements[key]) {
        console.warn(`Burger error: ${key} not found.`);
        return false;
      }
      return true;
    });
  }

  #setMenuTop() {
    const { menu, header } = this.#elements;
    if (!menu || !header) return;
    // 👇 вычисляем высоту header и ставим top
    menu.style.top = `${header.offsetHeight}px`;
  }

  #toggleClasses(action = "toggle") {
    const { active, disableScroll } = this.#stateClasses;
    const { burger, menu, overlay, body } = this.#elements;

    // 👇 перед открытием меню всегда обновляем top
    if (action !== "remove") this.#setMenuTop();

    [
      [burger, active],
      [menu, active],
      [overlay, active],
      [body, disableScroll],
    ].forEach(([element, className]) => element?.classList[action](className));
  }

  #bindEvents() {
    const { burger, overlay, menu, menuLinks } = this.#elements;
    const { menuLinks: menuLinksSelector } = this.#selectors;

    burger.addEventListener("click", () => this.#toggleClasses());
    overlay.addEventListener("click", () => this.#toggleClasses("remove"));
    menu.addEventListener("click", ({ target }) => {
      if (target.closest(menuLinksSelector)) {
        this.#toggleClasses("remove");
      }
    });

    // 👇 при ресайзе окна обновляем top, если меню открыто
    window.addEventListener("resize", () => {
      if (menu.classList.contains(this.#stateClasses.active)) {
        this.#setMenuTop();
      }
    });
  }
}

export default Burger;