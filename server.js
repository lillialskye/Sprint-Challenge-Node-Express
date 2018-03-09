const express = require ('express');
const config =require ('../config.js');
const server = express();
const PORT = config.port;
const placesController = require('.controller/places.js')


server.listen(3030, (err) => {
	if (err){
		console.log(`There was an error on ${err}`);
	} else {
		console.log(`Server is listening on Port ${PORT}`);
	}
	});

