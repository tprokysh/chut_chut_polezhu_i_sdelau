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
      const query =
        "INSERT INTO films(title, year, formatId, authors) VALUES($1, $2, $3, $4)";
      const values = [
        `${data.title}`,
        `${data.year}`,
        `${data.formatId}`,
        `${data.authors}`
      ];
      await client.query(query, values);
    } catch (err) {
      return;
    }
  }

  static async deleteFilm(id) {
    try {
      const query = "DELETE FROM films WHERE id = $1";
      await client.query(query, id.split());

      return 1;
    } catch (err) {
      console.log(err);
    }
  }

  static async getFilmInfo(idx) {
    try {
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
