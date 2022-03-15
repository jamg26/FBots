module.exports = function (app, Gcash) {
    app.post('/payments/gcash/success', Gcash.paymentSuccess);
};
