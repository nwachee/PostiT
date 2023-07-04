import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import formData from 'express-form-data';
import logger from 'morgan';
import connectDb from './DB/connect.js';
import rootRoute from './routes/index.route.js';
import errorHandler from './middleware/error.middleware.js';

const app = express()
app.use(helmet());
app.use(formData.parse());
app.use(logger('dev'));
app.use(
  cors({
    origin: '*',
    allowedHeaders: 'Content-Type, Authorization',
    methods: 'POST, GET, PUT, PATCH, DELETE',
    credentials: true,
  })
);

app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Root Route
app.use('/api/v1', rootRoute)

app.use(errorHandler)


//creating a port for the server
const port = process.env.PORT || 5000


app.listen(port, async () => {
		console.log(`Server don start for ${port}...`);
		await connectDb();
	});
