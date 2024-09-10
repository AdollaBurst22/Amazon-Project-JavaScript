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
        <div class="product-and-deli-date-container mb-2">
          <h5 class="deli-header">Delivery Date: Tuesday, September 17</h5>

          <div class="review-grid">
            <div class="review-product-img-container">
              <img src="images/products/${matchingProduct.image}" class="review-product-img" alt="">
            </div>

            <div class="review-product-details ps-3">
              <p class="review-product-name">${matchingProduct.name}</p>
              <p class="review-product-price">${(matchingProduct.priceCents / 100).toFixed(2)}</p>
              <p class="review-quantity-text">Quantity : ${cart_product.quantity}</p>
              <button class="review-update-btn">Update</button>
              <button class="review-delete-btn">Delete</button>
            </div>
            
            <div class="review-deli-options ps-2">
              <p class="deli-options-header">Choose a delivery option:</p>
              <div class="deli-date-grid">

                <div class="date-choose-container">
                  <input type="checkbox" id="date-choose-1" class="date-choose-1" name="date-choose-1">
                </div>
                <div class="deli-option-1">
                  <label for="date-choose-1">
                    <span class="date">Tuesday, September 17</span><br>
                    <span class="fee">FREE Shipping</span>
                  </label>
                </div>

                <div class="date-choose-container">
                  <input type="checkbox" id="date-choose-2" class="date-choose-2" name="date-choose-2">
                </div>
                <div class="deli-option-2">
                  <label for="date-choose-2">
                    <span class="date">Wednesday, September 11</span><br>
                    <span class="fee">$4.99 - Shipping</span>
                  </label>
                </div>

                <div class="date-choose-container">
                  <input type="checkbox" id="date-choose-3" class="date-choose-3" name="date-choose-3">
                </div>
                <div class="deli-option-3">
                  <label for="date-choose-3">
                    <span class="date">Tuesday, September 17</span><br>
                    <span class="fee">$9.99 - Shipping</span>
                  </label>
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

document.querySelector('.review-container').innerHTML = cart_productList_HTML;

const checkboxInputs = document.querySelectorAll('.date-choose-1, .date-choose-2, .date-choose-3');

checkboxInputs.forEach((input) => {
  input.addEventListener('change', () => {
    checkboxInputs.forEach((otherInput) => {
      if (input !== otherInput && otherInput.checked) {
        otherInput.checked = false;
      };
    });
  });
});
