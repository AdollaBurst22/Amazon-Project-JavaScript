
export let cart = JSON.parse(localStorage.getItem('cart'));


if (!cart) {
  cart = [
    {
      id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    },
    {
      id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '1'
    },
    {
      id: 'b86ddc8b-3501-4b17-9889-a3bad6fb585f',
      quantity: 1,
      deliveryOptionId: '1'
    }
  ];
};


function savetoStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export function checkProduct(productId) {

  let matchItem;

  cart.forEach((item) => {
    if (item.id === productId) {
      matchItem = item;
    };
  });

  if (matchItem) {
    matchItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  };
  savetoStorage();
};

export function removeProduct(productId) {
  let newCart = [];
  cart.forEach((product) => {
    if (product.id !== productId) {
      newCart.push(product);
    }
  });
  cart = newCart;
  savetoStorage();
};

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((item) => {
    if (item.id === productId) {
      matchingItem = item;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  savetoStorage();

};