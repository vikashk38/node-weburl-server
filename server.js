const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

hbs.registerPartials(__dirname+"/views/partials");
app.set("view engine", 'hbs');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});
	
hbs.registerHelper("streamIt", (text) => {
	return text.toUpperCase();
});

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now} : ${req.method} ${req.url}`;
	fs.appendFile('server.log', log + '\n');
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintanance.hbs');
// });

app.use(express.static(__dirname+"/public"));

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: "Home Page",
		welcomeMessage: "Wellcome in my world!"
	});
});
app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: "About Page"
	});
});

app.listen('3000');