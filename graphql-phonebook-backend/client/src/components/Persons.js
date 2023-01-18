import React, { useState } from 'react'
import Person from './Person'
import { FIND_PERSON } from '../queries'
import { useQuery, gql } from '@apollo/client'

// const FIND_PERSON = gql`
//     query findPersonByName($nameToSearch: String!) {
//         findPerson(name: $nameToSearch) {
//             name
//             phone
//             id
//             address {
//                 street
//                 city
//             }
//         }
//     }
// `
const Persons = ({ persons }) => {
    const [nameToSearch, setNameToSearch] = useState(null)
    const result = useQuery(FIND_PERSON, {
        variables: { nameToSearch },
        skip: !nameToSearch,
    })

    if (nameToSearch && result.data) {
        return (
            <Person
                person={result.data.findPerson}
                onClose={() => setNameToSearch(null)}
            />
        )
    } else {
        return (
            <div>
                <h2>Persons</h2>
                {persons.map((p) => (
                    <div key={p.name}>
                        {p.name} {p.phone}
                        <button onClick={() => setNameToSearch(p.name)}>
                            show address
                        </button>
                    </div>
                ))}
            </div>
        )
    }
}
export default Persons