import { get, post } from '../../../config/apiRequest'

export const signIn = (credentials, cb) => {
    return (dispatch, getState) => {
        post(`/admin/authenticate`, credentials).then((response) => {
            console.log("SignIn reponse ()=>", response);
            if (response.status === "Success") {
                dispatch({ type: "LOGIN_SUCCESS", response });
                if (typeof cb === "function") cb({ type: "LOGIN_SUCCESS", response });
                localStorage.setItem('admin', JSON.stringify(response.data));
            } else {
                dispatch({ type: "LOGIN_ERROR", response });
                if (typeof cb === "function") cb();
            }
        })
    }
}


export const signUp = (credentials, cb) => {
    return (dispatch, getState) => {
        post(`/admin/register`, credentials).then((response) => {
            console.log("signUp response ()=>", response);
            if (response.status === 'Success') {
                dispatch({ type: 'SIGNUP_SUCCESS', response });
                if (typeof cb === "function") cb({ type: "SIGNUP_SUCCESS", response });
                localStorage.setItem('admin', JSON.stringify(response.data));
            } else {
                dispatch({ type: 'SIGNUP_ERROR', response });
                if (typeof cb === "function") cb();
            }

        })
    }
}

export const createUsers = (credentials, cb) => {
    return (dispatch, getState) => {
        post('/user/register', credentials).then((response) => {
            console.log("Create user response ()=>", response);
            if (response.status === "Success") {
                dispatch({ type: "CREATE_USER_SUCCESS", response });
                if (typeof cb === "function") cb({ type: "CREATE_USER_SUCCESS", response });

            } else {
                dispatch({ type: "CREATE_USER_ERROR", response });
                if (typeof cb === "function") cb();
            }
        })
    }
}


export const signOut = (credentials) => {
    return (dispatch, getState) => {
        localStorage.clear();
        dispatch({ type: "SIGNOUT_SUCCESS" })
        console.log("Admin logged out Successfully!");
    }
}

