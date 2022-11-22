const isLoggedReducer = (state = false, action) => {
    switch (action.type) {
        case "Sign_in": return true;
        case "Sign_out": return false;
        default: return state;
    }
}

export default isLoggedReducer