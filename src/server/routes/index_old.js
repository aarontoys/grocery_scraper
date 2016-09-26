var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var queries = require('../../../db/queries')
// var cheerioAdv = require('cheerio-advanced-selectors')
var urlIdArr = [];
var rejectArr =[];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log('line12: ',urlIdArr);

  var loopMode = true;
  if (loopMode) {
    for (var i = 1; i < 4; i++) {
      console.log('iteration: ',i);
      request('http://products.peapod.com/'+i+'.html', function (error, response, html) {
          console.log('above if');
        if (!error && response.statusCode == 200) {
          console.log('inside http request');
          urlIdArr.push(i);
          console.log('number of urlIds: ',urlIdArr.length);
          console.log('urlIdArr: ',urlIdArr);

          var saveData = true;
          if(saveData) {
            console.log('SaveData mode is: ',saveData,' . . .saving Data . . .');
            var $ = cheerio.load(html);
            var img, name, size, rating;

         
            var arr = [];
            data = $('.TEXT02').parent() ;

            for (var j = 0; j < data.length; j++) {
              newData = data.eq(j)

              // var groceryObj = {};

              var img = newData.children().eq(0).children().eq(0).attr('href')
              var name = newData.children().first().next().text(); 
              var size = newData.children().first().next().next().text(); 
              var upc = newData.children().first().next().next().next().next().text().trim(); 
              var pageUrl = i;
              // arr.push(groceryObj);

              queries.addGroceries(img,name,size,upc,pageUrl) 
                .then(function () {
                  console.log('done');
                })
                .catch(function () {
                  console.log('upc already in db');
                });
            }

      // console.log(arr);
          }
          else {
            // console.log('SaveData mode is: ',saveData, '. . . not saving Data . . .');
            // urlIdArr = [];
          }
        }
        else {
          rejectArr.push(i);
        }
      });
    }
    console.log('number of urlIds: ',urlIdArr.length);
    console.log('urlIdArr: ',urlIdArr);

    // console.log('number of rejected urls: ',rejected.length);
    // console.log('rejectArr: ',rejectArr);
  }
});

router.get('/pingUrls', function (req, res, next){

  var myArr = [];
  // res.render('index', {title: 'pingUrls'}); 

  var counter = 1; 

  function pingUrl () {
    console.log(counter);
    // $.ajax({
    //     url:'http://www.omdbapi.com/?i=tt1560954',
    //     async: true,
    //     dataType: 'jsonp',
    //     success:function(data){
    //         myArr.push(data.Title);
    //         // console.log(data);
    //         // $('.quoteList').append('<li>' + data.Title +'</li>');
    //         counter++;
    //         if (counter < 5) pingUrl();
    //     }
    // });
    // if (counter < 5) pingUrl();
    request('http://www.omdbapi.com/?i=tt1560954', function (error, response  , html) {
      if (!error && response.statusCode == 200) {
        myArr.push(counter);
      }
  }

  pingUrl();
console.log(myArr); 
});

module.exports = router;


