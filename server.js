const express = require('express');
const app = express();

const port = process.env.PORT || 8000;
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'It is working'
  });
});

app.listen(port, () => {
  console.log(`[Server]::open at ${ port }`)
});