import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectToDatabase } from "./infrastructure/database/connectToDatabase";
import { authRouter } from "./interface/auth/authRoutes";
import { errorHandler } from "./interface/middlewares/errorHandler";
import { appEvent } from "./@common/constants/objects";

const server = express();

// middlewares
server.use(express.json());

// routes
server.use("/api/v1/auth", authRouter);

// error handling middlware
server.use(errorHandler);

const port = process.env.PORT ? process.env.PORT : 8000;

const startServer = async () => {
  try {
    await connectToDatabase(process.env.MongoDbConnectionUrl);
    appEvent.setUpAllListners()
    server.listen(port, () => {
      console.log(`Server  is listening on ${port} `);
    });
  } catch (error) {
    console.log(`ServerStartUpError:${error}`);
  }
};

startServer();
