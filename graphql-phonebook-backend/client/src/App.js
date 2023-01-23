import { useQuery, gql } from '@apollo/client'
import Persons from './components/Persons'
import { ALL_PERSONS } from './queries'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import { useState } from 'react'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
function App() {
    const [token, setToken] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const client = useApolloClient()
    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => setErrorMessage(null), 10000)
    }
    const result = useQuery(ALL_PERSONS)
    if (result.loading) {
        return <div>loading...</div>
    }
    const logout = () => {
        setToken(null)
        localStorage.clear() //localStorage.removeItem('phonenumbers-user-token')
        client.resetStore()
    }
    if (!token) {
        return (
            <div>
                <Notify errorMessage={errorMessage} />
                <h2>Login</h2>
                <LoginForm setToken={setToken} setError={notify} />
            </div>
        )
    }
    return (
        <div>
            <Notify errorMessage={errorMessage} />
            <button onClick={logout}>logout</button>
            <Persons persons={result.data.allPersons} />
            <PersonForm setError={notify} />
            <PhoneForm setError={notify} />
        </div>
    )
}

export default App
