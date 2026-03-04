(function (window) {
  'use strict';

  function findProductById(products, productId) {
    return products.find(function (item) {
      return item.id === productId;
    });
  }

  function syncLikeButton(product, likeButton, likeCountNode) {
    likeButton.classList.toggle('product-card__like-button_state_active', product.isLiked);
    likeButton.setAttribute('aria-pressed', product.isLiked ? 'true' : 'false');
    likeCountNode.textContent = String(product.likes);
  }

  function handleMaterialClick(button, products) {
    const card = button.closest('.product-card');
    const productId = Number(card.dataset.productId);
    const product = findProductById(products, productId);

    if (!product) {
      return;
    }

    product.materials.forEach(function (material) {
      material.isActive = material.id === button.dataset.material;
    });

    card.querySelectorAll('.product-card__option-button').forEach(function (optionButton) {
      const isActive = optionButton === button;
      optionButton.classList.toggle('product-card__option-button_state_active', isActive);
      optionButton.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function handleLikeClick(button, products) {
    const card = button.closest('.product-card');
    const productId = Number(card.dataset.productId);
    const product = findProductById(products, productId);
    const likeCountNode = card.querySelector('.product-card__like-count');

    if (!product) {
      return;
    }

    product.isLiked = !product.isLiked;
    product.likes += product.isLiked ? 1 : -1;
    syncLikeButton(product, button, likeCountNode);
  }

  function handleZoomClick(button) {
    const sliderNode = button.closest('.product-card__slider');

    if (!sliderNode) {
      return;
    }

    window.CatalogApp.slider.openGalleryFromSlider(sliderNode);
  }

  function bindCardEvents(catalogNode, products) {
    catalogNode.addEventListener('click', function (event) {
      const materialButton = event.target.closest('.product-card__option-button');
      const likeButton = event.target.closest('.product-card__like-button');
      const zoomButton = event.target.closest('.product-card__zoom-button');

      if (materialButton) {
        event.preventDefault();
        handleMaterialClick(materialButton, products);
        return;
      }

      if (likeButton) {
        event.preventDefault();
        handleLikeClick(likeButton, products);
        return;
      }

      if (zoomButton) {
        event.preventDefault();
        handleZoomClick(zoomButton);
      }
    });
  }

  window.CatalogApp.interactions = {
    bindCardEvents: bindCardEvents
  };
})(window);
