import express from "express";
import https from "https";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import connectOracle from "./config/connorcl.js";
import articleRoutes from "./routes/articleRoutes.js";
import utilisateurRoutes from "./routes/utilisateurRoutes.js";
import commandeRoutes from "./routes/commandeRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import uploadSftp from "./routes/uploadSftp.js";
import familleRoutes from "./routes/familleRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import morgan from "morgan";
import cors from "cors";
import workartRoutes from "./routes/workartRoutes.js";
import paramAppRoutes from "./routes/paramAppRoutes.js";
import societeRoutes from "./routes/societeRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import mouvementRoutes from "./routes/mouvementRoutes.js";
import personnelRoutes from "./routes/personnelRoutes.js";
import tiersRoutes from "./routes/tiersRoutes.js";
import { error } from "console";
import oracleRoutes from "./routes/oracleRoutes.js";
import timeout from "connect-timeout";
const app = express();
app.use(morgan("dev"));
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
dotenv.config();
connectDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
const __dirname = path.resolve();
//app.use(timeout("40s"));
//app.use(haltOnTimedout);
app.use("/api/articles", articleRoutes);
app.use("/api/commandes", commandeRoutes);
app.use("/api/societe", societeRoutes);
if (process.env.NODE_ENV === "production") {
  // Set static folder

  app.use(express.static(path.join(__dirname, "frontend/build")));

  app.get("/", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    console.log("appp");
    res.send("API is running....en cours sallem 3le khalek");
  });
}

app.use("/api/utilisateurs", utilisateurRoutes);

app.use("/api/upload", uploadRoutes);
app.use("/api/uploadsftp", uploadSftp);
app.use("/api/famille", familleRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/workart", workartRoutes);
app.use("/api/paramApp", paramAppRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/mouvement", mouvementRoutes);
app.use("/api/personnel", personnelRoutes);
app.use("/api/tiers", tiersRoutes);
console.log(__dirname);
console.log(process.env.NODE_ENV);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/api/oracle", oracleRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "backend", "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "backend", "cert", "cert.pem")),
  },
  app
);

app.listen(
  PORT,
  console.log(`Serveur dans ${process.env.NODE_ENV} mode en port ${PORT}`)
);
function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}
