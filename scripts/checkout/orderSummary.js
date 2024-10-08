import { cart, removeProduct, updateDeliveryOption } from '../cart.js';
import { productList, getMatchingProduct } from '../../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from '../money.js';
import { deliveryOptions, getMatchingOption } from '../deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderSummaryOrder() {

  let cart_productList_HTML = '';

  cart.forEach((cart_product) => {
    let cart_productId = cart_product.id;
    const matchingOption = getMatchingOption(cart_product);

    const todayDate = dayjs();
    const deliveryDate = todayDate.add(matchingOption.deliveryDays, 'days');
    const deliveryString = deliveryDate.format('dddd, MMMM D');

    const matchingProduct = getMatchingProduct(cart_productId);

    if (matchingProduct) {
      cart_productList_HTML += `
            <div class="cart-item-container cart-item-container-${matchingProduct.id}" data-container-id="${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${deliveryString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image" src="images/products/${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cart_product.quantity}</span>
                    </span>
                    <span class="text-success update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="text-danger delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionHtml(matchingProduct, cart_product)}
                </div>
              </div>
            </div>
          `
    };



  });
  document.querySelector('.order-summary').innerHTML = cart_productList_HTML;

  function deliveryOptionHtml(matchingProduct, cart_product) {
    let deliveryHtml = '';
    deliveryOptions.forEach((deliveryOption) => {

      const todayDate = dayjs();
      const deliveryDate = todayDate.add(deliveryOption.deliveryDays, 'days');
      const deliveryString = deliveryDate.format('dddd, MMMM D');
      const deliveryPrice = deliveryOption.priceCents === 0 ? `FREE`
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      deliveryHtml += `
        <div class="delivery-option js-delivery-option" data-product-id = "${matchingProduct.id}" data-delivery-option-id = "${deliveryOption.id}">
          <input type="radio" ${deliveryOption.id === cart_product.deliveryOptionId ? 'checked' : ''}
          class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${deliveryString}
            </div>
            <div class="delivery-option-price">
              ${deliveryPrice} Shipping
            </div>
          </div>
        </div>
        `
    });
    return deliveryHtml;
  };



  const deleteBtns = document.querySelectorAll('.delete-quantity-link');
  deleteBtns.forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      removeProduct(productId);

      const cartItemContainer = document.querySelector(`.cart-item-container-${productId}`);
      cartItemContainer.remove();
      checkOutQuantity();
      renderPaymentSummary();
    })
  });


  function checkOutQuantity() {
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector('.checkOutQuantity').innerHTML = cartQuantity;
  };
  checkOutQuantity();

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderSummaryOrder();
      renderPaymentSummary();
    });
  });
};

let st = [];
for (let i = 0; i < 1000; i++) {
  st.push("ပြောလေ");

};

