const express = require(`express`);
const service = express.Router();

// Environments
const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Multer
const upload = require('../../api/uploads');

// Supabase Client
const {
  createClient
} = require('@supabase/supabase-js');
const supabase = createClient(supabaseURL, supabaseKey);

// Imgur Client
const imgurUpload = require('../utils/imgur');

// Local Storage
const localStorage = require(`store`)

// Body-Parser
const bodyParser = require(`body-parser`);
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({
  extended: true
}));

// Transporter
const transport = require('../utils/nodemailer');

// Invoice Util
const {
  InvoiceMail
} = require('../utils/email_utils');
const {
  Readable
} = require('stream');

service.post(`/send-invoice`, upload.single(`file`), async (req, res) => {
  try {

    const {
      to,
      full_name,
      customer_id,
      payment_method,
      service_name,
      notes,
      amount,
    } = req.body;


    const file = req.file;
    const order_id = `CUST${customer_id}-` + Math.random().toString(36).substr(2, 4).toUpperCase();

    // Validate File
    if (!file) {
      return res.status(500).send(`File is Empty`);
    }
    console.log(`File is Positive`)

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

    if (payment_method !== "gopay") {
      const encodedSecret = Buffer.from(midtransSecret).toString(`base64`)
      const response = await fetch(`${midtransURL}/v1/payment-links`, {
        method: `POST`,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Basic ${encodedSecret}`
        },
        body: JSON.stringify(paymentData)
      })

      if (!response.ok) {
        console.log(`Midtrans Error : ${response.status}`)
        return res.status(response.status).send(`Midtrans Server Problem : ${response.statusText}`);
      }

      const midTrans = await response.json()
      console.log(`Midtrans Success : ${midTrans.payment_url}`)
    }
    const invoiceMail = new InvoiceMail(
      `388dabd332e807`,
      to,
      "Glantrox Project - Application Creation Request Review for " + full_name,
      full_name,
      `We've received your Application Creation Request and here is a summary for the same`,
      order_id,
      customer_id,
      payment_method,
      service_name,
      notes,
      midTrans.payment_url,
      amount
    )

    console.log(`Email Sending...`)
    const readableStream = file.buffer.toString('base64')


    await transport.sendMail({
      from: invoiceMail.from,
      to: invoiceMail.to,
      subject: invoiceMail.subject,
      html: invoiceMail.payment_method === "gopay" ? invoiceMail.executeGopay() : invoiceMail.executeMidtrans(),
      attachments: [{
        filename: "INVOICE-" + order_id,
        content: readableStream,
        encoding: 'base64',
        contentType: 'application/pdf'
      }],
      function (error, info) {
        if (error) {
          console.log(`Error Sending Mail`)
        } else {
          console.log(`Success Sending Mail`)
        }
      }
    });
    res.status(200).send(`Invoice sent Successfully`)
  } catch (error) {
    res.status(500).send(`Client Exception - ${error}`);
  }
});

service.post(`/logout-user`, async (req, res) => {
  try {
    localStorage.set(`auth`, {
      isLoggedIn : false
    });
    res.status(200).send(`Logout Succeed`);
  } catch (error) {
    res.status(500).send(`Client Exception - ${error}`);
  }
});

service.get(`/auth-user`, async (req, res) => {
  try {
    
    const password = req.query.password;

    const clientPassword = process.env.CLIENT_PASSWORD    
    if(clientPassword !== password) {
      return res.status(401).send(`Wrong Password`);      
    }    
    localStorage.set(`auth`, {
      isLoggedIn : true
    });
    console.log("Login Succeed");
    res.status(200).send(`Login Succeed`);
  } catch (error) {
    res.status(500).send(`Client Exception - ${error}`);
  }
});

// Delete Portofolio
service.get(`/delete-portofolio`, async (req, res) => {
  try {
    const id = req.query.id;

    const response = await supabase.from(`portofolios`).delete().eq(`id`, parseInt(id));
    if (!response.ok) {
      return res.status(response.status).send(`Internal Server Problem : ${response.statusText}`);
    }
    res.status(200).send(`Data Successfully Deleted`);
  } catch (error) {
    res.status(500).send(`Client Exception - ${error}`);
  }
});

// Update Portofolio
service.post(`/update-portofolio`, upload.single(`file`), async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      source_url
    } = req.body;
    let imageUrl = ``;

    const file = req.file;

    // Validate File
    if (file) {
      const imgurLink = await imgurUpload(file)
      imageUrl = imgurLink;
    }

    let bodyForm = {
      title: title,
      description: description,
      source_url: source_url
    }

    // If imageUrl is not Empty
    if (imageUrl !== ``) {
      // It updates image in database
      bodyForm.image_url = imageUrl
    }

    const response = await supabase.from(`portofolios`).update(bodyForm).eq(`id`, id);
    if (response.error) {
      return res.status(response.status).send(`Internal Server Problem : ${response.statusText}`);
    }

    res.status(200).send(`Data Successfully Updated`);
  } catch (error) {
    res.status(500).send(`Client Exception - ${error}`);
  }
});

// Get Portofolio Data by ID
service.get(`/get-portofolio`, async (req, res) => {
  try {
    const id = req.query.id;

    const response = await supabase.from(`portofolios`).select(`*`).eq(`id`, parseInt(id));
    if (response.error) {
      return res.status(response.status).send(`Internal Server Problem : ${response.statusText}`);
    }
    const dataResult = response.data;
    res.send(dataResult);
  } catch (error) {
    res.status(500).send(`Client Exception - ${error}`);
  }
});

// Get All Portofolios
service.get(`/get-portofolios`, async (req, res) => {
  try {
    const response = await supabase.from(`portofolios`).select(`*`);
    if (response.error) {
      return res.status(response.status).send(`Internal Server Problem : ${response.message}`);
    }
    const dataResult = response.data;
    res.send(dataResult);
  } catch (error) {
    res.status(500).send(`Client Exception - ${error}`);
  }
});

// Upload Portofolio
service.post('/upload-portofolio', upload.single(`file`), async (req, res) => {
  try {
    const {
      title,
      description,
      source_url,
    } = req.body;

    const file = req.file;

    // Validate File
    if (!file) {
      return res.status(500).send(`File is Empty`);
    }

    const imgurLink = await imgurUpload(file)

    const {
      data,
      error
    } = await supabase.from('portofolios').insert([{
      title: title,
      description: description,
      image_url: imgurLink,
      source_url: source_url
    }]);

    if (error) {
      console.error(`Error Supabase : ${error}`);
      return res.status(500).send(`Internal Server Problem : ${error.message}`);
    }
    return res.send('Portofolio Successfully Uploaded!');
  } catch (error) {
    console.error(`Client Exception - ${error}`);
    return res.status(500).send(`Failed to upload Portofolio : ${error}`);
  }
});

module.exports = service;
