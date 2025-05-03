const multer = required('multer');
const path = require('path');

// Set storage engine

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    
    },
    filename: (req, file, cb) => {

        // Create a unique with original extension
        cb(null, `$(Date.now()}-s{path.extname(file.originalname)}`);
    }
});

// file filter - check image types
const fileFilter = (req, file, cb) => {

    // allow only images files
    const allowedFileTypes = /jpeg|jpg|pgn|gif/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedFileTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Eror: Images only(JPEG, JPG, PNG, GIF)!'));

    
    }

};

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 500000}, // 5MB file size
    fileFilter: fileFilter
});

module.exports = upload;