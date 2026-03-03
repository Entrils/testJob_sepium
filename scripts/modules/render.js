(function (window) {
  'use strict';

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
    const pressedValue = material.isActive ? 'true' : 'false';

    return [
      '<button class="product-card__option-button' + activeClass + '" type="button" data-material="' + material.id + '" aria-pressed="' + pressedValue + '">',
      material.label,
      '</button>'
    ].join('');
  }

  function renderProductCard(product, templateNode) {
    const cardFragment = templateNode.content.cloneNode(true);
    const card = cardFragment.querySelector('.product-card');
    const sliderNode = card.querySelector('.product-card__slider');
    const sliderWrapper = card.querySelector('.product-card__slider-wrapper');
    const description = card.querySelector('.product-card__description-text');
    const articleValue = card.querySelector('.product-card__article-value');
    const title = card.querySelector('.product-card__title');
    const materials = card.querySelector('.product-card__options-list');
    const price = card.querySelector('.product-card__price-value');
    const priceNote = card.querySelector('.product-card__price-note-value');
    const likeButton = card.querySelector('.product-card__like-button');
    const likeCount = card.querySelector('.product-card__like-count');
    const mainLink = card.querySelector('.product-card__main-link');
    const calcLink = card.querySelector('.product-card__calc-link');
    const buyButton = card.querySelector('.product-card__buy-button');
    const zoomButton = card.querySelector('.product-card__zoom-button');
    const galleryId = 'gallery-' + product.id;

    card.dataset.productId = String(product.id);
    sliderNode.dataset.productId = String(product.id);
    sliderNode.dataset.gallery = galleryId;
    mainLink.setAttribute('aria-label', product.title);
    mainLink.href = '/card';
    calcLink.href = '/calc';
    buyButton.setAttribute('aria-label', 'Заказать ' + product.title);
    zoomButton.setAttribute('aria-label', 'Увеличить изображение товара ' + product.title);
    sliderWrapper.innerHTML = product.images.map(function (image) {
      return createSlideMarkup(image, galleryId);
    }).join('');
    description.textContent = product.description;
    articleValue.textContent = product.article;
    title.textContent = product.title;
    materials.innerHTML = product.materials.map(createMaterialMarkup).join('');
    price.textContent = product.price;
    priceNote.textContent = product.priceNote;
    likeButton.classList.toggle('product-card__like-button_state_active', product.isLiked);
    likeButton.setAttribute('aria-pressed', product.isLiked ? 'true' : 'false');
    likeCount.textContent = String(product.likes);

    return cardFragment;
  }

  function renderCatalog(items, catalogNode, templateNode) {
    const fragment = document.createDocumentFragment();

    items.forEach(function (product) {
      fragment.appendChild(renderProductCard(product, templateNode));
    });

    catalogNode.innerHTML = '';
    catalogNode.appendChild(fragment);
  }

  window.CatalogApp.render = {
    renderCatalog: renderCatalog
  };
})(window);
