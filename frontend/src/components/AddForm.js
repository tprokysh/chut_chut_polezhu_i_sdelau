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
    let { film } = this.state;
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
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Seems like the film already in base!");
        }
        this.getFilms();
      });

    this.setState({
      film: { ...film, title: "", year: "", formatId: 0, authors: "" }
    });
  };

  yearValidation = (e) => {
    let { film } = this.state;
    let value = e.target.validity.valid ? e.target.value : this.state.film.year;

    this.setState({ film: { ...film, year: value } });
  };

  actorsValidation = (e) => {
    let { film } = this.state;
    let value = e.target.validity.valid
      ? e.target.value
      : this.state.film.authors;

    this.setState({ film: { ...film, authors: value } });
  };

  checkYear = (films) => {
    const { film } = this.state;
    const value = +film.year;

    if (!value) return;

    if (value < 1850 || value > 2025) {
      alert("Please enter the year from 1850 to 2025");
      this.setState({ film: { ...film, year: "" } });
    }
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
          type="text"
          pattern="[0-9]*"
          className="addFilmForm_year"
          placeholder="Enter the year(1850-2025)"
          onChange={this.yearValidation.bind(this)}
          onBlur={this.checkYear.bind(this)}
          value={this.state.film.year}
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
          pattern="[A-Za-zА-Яа-я]*"
          placeholder="Enter the actor(s)"
          value={this.state.film.authors}
          onChange={this.actorsValidation.bind(this)}
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
