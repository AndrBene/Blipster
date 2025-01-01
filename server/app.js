const express = require("express");
const userRouter = require("./src/routes/userRoutes");

const app = express();

const port = 3000;

app.use("/api/v1/users", userRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
