import { toggleImportanceOf } from "../../actions"
import { useDispatch, useSelector } from "react-redux"

const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(state => state)

    return (
        <ul>
            {notes.map(note =>
                <li key={note.id} onClick={() => dispatch(toggleImportanceOf(note.id))}>
                    {note.content}
                    <strong> {note.important ? 'important' : ''}</strong>
                </li>
            )}
        </ul>
    )
}

export default Notes

