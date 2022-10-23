// Action -> e.g., INCREMENT: an action that returns an obj {type:}
export const Increment = () => {
    return { type: "Increment" }
}

export const Decrement = () => {
    return { type: "Decrement" }
}

export const SignIn = () => {
    return { type: "Sign_in" }
}

export const SignOut = () => {
    return { type: "Sign_out" }
}

const generateId = () => {
    return Number(
        Math.random() * 100000
    ).toFixed(0)
}

//action creators:
export const createNote = (content) => {
    return {
        type: "NEW_NOTE",
        data: {
            content,
            important: false,
            id: generateId()
        }
    }
}

export const toggleImportanceOf = (id) => {
    return {
        type: "TOGGLE_IMPORTANCE",
        data: { id }
    }
}




