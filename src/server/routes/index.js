var express = require('express');
var router = express.Router();
var request = require('request-promise');
var cheerio = require('cheerio');
var queries = require('../../../db/queries')
var colors = require('colors');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

    var scrape = function (html) {
        var $ = cheerio.load(html.__body);
        var img, name, size, upc, pageUrl;
        var data = $('.TEXT02').parent() ;

        for (var j = 0; j < data.length; j++) {
          newData = data.eq(j)

          img = newData.children().eq(0).children().eq(0).attr('href')
          name = newData.children().first().next().text(); 
          size = newData.children().first().next().next().text(); 
          upc = newData.children().first().next().next().next().next().text().trim(); 
          pageUrl = html.req.path;

          queries.addGroceries(img,name,size,upc,pageUrl) 
            .then(function (upc) {

              console.log('done: '.bgBlue, upc[0].toString().bgBlue);
            })
            .catch(function (err) {
              console.log(err.detail.slice(11,21).bgYellow.black,' :upc already in db'.bgYellow.black);
            });
        }
      }

      var scrapeErr = function (err) {

        var url = err.response.req.path

        queries.rejectedUrls(url)
          .then(function () {
            console.log('rejectd: '.bgWhite.black, url.toString().byWhite.black);
          })
          .catch(function () {
            console.log('rejected url already in db'.bgRed);
          })
      };
  

  for (var i = 1000 ; i < 5000; i++) {
    var options = {
      uri: 'http://products.peapod.com/'+i+'.html',
      transform: function(body, response) {
        response.__body = body
        return response
      }
    };
    
    request(options)
      .then(function(html){

        scrape(html);
      })
      .catch(function(err){
        scrapeErr(err);
      })
    
  }
});


module.exports = router;
