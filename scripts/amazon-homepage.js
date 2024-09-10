import { productList } from '../data/products.js';
import { cart, checkProduct } from './cart.js';

let productHtml = '';

productList.forEach((product) => {
  productHtml += `
  <div class="card" style="width: 12rem; height: auto;">
    <div class="card-image-container">
      <img src="images/products/${product.image}" class="card-img-top card-image" alt="...">
    </div>

    <div class="card-body">
      <p class="card-text cardText limit-text-to-2-lines">${product.name}</p>

      <img src="images/ratings/rating-${product.rating.stars * 10}.png" class="rating-stars" alt="">
      <span class="text-primary rating-numbers"> ${product.rating.count}</span>
      <p class="product-price">$${product.priceCents / 100 .toFixed(2)}</p>

      <select name="number" class="buy-quantity-btn">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>

    </div>

    <div class="card-btn-container">
      <button class="card-btn card-btn-js" data-product-id="${product.id}">Add to Cart</button>
    </div>
  </div>
  `
});

let productContainer = document.querySelector('.product-container-js');
productContainer.innerHTML += productHtml;

function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector('.cart-quantity-js').innerText = cartQuantity;
}

let cardBtns = document.querySelectorAll('.card-btn-js');
cardBtns.forEach((addToCartBtn) => {
  addToCartBtn.addEventListener('click', () => {
    const productId = addToCartBtn.dataset.productId;

    checkProduct(productId);
    updateCartQuantity();
  });
});


/*   *********  Generating UUID (Universally Unique Identifiee) ***********
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

console.log(generateUUID());
*/

