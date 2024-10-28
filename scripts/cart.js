export let cart;
loadFromLocalStorage();

export function loadFromLocalStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));


  if (!cart) {
    cart = [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '1'
      },
      {
        productId: 'b86ddc8b-3501-4b17-9889-a3bad6fb585f',
        quantity: 1,
        deliveryOptionId: '1'
      }
    ];
  };
};

export function savetoStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export function checkProduct(productId) {

  let matchItem;

  cart.forEach((item) => {
    if (item.productId === productId) {
      matchItem = item;
    };
  });

  if (matchItem) {
    matchItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  };
  savetoStorage();
};

export function removeProduct(productId) {
  let newCart = [];
  cart.forEach((product) => {
    if (product.productId !== productId) {
      newCart.push(product);
    }
  });
  cart = newCart;
  savetoStorage();
};

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((item) => {
    if (item.productId === productId) {
      matchingItem = item;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  savetoStorage();
};
