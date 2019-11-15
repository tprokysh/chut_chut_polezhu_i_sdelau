import React from "react";

class Films extends React.Component {
  renderFilms = ({ id, title }) => (
    <div key={id} className="film">
      <p>
        <strong>Title: </strong>
        {title}
      </p>
      <button onClick={() => this.props.film(id)}>Info</button>
      <button onClick={() => this.props.deleteFilm(id)}>Delete</button>
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
        <strong>Actors: </strong>
        {authors}
      </p>
      <button onClick={() => this.props.getFilms()}>Back</button>
      <button onClick={() => this.props.deleteFilm(id)}>Delete</button>
    </div>
  );

  render() {
    const { films } = this.props;
    const isOne = this.props.isOne;

    return (
      <div className="Films">
        <h1>Films</h1>
        <hr />
        {!isOne ? (
          <div className="filmItems">{films.map(this.renderFilms)}</div>
        ) : (
          <div className="filmItems">{[films].map(this.renderFilm)}</div>
        )}
      </div>
    );
  }
}

export default Films;
