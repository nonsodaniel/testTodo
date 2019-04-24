const initState = {
    status: null,
    authMessage: null,
    registerData: null
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {

        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                registerData: action.response.data,
                authMessage: action.response.message,
                status: action.response.status
            }

        case 'CREATE_USER_SUCCESS':
            return {
                ...state,
                registerData: action.response.data,
                authMessage: action.response.message,
                status: action.response.status
            }

        case "SIGNUP_ERROR":
            return {
                ...state,
                registerData: action.response.data,
                authMessage: action.response.message,
                status: action.response.status
            }

        case "CREATE_USER_ERROR":
            return {
                ...state,
                registerData: action.response.data,
                authMessage: action.response.message,
                status: action.response.status
            }

        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authMessage: action,
                status: action.response.status,
                registerData: action.response.data,
            }

        case 'LOGIN_ERROR':
            return {
                ...state,
                authMessage: action.response.message,
                status: action.response.status
            }

        case 'SIGNOUT_SUCCESS':
            return state;

        default:
            return state
    }
}


export default authReducer

