import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import db from "./db.js";
import morgan from "morgan"

db.on("error", console.log.bind(console, "Erro de Conexão no MongoDB"));

db.once("open", () => {
  console.log("Conexão com MongoDB feita com sucesso!");
});

const app = express();

app.use(express.json());
app.use(morgan("dev"));
// app.disable("x-powered-by");
// app.use(helmet());
// app.use(cors());
// app.use(cookieParser());
// app.use(compression());
// app.use(favicon(path.join("resources", "favicon.ico")));
// app.use(serveStatic("resources", { index: ["index.html"] }));

routes(app);

export default app;
