const multer = require('multer');

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;