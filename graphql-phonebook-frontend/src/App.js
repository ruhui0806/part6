// export default App
import { gql, useQuery } from '@apollo/client'
import Persons from './components/Persons'
const ALL_PERSONS = gql`
    query {
        allPersons {
            name
            phone
            id
        }
    }
`

const App = () => {
    //const {loading, error, data} = useQuery(ALL_PERSONS)
    const result = useQuery(ALL_PERSONS)

    if (result.loading) {
        return <div>loading...</div>
    }
    if (result.error) return <div>Error!</div>

    // return <div>{result.data.allPersons.map((p) => p.name).join(', ')}</div>
    return <Persons persons={result.data.allPersons} />
}

export default App
