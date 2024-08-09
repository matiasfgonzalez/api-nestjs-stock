import dotenv from "dotenv";

dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", productRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
