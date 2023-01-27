// function that takes care of manipulating cache
const updateCache = (cache, query, addedPerson) => {
    // helper that is used to eliminate saving same person twice
    const uniqByName = (a) => {
        let seen = new Set()
        return a.filter((item) => {
            let k = item.name
            return seen.has(k) ? false : seen.add(k)
        })
    }

    cache.updateQuery(query, ({ allPersons }) => {
        return {
            allPersons: uniqByName(allPersons.concat(addedPerson)),
        }
    })
}
export default updateCache
