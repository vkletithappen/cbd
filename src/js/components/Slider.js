import getParams from '../utils/getParams';
import Swiper from 'swiper';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';

const ROOT_SELECTOR = '[data-js-slider]';

class Slider {
  selectors = {
    root: ROOT_SELECTOR,
    swiper: '[data-js-slider-swiper]',
    previousButton: 'data-js-slider-previous',
    nextButton: 'data-js-slider-next',
    pagination: 'data-js-slider-pagination',
  }

  defaultConfig = {
    modules: [Navigation, Pagination],
    // spaceBetween: 26,
    // slidesPerView: 1.08,
    // slidesOffsetAfter: 30
    slidesPerView: 1
  }

  constructor(rootElement) {
    this.root = rootElement;
    this.swiper = this.root.querySelector(this.selectors.swiper);
    this.params = getParams(this.root, this.selectors.root);

    this.previousButton = this.getElement(this.selectors.previousButton);
    this.nextButton = this.getElement(this.selectors.nextButton);
    this.pagination = this.getElement(this.selectors.pagination);

    this.init();
  }

  getElement(attribute) {
    const selector = `[${attribute}=${this.swiper.dataset.jsSliderSwiper}]`;
    return document.querySelector(selector);
  }

  init() {
    new Swiper(this.swiper, {
      ...this.defaultConfig,
      ...this.params,
      navigation: {
        prevEl: this.previousButton,
        nextEl: this.nextButton,
      },
      pagination: {
        el: this.pagination,
        bulletClass: 'pagination-bullet',
        bulletActiveClass: 'is-active',
        clickable: true
      }
    })
  }
}

class SliderCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(ROOT_SELECTOR).forEach(element => new Slider(element));
  }
}

export default SliderCollection;