"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectToDatabase_1 = require("./infrastructure/database/connectToDatabase");
const authRoutes_1 = require("./interface/auth/authRoutes");
const errorHandler_1 = require("./interface/middlewares/errorHandler");
const objects_1 = require("./@common/constants/objects");
const path_1 = require("path");
const server = (0, express_1.default)();
// middlewares
server.use(express_1.default.json());
// routes
server.use("/api/v1/auth", authRoutes_1.authRouter);
const frontendPath = (0, path_1.join)(__dirname, "..", "/public"); // Replace 'frontend' with your folder name
server.use(express_1.default.static(frontendPath));
server.get("*", (req, res) => {
    res.sendFile((0, path_1.join)(frontendPath, "index.html"));
});
// error handling middlware
server.use(errorHandler_1.errorHandler);
const port = process.env.PORT ? process.env.PORT : 8000;
const startServer = async () => {
    try {
        await (0, connectToDatabase_1.connectToDatabase)(process.env.MongoDbConnectionUrl);
        objects_1.appEvent.setUpAllListners();
        server.listen(port, () => {
            console.log(`Server  is listening on ${port} `);
        });
    }
    catch (error) {
        console.log(`ServerStartUpError:${error}`);
    }
};
startServer();
