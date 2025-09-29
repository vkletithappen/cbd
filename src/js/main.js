import Burger from './components/Burger';
import TextMarker from './components/TextMarker';
import AccordionCollection from './components/Accordion';
import TabsCollection from './components/Tabs';
import ScrolleCollection from './components/Scroller';
import SliderCollection from './components/Slider';
import DialogCollection from './components/Dialog';
import CustomSelect from './components/CustomSelect.js';

import initPhoneMasks from './components/phoneMask';

import 'fslightbox';

import './components/map'
import './components/btnToTop';
import '@/scss/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  initPhoneMasks();
  new Burger();
  new TextMarker();
  new AccordionCollection();
  new TabsCollection();
  new ScrolleCollection();
  new SliderCollection();
  new DialogCollection();
  new CustomSelect('.custom-select', '[data-js-product-price]');
});