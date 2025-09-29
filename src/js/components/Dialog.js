// const ROOT_SELECTOR = '[data-dialog]';

// class Dialog {
//   selectors = {
//     dialogBtn: 'data-dialog-btn',
//     dialogInner: '[data-dialog-inner]',
//     closeBtn: '[data-dialog-close]',
//     video: '[data-dialog-video]'
//   };

//   stateClasses = {
//     scrollLock: 'scroll-lock',
//     activeBackdrop: 'is-active'
//   };

//   constructor(rootElement) {
//     this.root = rootElement;
//     this.dialogBtns = document.querySelectorAll(`[${this.selectors.dialogBtn}="${this.root.dataset.dialog}"]`);
//     this.backdrop = document.querySelector(`[data-dialog-backdrop="${this.root.dataset.dialog}"]`);
//     this.video = this.root.querySelector(this.selectors.video);

//     if (this.dialogBtns.length > 0) {
//       this.bindEvents();
//     }
//   }

//   bindEvents() {
//     this.dialogBtns.forEach((btn) => btn.addEventListener('click', this.handleButtonClick));
//     this.root.addEventListener('click', this.handleDialogClick);
//     document.addEventListener('keydown', this.handleEscPress);
//   }

//   handleButtonClick = (e) => {

//     const buttonText = e.currentTarget.dataset.dialogTitle;
//     if (buttonText) {
//       const title = this.root.querySelector('[data-dialog-title-for-change]');
//       title.textContent = buttonText;
//     }

//     this.root.showModal();
//     this.root.focus();

//     document.body.classList.add(this.stateClasses.scrollLock);
//     if (this.backdrop) {
//       this.backdrop.classList.add(this.stateClasses.activeBackdrop);
//     }

//     if (this.video) {
//       if (!this.video.src) {
//         const source = this.video.querySelector('source');
//         this.video.src = source.dataset.src || source.src; // используем data-src
//       }
//       this.video.currentTime = 0;
//       if (document.visibilityState === "visible") {
//         this.video.play().catch(() => { });
//       }
//     }
//   };

//   handleDialogClick = (e) => {
//     if (
//       e.target.closest(this.selectors.closeBtn) ||
//       !e.target.closest(this.selectors.dialogInner)
//     ) {
//       this.closeDialog();
//     }
//   };

//   handleEscPress = (e) => {
//     if (e.key === 'Escape' && this.root.open) {
//       this.closeDialog();
//     }
//   };

//   closeDialog() {
//     this.root.close();
//     document.body.classList.remove(this.stateClasses.scrollLock);
//     if (this.backdrop) {
//       this.backdrop.classList.remove(this.stateClasses.activeBackdrop);
//     }

//     if (this.video) {
//       this.video.pause();
//       this.video.currentTime = 0;
//       this.video.removeAttribute('src');
//       this.video.load();
//     }
//   }
// }

// class DialogCollection {
//   static instance;

//   constructor() {
//     if (DialogCollection.instance) {
//       return DialogCollection.instance;
//     }
//     DialogCollection.instance = this;
//     this.init();
//   }

//   init() {
//     document
//       .querySelectorAll(ROOT_SELECTOR)
//       .forEach((element) => new Dialog(element));
//   }
// }

// export default DialogCollection;

import IMask from 'imask';

const ROOT_SELECTOR = '[data-dialog]';

class Dialog {
  selectors = {
    dialogBtn: 'data-dialog-btn',
    dialogInner: '[data-dialog-inner]',
    closeBtn: '[data-dialog-close]',
  };

  stateClasses = {
    scrollLock: 'scroll-lock',
    activeBackdrop: 'is-active'
  };

  constructor(rootElement) {
    this.root = rootElement;
    this.dialogBtns = document.querySelectorAll(`[${this.selectors.dialogBtn}="${this.root.dataset.dialog}"]`);
    this.backdrop = document.querySelector(`[data-dialog-backdrop="${this.root.dataset.dialog}"]`);

    if (this.dialogBtns.length > 0) {
      this.bindEvents();
    }
  }

  bindEvents() {
    this.dialogBtns.forEach(btn => btn.addEventListener('click', this.handleButtonClick));
    this.root.addEventListener('click', this.handleDialogClick);
    document.addEventListener('keydown', this.handleEscPress);
  }

  handleButtonClick = (e) => {
    const buttonText = e.currentTarget.dataset.dialogTitle;
    if (buttonText) {
      const title = this.root.querySelector('[data-dialog-title-for-change]');
      title.textContent = buttonText;
    }

    this.root.showModal();
    this.root.focus();

    document.body.classList.add(this.stateClasses.scrollLock);
    if (this.backdrop) this.backdrop.classList.add(this.stateClasses.activeBackdrop);

    // Инициализация маски и ошибок после открытия диалога
    this.initPhoneMasks();
  };

  handleDialogClick = (e) => {
    if (e.target.closest(this.selectors.closeBtn) || !e.target.closest(this.selectors.dialogInner)) {
      this.closeDialog();
    }
  };

  handleEscPress = (e) => {
    if (e.key === 'Escape' && this.root.open) this.closeDialog();
  };

  closeDialog() {
    this.root.close();
    document.body.classList.remove(this.stateClasses.scrollLock);
    if (this.backdrop) this.backdrop.classList.remove(this.stateClasses.activeBackdrop);
  }

  initPhoneMasks() {
    const inputs = this.root.querySelectorAll('input.js-phone');

    inputs.forEach(input => {
      const errorEl = input.parentElement.querySelector('.input-error-message');

      // Сброс состояния ошибки
      input.classList.remove('input-error');
      if (errorEl) errorEl.classList.remove('active');

      const mask = IMask(input, { mask: '+{7} (000) 000-00-00', lazy: true });

      // Автозамена ведущей 8 → 7
      input.addEventListener('input', () => {
        const raw = mask.unmaskedValue;
        if (raw.startsWith('8')) {
          mask.unmaskedValue = '7' + raw.slice(1);
        }
      });

      // Проверка при blur
      input.addEventListener('blur', () => {
        if (mask.unmaskedValue.length < 11) {
          input.classList.add('input-error');
          if (errorEl) errorEl.classList.add('active');
        } else {
          input.classList.remove('input-error');
          if (errorEl) errorEl.classList.remove('active');
        }
      });

      // Проверка при сабмите формы
      const form = input.form;
      if (form) {
        form.addEventListener('submit', (e) => {
          if (mask.unmaskedValue.length < 11) {
            e.preventDefault();
            input.classList.add('input-error');
            if (errorEl) errorEl.classList.add('active');
            input.focus();
          } else {
            input.classList.remove('input-error');
            if (errorEl) errorEl.classList.remove('active');
            console.log('Форма валидна:', mask.value, mask.unmaskedValue);
          }
        });
      }
    });
  }
}

// Инициализация всех диалогов
class DialogCollection {
  static instance;

  constructor() {
    if (DialogCollection.instance) return DialogCollection.instance;
    DialogCollection.instance = this;
    this.init();
  }

  init() {
    document.querySelectorAll(ROOT_SELECTOR).forEach(el => new Dialog(el));
  }
}

export default DialogCollection;
