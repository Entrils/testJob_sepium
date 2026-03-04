(function (window) {
  'use strict';

  const mobileMediaQuery = window.matchMedia('(max-width: 767.98px)');
  const swipers = [];

  function buildSlidesForFancybox(sliderNode) {
    return Array.from(sliderNode.querySelectorAll('.product-card__zoom-link')).map(function (linkNode) {
      return {
        src: linkNode.getAttribute('href'),
        type: 'image',
        caption: linkNode.dataset.caption || ''
      };
    });
  }

  function getInitialSlideIndex(swiperInstance) {
    if (!swiperInstance) {
      return 0;
    }

    return typeof swiperInstance.realIndex === 'number' ? swiperInstance.realIndex : 0;
  }

  function updateSwiperMode(swiperInstance) {
    if (!swiperInstance) {
      return;
    }

    swiperInstance.allowTouchMove = mobileMediaQuery.matches;

    if (mobileMediaQuery.matches) {
      swiperInstance.params.autoplay = {
        delay: 3000,
        disableOnInteraction: false
      };
      swiperInstance.autoplay.start();
      return;
    }

    swiperInstance.autoplay.stop();
    swiperInstance.params.autoplay = false;
  }

  function initSwipers(catalogNode) {
    const sliderNodes = catalogNode.querySelectorAll('.product-card__slider');

    sliderNodes.forEach(function (sliderNode) {
      const swiperInstance = new Swiper(sliderNode, {
        loop: true,
        speed: 550,
        slidesPerView: 1,
        allowTouchMove: mobileMediaQuery.matches,
        autoplay: mobileMediaQuery.matches
          ? {
              delay: 3000,
              disableOnInteraction: false
            }
          : false,
        navigation: {
          nextEl: sliderNode.querySelector('.product-card__nav-button_type_next'),
          prevEl: sliderNode.querySelector('.product-card__nav-button_type_prev')
        },
        pagination: {
          el: sliderNode.closest('.product-card').querySelector('.product-card__pagination'),
          clickable: true
        }
      });

      sliderNode.catalogSwiper = swiperInstance;
      swipers.push(swiperInstance);
    });
  }

  function bindFancybox() {
    Fancybox.bind('[data-fancybox]', {
      Images: {
        initialSize: 'fit',
        Panzoom: {
          maxScale: 1
        }
      },
      Thumbs: false,
      animated: false,
      Toolbar: {
        display: {
          left: [],
          middle: [],
          right: ['close']
        }
      }
    });
  }

  function openGalleryFromSlider(sliderNode) {
    const swiperInstance = sliderNode.catalogSwiper;
    const activeSlide = sliderNode.querySelector('.swiper-slide-active .product-card__zoom-link');
    const fallbackSlide = sliderNode.querySelector('.product-card__zoom-link');
    const currentLink = activeSlide || fallbackSlide;
    const slides = buildSlidesForFancybox(sliderNode);

    if (!currentLink || !slides.length) {
      return;
    }

    Fancybox.show(slides, {
      startIndex: getInitialSlideIndex(swiperInstance),
      Images: {
        initialSize: 'fit',
        Panzoom: {
          maxScale: 1
        }
      },
      Thumbs: false,
      animated: false,
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
      updateSwiperMode(swiperInstance);
    });
  });

  window.CatalogApp.media = {
    mobileMediaQuery: mobileMediaQuery
  };

  window.CatalogApp.slider = {
    swipers: swipers,
    initSwipers: initSwipers,
    bindFancybox: bindFancybox,
    openGalleryFromSlider: openGalleryFromSlider,
    updateSwiperMode: updateSwiperMode
  };
})(window);


