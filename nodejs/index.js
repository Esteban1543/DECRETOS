var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var port = process.env.PORT || 7830;

app.use(cors());
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

const router = require('./routes/router.js')

app.use('/', router)


app.use(express.static(__dirname + '/assets'));

app.listen(port, function() {
		console.log(`🟢 El servidor inicio correctamente | \x1b[36mhttp://localhost:${port}\x1b[0m`)
})