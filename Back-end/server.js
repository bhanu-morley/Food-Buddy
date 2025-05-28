import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from 'url';
import adminRoutes from './routes/adminRoute.js'

dotenv.config();


const app = express();
const port = 4000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB();


// Static images
app.use("/images", express.static(path.join(__dirname, 'uploads')));


// API endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use('/api/admin', adminRoutes);


app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});




















//mongodb+srv://bhanuprasanth:bhanu2003@cluster0.cckiimb.mongodb.net/?