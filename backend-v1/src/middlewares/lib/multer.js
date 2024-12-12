const multer = require('multer');

const path = require('path');
const fs = require("fs");
const APIError = require('../../utils/Error')
 

const allowedMimeTypes = [".jpg", ".jpeg", ".png"]

const storage = multer.diskStorage({
    destination: function (req, file, cb) {  
        const rootDir = path.dirname(require.main.filename)
        fs.mkdirSync(path.join(rootDir, "/src/public/uploads"), { recursive: true }) 
        cb(null, path.join(rootDir, "/src/public/uploads")) //*images will be uploaded here
    },

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); //* created unique number 

        const originalName = file.originalname
        const ext = path.extname(originalName) 
        const url = 'images' + '-' + uniqueSuffix + ext 

        if (!req.savedImages) req.savedImages = [] 

        if(allowedMimeTypes.includes(ext)) {
            try {
                if (req.savedImages.length >= 10) {
                    throw new APIError('You can upload a maximum of 10 files', 400)
                } 
                else {
                    req.savedImages = [...req.savedImages, url]  
                    cb(null, url)
                }
                
            } catch (error) {
                cb(error)
            }
           
        }
        else{
            try {
                throw new APIError('This image format is not supported.',400)   
            } catch (error) {
                cb(error)
            }
        }
 
    }
})

const avatar = multer({ storage: storage }).single("avatar")
const images = multer({storage : storage}).array("images",5)


module.exports = {
    avatar,images
}