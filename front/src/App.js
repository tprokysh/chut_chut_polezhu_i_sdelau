import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    films: [],
    film: {
      id: 0,
      title: "",
      year: "",
      formatId: 0,
      authors: ""
    },
    isOne: false,
    isSortered: false,
    search: ""
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

  componentDidMount() {
    this.getFilms();
  }

  getFilms = () => {
    fetch("http://localhost:4000/films/get")
      .then((res) => res.json())
      .then((data) => {
        let films = [...data.films];
        if (this.state.isSortered) {
          console.log(films);
          //console.log(
          films.sort((firstFilm, secondFilm) => {
            if (firstFilm.title > secondFilm.title) return 1;
            else if (firstFilm.title < secondFilm.title) return -1;
            else return 0;
          });
        }
        if (this.state.search) {
          const search = this.state.search;
          console.log(search);

          const filteredData = films.filter((element) => {
            return element.title.toLowerCase().includes(search.toLowerCase());
          });
          films = filteredData;
          this.setState({ search: "" });
        }

        this.setState({ films: films, isOne: false });
      });
  };

  getOneFilm = (id) => {
    console.log(id);

    fetch("http://localhost:4000/films/get/" + id)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ films: data, isOne: true });
      });
  };

  deleteFilm = (id) => {
    fetch("http://localhost:4000/films/delete/" + id, {
      method: "DELETE"
    }).then(this.getFilms);
  };

  renderFilms = ({ id, title }) => (
    <div key={id} className="film">
      <p>
        <strong>Title: </strong>
        {title}
      </p>
      <button onClick={() => this.getOneFilm(id)}>Info</button>
      <button onClick={() => this.deleteFilm(id)}>Delete</button>
    </div>
  );

  renderFilm = ({ id, title, year, format, authors }) => (
    <div key={id} className="film">
      <p>
        <strong>Title: </strong>
        {title}
      </p>
      <p>
        <strong>Year: </strong>
        {year}
      </p>
      <p>
        <strong>Format: </strong>
        {format}
      </p>
      <p>
        <strong>Authors: </strong>
        {authors}
      </p>
      <button onClick={() => this.getFilms()}>Back</button>
      <button onClick={() => this.deleteFilm(id)}>Delete</button>
    </div>
  );

  render() {
    const { films, film } = this.state;
    const isOne = this.state.isOne;
    const isSortered = this.state.isSortered;

    return (
      <div className="App">
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
        <br />
        <div className="search">
          <input
            type="text"
            onChange={(e) => {
              this.setState({ search: e.target.value });
            }}
            value={this.state.search}
          />
          <button onClick={this.getFilms}>Search</button>
        </div>
        <br />
        {!isSortered ? (
          <button
            onClick={() => {
              this.setState({ isSortered: true });
              this.getFilms();
            }}
          >
            Sort by Title &dArr;
          </button>
        ) : (
          <button
            onClick={() => {
              this.setState({ isSortered: false });
              this.getFilms();
            }}
          >
            Reset
          </button>
        )}
        {!isOne ? (
          <div className="films">{films.map(this.renderFilms)}</div>
        ) : (
          <div className="films">{[films].map(this.renderFilm)}</div>
        )}
      </div>
    );
  }
}

export default App;
