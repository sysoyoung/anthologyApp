const pageDb = require('../config/tempDbPages');
let pages = pageDb.page;

class Page{
    id;
    text;

    constructor(id, text){
        this.id = id;
        this.text = text
    }

    static deletePage(id){
        let index = -1;
        pages.find( (item, i) => {
            if(item.id === id){
                index = i;
                return true;
            }
        });

        pages.splice(index, 1);
    }

    static getPage(id){
        return pages.find( page => page.id === id);
    }

    savePage(){
        const newPage = {
            id: this.id,
            text: this.text,
        };

        pages.push(newPage);
    }
}

module.exports = {
    Page: Page
}