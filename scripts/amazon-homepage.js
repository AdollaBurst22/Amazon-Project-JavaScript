const productList = [
  {
    image: '6-piece-non-stick-baking-set.webp',
    name: '6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set',
    rating: {
      stars: 3.5,
      count: 1232
    },
    price: 3599
  },
  {
    image: 'trash-can-with-foot-pedal-50-liter.jpg',
    name: 'Trash Can with Foot Pedal - Brushed Stainless Steel',
    rating: {
      stars: 5,
      count: 456
    },
    price: 7999
  },

  {
    image: '6-piece-white-dinner-plate-set.jpg',
    name: '6 Piece White Dinner Plate Set',
    rating: {
      stars: 4,
      count: 526
    },
    price: 2999
  }

]
let productHtml = '';

productList.forEach(product => {
  productHtml += `
  <div class="card" style="width: 12rem; height: auto;">
    <div class="card-image-container">
      <img src="images/products/${product.image}" class="card-img-top card-image" alt="...">
    </div>

    <div class="card-body">
      <p class="card-text cardText limit-text-to-2-lines">${product.name}</p>

      <img src="images/ratings/rating-${product.rating.stars * 10}.png" class="rating-stars" alt="">
      <span class="text-primary rating-numbers"> ${product.rating.count}</span>
      <p class="product-price">$${product.price / 100 .toFixed(2)}</p>

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
      <button class="card-btn">Add to Cart</button>
    </div>
  </div>
  `
})
let productContainer = document.querySelector('.product-container-js');
productContainer.innerHTML += productHtml;