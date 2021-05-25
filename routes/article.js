const express = require('express');
const router = express.Router();
const parcer = require('../config/parse');

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

    Article.isSameArticleAuthor(title, author)
    .then(data => {
        if(data.boolean){
            res.json({valid: false});
            return;
        }
        res.json({valid: true});
    })
})

router.post('/create/:authorId', (req, res) => {

    const authorId = req.params.authorId;
   
    User.getUserById(authorId)
    .then( userObj => {
        let user = parcer.parceObj(userObj)
        const authorName = user.name;

        Article.getId()
        .then( data => {
            const artId = parcer.parceObj(data).id
            Article.setId(artId);

            const newPage = new Page( artId, req.body.text );
            newPage.savePage();

            const newArticle = new Article(
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
})

router.post('/change/:authorId', (req, res) => {

    const authorId = req.params.authorId;
    const authorName = User.getUserById(authorId).name;

    const rqB = req.body;

    const newArticle = new Article(
        rqB.title,
        rqB.lang,
        rqB.description,
        authorId,
        authorName,
        rqB.sources,
        rqB.tags,
        rqB.relatedArticles,
        rqB.id,
        rqB.date,
    );

    Article.deleteArticle(rqB.id);
    newArticle.saveArticle();

    const newPage = new Page( newArticle.getId(), req.body.text );
    Page.deletePage(rqB.id);
    newPage.savePage();

    res.json({ success: true });
})

module.exports = router;
