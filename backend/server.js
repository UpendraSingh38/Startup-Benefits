import "dotenv/config.js";
import express from "express";
import cors from "cors";
import connectDB from "./db.js";

import authRoutes from "./routes/auth.routes.js";
import dealRoutes from "./routes/deal.routes.js";
import claimRoutes from "./routes/claim.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/deals", dealRoutes);
app.use("/claims", claimRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
