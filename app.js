const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const productsRoute = require('./routes/products');
const notFound = require('./middleware/not-found')

require("dotenv").config();

app.use(express.json());

app.use('/api/v1/', productsRoute);

app.use(notFound);

const port = process.env.PORT || 3000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    console.log("CONNECTED TO DB ... ");
    app.listen(port, () => {
      console.log(`Listening on port ${port} ... `);
    });
  })
  .catch((err) => console.log(err));
