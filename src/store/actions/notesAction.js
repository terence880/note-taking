import * as actionTypes from './actionTypes'
import axios from '../../axios-notes'

export const addNoteSuccess = (newNote) => {
    return {
        type: actionTypes.ADD_NOTE_SUCCESS,
        actionNote: newNote
    }
}

export const addNote = (newNote) => {
    return dispatch => {
        axios.post('/notes.json', newNote)
            .then(res => {
                let newNoteWithName = {
                    ...newNote,
                    name: res.data.name
                }
                console.log(newNoteWithName)
                dispatch(addNoteSuccess(newNoteWithName))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const editNote = () => {
    return {
        type: actionTypes.EDIT_NOTE
    }
}

export const deleteNoteSuccess = (remainNotes) => {
    console.log(remainNotes);

    return {
        type: actionTypes.DELETE_NOTE_SUCCESS,
        remainNote: remainNotes
    }
}

export const deleteNote = (deleteNoteName, newNotes) => {
    return dispatch => {
        axios.delete('/notes/' + deleteNoteName + '.json', newNotes)
            .then(
                dispatch(deleteNoteSuccess(newNotes))
            )
            .catch(err => {
                console.log(err)
            })
    }
}

export const fetchNoteSuccess = (fetchNotes) => {
    return {
        type: actionTypes.FETCH_NOTE_SUCCESS,
        notes: fetchNotes
    }
}

export const fetchNote = () => {
    return dispatch => {
        axios.get('/notes.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        content: res.data[key].content,
                        noteId: res.data[key].noteId,
                        name: key
                    });
                }
                console.log(fetchedOrders);

                dispatch(fetchNoteSuccess(fetchedOrders))
            })
            .catch(err => {
                console.log(err)
                // dispatch(err)
            })
    }
}