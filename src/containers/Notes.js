import React, { Component } from 'react';
import Note from '../components/note'
import './Notes.css'
// import axios from '../axios-notes'
import * as actions from '../store/actions/index'
import { connect } from 'react-redux'

class Notes extends Component {

    state = {
        text: '',
        confirmName: '',
        editOn: false,
        editText: ''
    }

    componentDidMount() {
        this.props.onFetchNote()
    }

    textFunction = (event) => {
        this.setState({ text: event.target.value })
    }

    addTextFunction = () => {
        const newNote = {
            noteId: Date.now(),
            content: this.state.text
        }
        this.props.onAddNote(newNote)
        this.setState({ text: '' })
    }

    deleteTextFunction = (event) => {
        event.preventDefault();
        let deleteNoteName = event.target.parentElement.className.replace(' note', '')
        let newNotes = this.props.notes.filter(note => note.name !== deleteNoteName)
        this.props.onDeleteNote(deleteNoteName, newNotes)
    }

    editOnFunction = (event) => {
        let clickedName = event.target.parentElement.className.replace(' note', '');
        this.setState({
            confirmName: clickedName,
            editOn: true,
        })
    }

    editNoteFunction = (event) => {
        this.setState({ editText: event.target.value })
    }

    saveNoteFunction = (event) => {
        let editName = event.target.parentElement.className.replace(' note', '');
        let note = this.props.notes.find(ele => ele.name === editName)
        let editNote = {
            ...note,
            content: this.state.editText
        }
        this.props.onEditNote(editNote, editName)
        this.setState({
            editOn: false
        })
    }

    cancelEditFunction = () => {
        this.setState({
            editOn: false
        })
    }

    // testingFunction = () => {
    //     this.props.notes.forEach(note => {
    //         console.log(note);
    //         return true
    //     })
    // }


    render() {
        let createNotes = this.props.notes.map((note) =>
            <Note key={note.noteId}
                content={note.content}
                delete={this.deleteTextFunction}
                name={note.name}
                clickedName={this.state.confirmName}
                edit={this.editOnFunction}
                clickedEdit={this.state.editOn}
                clickedCancel={this.cancelEditFunction}
                editNote={this.editNoteFunction}
                saveNote={this.saveNoteFunction}
            />
        )

        return (
            <div className="notes-body">
                <div className="add-notes">
                    <h1 className="notes-topic">Add Notes</h1>
                    <textarea
                        className="notes-content"
                        value={this.state.text}
                        placeholder='write something here......'
                        onChange={this.textFunction}
                    >
                    </textarea>
                    <button onClick={this.addTextFunction}>Add</button>
                </div>
                <div className="notes-container">
                    <h1 className="notes-topic">Notes</h1>
                    <div className="notes">
                        {createNotes}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        notes: state.note.notes
    }
}

const mapDispatchProps = dispatch => {
    return {
        onFetchNote: () => dispatch(actions.fetchNote()),
        onAddNote: (newNote) => dispatch(actions.addNote(newNote)),
        onDeleteNote: (deleteNoteName, newNotes) => dispatch(actions.deleteNote(deleteNoteName, newNotes)),
        onEditNote: (editNote, editName) => dispatch(actions.editNote(editNote, editName))
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Notes)