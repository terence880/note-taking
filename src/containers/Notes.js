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
        editOn: false
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
    }

    deleteTextFunction = (event) => {
        event.preventDefault();
        let deleteNoteName = event.target.parentElement.className.replace(' note', '')
        let newNotes = this.props.notes.filter(note => note.name !== deleteNoteName)
        this.props.onDeleteNote(deleteNoteName, newNotes)
    }

    editTextFunction = (event) => {
        let clickedName = event.target.parentElement.className.replace(' note', '');
        this.setState({
            confirmName: clickedName,
            editOn: true
        })
    }

    cancelEditFunction = () => {
        this.setState({
            editOn: false
        })
    }

    testingFunction = () => {
        console.log(this.props);
        this.props.notes.forEach(note => {
            console.log(note);
            return true
        })
    }

    render() {

        let createNotes = this.props.notes.map((note) =>
            <Note key={note.noteId}
                content={note.content}
                delete={this.deleteTextFunction}
                name={note.name}
                edit={this.editTextFunction}
                clickedEdit={this.state.editOn}
                clickedName={this.state.confirmName}
                clickedCancel={this.cancelEditFunction}
            />
        )

        let abc = this.props.notes.map(note => { return note })
        console.log(abc);

        return (
            <div className="notes-body">
                <div className="add-notes">
                    <h1 className="notes-topic">Add Notes</h1>
                    <textarea
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
        onDeleteNote: (deleteNoteName, newNotes) => dispatch(actions.deleteNote(deleteNoteName, newNotes))
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Notes)