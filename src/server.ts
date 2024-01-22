import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes';

dotenv.config();

const app = express();

mongoose.set("strictQuery", true);
mongoose.connect(`${process.env.MONGODB_URL}`), (err: unknown) => err && console.log(err);

app.use(bodyParser.json({}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(3001, () => console.log(`Server is running at port 3001`));

export default app;