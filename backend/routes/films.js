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
  const answer = await Films.addFilm(req.body);

  if (answer === "success") res.status(200).json({ result });
  else res.status(400).json({ error: "Wrong Request" });
});

router.delete("/films/delete/:id", async (req, res) => {
  const answer = await Films.deleteFilm(req.params.id);

  if (answer === "success") res.status(204).json({ sucess: "No Content" });
  else res.status(404).json({ error: "Not Found" });
});

router.get("/films/get/:id", async (req, res) => {
  const result = await Films.getFilmInfo(req.params.id);

  if (result !== "error") res.status(200).json(result);
  else res.status(404).json({ error: "Not Found" });
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
