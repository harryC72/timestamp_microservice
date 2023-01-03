// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
	res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
	if (!req.params.date) {
		var today = new Date();

		const todayUnixKey = Math.floor(new Date(today).getTime());
		const todayUtcKey = new Date(today).toUTCString();

		return res.json({ unix: todayUnixKey, utc: todayUtcKey });
	}
	let date = req.params.date;

	let test = new Date(date);

	if (test && test == "Invalid Date") {
		return res.json({ error: "Invalid Date" });
	}

	let unixKey = Math.floor(test.getTime());

	let utcKey = new Date(test.toUTCString());

	const resObj = { unix: unixKey, utc: utcKey };

	return res.json(resObj);
});

const port = process.env.PORT || 5000;

// listen for requests :)
app.listen(port, () => {
	console.log("App listen to " + port);
});
