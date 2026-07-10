import dotenv from "dotenv";
import app from "./app";
import { env } from "@/config";

dotenv.config();

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${env.PORT}`);
});
