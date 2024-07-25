
class MidtransClient {
    constructor({
         service_name,
         amount,
         payment_method,
         order_id,
    }) {
        this.service_name = service_name;
        this.amount = amount;
    }    

    async execute() {
        
        const midtransSecret = process.env.MIDTRANS_SERVER_KEY;
        const midtransURL = process.env.MIDTRANS_URL;
        let paymentData = {
            item_details: [{
              id: service_name.toUpperCase().replace(/\s/g, ""),
              name: service_name,
              price: amount,
              quantity: 1
            }],
            transaction_details: {
              order_id: order_id,
              gross_amount: amount * 1
            },
            enabled_payments: [
              payment_method
            ]
          }
          const encodedSecret = Buffer.from(midtransSecret).toString(`base64`)
          const response = await fetch(`${midtransURL}/v1/payment-links`, {
            method: `POST`,
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": `Basic ${encodedSecret}`
            },
            body: JSON.stringify(paymentData)
          });
          return response
    }
}



module.exports = {
    MidtransClient : MidtransClient
}