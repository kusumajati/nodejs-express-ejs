const express = require('express')
const app = express()
const PORT = 3003
var methodOverride = require('method-override')

 
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.use(express.static('public'))


app.get('/', function (req, res) {
  res.redirect('/user')
})

//API
require('./app/routes/user.routes')(app)



app.listen(PORT, () => console.log(`server started, listening on port ${PORT}`))