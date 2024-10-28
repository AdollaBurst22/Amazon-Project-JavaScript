import { checkProduct, cart, loadFromLocalStorage } from "../../../scripts/cart.js";

describe('test suite: Adding to Cart(checkProduct function)', () => {
  beforeEach(function () {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    cart.length = 0;
    loadFromLocalStorage();
  });

  it('Add new product to the cart', () => {
    checkProduct('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(cart[0].quantity).toEqual(1);
  });

});

describe('test suite:Increase the quantity of the existing product', () => {
  beforeEach(function () {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    cart.length = 1;
    loadFromLocalStorage();
  });

  it('only increase the quantity of the existing product', () => {
    checkProduct('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });
});

