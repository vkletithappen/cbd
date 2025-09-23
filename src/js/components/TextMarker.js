export default class TextMarker {
  constructor(selector = '[data-js-change-text]', delay = 1000) {
    this.selector = selector;
    this.delay = delay;
    this.timers = new WeakMap();
    this.observer = null;

    this.init();
  }

  init() {
    const accents = document.querySelectorAll(this.selector);
    if (!accents.length) return;

    this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
      threshold: 1,
    });

    accents.forEach((el) => this.observer.observe(el));
  }

  handleIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio === 1) {
        const target = entry.target;

        if (!this.timers.has(target) && !target.classList.contains('marked')) {
          const timerId = setTimeout(() => {
            target.classList.add('marked');
            this.observer.unobserve(target);
            this.timers.delete(target);
          }, this.delay);

          this.timers.set(target, timerId);
        }
      }
    });
  }
}