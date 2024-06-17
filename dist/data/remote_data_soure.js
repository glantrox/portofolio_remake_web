const express = require(`express`);
const service = express.Router();

// Static Strings
const supabaseURL = `https://ijtsrdxvxgoewztdnwqo.supabase.co`;
const supabaseKey = `API_KEY`;
const imgurURL = `https://api.imgur.com/3/image`;
const imgurClientId = `API_KEY`;

// Multer
const multer = require('multer');
const upload = multer({
  dest: './uploads/'
});

// FS
const fs = require('fs');

// Supabase Client
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(supabaseURL, supabaseKey);

// Imgur Client
const { ImgurClient } = require('imgur');
const imgurUploader = require('imgur-uploader');
const client = new ImgurClient({
  clientId: imgurClientId,
  clientSecret: imgurClientId
});

// Body-Parser
const bodyParser = require(`body-parser`);
const { Console } = require('console');
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({ extended: true }));

// Get All Portofolios
service.get(`/get-portofolios`, async (req, res) => {
  try {
    const response = await supabase.from(`portofolios`).select(`*`);
    if (response.error) {
      res.status(500).send(`Internal Server Problem : ${error}`);
    }
    const dataResult = await response.data;
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
      source_url
    } = req.body;

    const file = req.file;

    if (!file) {
      return res.status(500).send(`File is Empty`);
    }

    const formData = new FormData();
    const fileBlob = new Blob([fs.readFileSync(file.path)]);
    formData.append('image', fileBlob, { filename: file.originalname });

    const imgurResponse = await fetch(`${imgurURL}`, {
      method: `POST`,
      headers: {
        "Authorization": `Client-ID ${imgurClientId}`
      },
      body: formData
    });
    if (!imgurResponse.ok) {
      return res.status(imgurResponse.status).send(`Imgur Upload Error : ${imgurResponse.statusText}`);
    }
    const imgur = await imgurResponse.json();

    const {
      data,
      error
    } = await supabase.from('portofolios').insert([{
      title: title,
      description: description,
      image_url: imgur.data.link,
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