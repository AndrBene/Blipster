const express = require("express");
const userRouter = require("./src/routes/userRoutes");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);
mongoose
  .connect(
    DB
    //     , {
    //     useNewUrlParser: true,
    //     useCreateIndex: true,
    //     useFindAndModify: true,
    //   }
  )
  .then((con) => {
    // console.log(con.connections);
    console.log("DB connection successful!");
  });

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/users", userRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
