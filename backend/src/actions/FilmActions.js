import AppDispatcher from "../dispatcher/AppDispatcher";
import Constants from "../constants/AppConstants";

import api from "../api";

const NoteActions = {
  //   loadNotes() {
  //     AppDispatcher.dispatch({
  //       type: Constants.LOAD_NOTES_REQUEST
  //     });

  //     api
  //       .listNotes()
  //       .then(({ data }) =>
  //         AppDispatcher.dispatch({
  //           type: Constants.LOAD_NOTES_SUCCESS,
  //           notes: data
  //         })
  //       )
  //       .catch((err) =>
  //         AppDispatcher.dispatch({
  //           type: Constants.LOAD_NOTES_FAIL,
  //           error: err
  //         })
  //       );
  //   },

  createFilm(note) {
    api
      .createNote(note)
      .then(() => this.loadFilms())
      .catch((err) => console.error(err));
  }

  //   deleteNote(noteId) {
  //     api
  //       .deleteNote(noteId)
  //       .then(() => this.loadNotes())
  //       .catch((err) => console.error(err));
  //   }
};

export default NoteActions;
