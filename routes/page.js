const express = require('express');
const router = express.Router();
const parcer = require('../config/parse');

const article = require('../models/article');
const Article = article.Article;

const page = require('../models/page');
const Page = page.Page;

router.get('/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    let pageId = req.params.id;

    Page.getPage(+pageId)
    .then( textObj => {
        const text = textObj?.text || null;
        if(text){
            Article.getArticle(pageId)
            .then( metaObj => {                
                const metaData = parcer.parseArray(metaObj);
                const responcePage = Article.parceMetaData(metaData[0]);
                responcePage.relatedArticles = Article.parceRelatedArticles(metaData);

                delete responcePage.relatedTitle;
                delete responcePage.relatedAuthor;
                delete responcePage.relatedId;

                responcePage.text = text;
                responcePage.success = true;
                res.json( responcePage );            
            })
            return;
        }
        res.json({ success: false });
    })
})

module.exports = router;