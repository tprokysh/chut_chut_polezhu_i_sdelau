import React from "react";

class FileUpload extends React.Component {
  state = {
    file: null
  };

  getFilms = () => {
    fetch("http://localhost:4000/films/get")
      .then((res) => res.json())
      .then((data) => {
        let films = [...data.films];

        this.props.updateFilms(films);
      });
  };

  onUpload() {
    const file = this.state.file;
    const formData = new FormData();

    formData.append("file", file);
    formData.append("filename", "films");

    fetch("http://localhost:4000/films/upload", {
      method: "POST",
      body: formData
    }).then(this.getFilms);
  }

  onChange(e) {
    let file = e.target.files[0];

    this.setState({ file: file });
  }

  render() {
    return (
      <div className="fileUpload">
        <h1>Upload File</h1>
        <div>
          <input
            type="file"
            accept=".txt"
            name="file"
            onChange={(e) => this.onChange(e)}
          />
          <input
            type="submit"
            value="upload"
            disabled={!this.state.file}
            onClick={() => this.onUpload()}
          />
        </div>
      </div>
    );
  }
}

export default FileUpload;
