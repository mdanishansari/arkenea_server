const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
};

const userImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type!');
        if (isValid) {
            error = null;
        }
        const destPath = 'image';
        console.log(destPath);
        cb(error, destPath);
    }, filename: (req, file, cb) => {
        const name = 'user';
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
})

module.exports.user = multer({ storage: userImageStorage }).single('userimg');