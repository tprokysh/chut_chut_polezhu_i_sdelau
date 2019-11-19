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

  actorsValidation = (e) => {
    let { film } = this.state;
    let value = e.target.validity.valid
      ? e.target.value
      : this.state.searchActors;

    this.setState({ searchActors: value });
  };

  getFilms = () => {
    fetch("http://localhost:4000/films/get")
      .then((res) => res.json())
      .then((data) => {
        let films = [...data.films];

        const filteredData = this.findByActors(this.state.searchActors, films);

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
          pattern="[A-Za-zА-Яа-я]*"
          onChange={this.actorsValidation.bind(this)}
          value={this.state.searchActors}
        />
        <button onClick={this.getFilms}>Search</button>
      </div>
    );
  }
}

export default searchActors;
