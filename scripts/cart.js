export let cart = [];

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
      quantity: 1
    });
  }
}