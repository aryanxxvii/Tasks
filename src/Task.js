
import {useState} from "react";
import Checkbox from "./Checkbox";

export default function Task({name, done, onToggle, onTrash, onRename}) {
    const [editMode, setEditMode] = useState(false);

    return(
        <div className={"task " + (done?"done":"")}>
            <Checkbox checked={done} handleClick={() => onToggle(!done)}/>
            {!editMode && (
                <div className="task-name" onClick={() => setEditMode(prev => !prev)}>
                    <span>{name}</span>
                </div>
            )}
            {editMode && (
                <form className="edit-form" onSubmit={ev => {ev.preventDefault(); setEditMode((prev) => !prev)}}>
                    <input type="text" value={name} onChange={ev => onRename(ev.target.value)}></input>
                </form>
            )}
            <button className="trash" onClick={onTrash}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 0L128 32H0V96H448V32H320L304 0H144zM416 128H32L56 512H392l24-384z"/></svg>
            </button>
        </div>
    )
}