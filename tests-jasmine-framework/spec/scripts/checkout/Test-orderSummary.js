import { loadFromLocalStorage, cart } from "../../../../scripts/cart.js";
import { renderSummaryOrder } from "../../../../scripts/checkout/orderSummary.js";


describe('test suite : Display the product in the cart(orderSummary.js)', () => {

  beforeEach(function () {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    document.querySelector('.order-summary-container').innerHTML = `
    <div class="checkOutQuantity"></div>
    <div class="order-summary"></div>
    <div class="payment-summary-js"></div>
    `;
    loadFromLocalStorage();
    renderSummaryOrder();

  });
  let productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  let productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  it('generate the html of the product in the cart', () => {

    expect(
      document.querySelectorAll('.cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');
  });

  it('remove the products by clicking the delete button', () => {

    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(
      document.querySelectorAll('.cart-item-container').length
    ).toEqual(1);
    expect(
      document.querySelector(`.cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].id).toEqual(`${productId2}`);
  });

  afterEach(function () {
    document.querySelector('.order-summary-container').innerHTML = " ";
  });
});
