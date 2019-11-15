const { Router } = require("express");
const router = Router();
const Films = require("../models/filmsModel");

router.get("/films/get", async (req, res) => {
  const results = await Films.getFilms();

  res.status(200).json({ films: results });
});

router.post("/films/add", async (req, res) => {
  console.log(req.body);

  await Films.addFilm(req.body);

  res.json(req.body);
});

router.delete("/films/delete/:id", async (req, res) => {
  const result = await Films.deleteFilm(req.params.id);

  if (!result) res.status(404).json({ error: "Not Found" });
  else res.status(204).json({});
});

router.get("/films/get/:id", async (req, res) => {
  const result = await Films.getFilmInfo(req.params.id);

  if (!result) res.status(404).json({ error: "Not Found" });
  else res.status(200).json(result);
});

module.exports = router;
