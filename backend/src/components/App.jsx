import React from "react";
import FilmForm from "./FilmForm.jsx";
import Films from "./Films.jsx";

const App = React.createClass({
  handleFilmAdd = (data) => {
    console.log(data.formatId);
    const body = data;

    fetch("/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: data.title,
        year: data.year,
        formatId: data.formatId,
        authors: data.authors
      })
    }).then(this.getFilms);
  },

  getFilms = () => {
    fetch("/get")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.films
          });
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  },

  render() {
    return (
      <div className="App">
        <FilmForm onFilmAdd={this.handleFilmAdd} afterFilmAdd={this.getFilms} />
        <Films getAllFilms={this.getFilms} />
      </div>
    );
  }
});

export default App;
