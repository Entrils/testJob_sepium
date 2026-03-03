(function (window) {
  'use strict';

  const productBase = {
    article: '4607',
    title: 'Угловая бежевая кухня на заказ с матовыми фасадами в современном стиле',
    description: 'Описание товара',
    price: '515 700 ₽',
    priceNote: '30 000 ₽',
    likes: 57,
    isLiked: false,
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

  function cloneProduct(index) {
    return {
      ...productBase,
      id: index + 1,
      isLiked: productBase.isLiked,
      materials: productBase.materials.map(function (material) {
        return { ...material };
      }),
      images: productBase.images.map(function (image) {
        return { ...image };
      })
    };
  }

  window.CatalogApp.products = Array.from({ length: 6 }, function (_, index) {
    return cloneProduct(index);
  });
})(window);
