"use strict";

const express = require('express')
const exphbs = require('express-handlebars');
const data = require('./data.json');
const app = express()
const port = 8080

const detailUrl = process.env.DETAIL_URL || 'http://localhost:8080/d/product/'
console.log("Using detail url => " + detailUrl)

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

var router = express.Router()

router.use(express.static('public'))

router.get('/', (req, res) => {
    let list = data.map(item => {
        item.href = detailUrl + item.id
        return item
    })
    if (req.query.search) {
        const searchTerm = req.query.search.toLowerCase()
        list = data.filter(item => item.name.toLowerCase().includes(searchTerm))
    }
    res.render('home', {
        search: req.query.search,
        products: list
    });
});

router.get('/recommendations/:id', (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(400).send('ID is missing')
    }

    const product = data.filter(d => d.id == id)[0]
    if (!product) {
        res.status(404).send('Product not found')
    }
    let list = data
        .map(item => {
            item.href = detailUrl + item.id
            return item
        })
        .filter(item => item.type === product.type)
        .slice(0, 4)
    res.render('recommendations', {
        products: list
    });
})

app.use('/l', router)

app.get('/healthz', (_, res) => {
    res.send('ok')
})

app.listen(port, () => {
    console.log(`Homepage => http://localhost:${port}/l`)
    console.log(`Recommendations => http://localhost:${port}/l/recommendations/1`)
})
