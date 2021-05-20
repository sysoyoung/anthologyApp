const articlesDb = require('../config/tempDpListOfPages');
const articles = articlesDb.tempArrayOfArticles;

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

    static id = 3;

    constructor(title, lang, description, authorId, author, sources, tags, relatedArticles, id = 0, date = 0){
        if(id === 0){
            Article.id += 1;
            this.id = Article.id.toString();
        } else {
            this.id = id;
        }

        this.title = title;
        this.lang = lang;
        this.description = description;
        this.author = author;
        this.authorId = authorId;
        this.sources = sources.filter( sous => sous.title);
        this.tags = tags.filter( tag => tag);
        this.relatedArticles = relatedArticles;
        
        this.date =  date === 0? +new Date(): date;
        this.status = 'hidden';
    }

    saveArticle(){
        const newArticle = {
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
        }
        articles.push(newArticle);
        return true;
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
        let index = -1;
        articles.find( (item, i) => {
            if(item.id === id){
                index = i;
                return true;
            }
        });

        articles.splice(index, 1);
    }

    static isSameArticleAuthor(title, authorId){
        for(let i = 0; i < articles.length; i++){
            if(articles[i].title === title && articles[i].authorId === authorId){
                return true;
            }
        }
        return false;
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