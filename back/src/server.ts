import app from "./app";

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de tapakila !");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
