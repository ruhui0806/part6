const {
    ApolloServer,
    gql,
    UserInputError,
    AuthenticationError,
} = require('apollo-server')

const connectDB = require('./mongo')
const Person = require('./models/personSchema')
const User = require('./models/userSchema')
const jwt = require('jsonwebtoken')
//default scalar types: Int, Float, String, Boolean, ID
const JWT_SECRET = 'THIS_IS_THE_SECRET'
connectDB()
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
`

const resolvers = {
    Address: {
        street: (root) => root.street,
        city: (root) => root.city,
    },
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
        me: async (root, args, context) => {
            console.log('current user: ', context.currentUser)
            return context.currentUser
        },
        personCount: async () => Person.collection.countDocuments(),
        allPersons: async (root, args) => {
            if (!args.phone) {
                return Person.find({})
            }
            // $exists
            // Syntax: { field: { $exists: <boolean> } }
            return Person.find({ phone: { $exists: args.phone === 'YES' } })
        },
        findPerson: (root, args) => Person.findOne({ name: args.name }),
        allUsers: async (root, args) => User.find({}),
    },
    Mutation: {
        addPerson: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }
            const person = new Person({ ...args })
            try {
                await person.save()
                currentUser.friends = currentUser.friends.concat(person)
                await currentUser.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            return person
        },
        editNumber: async (root, args) => {
            const filter = { name: args.name }
            const update = { phone: args.phone }
            const person = await Person.findOneAndUpdate(filter, update, {
                new: true,
            })
        },
        createUser: async (root, args) => {
            const user = await new User({ username: args.username })
            return user.save().catch((error) => {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
        addAsFriend: async (root, args, { currentUser }) => {
            const isFriend = (person) => {
                currentUser.friends.map((f) =>
                    f._id.toString().includes(person._id.toString())
                )
            }
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }
            const person = await Person.findOne({ name: args.name })

            if (!isFriend(person)) {
                console.log('is friend or not?: ', !isFriend(person))
                currentUser.friends = currentUser.friends.concat(person)
            }
            await currentUser.save()
            return currentUser
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        console.log('request: ' + req)
        console.log('token: ' + req.headers)
        const auth = req ? req.headers.authorization : null
        console.log('token: ' + req.headers.authorization)
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id).populate(
                'friends'
            )
            req.user = currentUser
            console.log('request.user: ', req.user)
            return { currentUser }
        }
    },
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
