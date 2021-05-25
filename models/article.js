const articlesDb = require('../config/tempDpListOfPages');
const articles = articlesDb.tempArrayOfArticles;

const fetch = require('node-fetch');

const db = require('../config/db');
const queryHelper = require('../config/query');
class Article{
    id;
    title;
    lang;
    description;
    authorId;
    author;
    date;
    status;
    sources;
    tags;
    relatedArticles;

    constructor(id, title, lang, description, authorId, author, sources, tags, relatedArticles, date){
        this.id = id;
        this.title = title;
        this.lang = lang;
        this.description = description;
        this.author = author;
        this.authorId = authorId;
        this.sources = sources?.filter( sous => sous.title) ||  '';
        this.tags = tags?.filter( tag => tag) || '';
        this.relatedArticles = relatedArticles;
        
        this.date =  date? date: +new Date();
        this.status = 'hidden';
    }

    static getId(){
        let query = db.prefix + ` select ?id where{ art:articlesIDcreator art:superid ?id }`;
        let url = queryHelper.createQueryUrl(query);
        return fetch(url).then( res => res.json());
    }

    static setId(id){
        let query = db.prefix + `delete where{ art:articlesIDcreator art:superid ?id }`;
        fetch(db.url, queryHelper.getPostObj(query))
            .then( _ => {
                let query = db.prefix + `insert data{ art:articlesIDcreator art:superid ${+id+1} }`;
                fetch(db.url, queryHelper.getPostObj(query));
            });
    }

    saveArticle(){
        let query = db.prefix + `
            insert data{
                art:article${this.id} rdf:type owl:NamedIndividual;
                    rdf:type art:Article;
                    art:id ${this.id};
                    art:title "${this.title}";
                    art:lang "${this.lang}";
                    art:description "${this.description}";
                    art:author "${this.author}";
                    art:date ${+this.date};
                    art:status "${this.status}";
                    art:tags "${this.joinTags(this.tags)}";
                    art:sources "${this.joinSource(this.sources)}";
                    art:hasAuthor art:user${this.authorId};
                    art:hasText art:text${this.id};
            }`;
        // relatedArticles

        fetch(db.url, queryHelper.getPostObj(query))
        return true;
    }

    joinTags(tags){ return tags.join('!*&*&*!'); }
    parceTags(tags){ return tags.split('!*&*&*!'); }

    joinSource(sources){ return sources.map( sous => [sous.title, sous.link].join('?*sl*?') ).join('!*&*&*!'); }
    parceSource(sources){
        return sources.split('!*&*&*!').map( sous => {
            let newS = sous.split('?*sl*?');
            return { title: newS[0], link: newS[1] }
        })
    }

    getArticleAsObject(){
        return {
            id: this.id,
            title: this.title,
            lang: this.lang,
            description: this.description,
            author: this.author,
            authorId: this.authorId,
            date: this.date,
            status: this.status,
            sources: this.sources,
            tags: this.tags,
            relatedArticles: this.relatedArticles,
        };
    }

    static changeStatus(id, stat){
        let answer = articles.find( art => {
            if(art.id == id){
                art.status = stat;
                return true;
            }
        });
        return !!answer;
    }

    static deleteArticle(id){
        const query = db.prefix + `
            delete where{
                art:article${+id} ?a ?b
            }`;

        fetch(db.url, queryHelper.getPostObj(query))
        return true;
    }

    static isSameArticleAuthor(title, authorId){
        const query = db.prefix + `
            ask{
                ?article art:hasAuthor art:user${authorId};
                    art:title "${title}"
            }`;
        let url = queryHelper.createQueryUrl(query);
        return fetch(url).then(res => res.json());
    }

    static getArticle(id){
        return articles.find( item => item.id === id);
    }

    static getUserArticles(userId){
        return articles.filter( item => item.authorId === userId);
    }

    static searchByTitle(title){
        return articles.filter( art => art.title.toLowerCase().includes(title) && art.status === 'posted')
    }

    getId(){
        return this.id;
    }
}




module.exports = {
    Article: Article
}