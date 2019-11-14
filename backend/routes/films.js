const { Router } = require("express");
const router = Router();
const Films = require("../models/filmsModel");

router.get("/", async (req, res) => {
  const results = await Films.getFilms();

  res.send(results);
  // res.render("index", {
  //   results
  // });
});

router.post("/add", async (req, res) => {
  await Films.addFilm(req.body);

  res.send(req.body);
});

router.delete("/delete/:id", async (req, res) => {
  await Films.deleteFilm(req.params.id);

  res.send(req.body);
});

router.get("/films/:id", async (req, res) => {
  const result = await Films.getFilmInfo(req.params.id);

  res.end(JSON.stringify(result));
});

module.exports = router;
