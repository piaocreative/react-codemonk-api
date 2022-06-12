const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
module.exports = multer({ storage: storage });
