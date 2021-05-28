const express = require('express');
const router = express.Router();
const parcer = require('../config/parse');

const user = require('../models/user');
const User = user.User;

const article = require('../models/article');
const Article = article.Article;

const page = require('../models/page');
const Page = page.Page;
//
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Article.deleteArticle(id);
    Page.deletePage(+id);
    res.json({success: true});
});
//
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let status = req.body.status;

    Article.changeStatus(id, status);
    res.json({success: true});
})
//
router.get('/check/:author/:title', (req, res) => {
    let title = req.params.title;
    let author = req.params.author;

    Article.isSameArticleAuthor(title, author)
    .then(data => {
        if(data.boolean){
            res.json({valid: false});
            return;
        }
        res.json({valid: true});
    })
})
//
router.post('/create/:authorId', (req, res) => {

    const authorId = req.params.authorId;
    let authorName;
    let newArticle;
    let newPage;
    
    User.getUserById(authorId)
    .then( userObj => {
        authorName = parcer.parceObj(userObj).name;
        return Article.getId();
    })
    .then( data => {
        const artId = parcer.parceObj(data).id;
        Article.setId(artId);

        newPage = new Page( artId, req.body.text );
        newPage.savePage();

        newArticle = new Article(
            artId,
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

        res.json({ success: true });
    })
})
//
router.put('/change/:authorId', (req, res) => {

    const authorId = req.params.authorId;
    const rqB = req.body;
    let newArticle;
    let newPage;

    User.getUserById(authorId)
    .then( userObj => {
        const authorName = parcer.parceObj(userObj).name;

        newArticle = new Article(
            rqB.id,
            rqB.title,
            rqB.lang,
            rqB.description,
            authorId,
            authorName,
            rqB.sources,
            rqB.tags,
            rqB.relatedArticles,
            rqB.date,
        );
        newPage = new Page( rqB.id, req.body.text );

        return Page.deletePage(+rqB.id)
    })
    .then( _ => newPage.savePage() )
    .then( _ => Article.deleteArticle(rqB.id) )
    .then( _ => newArticle.saveArticle())
    .then( _ => res.json({ success: true }));
})

module.exports = router;
