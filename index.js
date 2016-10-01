var express = require('express');
var app = express();
var mysql=require('mysql');
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
var express    = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser());



var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",  // sets automatically host, port and connection security settings
      auth: {
	         user: "archvr@gmail.com",
			        pass: "seemon0413"
					   }
					   });



function sendMail(email,date,name){
smtpTransport.sendMail({  //email options
   from: "Sender Name <archvr@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
      to: "Receiver Name <shaahmed115@gmail.com>", // receiver
	     subject: "Emailing with nodemailer", // subject
		    text: "Email Example with nodemailer" // body
			}, function(error, response){  //callback
			   if(error){
			          console.log(error);
					     }else{
						        console.log("Message sent: " + response.message);
								   }
								      
									     smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
										 });


}


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
var db_config = {
host: 'localhost',
	  user: 'root',
	  password: 'blablabla123',
	  database: 'arch_vr'
};

app.get('/', function(request, response) {
				console.log('1. connecting to db:');
				connection = mysql.createConnection(db_config); // Recreate the connection, since
				// the old one cannot be reused.

				connection.connect(function(err) {                  // The server is either down
								if (err) {                                     // or restarting (takes a while sometimes).
								console.log('2. error when connecting to db:', err);
								setTimeout(handleDisconnect, 1000); // We introduce a delay before attempting to reconnect,
								}                                       // to avoid a hot loop, and to allow our node script to
								});                                         // process asynchronous requests in the meantime.
				// If you're also serving http, display a 503 error.
				connection.on('error', function(err) {
								console.log('3. db error', err);
								if (err.code === 'PROTOCOL_CONNECTION_LOST') {  // Connection to the MySQL server is usually
								handleDisconnect();                         // lost due to either server restart, or a
								} else {                                        // connnection idle timeout (the wait_timeout
										throw err;                                  // server variable configures this)
								}
								});

				response.render('pages/index');
});

app.listen(5000, function() {
				console.log('Node app is running on port', app.get('port'));
				});

app.get('/register', function(request, response) {
				response.render('pages/register');
				});

app.post('/insert', function(request, response) {
				var post  = {
				Name:request.body.name,
				AppDate:request.body.user.date,
				Address: request.body.user.address,
				Email:request.body.user.email
				};
console.log("Hi");
connection.query('INSERT INTO Appointments SET ?',post,function(err, rows, fields) {
		if (err) {
		console.log('error: ', err);
		throw err;
		}
		sendMail(request.body.user.email,request.body.user.date,request.body.user.name);
		response.render('pages/confirmation');
		});

//response.render('pages/confirmation');
});

