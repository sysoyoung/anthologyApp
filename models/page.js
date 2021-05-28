const mongo = require('mongoose');

mongo.connect('mongodb://localhost:27017/text', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: false,
  });

  const TextSchema = mongo.Schema({
    id: { type: Number, required: true, },
    text: { type: String, required: true, }
  });

  const Text = mongo.model("Text", TextSchema);
  class Page{
    id;
    text;

    constructor(id, text){ this.id = id; this.text = text }
    static deletePage(id){ return Text.deleteOne({id}).then(); }
    static getPage(id){ return Text.findOne({id}); }
    savePage(){ return  new Text({id: +this.id, text: this.text}).save(); }
}

module.exports = { Page: Page }
