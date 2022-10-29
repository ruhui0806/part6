// import axios from "axios"
// const baseUrl = "http://localhost:3001/notes"
// const getAll = async () => {
//     const response = await axios.get(baseUrl)
//     return response.data
// } or:
// const getAll = () => axios.get(baseUrl).then(res => res.data)

// const createNew = (content) => {
//     const obj = { content, important: false }
//     axios.post(baseUrl, obj).then(res => res.data)
// }
// export default { getAll, createNew }

import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    return axios.get(baseUrl).then(res => res.data)
}

const createNew = async (content) => {
    const object = { content, important: false }
    const response = await axios.post(baseUrl, object)
    return response.data
}

export default {
    getAll,
    createNew,
}
