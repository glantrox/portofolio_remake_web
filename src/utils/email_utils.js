class EmailUtils {
  constructor(from, to, subject) {
    this.from = from
    this.to = to,
      this.subject = subject
  }
}

class InvoiceMail extends EmailUtils {
  constructor({
    from,
    to,
    subject,
    full_name,
    message,
    order_id,
    customer_id,
    payment_method,
    service_name,
    notes,
    payment_url,
    amount
  }) {
    super(from, to, subject)
    this.full_name = full_name;
    this.message = message;
    this.order_id = order_id;
    this.customer_id = customer_id;
    this.payment_method = payment_method;
    this.service_name = service_name;
    this.notes = notes;
    this.payment_url = payment_url;
    this.amount = amount;
  }

  executeGopay() {
    return `
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ebeaee; font-family: 'Inter', sans-serif;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="background: rgb(2, 0, 36); background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 94%, rgba(46, 42, 98, 1) 100%); border-top-left-radius: 27px; border-top-right-radius: 27px;">
          <tr>
            <td align="center">
              <h1 class="title-card" style="color: #FFFFFF; font-size: 32px;">glantrox<span style="color: #FF6B6B;">.</span></h1>
            </td>
          </tr>
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #FFFFFF;">
                <tr>
                  <td align="center">
                    <div class="content-card" style="margin: 50px;">
                      <div class="header-content" style="text-align: center; padding: 0px;">
                        <h1 id="letter-title" style="font-weight: 600; font-size: 32px;">Hello ${this.full_name}</h1>
                        <p id="letter-subtitle" style="font-weight: 300; font-size: 14px; color: #6C6C6C;">${this.message}</p>
                      </div>
                      <hr style="width: 100%; border: none; border-top: 1px solid #ccc; margin: 20px 0;">
                      <div class="body-content" style="text-align: left;">
                        <p>Order ID <span style="font-weight: 500; color: black;">#${this.order_id}</span></p>
                        <p>Customer:<br><span style="font-weight: 500; color: black;">${this.full_name}</span></p>
                        <p>Email:<br><span style="font-weight: 500; color: black;">${this.to}</span></p>
                        <p>Payment Method:<br><span style="font-weight: 500; color: black;">${this.payment_method.toUpperCase()}</span></p>
                      </div>
                      <hr style="width: 100%; border: none; border-top: 1px solid #ccc; margin: 20px 0;">
                      <div class="footer-content" style="text-align: center;">
                        <div class="item-footer" style="display: flex; flex-direction: row; justify-content: space-between;">
                          <p style="font-weight: 300; color: #6C6C6C;">Service : </p>
                          <p>${this.service_name}</p>
                        </div>
                        <div class="item-footer" style="display: flex; flex-direction: row; justify-content: space-between;">
                          <p style="font-weight: 300; color: #6C6C6C;">Payment Amount : </p>
                          <p>Rp.${parseInt(this.amount).toLocaleString('en-US')}</p>
                        </div>
                      </div>
                      <hr style="width: 100%; border: none; border-top: 1px solid #ccc; margin: 20px 0;">
                      <p style="font-weight: 300;">Send your transaction proof through reply of this email, here is our gopay number*</p>
                      <h1 id="letter-title" style="font-weight: 600; font-size: 38px;">0895630354422</h1>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
        `
  }

  executeMidtrans() {
    return `
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ebeaee; font-family: 'Inter', sans-serif;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="background: rgb(2, 0, 36); background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 94%, rgba(46, 42, 98, 1) 100%); border-top-left-radius: 27px; border-top-right-radius: 27px;">
          <tr>
            <td align="center">
              <h1 class="title-card" style="color: #FFFFFF; font-size: 32px;">glantrox<span style="color: #FF6B6B;">.</span></h1>
            </td>
          </tr>
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #FFFFFF;">
                <tr>
                  <td align="center">
                    <div class="content-card" style="margin: 50px;">
                      <div class="header-content" style="text-align: center; padding: 0px;">
                        <h1 id="letter-title" style="font-weight: 600; font-size: 32px;">Hello ${this.full_name}</h1>
                        <p id="letter-subtitle" style="font-weight: 300; font-size: 14px; color: #6C6C6C;">${this.message}</p>
                      </div>
                      <hr style="width: 100%; border: none; border-top: 1px solid #ccc; margin: 20px 0;">
                      <div class="body-content" style="text-align: left;">
                        <p>Order ID <span style="font-weight: 500; color: black;">#${this.order_id}</span></p>
                        <p>Customer:<br><span style="font-weight: 500; color: black;">${this.full_name}</span></p>
                        <p>Email:<br><span style="font-weight: 500; color: black;">${this.to}</span></p>
                        <p>Payment Method:<br><span style="font-weight: 500; color: black;">${this.payment_method.toUpperCase()}</span></p>
                      </div>
                      <hr style="width: 100%; border: none; border-top: 1px solid #ccc; margin: 20px 0;">
                      <div class="footer-content" style="text-align: center;">
                        <div class="item-footer" style="display: flex; flex-direction: row; justify-content: space-between;">
                          <p style="font-weight: 300; color: #6C6C6C;">Service : </p>
                          <p>${this.service_name}</p>
                        </div>
                        <div class="item-footer" style="display: flex; flex-direction: row; justify-content: space-between;">
                          <p style="font-weight: 300; color: #6C6C6C;">Payment Amount : </p>
                          <p>Rp.${parseInt(this.amount).toLocaleString('en-US')}</p>
                        </div>
                      </div>
                      <hr style="width: 100%; border: none; border-top: 1px solid #ccc; margin: 20px 0;">
                      <p style="font-weight: 300;">${this.notes}*</p>
                      <a href="${this.payment_url}">
                        <button class="button-pay" style="height: 42px; width: 100%; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">PROCEED PAYMENT</button>
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
        `
  }
}

module.exports = {
  InvoiceMail: InvoiceMail,
  EmailUtils: EmailUtils
}