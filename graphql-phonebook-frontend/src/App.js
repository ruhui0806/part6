// export default App
import { gql, useQuery } from '@apollo/client'
import Persons from './components/Persons'
import { ALL_PERSONS } from './queries'
import PersonForm from './components/PersonForm'

const App = () => {
    //const {loading, error, data} = useQuery(ALL_PERSONS)
    const result = useQuery(ALL_PERSONS)

    if (result.loading) {
        return <div>loading...</div>
    }
    if (result.error) return <div>Error!</div>

    // return <div>{result.data.allPersons.map((p) => p.name).join(', ')}</div>
    return (
        <div>
            {!result.loading && !result.error && (
                <div>
                    <Persons persons={result.data.allPersons} />
                    <PersonForm />
                </div>
            )}
        </div>
    )
}

export default App
