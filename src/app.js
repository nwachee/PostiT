const express = require('express')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const connectDB = require('./DB/connect');
const rootRoute = require('./routes/index.route')
const errorHandler = require('./middleware/error.middleware')

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Root Route
app.use('/api/v1', rootRoute)

app.use(errorHandler)


//creating a port for the server
const port = process.env.PORT || 5500
const start = (async () => {
	await connectDB(process.env.MONGO_URI);

	app.listen(port, () => {
		console.log(`Server don start for ${port}...`);
	});
});

start();

