(function (window) {
  'use strict';

  const mobileMediaQuery = window.matchMedia('(max-width: 767.98px)');
  const swipers = [];

  function setSwiperAutoplay(swiperInstance) {
    if (!swiperInstance || !swiperInstance.autoplay) {
      return;
    }

    if (mobileMediaQuery.matches) {
      swiperInstance.params.autoplay = {
        delay: 3000,
        disableOnInteraction: false
      };
      swiperInstance.autoplay.start();
      return;
    }

    swiperInstance.autoplay.stop();
  }

  function initSwipers(catalogNode) {
    const sliderNodes = catalogNode.querySelectorAll('.product-card__slider');

    sliderNodes.forEach(function (sliderNode) {
      const swiperInstance = new Swiper(sliderNode, {
        loop: true,
        speed: 550,
        slidesPerView: 1,
        allowTouchMove: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: sliderNode.querySelector('.product-card__nav-button_type_next'),
          prevEl: sliderNode.querySelector('.product-card__nav-button_type_prev')
        },
        pagination: {
          el: sliderNode.querySelector('.product-card__pagination'),
          clickable: true
        }
      });

      setSwiperAutoplay(swiperInstance);
      swipers.push(swiperInstance);
    });
  }

  function bindFancybox() {
    Fancybox.bind('[data-fancybox]', {
      Thumbs: false,
      Toolbar: {
        display: {
          left: [],
          middle: [],
          right: ['close']
        }
      }
    });
  }

  mobileMediaQuery.addEventListener('change', function () {
    swipers.forEach(function (swiperInstance) {
      setSwiperAutoplay(swiperInstance);
    });
  });

  window.CatalogApp.media = {
    mobileMediaQuery: mobileMediaQuery
  };

  window.CatalogApp.slider = {
    swipers: swipers,
    initSwipers: initSwipers,
    bindFancybox: bindFancybox
  };
})(window);
