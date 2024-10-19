/*-----Basic ideas of Object Oriented Programming(OOP)--------
Writing codes as an object */

export let cart = {
  cartItems: undefined,

  loadFromLocalStorage() {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems'));

    if (!this.cartItems) {
      this.cartItems = [
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
  },

  savetoStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  },

  checkProduct(productId) {

    let matchItem;

    this.cartItems.forEach((item) => {
      if (item.id === productId) {
        matchItem = item;
      };
    });

    if (matchItem) {
      matchItem.quantity += 1;
    } else {
      this.cartItems.push({
        id: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    };
    this.savetoStorage();
  },

  removeProduct(productId) {
    let newCart = [];
    this.cartItems.forEach((product) => {
      if (product.id !== productId) {
        newCart.push(product);
      }
    });
    this.cartItems = newCart;
    this.savetoStorage();
  },

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((item) => {
      if (item.id === productId) {
        matchingItem = item;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.savetoStorage();
  },
};

cart.loadFromLocalStorage();
cart.checkProduct('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
cart.removeProduct('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
cart.updateDeliveryOption('15b6fc6f-327a-4ec4-896f-486349e85a3d', 2);

console.log(cart);








