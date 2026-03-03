(function (window, document, $) {
  'use strict';

  $(function () {
    const catalogNode = document.querySelector('#catalog-grid');
    const cardTemplate = document.querySelector('#product-card-template');
    const products = window.CatalogApp.products;

    window.CatalogApp.render.renderCatalog(products, catalogNode, cardTemplate);
    window.CatalogApp.slider.initSwipers(catalogNode);
    window.CatalogApp.slider.bindFancybox();
    window.CatalogApp.interactions.bindCardEvents(catalogNode, products);
  });
})(window, document, jQuery);
