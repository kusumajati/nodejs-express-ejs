const uuid = require('uuid')
var users = require('../../user.json')
const fs = require('fs')

exports.userCreateSuccess = (req, res) => {
    res.render('partials/CreateUserSuccess', { req: req })
}

exports.userShowAll = (req, res) => {

    res.render('AllUsers', { users: users })
}
exports.userShow = (req, res) => {
    var user = users.find(user => user.id === req.params.id)
    if (user) {
        res.render('User', { user: user })
    } else {
        res.json({
            success: false,
            message: "user not found",
        })
    }
}
exports.userCreate = (req, res) => {
    var pushed = {
        name: req.body.name || ' ',
        nohp: req.body.nohp || ' ',
        email: req.body.email || ' ',
        id: uuid(),
        image: req.file? '/images/'+req.file.filename : "https://ui-avatars.com/api/?name=" + req.body.name
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

            res.redirect('/user/' + pushed.id+'/success-create')
        }
    })

}
exports.userDelete = (req, res) => {
    var findIndex = users.findIndex(user => user.id === req.params.id)
    if (findIndex > -1) {
        users.splice(findIndex, 1)

        res.json({
            success: true,
            message: "user has been deleted"
        })
        fs.writeFile("user.json", JSON.stringify(users))

    } else {
        res.json({
            success: false,
            message: "user not found"
        })
    }
    // res.send(findIndex)
}
exports.userUpdate = (req, res) => {

    var findIndex = users.findIndex(user => user.id === req.params.id)
    if (findIndex > -1) {
        var pushed = { 
            id: req.params.id, 
            name: req.body.name, 
            email: req.body.email, 
            nohp: req.body.nohp,
            image:  req.file? '/images/'+req.file.filename : users[findIndex].image
        
        }
        users.splice(findIndex, 1, pushed)
        fs.writeFile("user.json", JSON.stringify(users), (err) => {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/user/'+users[findIndex].id+'/success-update')
            }
        })

    } else {
        res.json({
            success: false,
            message: "user not found"
        })
    }
}
exports.userPatch = (req, res) => {
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
}

exports.userGetForm = (req, res) => {

    res.render('AddUserForm')
}
exports.userSuccessCreate = (req,res)=>{
    res.render('Success', {id:req.params.id, status:"Success", message:"You've created a New User"})
}
exports.userSuccessUpdate = (req,res) =>{
    res.render('Success', {id:req.params.id, status:"Success", message:"You've Updated the User"})
 
}
exports.userEditForm = (req, res) => {
   var findUser =  users.find(user=> user.id === req.params.id)
    res.render('EditFormUser', {user:findUser})
}