import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

const FIND_PERSON = gql`
    query findPersonByName($nameToSearch: String!) {
        findPerson(name: $nameToSearch) {
            id
            name
            phone
            address {
                street
                city
            }
        }
    }
`

const Person = ({ person, onClose }) => {
    return (
        <>
            <h2>{person.name}</h2>
            <div>
                {person.address.street} {person.address.city}
            </div>
            <div>{person.phone}</div>
            <button onClick={onClose}>close</button>
        </>
    )
}

const Persons = ({ persons }) => {
    const [nameForSearch, setNameForSearch] = useState(null)
    const { loading, error, data } = useQuery(FIND_PERSON, {
        variables: { nameToSearch: nameForSearch },
        skip: !nameForSearch,
    })
    //skip: If true, the query is not executed, so if nameForSearch is null, !nameForSearch is true, then the query is not executed.

    if (nameForSearch && data) {
        return (
            <Person
                person={data.findPerson}
                onClose={() => setNameForSearch(null)}
            />
        )
    }
    return (
        <div>
            {persons.map((p) => (
                <div key={p.name}>
                    {' '}
                    {p.name} {p.phone}
                    <button onClick={() => setNameForSearch(p.name)}>
                        show address
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Persons
