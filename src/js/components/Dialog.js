const ROOT_SELECTOR = '[data-dialog]';

class Dialog {
  selectors = {
    dialogBtn: 'data-dialog-btn',
    dialogInner: '[data-dialog-inner]',
    closeBtn: '[data-dialog-close]'
  }

  stateClasses = {
    scrollLock: 'scroll-lock'
  }

  constructor(rootElement) {
    this.root = rootElement;
    this.dialogBtns = document.querySelectorAll(`[${this.selectors.dialogBtn} = ${this.root.dataset.dialog}]`)

    if (this.dialogBtns) {
      this.bindEvents();
    }
  }

  bindEvents() {
    this.dialogBtns.forEach(btn => btn.addEventListener('click', this.handleButtonClick));
    this.root.addEventListener('click', this.handleDialogClick);
  }

  handleButtonClick = () => {
    this.root.showModal();
    document.body.classList.add(this.stateClasses.scrollLock);
  }

  handleDialogClick = (e) => {
    if (
      e.target.closest(this.selectors.closeBtn) ||
      !e.target.closest(this.selectors.dialogInner)
    ) {
      this.closeDialog();
    }
  }

  closeDialog() {
    this.root.close();
    document.body.classList.remove(this.stateClasses.scrollLock);
  }
}

class DialogCollection {
  static instance;

  constructor() {
    if (DialogCollection.instance) {
      return DialogCollection.instance;
    }
    DialogCollection.instance = this;
    this.init();
  }

  init() {
    document.querySelectorAll(ROOT_SELECTOR).forEach(element => new Dialog(element));
  }
}

export default DialogCollection;

// class DialogCollection {
//   constructor() {
//     this.init();
//   }

//   init() {
//     document.querySelectorAll(ROOT_SELECTOR).forEach(dialog => new Dialog(dialog));
//   }
// }