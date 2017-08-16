var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;    

var config = {
    
    user: 'mmanuprasad',
    database: 'mmanuprasad',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));


 
var articleOne = {
  
  title : 'Article One | mmanuprasad',
  date : '8 Aygust 2017',
  heading : 'Article ONE',
  content : ` This is the first article in my first website,This is the first article in my first website,This is the first article in my first website,
This is the first article in my first website,This is the first article in my first website,This is the first article in my first website,
This is the first article in my first website,This is the first article in my first website,This is the first article in my first website,
This is the first article in my first website,This is the first article in my first website,This is the first article in my first website
`
    
};


function createTemplate(data) {

var title=data.title;
var heading = data.title;
var date=data.date;
var content=data.content;

var HTMLTemplate = `
<html>
<head>
<title>${title}</title>
<body>
<div>
<p>
<h1>${heading}</h1>
</p>
</div>
<div>
<p>${date}</p>
</div>
</p>${content}</p>
<div>
<p></p>
</div>
</body>
</html>
`;

return HTMLTemplate; 
}


var pool = new Pool(config);

app.get('/test-db',function(req,res) {
   
   //make a select request 
   //return a response
   pool.query('SELECT * FROM test ',function (req,res){
      
      if ( err){
          
          res.status(500).send(err.toString());
      } else {
         res.send(JSON.stringfy(result));
     }
       
   });
   
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/one', function (req, res) {
  res.send(createTemplate(articleOne));
});

app.get('/ui/second', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-second.html'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 8080;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
