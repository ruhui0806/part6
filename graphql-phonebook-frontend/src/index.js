import ReactDOM from 'react-dom'
import App from './App'

import {
    ApolloProvider,
    HttpLink,
    ApolloClient,
    InMemoryCache,
} from '@apollo/client'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:4000',
    }),
})

// client.query({ query }).then((res) => console.log(res.data))

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)

// import ReactDOM from 'react-dom'
// import App from './App'

// import {
//     ApolloClient,
//     ApolloProvider,
//     HttpLink,
//     InMemoryCache,
// } from '@apollo/client'

// const client = new ApolloClient({
//     cache: new InMemoryCache(),
//     link: new HttpLink({
//         uri: 'http://localhost:4000',
//     }),
// })

// ReactDOM.render(
//     <ApolloProvider client={client}>
//         <App />
//     </ApolloProvider>,
//     document.getElementById('root')
// )
