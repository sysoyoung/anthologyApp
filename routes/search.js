const express = require('express');
const router = express.Router();

const tempDbPages = require('../config/tempDbPages');
const tempDbListOfPAges = require('../config/tempDpListOfPages');

const user = require('../models/user');
const User = user.User;

const article = require('../models/article');
const Article = article.Article;

const page = require('../models/page');
const Page = page.Page;


router.get('/', (req, res) => {
    const myQuery = req.query.query;

    let myResponse = Article.searchByTitle(myQuery.toLocaleLowerCase());

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.send(JSON.stringify(myResponse));
})

module.exports = router;
