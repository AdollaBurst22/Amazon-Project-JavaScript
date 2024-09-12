import { cart } from './cart.js';
import { productList } from '../data/products.js';


let cart_productList_HTML = '';

cart.forEach((cart_product) => {
  let cart_productId = cart_product.id;

  let matchingProduct;

  productList.forEach((product) => {

    if (product.id === cart_productId) {
      matchingProduct = product;

      if (matchingProduct) {

        cart_productList_HTML += `
        <div class="cart-item-container">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="images/products/${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                $10.90
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${matchingProduct.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio" checked class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Tuesday, June 21
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Wednesday, June 15
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Monday, June 13
                  </div>
                  <div class="delivery-option-price">
                    $9.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
      };
    };


  });
});

document.querySelector('.order-summary').innerHTML += cart_productList_HTML;

/*
const deli_date_containers = document.querySelectorAll('.deli-date-grid');

deli_date_containers.forEach((container) => {

  const radioInputs = container.querySelectorAll('.date-choose');

  radioInputs.forEach((input) => {
    input.addEventListener('change', () => {
      radioInputs.forEach((otherInput) => {
        if (input !== otherInput && otherInput.checked) {
          otherInput.checked = false;
        };
      });
    });
  });

});
const deli_date_containers = document.querySelectorAll('.deli-date-grid');

deli_date_containers.forEach((container) => {
  const radioInputs = container.querySelectorAll('.date-choose');

  radioInputs.forEach((input) => {
    input.addEventListener('change', () => {
      // Check if the current input is already checked
      if (input.checked) {
        return; // Exit the function if it is already checked
      }

      // Uncheck all other inputs
      radioInputs.forEach((otherInput) => {
        if (input !== otherInput) {
          otherInput.checked = false;
        }
      });
    });
  });
});
*/

