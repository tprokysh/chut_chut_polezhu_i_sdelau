const client = require("../db");

class Films {
  static async getFilms() {
    try {
      const query =
        "SELECT fl.id, fl.title, fl.year, fr.format, fl.authors FROM films fl JOIN formats fr ON fl.formatId = fr.id ORDER BY id DESC";
      const results = await client.query(query);

      return results.rows;
    } catch (err) {
      console.log(err);
    }
  }

  static async addFilm(data) {
    try {
      let status = true;

      if (
        +data.formatId < 1 ||
        +data.formatId > 3 ||
        !data.title ||
        !data.year ||
        !data.formatId ||
        !data.authors ||
        data.title.length > 128 ||
        data.authors.length > 255 ||
        +data.year < 1850 ||
        +data.year > 2025 ||
        /[0-9]/.test(data.authors)
      )
        return "error";

      const getQuery = "SELECT title FROM films";

      const getResults = await client.query(getQuery);

      getResults.rows.forEach((item) => {
        if (data.title === item.title) status = false;
      });

      if (!status) return "error";

      const query =
        "INSERT INTO films(title, year, formatId, authors) VALUES($1, $2, $3, $4)";
      const values = [
        `${data.title}`,
        `${data.year}`,
        `${data.formatId}`,
        `${data.authors}`
      ];

      await client.query(query, values);

      return "success";
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteFilm(id) {
    try {
      try {
        id.split();
      } catch (err) {
        return "error";
      }

      const query = "DELETE FROM films WHERE id = $1";
      await client.query(query, id.split());

      return "success";
    } catch (err) {
      console.log(err);
    }
  }

  static async getFilmInfo(idx) {
    try {
      try {
        idx.split();
      } catch (err) {
        return "error";
      }

      const query =
        "SELECT fl.id, fl.title, fl.year, fr.format, fl.authors FROM films fl JOIN formats fr ON fl.formatId = fr.id WHERE fl.id = $1";
      const result = await client.query(query, idx.split());

      return result.rows[0];
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Films;
