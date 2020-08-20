import * as actionTypes from "../actions/actionTypes"

const initialState = {
    text: '',
    clickEdit: false,
    confirmName: '',
    notes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_NOTE_SUCCESS:
            const newText = {
                ...action.actionNote
            }
            return {
                ...state,
                notes: state.notes.concat(newText)
            }
        case actionTypes.DELETE_NOTE_SUCCESS:
            return {
                ...state,
                notes: action.remainNote
            }
        case actionTypes.EDIT_NOTE_SUCCESS:
            const editNoteArray = []
            editNoteArray.push(action.editNote)
            return {
                ...state,
                notes: state.notes.map(obj => editNoteArray.find(o => o.name === obj.name) || obj)
            }
        case actionTypes.FETCH_NOTE_SUCCESS:
            return {
                ...state,
                // In actions file, there is action called notes: xxxxxx in FETCH_NOTE_SUCCESS
                notes: action.notes
            }
        default:
            return state;
    }
}

export default reducer