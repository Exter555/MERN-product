import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";
import productRoutes from "./routes/product.route.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "fe/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "fe", "dist", "index.html"));
  });
}

app.listen(port, () => {
  connectDB();
  console.log(`running at http://localhost:${port}`);
});
