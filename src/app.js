const express = require('express')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const connectDB = require('./DB/connect');

const app = express()

app.set('view engine', 'ejs')

//Routes



app.get("/", (req, res) => {
	res.status(200).send({ message: "Welcome to PostiT App", success : true})
})

//creating a port for the server
const port = process.env.PORT || 5500
const start = (async () => {
	await connectDB(process.env.MONGO_URI);

	app.listen(port, () => {
		console.log(`Server don start for ${port}...`);
	});
});

start();


