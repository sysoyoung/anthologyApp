const express = require('express');
const router = express.Router();

const article = require('../models/article');
const Article = article.Article;

const parcer = require('../config/parse');

router.get('/', (req, res) => {
    const myQuery = req.query.query;

    Article.searchByTitle(myQuery.toLocaleLowerCase())
    .then( data => {
        let myResponse = parcer.parseArray(data);
        if(!myResponse) myResponse = [];
        for(let i = 0; i < myResponse.length; i++){
            myResponse[i] = Article.parceMetaData(myResponse[i]);
        }
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.send(JSON.stringify(myResponse));
    })
})

module.exports = router;
