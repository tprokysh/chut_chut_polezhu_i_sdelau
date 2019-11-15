import React from "react";

class searchActors extends React.Component {
  state = {
    searchActors: ""
  };

  findByActors(searchActors, films) {
    const filteredData = films.filter((element) => {
      return element.authors.toLowerCase().includes(searchActors.toLowerCase());
    });
    return filteredData;
  }

  getFilms = () => {
    fetch("http://localhost:4000/films/get")
      .then((res) => res.json())
      .then((data) => {
        let films = [...data.films];

        const filteredData = this.findByActors(this.state.searchActors, films);
        console.log(filteredData);

        films = filteredData;

        this.setState({ searchActors: "" });

        this.props.updateFilms(films);
        this.props.updateIsOne(false);
      });
  };

  render() {
    return (
      <div className="searchActors">
        <h1>Search by Actors</h1>
        <input
          type="text"
          onChange={(e) => {
            this.setState({ searchActors: e.target.value });
          }}
          value={this.state.searchActors}
        />
        <button onClick={this.getFilms}>Search</button>
      </div>
    );
  }
}

export default searchActors;
