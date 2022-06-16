require('dotenv').config();
const express = require('express');
const schoolsRouter = require('./routes/schools')
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler')
const connectDB = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send("<h1>9jaSchoolsAPI</h1><a href='/api/v1/schools'>Nigerian schools route</a>");
})
app.use('/api/v1/schools', schoolsRouter);

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