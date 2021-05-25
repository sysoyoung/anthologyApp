const fetch = require('node-fetch');

const db = require('../config/db');
const queryHelper = require('../config/query');
class Page{
    id;
    text;

    constructor(id, text){
        this.id = id;
        this.text = text
    }

    static deletePage(id){
        const query = db.prefix + `
            delete where{
                art:text${+id} ?a ?b
            }`;

        return fetch(db.url, queryHelper.getPostObj(query))
    }

    static getPage(id){
        const query = db.prefix + `
            select ?text where{
                art:text${id} art:text ?text
            }`;

        let url = queryHelper.createQueryUrl(query);

        return fetch(url).then( res => res.json());
    }

    savePage(){
        const query = db.prefix + `
            insert data{
                art:text${this.id} rdf:type owl:NamedIndividual;
                    rdf:type art:Text;
                    art:id ${this.id};
                    art:text "${this.text}";
            }`;
        return fetch(db.url, queryHelper.getPostObj(query));
    }
}

module.exports = {
    Page: Page
}