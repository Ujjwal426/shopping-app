import express from "express";
import colors from "colors";
import "dotenv/config";
import cors from "cors";
import "./src/db/conn.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";

const app = express();
const PORT = process.env.APP_PORT;
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1> Welcome To Server</h1>");
});

app.use("/api", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);

app.listen(PORT, () => {
  console.log(`Server on the running PORT http://localhost:${PORT}`.inverse);
});
