const multer = require('multer'); 
const upload = multer({ dest: './uploads/' });

upload.single('file'), (req, res) => {
    if (req.file) {
        res.status(200).send('Image uploaded successfully: ' + req.file.filename);
    } else {
        res.status(400).send('No image uploaded.');
    }
};

module.exports = upload;