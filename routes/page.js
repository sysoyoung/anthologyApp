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


router.get('/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    let pageId = req.params.id;

    const responcePage = Object.assign({}, Article.getArticle(pageId), Page.getPage(pageId), {success: true});

    res.json( responcePage );
})

module.exports = router;