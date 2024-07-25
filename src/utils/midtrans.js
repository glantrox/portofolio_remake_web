
class MidtransClient {
    constructor({
         service_name,
         amount,
         payment_method,
         order_id,
    }) {
        this.service_name = service_name;
        this.amount = amount;
        this.payment_method = payment_method;
        this.order_id = order_id
    }    

    async execute() {        
        const midtransSecret = process.env.MIDTRANS_SERVER_KEY;
        const midtransURL = process.env.MIDTRANS_URL;
        let paymentData = {
            item_details: [{
              id: this.service_name.toUpperCase().replace(/\s/g, ""),
              name: this.service_name,
              price: this.amount,
              quantity: 1
            }],
            transaction_details: {
              order_id: this.order_id,
              gross_amount: this.amount * 1
            },
            enabled_payments: [
              this.payment_method
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