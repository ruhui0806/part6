const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const { persons } = require('./dataExample')

const typeDefs = gql`
    type Address {
        street: String!
        city: String!
    }

    type Person {
        id: ID!
        name: String!
        phone: String
        address: Address!
    }

    type Query {
        allPersons: [Person!]!
        personCount: Int!
        findPerson(name: String): Person!
    }
`

const resolvers = {
    Person: {
        id: (root) => root.id,
        name: (root) => root.name,
        phone: (root) => root.phone,
        address: (root) => {
            return {
                street: root.street,
                city: root.city,
            }
        },
    },

    Query: {
        allPersons: (root, args) => {
            return persons
        },
        personCount: (root, args) => {
            return persons.length
        },
        findPerson: (root, { name }) => {
            return persons.find((person) => person.name === name)
        },
    },

    Mutation: {
        addPerson: (root, { name }) => {
            if (persons.find((p) => p.name === name)) {
                throw new UserInputError('Name already exists', {
                    invalidArgs: args.name,
                })
            }
            const newPerson = { ...args, id: uuid() }
            persons.concat(newPerson)
            return newPerson
        },

        editNumber: (root, { name }) => {
            const person = persons.find((p) => p.name === name)
            if (!person) {
                return null
            }
            const updatedPerson = { ...person, phone: args.phone }
            persons = persons.map((p) =>
                p.name === args.name ? updatedPerson : p
            )
            return updatedPerson
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`listening on ${url}`)
})
