import dotenv from "dotenv";
import app from "./app";

// initialize configuration
dotenv.config();

const PORT = process.env.PORT;
app.listen(PORT);