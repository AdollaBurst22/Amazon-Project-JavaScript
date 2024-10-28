import { cart } from "../cart.js";
import { productList, getMatchingProduct } from "../../data/products.js";
import { formatCurrency } from "../money.js";
import { getMatchingOption } from "../deliveryOptions.js";
import { addOrder } from "../../data/order.js";

export function renderPaymentSummary() {
  let itemPriceCents = 0;
  let shippingFee = 0;
  let cartTotalQuantity = 0;

  cart.forEach((cartItem) => {
    const matchingItem = getMatchingProduct(cartItem.productId);
    itemPriceCents += matchingItem.priceCents * cartItem.quantity;

    const matchingOption = getMatchingOption(cartItem);
    shippingFee += matchingOption.priceCents * cartItem.quantity;
    cartTotalQuantity += cartItem.quantity;
  });

  const totalBeforeTax = itemPriceCents + shippingFee;
  const estimatedTax = totalBeforeTax * 0.1;
  const orderTotal = totalBeforeTax + estimatedTax;

  document.querySelector('.payment-summary-js').innerHTML = `
        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${cartTotalQuantity}):</div>
          <div class="payment-summary-money">$${formatCurrency(itemPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${formatCurrency(shippingFee)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${formatCurrency(orderTotal)}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
          Place your order
        </button>`;

  document.querySelector('.js-place-order').addEventListener('click', async () => {
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });
      const orders = await response.json();
      addOrder(orders);

      window.location.href = 'orders.html';
    } catch (error) {
      console.log('Unexpected error occured. Please try again later.')
    }
  });
};

