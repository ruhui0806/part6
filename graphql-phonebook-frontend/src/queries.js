import { gql } from '@apollo/client'

export const ALL_PERSONS = gql`
    query {
        allPersons {
            name
            phone
            id
        }
    }
`
export const FIND_PERSON = gql`
    mutation findPersonByName($nameToSearch: String!) {
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
// export const CREATE_PERSON = gql`
//     mutation createPerson(
//         $name: String!
//         $phone: String!
//         $street: String!
//         $city: String!
//     ) {
//         addPerson(name: $name, street: $street, city: $city, phone: $phone) {
//             id
//             name
//             phone
//             address {
//                 street
//                 city
//             }
//         }
//     }
// `
export const CREATE_PERSON = gql`
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
