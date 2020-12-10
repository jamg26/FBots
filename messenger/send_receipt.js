const callSendAPI = require("./call_send_api");

module.exports = (recipientId, data, token) => {
  var messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "receipt",
          recipient_name: data.order_by,
          order_number: data._id,
          currency: "PHP",
          payment_method: "Online Payment",
          //order_url: "http://petersapparel.parseapp.com/order?order_id=123456",
          timestamp: Math.round(new Date(data.createdAt).getTime() / 1000),
          // address: {
          //   street_1: "-",
          //   street_2: "-",
          //   city: "-",
          //   postal_code: "-",
          //   state: "Philippines",
          //   country: "PH",
          // },
          summary: {
            subtotal: data.price,
            //shipping_cost: data.shipping_fee,
            //total_tax: 0,
            total_cost: data.price,
          },
          //   adjustments: [
          //     {
          //       name: "New Customer Discount",
          //       amount: 20,
          //     },
          //     {
          //       name: "$10 Off Coupon",
          //       amount: 10,
          //     },
          //   ],
          elements: [
            {
              title: data.product,
              subtitle: data.description,
              //quantity: 1,
              price: data.price,
              currency: "PHP",
              image_url: data.product_image,
            },
          ],
        },
      },
    },
  };

  callSendAPI(messageData, token);
};
