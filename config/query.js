const db = require('../config/db');

function createQueryUrl(query){
    return db.url + "?query=" + encodeURIComponent(query) + "&format=json";
}

function getPostObj(query){
    return {
        method: "POST",
        body: query,
        headers: { 'Content-Type': db.postHeader }
      }
}

module.exports.createQueryUrl = createQueryUrl;
module.exports.getPostObj = getPostObj;