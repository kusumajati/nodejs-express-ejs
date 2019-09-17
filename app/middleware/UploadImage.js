var multer  = require('multer')
const path = require('path')
const uuid = require('uuid')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, uuid()+ path.extname( file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })

  module.exports = upload