import React from "react";

class Filter extends React.Component {
  state = {
    isSortered: false
  };

  sort = (films) => {
    return films.sort((firstFilm, secondFilm) => {
      if (firstFilm.title > secondFilm.title) return 1;
      else if (firstFilm.title < secondFilm.title) return -1;
      else return 0;
    });
  };

  getFilms = () => {
    fetch("http://localhost:4000/films/get")
      .then((res) => res.json())
      .then((data) => {
        let films = [...data.films];

        if (this.state.isSortered) this.sort(films);
        this.props.updateFilms(films);
      });
  };

  render() {
    const isSortered = this.state.isSortered;
    return (
      <div className="filter">
        {!isSortered ? (
          <button
            disabled={this.props.films.length > 1 ? false : true}
            onClick={() => {
              this.setState({ isSortered: true });
              this.getFilms();
            }}
          >
            Sort by Title &dArr;
          </button>
        ) : (
          <button
            disabled={this.props.films.length > 1 ? false : true}
            onClick={() => {
              this.setState({ isSortered: false });
              this.getFilms();
            }}
          >
            Reset
          </button>
        )}
      </div>
    );
  }
}

export default Filter;
