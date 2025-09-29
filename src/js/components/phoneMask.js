import IMask from 'imask';

export default function initPhoneMasks(root = document) {
  const inputs = root.querySelectorAll('input.js-phone');

  inputs.forEach(input => {
    const errorEl = input.parentElement.querySelector('.input-error-message');
    if (errorEl) errorEl.classList.remove('active');
    input.classList.remove('input-error');

    // Подключаем IMask
    const mask = IMask(input, {
      mask: '+{7} (000) 000-00-00',
      lazy: true
    });

    // Автозамена ведущей 8 на 7
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
      form.addEventListener('submit', e => {
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
