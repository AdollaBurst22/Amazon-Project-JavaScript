
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
      <button class="card-btn card-btn-js" data-product-id="${productList.id}">Add to Cart</button>
    </div>
  </div>
  `
});

let productContainer = document.querySelector('.product-container-js');
productContainer.innerHTML += productHtml;

let cardBtns = document.querySelectorAll('.card-btn-js');
cardBtns.forEach((addToCartBtn) => {
  addToCartBtn.addEventListener('click', () => {
    const productId = addToCartBtn.dataset.productId;

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

    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector('.cart-quantity-js').innerText = cartQuantity;
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