var knex = require('./knex');
var Groceries = function() { return knex('groceries');};
var Urls = function() { return knex('rejected_urls');};

module.exports = {
    addGroceries: function(img, name, size, upc, pageurl) {
      return Groceries().insert({
        img: img,
        name: name,
        size: size,
        upc: upc,
        pageurl: pageurl
      }).returning('upc')  
    },
    rejectedUrls: function(url) {
      return Urls().insert({
        url: url
      })
    }
}