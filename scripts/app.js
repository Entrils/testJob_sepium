'use strict';

$(function () {
  const catalogNode = document.querySelector('#catalog-grid');
  const cardTemplate = document.querySelector('#product-card-template');

  const productBase = {
    article: '4607',
    title: 'Угловая бежевая кухня на заказ с матовыми фасадами в современном стиле',
    description: 'Описание товара',
    price: '515 700 ₽',
    priceNote: '30 000 ₽',
    likes: 57,
    materials: [
      { id: 'pvh', label: 'ПВХ', isActive: true },
      { id: 'enamel', label: 'Эмаль', isActive: false },
      { id: 'plastic', label: 'Пластик', isActive: false },
      { id: 'solid', label: 'Массив', isActive: false }
    ],
    images: [
      {
        src: './assets/kitchen.png',
        alt: 'Светлая кухня, вид 1'
      },
      {
        src: './assets/kitchen.png',
        alt: 'Светлая кухня, вид 2'
      },
      {
        src: './assets/kitchen.png',
        alt: 'Светлая кухня, вид 3'
      }
    ]
  };

  const products = Array.from({ length: 6 }, function (_, index) {
    return {
      ...productBase,
      id: index + 1,
      materials: productBase.materials.map(function (material) {
        return { ...material };
      }),
      images: productBase.images.map(function (image) {
        return { ...image };
      })
    };
  });

  function createSlideMarkup(image, galleryId) {
    return [
      '<div class="product-card__slide swiper-slide">',
      '  <a class="product-card__zoom-link" href="' + image.src + '" data-fancybox="' + galleryId + '" data-caption="' + image.alt + '">',
      '    <img class="product-card__slide-image" src="' + image.src + '" alt="' + image.alt + '">',
      '  </a>',
      '</div>'
    ].join('');
  }

  function createMaterialMarkup(material) {
    const activeClass = material.isActive ? ' product-card__option-button_state_active' : '';

    return [
      '<button class="product-card__option-button' + activeClass + '" type="button" data-material="' + material.id + '">',
      material.label,
      '</button>'
    ].join('');
  }

  function renderProductCard(product) {
    const cardFragment = cardTemplate.content.cloneNode(true);
    const card = cardFragment.querySelector('.product-card');
    const sliderWrapper = card.querySelector('.product-card__slider-wrapper');
    const description = card.querySelector('.product-card__description-text');
    const articleValue = card.querySelector('.product-card__article-value');
    const title = card.querySelector('.product-card__title');
    const materials = card.querySelector('.product-card__options-list');
    const price = card.querySelector('.product-card__price-value');
    const priceNote = card.querySelector('.product-card__price-note-value');
    const likeCount = card.querySelector('.product-card__like-count');
    const mainLink = card.querySelector('.product-card__main-link');
    const calcLink = card.querySelector('.product-card__calc-link');
    const galleryId = 'gallery-' + product.id;

    card.dataset.productId = String(product.id);
    mainLink.setAttribute('aria-label', product.title);
    mainLink.href = '/card';
    calcLink.href = '/calc';
    sliderWrapper.innerHTML = product.images.map(function (image) {
      return createSlideMarkup(image, galleryId);
    }).join('');
    description.textContent = product.description;
    articleValue.textContent = product.article;
    title.textContent = product.title;
    materials.innerHTML = product.materials.map(createMaterialMarkup).join('');
    price.textContent = product.price;
    priceNote.textContent = product.priceNote;
    likeCount.textContent = String(product.likes);

    return cardFragment;
  }

  function renderCatalog(items) {
    const fragment = document.createDocumentFragment();

    items.forEach(function (product) {
      fragment.appendChild(renderProductCard(product));
    });

    catalogNode.innerHTML = '';
    catalogNode.appendChild(fragment);
  }

  renderCatalog(products);

  window.catalogApp = {
    products,
    renderCatalog
  };
});
