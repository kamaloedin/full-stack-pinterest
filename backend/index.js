import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.js';
import pinRouter from './routes/pin.js';
import boardRouter from './routes/board.js';
import commentRouter from './routes/comment.js';
import connectDB from './utils/connectDB.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(fileUpload());

app.use('/users', userRouter);
app.use('/pins', pinRouter);
app.use('/boards', boardRouter);
app.use('/comments', commentRouter);

app.listen(port, () => {
  connectDB();
  console.log(`App is listening to port ${port}`);
});
