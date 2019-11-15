const { Router } = require("express");
const router = Router();
const Films = require("../models/filmsModel");
const upload = require("../utils/multerUtil");
const fse = require("fs-extra");
const path = require("path");
const parseTxt = require("../utils/parser");

router.get("/films/get", async (req, res) => {
  const results = await Films.getFilms();

  res.status(200).json({ films: results });
});

router.post("/films/add", async (req, res) => {
  const result = req.body;
  await Films.addFilm(req.body);

  res.status(200).json({ result });
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

router.post("/films/upload", async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) return;

      const pathToFile =
        path.join(__dirname, "..", "public", "files", req.body.filename) +
        ".txt";

      fse.readFile(pathToFile, (err, data) => {
        if (err) throw err;

        if (!data) return;

        const dist = parseTxt(data);

        dist.forEach((item) => {
          Films.addFilm(item);
        });

        res.status(200).json({ files: dist });
      });

      fse.unlink(pathToFile, (err) => {
        if (err) throw err;
      });
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "wrong file" });
  }
});

module.exports = router;
