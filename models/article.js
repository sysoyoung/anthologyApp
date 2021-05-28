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
        let relate = this.relatedArticles.length? `art:relatedTo ${this.relatedArticles.map(a => 'art:article'+a).join(', ')};` : '';
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
                    ${relate}
            }`;

        return fetch(db.url, queryHelper.getPostObj(query))
    }

    static changeStatus(id, stat){
        let query = db.prefix + `
            delete where{
                art:article${id} art:status ?a
            }`;
        
        fetch(db.url, queryHelper.getPostObj(query))
        .then( _ => {
            let query = db.prefix + `
                insert data{
                    art:article${id} art:status "${stat}"
                }`;
            fetch(db.url, queryHelper.getPostObj(query));
        })
    }

    static deleteArticle(id){
        const query = db.prefix + `
            delete where{
                art:article${+id} ?a ?b
            }`;

        return fetch(db.url, queryHelper.getPostObj(query));
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
        let query = db.prefix + `
        select * where{
            art:article${id} rdf:type owl:NamedIndividual;
                rdf:type art:Article;
                art:id ?id;
                art:title ?title;
                art:lang ?lang;
                art:description ?description;
                art:author ?author;
                art:date ?date;
                art:status ?status;
                art:tags ?tags;
                art:sources ?sources;
                art:hasAuthor ?authorId;
                optional{
                    art:article${id} art:relatedTo ?relatedArticles.
                    ?relatedArticles art:title ?relatedTitle;
                                    art:author ?relatedAuthor;
                                    art:id ?relatedId;
                }
        }`;

        const url = queryHelper.createQueryUrl(query);
        
        return fetch(url).then(res => res.json());
    }

    static getUserArticles(userId){
        let query = db.prefix + `
        select ?id ?title ?lang ?description ?author ?date ?status ?tags ?sources ?authorId where{
            ?article rdf:type owl:NamedIndividual;
                rdf:type art:Article;
                art:id ?id;
                art:title ?title;
                art:lang ?lang;
                art:description ?description;
                art:author ?author;
                art:date ?date;
                art:status ?status;
                art:tags ?tags;
                art:sources ?sources;
                art:hasAuthor art:user${userId};
                art:hasAuthor ?authorId;
        }`;

        const url = queryHelper.createQueryUrl(query);
        
        return fetch(url).then(res => res.json());
    }

    static searchByTitle(title){
        let query = db.prefix + `
        select ?id ?title ?lang ?description ?author ?date ?status ?tags ?sources ?authorId where{
            ?article rdf:type owl:NamedIndividual;
                rdf:type art:Article;
                art:id ?id;
                art:title ?title;
                art:lang ?lang;
                art:description ?description;
                art:author ?author;
                art:date ?date;
                art:status "posted";
                art:tags ?tags;
                art:sources ?sources;
                art:hasAuthor ?authorId;
                filter( contains( lcase(?title), "${title}") )
        }`;

        const url = queryHelper.createQueryUrl(query);
        
        return fetch(url).then(res => res.json());
    }

    static parceMetaData(meta){
        meta.id = +meta.id;
        meta.date = +meta.date;
        meta.tags = Article.parceTags(meta.tags);
        meta.sources = Article.parceSource(meta.sources);
        meta.authorId = meta.authorId.split('article_collection.owl#user')[1]

        return meta;
    }

    joinTags(tags){ return tags.join('!*&*&*!'); }
    static parceTags(tags){ return tags.split('!*&*&*!'); }

    joinSource(sources){ return sources.map( sous => [sous.title, sous.link].join('?*sl*?') ).join('!*&*&*!'); }
    static parceSource(sources){
        return sources.split('!*&*&*!').map( sous => {
            let newS = sous.split('?*sl*?');
            return { title: newS[0], link: newS[1] }
        })
    }

    static parceRelatedArticles(metaArr){
        let unsw = [];

        for(let meta of metaArr){
            let temp = {
                id: +meta.relatedId,
                title: meta.relatedTitle,
                author: meta.relatedAuthor,
            }
            unsw.push(temp);
        }
        return unsw;
    }
}

module.exports = {
    Article: Article
}
