import { useQuery, gql } from '@apollo/client'
import Persons from './components/Persons'
import { ALL_PERSONS } from './queries'
import PersonForm from './components/PersonForm'
import { useState } from 'react'
import Notify from './components/Notify'
// const ALL_PERSONS = gql`
//     query {
//         allPersons {
//             name
//             phone
//             id
//         }
//     }
// `

function App() {
    const [errorMessage, setErrorMessage] = useState(null)
    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => setErrorMessage(null), 10000)
    }
    const result = useQuery(ALL_PERSONS)
    if (result.loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            <Notify errorMessage={errorMessage} />
            <Persons persons={result.data.allPersons} />
            <PersonForm setError={notify} />
        </div>
    )
}

export default App
