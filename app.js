import express from "express";
import productRoutes from "./routes/productRoutes.js";
import { sequelize } from "./config/dbConfig.js";

const app = express();
app.use(express.json());

app.use("/api/v1", productRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database connected and synced");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

export default app;
