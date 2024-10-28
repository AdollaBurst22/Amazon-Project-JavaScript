import { renderSummaryOrder } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { productList, loadProductsFetch } from "../data/products.js";


loadProductsFetch().then(() => {
  renderSummaryOrder();
  renderPaymentSummary();
});

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  renderSummaryOrder();
  renderPaymentSummary();
});
*/
/*
async function loadPage(){
  await loadProducts();

  renderSummaryOrder();
  renderPaymentSummary();
};
*/

/*
loadProducts(() => {
  renderSummaryOrder();
  renderPaymentSummary();
});
*/


