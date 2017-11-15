// Module for API Routes (serving JSON)
module.exports = function(app) {
	var mongoose = require('mongoose'),
		Model = require('../models/model')

	// Example API route
	app.post('/login', function(req, res) {

		var isExists = Model.find({
			email : req.body.email // Bound using Angular
		}, function (err, users) {
			if (users.length != 0) {
				res.send({"username": users[0].username, "email":users[0].email});
			} else {
				Model.create({
					username: req.body.username,
					email : req.body.email
				},
				function(err, model) {
					if(err) {
						res.send("Please try again!");
					}
					res.send("You are logged In!");
				}
			);
			}
		});
	});
}