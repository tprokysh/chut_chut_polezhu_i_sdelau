import React from "react";

class SearchTitle extends React.Component {
  state = {
    searchTitle: ""
  };

  findByTitle(searchTitle, films) {
    const filteredData = films.filter((element) => {
      return element.title.toLowerCase().includes(searchTitle.toLowerCase());
    });
    return filteredData;
  }

  getFilms = () => {
    fetch("http://localhost:4000/films/get")
      .then((res) => res.json())
      .then((data) => {
        let films = [...data.films];

        const filteredData = this.findByTitle(this.state.searchTitle, films);

        films = filteredData;

        this.setState({ searchTitle: "" });
        this.props.updateFilms(films);
        this.props.updateIsOne(false);
      });
  };

  render() {
    return (
      <div className="searchTitle">
        <h1>Search by Title</h1>
        <input
          type="text"
          onChange={(e) => {
            this.setState({ searchTitle: e.target.value });
          }}
          value={this.state.searchTitle}
        />
        <button onClick={this.getFilms}>Search</button>
      </div>
    );
  }
}

export default SearchTitle;
