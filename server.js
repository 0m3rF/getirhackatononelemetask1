var express 	= require('express');
var app     	= express();
var port 		= process.env.PORT || 3000;
var server  	= app.listen(port);
var MongoClient = require('mongodb').MongoClient
var bodyParser 	= require('body-parser');
var url 		= 'mongodb://dbUser:dbPassword@ds155428.mlab.com:55428/getir-bitaksi-hackathon';


app.use( bodyParser.json() );  // JSON olarak yollanan verilerin desteklenmesi için.

app.use(bodyParser.urlencoded({     // URL-encoded olarak gönderilen verilerin desteklenmesi için
  extended: true
}));

app.use(function(req, res, next) { //  Bu method, gelecek olan HTTP isteklerinin neleri kabul edip etmeyeceğini tanımlamamıza yarıyor. Bu aynı zamanda NodeJS için middleware anlamına gelir
  	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();  // bir sonraki middleware a geçiş yapmak için 
}); 


app.get('/',function(req,res){
	
	res.send('Öneleme Task1');
});


app.post('/getRecord',function (req,res) {
	
	MongoClient.connect(url, function(err, db){

	  console.log("Connected successfully to mongodb server");


	 	var findDocuments = function(db, callback) {

	  		var collection = db.collection('records');

		 	collection.find({'key': req.body.key},{_id:0}).toArray(function(err, docs) {
		    
		    if(docs[0] == null)
		    {
		    	res.send("Kayit bulunamadi!");
		    }
		    else
		    	res.send(docs[0]);
		    db.close();

		  });      
		}

		findDocuments(db);
	    

	});

	

});

