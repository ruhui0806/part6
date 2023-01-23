import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_PERSONS, EDIT_NUMBER } from '../queries'

const PhoneForm = ({ setError }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const [changeNumber, result] = useMutation(EDIT_NUMBER, {
        refetchQueries: [{ query: ALL_PERSONS }],
        onError: (error) => {
            setError(error.graphqlErrors[0].message)
        },
        // update: (cache, response) => {
        //     cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        //         return {
        //             allPersons: allPersons.concat(response.data.editNumber),
        //         }
        //     })
        // },
    })

    const submit = (event) => {
        event.preventDefault()

        changeNumber({ variables: { name, phone } })

        setName('')
        setPhone('')
    }
    useEffect(() => {
        if (result.data.editNumber === null) {
            setError('person not found')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])

    return (
        <div>
            <h2>change number</h2>

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
                <button type="submit">change number</button>
            </form>
        </div>
    )
}

export default PhoneForm
