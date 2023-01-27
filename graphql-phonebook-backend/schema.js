const { gql } = require('apollo-server')
const Person = require('./models/personSchema')
const User = require('./models/userSchema')
const typeDefs = gql`
    type User {
        username: String!
        friends: [Person!]!
        id: ID!
    }
    type Token {
        value: String!
    }
    type Address {
        street: String!
        city: String!
    }
    type Person {
        name: String!
        phone: String
        address: Address!
        id: ID!
        friendOf: [User!]!
    }

    enum YESNO {
        YES
        NO
    }
    type Query {
        personCount: Int!
        allPersons(phone: YESNO): [Person!]!
        findPerson(name: String!): Person
        me: User
        allUsers: [User!]!
    }
    type Mutation {
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ): Person
        editNumber(name: String!, phone: String!): Person
        createUser(username: String!): User
        login(username: String!, password: String!): Token
        addAsFriend(name: String!): User
    }
    type Subscription {
        personAdded: Person!
    }
`

module.exports = typeDefs
