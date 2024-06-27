const imgurURL = process.env.IMGUR_URL;
const imgurClientId = process.env.IMGUR_CLIENT_ID;

async function imgurUpload(file) {
   // Format to formData
   const formData = new FormData();

   // Format to Blob object
   const fileBlob = new Blob([file.buffer], { type: file.mimetype });
   formData.append('image', fileBlob, {
     filename: file.originalname
   });
   
   const imgurResponse = await fetch(`${imgurURL}`, {
     method: `POST`,
     headers: {
       "Authorization": `Client-ID ${imgurClientId}`,
     },
     body: formData
   });
   if (!imgurResponse.ok) {
     // Returns Error Message
     throw `Imgur Upload Error : ${imgurResponse.statusText}`
   }
   // Retrieve Imgur Link
   const imgur = await imgurResponse.json();   
   return imgur.data.link;
}

module.exports = imgurUpload;