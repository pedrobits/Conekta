import app from "./app.js";

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.SERVERPORT || 3000;

app.listen(PORT, HOST, () => {
  console.log("Servidor iniciado na Porta:", PORT);
});
