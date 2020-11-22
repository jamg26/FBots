const smtp = require("../smtp");

module.exports = (to, orderDetails) => {
  const {
    order_by,
    price,
    product,
    contact,
    pageid,
    page_name,
    shipping_fee,
    _id,
    createdAt,
  } = orderDetails;

  const htmlBody = `
      Order ID: #${_id}<br>
      Page ID: ${pageid} (${page_name})<br>
      Ordered By: ${order_by}<br>
      Amount: ${price.toFixed(2)}<br>
      Shipping Fee: ${shipping_fee.toFixed(2)}<br>
      Product: ${product}<br>
      Contact: ${contact}<br>
      `;

  smtp(to, `Order 🛍️ (${page_name})`, htmlBody);
};
