const express = require('express');
const https = require("https");
const fs = require("fs");
const csv = require("csvtojson");
const path = require("path");
const { json } = require("body-parser");
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());

//  For all CORS issues
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();    
});

// POST /post

app.post('/', (req,res,next) => {
    const csvUrl = req.body.csv.url;
    const fields = req.body.csv.select_fields;
    const fileName = path.basename(csvUrl);
    let ans = [];
    let statusCode = 0;
  
    function makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
  
    function downloadFile(csvUrl, callback) {
      const download = https.get(csvUrl, function (response) {
          statusCode = response.statusCode;
          console.log("statusCode: ", statusCode);
  
          const fileStream = fs.createWriteStream(fileName);
          response.pipe(fileStream);
  
          fileStream.on("error", function (err) {
              console.log("Error writing to the stream");
              console.log(err);
  
          });
  
          fileStream.on("finish", function () {
              fileStream.close(callback);
              console.log("Done!");
          });
      });
  
      download.on("error", function (err) {
        console.log("Error downloading the file");
        console.log(err);
      });
    }
  
    downloadFile(csvUrl, function () {
      csv()
        .fromFile(fileName)
        .then((jsonObj) => {
          const redux = (array) =>
            array.map((o) =>
              fields.reduce((acc, curr) => {
                acc[curr] = o[curr];
                return acc;
              }, {})
            );
          
          if (fields === undefined || fields.length === 0) {
              ans = jsonObj;
          } else {
              ans = redux(jsonObj);
          }
          console.log(ans);
  
          if (statusCode === 200) {
              return(res.status(201).json({
                  conversion_key: makeid(32), json: ans
              })
              );
          } else {
              return(res.status(201).json({
                  conversion_key: makeid(32), json: "Not a valid URL"
              })
              );
          }
        }
        
        
        
        );
  
      console.log(csvUrl, "Downloaded");
    });
  

});

// listen for requests :)
const listener = app.listen(process.env.PORT || 8080, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
  