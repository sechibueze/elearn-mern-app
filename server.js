const express = require('express');
const { config } = require('dotenv');
const initializeDB = require('./config/initDB');
const app = express();
config(); //load .env
initializeDB();

const port = process.env.PORT || 8000;
app.use(express.json());
const authRoute = require('./routes/api/authRoute');
const coursesRoute = require('./routes/api/coursesRoute');
const usersRoute = require('./routes/api/usersRoute');
app.use('/api', authRoute);
app.use('/api/users', usersRoute );
app.use('/api/courses', coursesRoute );

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'It is working'
  });
});


app.listen(port, () => {
  console.log(`[Server]::open at ${ port }`)
});