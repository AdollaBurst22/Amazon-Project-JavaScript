import { renderSummaryOrder } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { productList, loadProducts } from "../data/products.js";

loadProducts(() => {
  renderSummaryOrder();
  renderPaymentSummary();
});



