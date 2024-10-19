export class Cart {
  constructor() {
    this.cartItems = undefined;
    this.loadFromLocalStorage();
  }

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
    }
  }

  saveToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  checkProduct(productId) {
    let matchItem;

    this.cartItems.forEach((item) => {
      if (item.id === productId) {
        matchItem = item;
      }
    });

    if (matchItem) {
      matchItem.quantity += 1;
    } else {
      this.cartItems.push({
        id: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }

    this.saveToStorage();
  }

  removeProduct(productId) {
    this.cartItems = this.cartItems.filter(product => product.id !== productId);
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem = this.cartItems.find(item => item.id === productId);

    if (matchingItem) {
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    }
  }
}

// Example usage:
const cart = new Cart();
cart.checkProduct('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
cart.removeProduct('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
cart.updateDeliveryOption('15b6fc6f-327a-4ec4-896f-486349e85a3d', '2');

console.log(cart);
