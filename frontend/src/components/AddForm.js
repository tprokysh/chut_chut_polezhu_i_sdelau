import React from "react";

class AddForm extends React.Component {
  state = {
    films: [],
    film: {
      id: 0,
      title: "",
      year: "",
      formatId: 0,
      authors: ""
    }
  };

  getFilms = () => {
    fetch("http://localhost:4000/films/get")
      .then((res) => res.json())
      .then((data) => {
        let films = [...data.films];

        this.props.updateFilms(films);
        this.setState({ films: films, isOne: false });
      });
  };

  handleFilmAdd = () => {
    const newFilm = {
      title: this.state.film.title,
      year: this.state.film.year,
      formatId: this.state.film.formatId,
      authors: this.state.film.authors
    };

    fetch("http://localhost:4000/films/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: newFilm.title,
        year: newFilm.year,
        formatId: newFilm.formatId,
        authors: newFilm.authors
      })
    }).then(this.getFilms);
  };

  render() {
    const { film } = this.state;
    return (
      <div className="addFilmForm">
        <h1>Add Film</h1>
        <input
          type="text"
          className="addFilmForm_title"
          placeholder="Enter the film title"
          value={this.state.film.title}
          onChange={(e) => {
            this.setState({ film: { ...film, title: e.target.value } });
          }}
        />
        <br />
        <br />
        <input
          type="number"
          className="addFilmForm_year"
          placeholder="Enter the year"
          min="0"
          value={this.state.film.year}
          onChange={(e) => {
            this.setState({ film: { ...film, year: e.target.value } });
          }}
        />
        <br />
        <br />
        <select
          className="addFilmForm_format"
          value={this.state.film.formatId}
          onChange={(e) => {
            this.setState({ film: { ...film, formatId: e.target.value } });
          }}
        >
          <option value="0" disabled defaultValue>
            Choose format
          </option>
          <option value="1">VHS</option>
          <option value="2">DVD</option>
          <option value="3">Blu-Ray</option>
        </select>
        <br />
        <br />
        <input
          type="text"
          className="addFilmForm_authors"
          placeholder="Enter the author(s)"
          value={this.state.film.authors}
          onChange={(e) => {
            this.setState({ film: { ...film, authors: e.target.value } });
          }}
        />
        <br />
        <br />
        <button
          className="addFilmForm_button"
          disabled={
            !(
              this.state.film.title &&
              this.state.film.year &&
              this.state.film.formatId &&
              this.state.film.authors
            )
          }
          onClick={this.handleFilmAdd}
        >
          Add Film
        </button>
      </div>
    );
  }
}

export default AddForm;
