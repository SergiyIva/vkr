import express from "express";
import config from "./config.js";
import { admin, adminRouter } from "./admin/index.js";
import { handleError } from "./utils/handleError.js";
import { prisma } from "./admin/db.js";

console.log("server script running...");
process.on("SIGTERM", () =>
  console.log("SIGTERM")
);
process.on("uncaughtException", (err) =>
  console.log("uncaughtException", err)
);
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on("rejectionHandled", (promise) => {
  console.error("rejectionHandled", "rejectionHandled at: Promise", promise);
});
process.on("beforeExit", () => {
  console.log("beforeExit");
});
process.on("exit", (error) => {
  console.log("exit", error);
});

const port = config.PORT;

const app = express();

app.use((_req, res, next) => {
  res.set("X-Powered-By", "PHP 4.2.7");
  next();
});

app.use(express.static("public"));
app.use(admin.options.rootPath, adminRouter);

app.get("*", (_, res) =>
  res.status(404).send("Не найдено!"));

app.use(handleError);

app.listen(port, () => {
  console.log(new Date().toLocaleString("ru"));
  console.log(`Express сервер запущен на http://localhost:${port}`);
});

(async () => {
  if (process.env.NODE_ENV === "production")
    await admin.initialize();
  else
    await admin.watch();
})().finally(async () => {
  await prisma.$disconnect();
});
