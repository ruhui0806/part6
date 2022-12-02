import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { CREATE_PERSON, ALL_PERSONS } from '../queries'

const PersonForm = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')

    const [createPerson] = useMutation(CREATE_PERSON, {
        variables: { name, phone, street, city },
        refetchQueries: [{ query: ALL_PERSONS }],
    })
    const onSubmit = (e) => {
        e.preventDefault()

        createPerson(name, phone, street, city)
        setName('')
        setPhone('')
        setStreet('')
        setCity('')
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label>Phone</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <label>Street</label>
                    <input
                        type="text"
                        id="street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </div>
                <div>
                    <label>City</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default PersonForm
