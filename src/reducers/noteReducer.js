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
    initialState,
    reducers: {
        createNote(state, action) {
            const content = action.payload
            state.push({ content, important: false, id: generateId() })
            //dispatch(createNote('Redux Toolkit is awesome!')), payload is the input
        },
        toggleImportanceOf(state, action) {
            const id = action.payload
            const noteToChange = state.find(n => n.id === id)
            const changedNote = { ...noteToChange, important: !noteToChange.important }
            return state.map(note => note.id !== id ? note : changedNote)
        }
    }
})
export const { createNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer



// //action creators:
// export const createNote = (content) => {
//     return {
//         type: "NEW_NOTE",
//         data: {
//             content,
//             important: false,
//             id: generateId()
//         }
//     }
// }

// export const toggleImportanceOf = (id) => {
//     return {
//         type: "TOGGLE_IMPORTANCE",
//         data: { id }
//     }
// }
// export const noteReducer = (state = initialState, action) => {
//     console.log('ACTION showing in noteReducer: ', action)
//     switch (action.type) {
//         case 'NEW_NOTE': return [...state, action.data]
//         case 'TOGGLE_IMPORTANCE': {
//             console.log(action)
//             const id = action.data.id
//             const noteToChange = state.find(n => n.id === id)
//             const changedNote = { ...noteToChange, important: !noteToChange.important }
//             return state.map(note => note.id !== id ? note : changedNote)
//         }
//         default: return state
//     }
// }


// const store = createStore(noteReducer)

// store.dispatch({
//     type: 'NEW_NOTE',
//     data: {
//         content: 'the app state is in redux store',
//         important: true,
//         id: 1
//     }
// })

// store.dispatch({
//     type: 'NEW_NOTE',
//     data: {
//         content: 'state changes are made with actions',
//         important: false,
//         id: 2
//     }
// })

// const App = () => {
//     return (
//         <div>
//             <ul>
//                 {store.getState().map(note =>
//                     <li key={note.id}>
//                         {note.content} <strong>{note.important ? 'important' : ''}</strong>
//                     </li>
//                 )}
//             </ul>
//         </div>
//     )
// }