import { app } from "./app.js";
import { connectDB } from "./database/database.js";

//* Connecting to Database
connectDB();

//* Listening on the Server
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port: ${process.env.PORT} and in ${process.env.NODE_ENV} Mode`
  );
});
