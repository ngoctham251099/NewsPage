const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        let pathOrigin = path.resolve(__dirname, '../public/images');
        cb(null, pathOrigin)
    },
    filename: (req, file, cb) =>{
        console.log({file})
        cb(null, file.originalname);
    }
})

let upload = multer({storage: storage})
module.exports = upload;