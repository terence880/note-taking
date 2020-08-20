import React from 'react';
import './note.css'

const note = (props) => {
    return (
        <div className={props.name + ' note'}>
            {props.clickedEdit && props.clickedName === props.name ?
                <textarea className="edit-text"
                    defaultValue={props.content}
                    onChange={props.editNote}
                >
                </textarea>
                :
                <div className="content">{props.content}</div>
            }
            {props.clickedEdit && props.clickedName === props.name ?
                <button onClick={props.clickedCancel}>Cancel</button>
                :
                <button onClick={props.edit}>Edit</button>
            }
            {props.clickedEdit && props.clickedName === props.name ?
                <button onClick={props.saveNote}>Save</button>
                :
                null
            }
            <button onClick={props.delete}>Delete</button>
        </div>
    )
}

export default note