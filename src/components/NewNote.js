import { connect } from "react-redux"
import { createNote } from "../reducers/noteReducer"


const NewNote = (props) => {
    // const dispatch = useDispatch()
    const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        props.createNote(content)
    }

    return (
        <form onSubmit={addNote}>
            <input name="note" />
            <button type="submit">add</button>
        </form>
    )
}

const mapDispatchToProps = { createNote }
// export default NewNote
export default connect(null, mapDispatchToProps)(NewNote)//Since the component does not need to access the store's state,
//export default connect(null, { createNote })(NewNote)//we can simply pass null as the first parameter to connect
