
const express = require('express')
const exphbs = require('express-handlebars');
const app = express()
const port = 3000

app.use(express.static('public'))

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
