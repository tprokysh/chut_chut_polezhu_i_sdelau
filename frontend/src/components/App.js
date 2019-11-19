import React from "react";
import "../App.css";
import AddForm from "./AddForm";
import Films from "./Films";
import SearchTitle from "./SearchTitle";
import SearchActors from "./SearchActors";
import Filter from "./Filter";
import FileUpload from "./FileUpload";

class App extends React.Component {
  state = {
    films: [],
    isOne: false
  };

  componentDidMount() {
    this.getFilms();
  }

  getOneFilm = (id) => {
    fetch("http://localhost:4000/films/get/" + id)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ films: data, isOne: true });
      });
  };

  updateFilms = (newFilms) => {
    this.setState({ films: newFilms });
  };

  updateIsOne = (switchBool) => {
    this.setState({ isOne: switchBool });
  };

  getNewFilms = () => {
    return this.state.films;
  };

  deleteFilm = (id) => {
    const status = window.confirm(
      "Are you sure you want to delete this beautiful film?"
    );
    if (status) {
      fetch("http://localhost:4000/films/delete/" + id, {
        method: "DELETE"
      }).then(this.getFilms);
    }
  };

  getFilms = () => {
    fetch("http://localhost:4000/films/get")
      .then((res) => res.json())
      .then((data) => {
        let films = [...data.films];

        this.setState({ films: films, isOne: false });
      });
  };

  render() {
    return (
      <div className="App">
        <AddForm updateFilms={this.updateFilms} />
        <FileUpload updateFilms={this.updateFilms} />
        <SearchTitle
          updateFilms={this.updateFilms}
          updateIsOne={this.updateIsOne}
        />
        <SearchActors
          updateFilms={this.updateFilms}
          updateIsOne={this.updateIsOne}
        />
        <Filter updateFilms={this.updateFilms} films={this.state.films} />
        <Films
          films={this.state.films}
          deleteFilm={this.deleteFilm}
          film={this.getOneFilm}
          isOne={this.state.isOne}
          getFilms={this.getFilms}
        />
      </div>
    );
  }
}

export default App;
