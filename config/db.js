const mysql = require('mysql');

//creating mysql conn
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'afm447@#',
  database : 'chatApp'
});

//conn
db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log("mysql connected");
});

module.exports = db;
