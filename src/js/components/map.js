import placemarkImg from '@/assets/img/placemark-map.svg';

const mapContainer = document.getElementById('map');

if (mapContainer) {
  function initMap() {
    let map = new ymaps.Map('map', {
      center: [55.747487627875735, 37.632923764133686],
      zoom: 13,
      controls: [],
      type: 'yandex#map'
    });

    const placemark = new ymaps.Placemark(
      [55.75789485346824, 37.63056342020057],
      {
        hintContent: "Головной офис компании",
      },
      {
        iconLayout: "default#image",
        iconImageHref: placemarkImg,
        iconImageSize: [44, 44],
      }
    );

    map.behaviors.disable('scrollZoom');
    map.controls.add('zoomControl', {
      position: { top: 20, right: 10 },
      size: 'small'
    });

    map.geoObjects.add(placemark);
  }

  function loadYandexMapAPI(callback) {
    const script = document.createElement('script');
    script.src = "https://api-maps.yandex.ru/2.1/?apikey=fd38c889-a657-46b0-ae1b-41f613ec73a6&lang=ru_RU";
    script.onload = () => callback?.();
    document.body.appendChild(script);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        loadYandexMapAPI(() => {
          ymaps.ready(initMap);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0 });

  observer.observe(mapContainer);
}
