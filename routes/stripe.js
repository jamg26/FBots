module.exports = function (app, Stripe) {
  app.post("/payments/stripe/create", Stripe.createSession);
  app.get(
    "/payments/stripe/success/:id/:orderid/:pageid",
    Stripe.paymentSuccess
  );
};
