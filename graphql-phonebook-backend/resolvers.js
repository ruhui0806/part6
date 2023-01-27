const { gql } = require('apollo-server')
const Person = require('./models/personSchema')
const User = require('./models/userSchema')
const jwt = require('jsonwebtoken')
// A PubSub instance enables your server code to both publish events to a particular label and listen for events
// associated with a particular label.We can create a PubSub instance like so
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const JWT_SECRET = 'THIS_IS_THE_SECRET'

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
        // friendOf: async (root) => {
        //     const friends = await User.find({ friends: { $in: [root._id] } })
        //     return friends
        //     //{ field: { $in: [<value1>, <value2>, ... <valueN> ] } }
        // },
    },
    Query: {
        me: async (root, args, context) => {
            console.log('current user: ', context.currentUser)
            return context.currentUser
        },
        personCount: async () => Person.collection.countDocuments(),
        allPersons: async (root, args) => {
            if (!args.phone) {
                return Person.find({}).populate('friendsOf')
            }
            // $exists
            // Syntax: { field: { $exists: <boolean> } }
            return Person.find({
                phone: { $exists: args.phone === 'YES' },
            }).populate('friendsOf')
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
            //send a notification to subscribers:You can publish an event using the publish method of a PubSub instance:
            //The first parameter is the name of the event label you're publishing to, as a string ("PERSON_ADDED")
            //The second parameter is the payload associated with the event
            //The payload should include whatever data is necessary for your resolvers to populate the associated Subscription field and its subfields.
            pubsub.publish('PERSON_ADDED', { personAdded: person })

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
    //An AsyncIterator object listens for events that are associated with a particular label (or set of labels) and adds them to a queue for processing
    //Every Subscription field resolver's subscribe function must return an AsyncIterator object
    Subscription: {
        personAdded: {
            subscribe: () => pubsub.asyncIterator('PERSON_ADDED'),
            // With this subscribe function set, Apollo Server uses the payloads of PERSON_ADDED events to push updated values for the personAdded field
        },
    },
}

module.exports = resolvers
