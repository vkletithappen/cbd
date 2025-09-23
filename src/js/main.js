import Burger from './components/Burger';
import TextMarker from './components/TextMarker';
import AccordionCollection from './components/Accordion';
import TabsCollection from './components/Tabs';
import ScrolleCollection from './components/Scroller';
import SliderCollection from './components/Slider';

import './components/btnToTop';
import '@/scss/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  new Burger();
  new TextMarker();
  new AccordionCollection();
  new TabsCollection();
  new ScrolleCollection();
  new SliderCollection();
});