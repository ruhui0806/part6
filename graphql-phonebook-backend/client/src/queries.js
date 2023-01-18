import { gql } from '@apollo/client'
const FIND_PERSON = gql`
    query findPersonByName($nameToSearch: String!) {
        findPerson(name: $nameToSearch) {
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
export { FIND_PERSON, CREATE_PERSON, ALL_PERSONS }
