
const express = require('express')
const exphbs = require('express-handlebars');
const data = require('./data.json');
const app = express()
const port = 8080

const detailUrl = process.env.DETAIL_URL || 'http://localhost:8080'

app.use(express.static('public'))

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    let list = data
    if (req.query.search) {
        const searchTerm = req.query.search.toLowerCase()
        list = data.filter(item => item.name.toLowerCase().includes(searchTerm))
    }
    res.render('home', { search: req.query.search, products: list, detailUrl });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
