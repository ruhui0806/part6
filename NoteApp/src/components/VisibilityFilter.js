import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"


// const filterChange = (filter) => {
//     return {
//         type: 'SET_FILTER',
//         filter,
//     }
// }
const VisibilityFilter = () => {
    const dispatch = useDispatch()
    return (
        <div>
            all
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(filterChange('ALL'))}
            // onChange => return action.filter = ALL
            />
            important
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(filterChange('IMPORTANT'))}
            />
            nonimportant
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(filterChange('NONIMPORTANT'))}
            />
        </div>
    )
}

export default VisibilityFilter