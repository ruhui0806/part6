import { gql } from '@apollo/client'

const PERSON_DETAILS = gql`
    fragment PersonDetails on Person {
        id
        name
        phone
        address {
            street
            city
        }
    }
`
const FIND_PERSON = gql`
    query findPersonByName($nameToSearch: String!) {
        findPerson(name: $nameToSearch) {
            ...PersonDetails
        }
    }
    ${PERSON_DETAILS}
`
const ALL_PERSONS = gql`
    query {
        allPersons {
            name
            phone
            id
        }
    }
`

const CREATE_PERSON = gql`
    mutation createPerson(
        $name: String!
        $street: String!
        $city: String!
        $phone: String
    ) {
        addPerson(name: $name, street: $street, city: $city, phone: $phone) {
            name
            phone
            id
            address {
                street
                city
            }
        }
    }
`

const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`
const EDIT_NUMBER = gql`
    mutation editNumber($name: String!, $phone: String!) {
        editNumber(name: $name, phone: $phone) {
            name
            phone
            id
            address {
                street
                city
            }
        }
    }
`
const PERSON_ADDED = gql`
    subscription {
        personAdded {
            ...PersonDetails
        }
    }
    ${PERSON_DETAILS}
`
export {
    FIND_PERSON,
    CREATE_PERSON,
    ALL_PERSONS,
    LOGIN,
    EDIT_NUMBER,
    PERSON_ADDED,
}
