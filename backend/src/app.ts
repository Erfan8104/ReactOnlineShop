import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { prisma } from "./lib/prisma";
import { notFoundMiddleware } from "@/common/middleware/notFound.middleware";
import { errorMiddleware } from "@/common/middleware/error.middleware";
import { AppError } from "@/common/errors/AppError";
import routes from "@/routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api", routes);

// ---------------- Routes ----------------

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

app.get("/health", async (_, res) => {
  await prisma.$queryRaw`SELECT 1`;

  res.json({
    success: true,
    database: "connected",
  });
});

// 404 Middleware
app.use(notFoundMiddleware);

// Error Middleware (حتماً آخرین middleware)
app.use(errorMiddleware);

export default app;
