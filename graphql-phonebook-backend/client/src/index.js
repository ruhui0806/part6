import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    ApolloProvider,
    split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

//add the following funcs for confguration:
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const authLink = setContext((_, { headers }) => {
    //localstorage item is setted in the loginForm
    const token = localStorage.getItem('phonenumbers-user-token')
    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : null,
        },
    }
})
const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

//get the websocket link:
const wsLink = new GraphQLWsLink(
    createClient({
        url: 'ws://localhost:4000/graphql',
    })
)
// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    },
    wsLink,
    authLink.concat(httpLink)
)

const client = new ApolloClient({
    cache: new InMemoryCache(),
    // link: authLink.concat(httpLink),
    link: splitLink,
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)

reportWebVitals()

// configuring the apollo client cache:
//https://www.apollographql.com/docs/react/caching/cache-configuration

// setup subscriptions on client side:
// https://www.apollographql.com/docs/react/data/subscriptions/
