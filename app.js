const express = require('express')
const app = express()
const PORT = 3001
const uuid = require('uuid')
var users = require('./user.json')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const user = require('./middleware/user')
const log = require("./middleware/log")

var multer  = require('multer')

app.set('view engine', 'ejs');
app.use(express.static('public'))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, uuid()+ path.extname( file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })

app.post('/test', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.send({
      file: req.file,
      body: req.body
  })
})


app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Landing Page!!!')
})


app.get('/user', user,log,  (req, res) => {
    res.render('AllUsers' ,{users:users})
})
app.get('/user/:id', (req, res) => {
    var user = users.find(user => user.id === req.params.id)
    if (user) {
        res.render('User',{user:user})
    } else {
        res.json({
            success: false,
            message: "user not found",
        })
    }
})
app.post('/user', upload.single('profile-picture'),(req, res) => {
    var pushed = { 
        name: req.body.name || ' ',
         nohp: req.body.nohp || ' ', 
         email: req.body.email || ' ', 
         id: uuid(), 
         image: req.file ? "/images/"+req.file.filename : "https://ui-avatars.com/api/?name="+req.body.name
        }
    users = [...users, pushed]
    fs.writeFile("user.json", JSON.stringify(users), (err) => {
        if (err) {
            res.json({
                success: false,
                message: "fail to create user",
                data: err
            })
        } else {
            res.json({
                success: true,
                message: "new user created",
                data: pushed
            })
        }
    })

})
app.delete('/user/:id', (req, res) => {
    var findIndex = users.findIndex(user => user.id === req.params.id)
    if (findIndex > -1) {
        users.splice(findIndex, 1)

        res.json({
            success: true,
            message: "user has been deleted"
        })
    } else {
        res.json({
            success: false,
            message: "user not found"
        })
    }
})

app.put('/user/:id', (req, res) => {
    var pushed = { id: req.params.id, name: req.body.name, email: req.body.email, nohp: req.body.nohp }
    var findIndex = users.findIndex(user => user.id === req.params.id)
    if (findIndex > -1) {
        users.splice(findIndex, 1, pushed)
        fs.writeFile("user.json", JSON.stringify(users), (err) => {
            if (err) {
                res.send(err)
            } else {
                res.json({
                    success: true,
                    message: "user has been updated"
                })
            }
        })

    } else {
        res.json({
            success: false,
            message: "user not found"
        })
    }
})

app.patch('/user/:id', (req, res) => {
    var findIndex = users.findIndex(user => user.id === req.params.id)
    if (findIndex > -1) {
        var pushed = {
            id: req.params.id, name: req.body.name || users[findIndex].name,
            email: req.body.email || users[findIndex].email, nohp: req.body.nohp || users[findIndex].nohp
        }

        users.splice(findIndex, 1, pushed)
        fs.writeFile("user.json", JSON.stringify(users), (err) => {
            if (err) {
                res.send(err)
            } else {
                res.json({
                    success: true,
                    message: "user has been updated"
                })
            }
        })

    } else {
        res.json({
            success: false,
            message: "user not found"
        })
    }
})


app.get('/ejs', (req, res) => {
  res.render('index', {foooo:'fooooooooooo'} );
});

app.listen(PORT, () => console.log(`server started, listening on port ${PORT}`))