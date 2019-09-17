var user = require("../controller/user.controller")
var upload = require('../middleware/UploadImage')
const bodyParser = require('body-parser')
var methodOverride = require('method-override')

module.exports = (app) => {
    app.set('view engine', 'ejs');
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(methodOverride('_method'))

    app.get('/user', user.userShowAll)
    app.get('/user/:id', user.userShow)
    app.post('/user', upload.single('profile-picture'), user.userCreate)
    app.delete('/user/:id', user.userDelete)
    app.put('/user/:id', upload.single('profile-picture'), user.userUpdate)
    app.patch('/user/:id', user.userPatch)
    app.get('/get-form/user', user.userGetForm)
    app.get('/edit-form/user/:id', user.userEditForm)
    app.get('/user/:id/success-create', user.userSuccessCreate)
    app.get('/user/:id/success-update', user.userSuccessUpdate)


}

