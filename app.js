require('dotenv').config();
const express = require('express');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler')
const connectDB = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server is listening at port ${PORT}`);
    })
  } catch (error) {
    console.error(error);
  }
}

start();