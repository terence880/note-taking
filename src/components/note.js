import React from 'react';
import './note.css'

const note = (props) => {

    // if (props.clicked && props.clickedName === props.name) {
    //     let note = (
    //         <div className={props.name + ' note'}>
    //             <textarea placeholder={props.content}></textarea>
    //             <button onClick={props.clickedCancel}>Cancel</button>
    //             <button onClick={props.delete}>Delete</button>
    //         </div>
    //     )
    // } else {
    //     let note = (
    //         <div className={props.name + ' note'}>
    //             <div className="content">{props.content}</div>
    //             <button onClick={props.edit}>Edit</button>
    //             <button onClick={props.delete}>Delete</button>
    //         </div>
    //     )
    // }

    return (
        <div className={props.name + ' note'}>
            {props.clickedEdit && props.clickedName === props.name?
                <textarea className="edit-text" placeholder={props.content}></textarea> :
                <div className="content">{props.content}</div>
            }
            {props.clickedEdit && props.clickedName === props.name?
                <button onClick={props.clickedCancel}>Cancel</button> :
                <button onClick={props.edit}>Edit</button>
            }
            <button onClick={props.delete}>Delete</button>
        </div>
    )
}

export default note