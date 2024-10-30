import { orders } from "../data/order.js";
import { formatCurrency } from "./money.js";
import { getMatchingProduct, productList, loadProductsFetch } from "../data/products.js";
import { checkOutQuantity } from "./cart.js";

console.log(orders);
async function renderOrderHtml() {
  await loadProductsFetch();
  let orderHtml = '';

  if (orders) {
    orders.forEach((order) => {
      const orderTime = new Date(order.orderTime).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
      });
      // Will output something like "October 29"

      orderHtml += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTime}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${renderOrderProducts(order)}
        </div>
      </div>`
    });
  };
  document.querySelector('.js-orders-grid').innerHTML = orderHtml;
};

function renderOrderProducts(order) {
  let orderProductsHtml = '';

  order.products.forEach((product) => {
    const matchingProduct = getMatchingProduct(product.productId);
    const deliveryDate = new Date(product.estimatedDeliveryTime).toLocaleDateString('en-Us', {
      month: 'long',
      day: 'numeric'
    })
    if (matchingProduct) {
      orderProductsHtml += `
    <div class="product-image-container">
      <img src="${matchingProduct.image}">
    </div>

    <div class="product-details">
      <div class="product-name">
        ${matchingProduct.name}
      </div>
      <div class="product-delivery-date">
        Arriving on: ${deliveryDate}
      </div>
      <div class="product-quantity">
        Quantity: ${product.quantity}
      </div>
      <a href="amazon_homepage.html">
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </a>
    </div>

    <div class="product-actions">
      <a href="tracking.html">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>`
    }
  });
  return orderProductsHtml;
};

renderOrderHtml().catch((error) => {
  console.error('Error rendering orders:', error);
});

checkOutQuantity();