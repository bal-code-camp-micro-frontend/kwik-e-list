"use strict";

const express = require('express')
const exphbs = require('express-handlebars');
const nocache = require('nocache')
const {renderHome, renderRecommendations, renderRecommendationsSkeleton, findAllProducts, findAllRecommendations} = require('./api');
const app = express()
const port = 8080

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

const router = express.Router()
router.use(express.static('public'))
router.get('/', nocache(), renderHome);
router.get('/recommendations/:id', nocache(), renderRecommendations)
router.get('/recommendations-skeleton', renderRecommendationsSkeleton)
app.use('/l', router)

const apiRouter = express.Router()
apiRouter.use(nocache())
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
