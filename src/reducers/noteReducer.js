import { createSlice } from "@reduxjs/toolkit"
const initialState = [
    {
        content: 'reducer defines how redux store works',
        important: true,
        id: 1,
    },
    {
        content: 'state of store can contain any data',
        important: false,
        id: 2,
    },
]

const generateId = () => {
    return Number(
        Math.random() * 100000
    ).toFixed(0)
}

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        createNote(state, action) {
            const newNote = action.payload
            state.push(newNote)
        },
        toggleImportanceOf(state, action) {
            const id = action.payload
            const noteToChange = state.find(n => n.id === id)
            const changedNote = { ...noteToChange, important: !noteToChange.important }
            return state.map(note => note.id !== id ? note : changedNote)
        },
        appendNotes(state, action) {
            state.push(action.payload)
        },
        setNotes(state, action) {
            return action.payload
        }
    }
})
export const { createNote, toggleImportanceOf, appendNotes, setNotes } = noteSlice.actions
export default noteSlice.reducer
