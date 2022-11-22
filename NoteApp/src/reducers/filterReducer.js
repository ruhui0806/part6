//action creator:
export const filterChange = (filter) => {
    return {
        type: 'SET_FILTER',
        filter,
    }
}
//access the filter: $ action.filter
export const filterReducer = (state = 'ALL', action) => {
    console.log('ACTION showing in filterReducer: ', action)
    switch (action.type) {
        case 'SET_FILTER': state = action.filter
            return state //(here action.fiter's value will be set as new state)
        default:
            return state
    }
}
