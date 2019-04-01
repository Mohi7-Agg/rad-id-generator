// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var port  	 = process.env.PORT || 8080; 				// set the port


const sqlite3 = require('sqlite3').verbose()
const DB_PATH = 'db/users.db’'

const DB = new sqlite3.Database(DB_PATH, function(err){
    if (err) {
        console.log(err)
        return
    }
    console.log('Connected to ' + DB_PATH + ' database.')
});

dbSchema = `CREATE TABLE IF NOT EXISTS Users (
        firstName text NOT NULL,
        lastName text NOT NULL,    
        email text NOT NULL UNIQUE,
        id integer PRIMARY KEY
    );`
 
DB.exec(dbSchema, function(err){
    if (err) {
        console.log(err)
    }
});

// DB.close()
var randomNum =0

app.use(express.static(__dirname + '/public')); 
// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);

	// application -------------------------------------------------------------


app.get('/api/createUser', function(req, res) {

		var sql= "SELECT MAX(id) FROM Users"
		var maxId= 0;
		DB.run(sql, function(err,val){
		    if (err) {
		        console.log(err)
		    }
		    sql= "INSERT INTO Users (firstName, lastName, email, id) "
	    	sql += "VALUES (? ,?, ?, ?)"	    		 
			DB.run(sql, [req.query.firstName,req.query.lastName, req.query.email, val+1], function(err){
			    if (err) {
			        console.log(err)
			    }
			});
			res.send("Created user");
		});	
});

app.get('/api/allUsers',function(req,res) {
	var sql = 'SELECT * '
    sql += 'FROM Users '
 
    DB.all(sql, [], function(error, rows) {
        if (error) {
            console.log(error)
            res.send("error");
        }
        res.send(rows);        
    });
});

app.get('/createUser', function(req, res) {
	res.sendFile('public/createUser.html' , { root : __dirname});
});

app.get('*', function(req, res) {
	res.sendFile('public/users.html' , { root : __dirname});
});