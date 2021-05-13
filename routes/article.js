const express = require('express');
const router = express.Router();

let qwe = require('../config/tempDpListOfPages');
let asd = qwe.tempArrayOfArticles;

const user = require('../models/user');
const User = user.User;

const article = require('../models/article');
const Article = article.Article;

const page = require('../models/page');
const Page = page.Page;

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Article.deleteArticle(id);
    Page.deletePage(id);
    res.json({success: true});
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let status = req.body.status;

    let unswer = Article.changeStatus(id, status);

    if(unswer){
        res.json({success: true});
        return;
    }
    res.json({success:false});
})

router.get('/check/:author/:title', (req, res) => {
    let title = req.params.title;
    let author = req.params.author;

    if(Article.isSameArticleAuthor(title, author)){
        res.json({valid: false});
        return;
    }
    res.json({valid: true});
})

router.post('/create/:authorId', (req, res) => {

    const authorId = req.params.authorId;
    const authorName = User.getUserById(authorId).name;

    const newArticle = new Article(
        req.body.title,
        req.body.lang,
        req.body.description,
        authorId,
        authorName,
        req.body.sources,
        req.body.tags,
        req.body.relatedArticles,
    );
    newArticle.saveArticle();

    const newPage = new Page( newArticle.getId(), req.body.text );
    newPage.savePage();

    res.json({ success: true });
})

router.get('/getall', (req, res) => {
    
    
    res.json(asd);
})

module.exports = router;
