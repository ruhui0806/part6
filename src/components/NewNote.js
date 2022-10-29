import { useDispatch } from "react-redux"
import { createNote } from "../reducers/noteReducer"

const NewNote = (props) => {
    const dispatch = useDispatch()
    const addNote = (event) => {
        event.preventDefault()
        // use the user's input value as the note's content
        console.log(event.target)
        const content = event.target.note.value

        event.target.note.value = "" //empty the input place after add new note
        dispatch(createNote(content))//content is the action.dispatch
    }


    return (
        <form onSubmit={addNote}>
            <input name="note" />
            <button type="submit">add</button>
        </form>
    )
}

export default NewNote