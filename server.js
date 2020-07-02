const express = require('express');
const path = require('path');
const { config } = require('dotenv');
const initializeDB = require('./config/initDB');
const app = express();
config(); //load .env
initializeDB();

const port = process.env.PORT || 8000;
app.use(express.json({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", 'x-auth-token, Content-Type, Access-Control-Allow-Headers');
  next();
});
const authRoute = require('./routes/api/authRoute');
const coursesRoute = require('./routes/api/coursesRoute');
const usersRoute = require('./routes/api/usersRoute');
const categoryRoute = require('./routes/api/categoryRoute');
app.use('/api', authRoute);
app.use('/api/users', usersRoute );
app.use('/api/category', categoryRoute );
app.use('/api/courses', coursesRoute );

if (process.env.NODE_ENV === 'production') {
    // set static folder 
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


app.listen(port, () => {
  console.log(`[Server]::open at ${ port }`)
});