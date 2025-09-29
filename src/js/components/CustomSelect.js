class CustomSelect {
  constructor(containerSelector, priceSelector) {
    this.selectContainer = document.querySelector(containerSelector);
    this.priceElement = document.querySelector(priceSelector);

    if (!this.selectContainer) return; // если контейнера нет, выходим
    if (!this.priceElement) return; // если элемента цены нет, выходим

    this.display = this.selectContainer.querySelector('.custom-select__select-display');
    this.optionsList = this.selectContainer.querySelector('.custom-select__select-options');
    this.options = this.optionsList ? this.optionsList.querySelectorAll('.custom-select__option') : [];

    if (!this.display || this.options.length === 0) return; // если нет дисплея или опций — выходим

    this.selectedValue = this.options[0].dataset.value || '';
    this.display.textContent = this.options[0].textContent;

    this.initialPrice = Number(this.priceElement.dataset.initialPrice) || 0;
    this.updatePrice();

    this.addEventListeners();
  }

  addEventListeners() {
    this.display.addEventListener('click', () => this.toggleOptions());
    this.options.forEach(option => {
      option.addEventListener('click', () => this.selectOption(option));
    });

    document.addEventListener('click', (e) => {
      if (!this.selectContainer.contains(e.target)) {
        this.selectContainer.classList.remove('open');
      }
    });
  }

  toggleOptions() {
    this.selectContainer.classList.toggle('open');
  }

  selectOption(option) {
    this.display.textContent = option.textContent;
    this.selectedValue = option.dataset.value;
    this.selectContainer.classList.remove('open');
    this.updatePrice();
  }

  updatePrice() {
    const totalPrice = this.selectedValue * this.initialPrice || this.initialPrice;
    this.priceElement.textContent = `${totalPrice.toLocaleString('ru-RU')} РУБ.`;
  }
}


export default CustomSelect;