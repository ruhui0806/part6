import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_PERSON, ALL_PERSONS } from '../queries'
import updateCache from '../functions/updateCache'

const PersonForm = ({ setError }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')

    const [createPerson] = useMutation(CREATE_PERSON, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        },
        update: (cache, response) => {
            updateCache(cache, { query: ALL_PERSONS }, response.data.addPerson)
            // cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
            //     return {
            //         allPersons: allPersons.concat(response.data.addPerson),
            //     }
            // })
        },
        // // refetchQueries: [{ query: ALL_PERSONS }],
        // update(cache, { data: { createPerson } }) {
        //     const { allPersons } = cache.readQuery({ query: ALL_PERSONS })
        //     cache.writeQuery({
        //         query: ALL_PERSONS,
        //         data: { allPersons: [...allPersons, createPerson] },
        //     })
        // },
        //As a convenience, you can use cache.updateQuery or cache.updateFragment to
        //combine reading and writing cached data with a single method call
        //
    })
    const submit = (event) => {
        event.preventDefault()
        if (!name || !street || !city) {
            setError('Please fill in all fields')
            return alert('Please fill in all fields')
        }
        createPerson({
            variables: {
                name,
                street,
                city,
                phone: phone.length > 0 ? phone : undefined,
            },
        })

        setName('')
        setPhone('')
        setStreet('')
        setCity('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={submit}>
                <div>
                    name{' '}
                    <input
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    />
                </div>
                <div>
                    phone{' '}
                    <input
                        value={phone}
                        onChange={({ target }) => setPhone(target.value)}
                    />
                </div>
                <div>
                    street{' '}
                    <input
                        value={street}
                        onChange={({ target }) => setStreet(target.value)}
                    />
                </div>
                <div>
                    city{' '}
                    <input
                        value={city}
                        onChange={({ target }) => setCity(target.value)}
                    />
                </div>
                <button type="submit">add!</button>
            </form>
        </div>
    )
}

export default PersonForm
