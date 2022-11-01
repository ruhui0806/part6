import ReactDOM from 'react-dom/client'
import { useState } from 'react'

// import {
//     BrowserRouter as Router,
//     Routes,
//     Route,
//     Link,
//     Navigate,
//     useNavigate,
//     useMatch,
// } from "react-router-dom"

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
    useMatch
} from "react-router-dom"

const Home = () => (
    <div>
        <h2>TKTL notes app</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>
)

// const Note = ({ notes }) => {
//     // The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>.
//     // const obj = useParams()
//     // console.log("useParams(): ", obj) //// {id: '1'} or {id: '2'}
//     const id = useParams().id
//     // Number(value) converts a string or other value to the Number type
//     const note = notes.find(n => n.id === Number(id))
//     return (
//         <div>
//             <h2>{note.content}</h2>
//             <div>{note.user}</div>
//             <div><strong>{note.important ? 'important' : ''}</strong></div>
//         </div>
//     )
// }

//below the version using useMatch():
const Note = ({ note }) => {
    <div>
        <h2>{note.content}</h2>
        <div>{note.user}</div>
        <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>

}
//clicking the name of a note whose id is 3 would trigger an event that changes the address of the browser into notes/3:
const Notes = ({ notes }) => (
    <div>
        <h2>Notes</h2>
        <ul>
            {notes.map(note => <li key={note.id}> <Link to={`/notes/${note.id}`}>{note.content}</Link> </li>)}
        </ul>
    </div>
)

const Users = () => (
    <div>
        <h2>TKTL notes app</h2>
        <ul>
            <li>Matti Luukkainen</li>
            <li>Juha Tauriainen</li>
            <li>Arto Hellas</li>
        </ul>
    </div>
)

const Login = (props) => {
    const navigate = useNavigate()

    const onSubmit = (event) => {
        event.preventDefault()
        props.onLogin('mluukkai')
        // navigate to the Home page
        navigate('/')
    }

    return (
        <div>
            <h2>login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    username: <input />
                </div>
                <div>
                    password: <input type='password' />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

const App = () => {
    const [notes, setNotes] = useState([
        {
            id: 1,
            content: 'HTML is easy',
            important: true,
            user: 'Matti Luukkainen'
        },
        {
            id: 2,
            content: 'Browser can execute only JavaScript',
            important: false,
            user: 'Matti Luukkainen'
        },
        {
            id: 3,
            content: 'Most important methods of HTTP-protocol are GET and POST',
            important: true,
            user: 'Arto Hellas'
        }
    ])

    const [user, setUser] = useState(null)

    const login = (user) => {
        setUser(user)
    }

    const padding = {
        padding: 5
    }
    //useMatch() may be used only in the context of a <Router> component.
    const match = useMatch('/notes/:id')
    const note = match ? notes.find(n => n.id === Number(match.params.id)) : null

    return (
        <div>
            <div>
                <Link style={padding} to="/">home</Link>
                <Link style={padding} to="/notes">notes</Link>
                <Link style={padding} to="/users">users</Link>
                {user ? <em>{user} logged in</em> : <Link style={padding} to="/login">login</Link>}
            </div>
            {/* define parameterized urls in the routing in App component as follows: */}
            <Routes>
                <Route path="/notes/:id" element={<Note notes={note} />} />
                <Route path="/notes" element={<Notes notes={notes} />} />
                <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
                <Route path="/login" element={<Login onLogin={login} />} />
                <Route path="/" element={<Home />} />
            </Routes>
            <div>
                <br />
                <em>Note app, Department of Computer Science 2022</em>
                <p>
                    In HTML 5, what was previously called <em>block-level</em> content is now called <em>flow</em> content.
                </p>
            </div>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <App />
    </Router>
)