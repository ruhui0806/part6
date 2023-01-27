const connectDB = require('./mongo')
const Person = require('./models/personSchema')
const User = require('./models/userSchema')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const jwt = require('jsonwebtoken')

//The material on the course website is not working, below should be copied directly from github: https://github.com/fullstack-hy2020/graphql-phonebook-backend/blob/part8-7/index.js
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const http = require('http')

const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

//default scalar types: Int, Float, String, Boolean, ID
const JWT_SECRET = 'THIS_IS_THE_SECRET'
connectDB()

//references:
// https://www.apollographql.com/docs/apollo-server/api/express-middleware
// https://www.apollographql.com/docs/apollo-server/data/subscriptions/
//https://www.apollographql.com/docs/apollo-server/migration/#migrate-from-apollo-server-express
const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)
    //The subscription server doesn't take typeDefs and resolvers options; it takes an executable GraphQLSchema.
    const schema = makeExecutableSchema({ typeDefs, resolvers })

    // Creating the WebSocket server:
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    })
    // Hand in the schema we just created and have the
    // WebSocketServer start listening
    const serverCleanup = useServer({ schema }, wsServer)
    //ApolloServer:
    const server = new ApolloServer({
        schema,
        context: async ({ req }) => {
            // console.log('request: ' + req)
            // console.log('token: ' + req.headers)
            const auth = req ? req.headers.authorization : null
            // console.log('token: ' + req.headers.authorization)
            if (auth && auth.toLowerCase().startsWith('bearer ')) {
                const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
                const currentUser = await User.findById(
                    decodedToken.id
                ).populate('friends')
                req.user = currentUser
                // console.log('request.user: ', req.user)
                return { currentUser }
            }
        },
        // Add plugins to the ApolloServer constructor to shutdown both the HTTP server and the WebSocketServer
        plugins: [
            // Proper shutdown for the HTTP server
            ApolloServerPluginDrainHttpServer({ httpServer }),

            // Proper shutdown for the WebSocket server.
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose()
                        },
                    }
                },
            },
        ],
    })

    await server.start()
    server.applyMiddleware({ app, path: '/graphql' })

    // app.use(
    //     '/',
    //     cors(),
    //     bodyParser.json(),
    //     expressMiddleware(server, {
    //         context: async ({ req }) => {
    //             const auth = req ? req.headers.authorization : null
    //             if (auth && auth.toLowerCase().startsWith('bearer ')) {
    //                 const decodedToken = jwt.verify(
    //                     auth.substring(7),
    //                     JWT_SECRET
    //                 )
    //                 const currentUser = await User.findById(
    //                     decodedToken.id
    //                 ).populate('friends')
    //                 req.user = currentUser
    //                 return { currentUser }
    //             }
    //         },
    //     })
    // )

    const PORT = 4000
    // Most Express applications call app.listen(...),
    // but for your setup change this to httpServer.listen(...) using the same arguments.
    // This way, the server starts listening on the HTTP and WebSocket transports simultaneously
    httpServer.listen(PORT, () => {
        console.log(`server is listening on http://localhost:${PORT}/graphql`)
    })
}

// call the function that does the setup and starts the server
start()

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: async ({ req }) => {
//         console.log('request: ' + req)
//         console.log('token: ' + req.headers)
//         const auth = req ? req.headers.authorization : null
//         console.log('token: ' + req.headers.authorization)
//         if (auth && auth.toLowerCase().startsWith('bearer ')) {
//             const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
//             const currentUser = await User.findById(decodedToken.id).populate(
//                 'friends'
//             )
//             req.user = currentUser
//             console.log('request.user: ', req.user)
//             return { currentUser }
//         }
//     },
// })

// server.listen().then(({ url }) => {
//     console.log(`Server ready at ${url}`)
// })
