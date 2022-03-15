var request = require('request');

exports.gcashRequestPayment = async (amt, desc, send, order) => {
    
    var options = {
    'method': 'POST',
    'url': 'https://g.payx.ph/payment_request',
    'headers': {
        'Content-Type': 'multipart/form-data'
    },
    formData: {
        'x-public-key': 'pk_117093e1b8b1471882d2aeb29e39256b',
        'amount': amt,
        'description': desc,
        'webhooksuccessurl': process.env.REMOTE_URL
    }
    };
    request(options, async function (error, response) {
    if (error) throw new Error(error);
    const result = await JSON.parse(response.body)
    order.gcash_ref = result.data.request_id
    if(result.success === 1) {
        send(
            `If you wish to pay immediately for faster transaction.\n\nProceed to payment page: ${result.data.checkouturl}`
            );
        }
        await order.save()
    });
}