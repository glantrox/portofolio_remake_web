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

// Body-Parser
const bodyParser = require(`body-parser`);
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({
  extended: true
}));

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
