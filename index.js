// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

function ISODateString(d) {
	function pad(n) {
		return n < 10 ? "0" + n : n;
	}
	return (
		d.getUTCFullYear() +
		"-" +
		pad(d.getUTCMonth() + 1) +
		"-" +
		pad(d.getUTCDate()) +
		"T" +
		pad(d.getUTCHours()) +
		":" +
		pad(d.getUTCMinutes()) +
		":" +
		pad(d.getUTCSeconds()) +
		"Z"
	);
}

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
const e = require("express");
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
		let todayUtcKey = new Date(today).toUTCString();
		return res.json({ unix: todayUnixKey, utc: todayUtcKey });
	}
	let date = req.params.date;

	let result = new Date(date);

	let test;

	if (result && result == "Invalid Date") {
		test = new Date(parseInt(req.params.date));

		if (test && test == "Invalid Date") {
			return res.json({ error: "Invalid Date" });
		} else return res.json({ unix: parseInt(date), utc: test.toUTCString() });
	}
	let unixKey = Math.floor(new Date(date).getTime());

	let utcKey = new Date(date).toUTCString();

	return res.json({ unix: unixKey, utc: utcKey });
});

const port = process.env.PORT || 5000;

// listen for requests :)
app.listen(port, () => {
	console.log("App listen to " + port);
});
