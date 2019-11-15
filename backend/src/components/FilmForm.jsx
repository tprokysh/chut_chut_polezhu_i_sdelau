import React from "react";

class FilmForm extends React.Component {
  state = {
    films: [],
    film: {
      title: "",
      year: "",
      formatId: 0,
      authors: ""
    }
  };

  handleTitleChange(event) {
    this.setState({ film: { ...this.state.film, title: event.target.value } });
  }

  handleYearChange(event) {
    this.setState({ year: event.target.value });
  }

  handleFormatChange(event) {
    this.setState({ format: event.target.value });
  }

  handleAuthorsChange(event) {
    this.setState({ authors: event.target.value });
  }

  handleFilmAdd = () => {
    const newFilm = {
      title: this.state.film.title,
      year: this.state.film.year,
      formatId: this.state.film.formatId,
      authors: this.state.film.authors
    };

    fetch("http://localhost:4000/add", {
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

    this.setState({ title: "", year: "", formatId: "0", authors: "" });
  };

  componentDidMount() {
    this.getFilms();
  }

  getFilms = () => {
    fetch("http://localhost:4000/get")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ films: data.films });
      });
  };

  renderFilm = ({ title, year, formatId, authors }) => (
    <div key={id}>
      {title} {year} {formatId} {authors}
    </div>
  );

  render() {
    const { films, film } = this.state;
    return (
      <div className="App">
        <div className="addFilmForm">
          You selected {this.state.format};<h1>Add Film</h1>
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
        <div className="films">{films.map(this.renderFilm)}</div>
      </div>
    );
  }
}

export default App;

export default FilmForm;
