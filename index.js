"use strict";

const express = require('express')
const exphbs = require('express-handlebars');
const { renderHome, renderRecommendations, findAllProducts, findAllRecommendations } = require('./api');
const data = require('./data.json');
const app = express()
const port = 8080

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

const router = express.Router()
router.use(express.static('public'))
router.get('/', renderHome);
router.get('/recommendations/:id', renderRecommendations)
app.use('/l', router)

const apiRouter = express.Router()
apiRouter.get('/product', findAllProducts)
apiRouter.get('/recommendations/:id', findAllRecommendations)
app.use('/l/api', apiRouter)

app.get('/healthz', (_, res) => res.send('ok'))

app.listen(port, () => {
    console.log(`healthz => http://localhost:${port}/healthz`)
    console.log(`Homepage => http://localhost:${port}/l`)
    console.log(`Recommendations => http://localhost:${port}/l/recommendations/1`)
    console.log(`API => http://localhost:${port}/l/api/product`)
})
