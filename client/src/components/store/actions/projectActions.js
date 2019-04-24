import { get, post } from '../../../config/apiRequest'


export const createNews = (credentials, cb) => {
    return (dispatch, getState) => {
        post(`/news`, credentials).then((response) => {
            console.log("Create news reponse ()=>", response);
            if (response.status === "Success") {
                dispatch({ type: "LOGIN_SUCCESS", response });
                if (typeof cb === "function") cb({ type: "LOGIN_SUCCESS", response });
                localStorage.setItem('news', JSON.stringify(response.data));
            } else {
                dispatch({ type: "LOGIN_ERROR", response });
                if (typeof cb === "function") cb();
            }
        })
    }
}


export const createCategory = (credentials, cb) => {
    return (dispatch, getState) => {
        post(`/category`, credentials).then((response) => {
            console.log("Create category reponse ()=>", response);
            if (response.status === "Success") {
                dispatch({ type: "CREATE_CATEGORY_SUCCESS", response });
                if (typeof cb === "function") cb({ type: "CREATE_CATEGORY_SUCCESS", response });
                localStorage.setItem('category', JSON.stringify(response.data));
            } else {
                dispatch({ type: "CREATE_CATEGORY_ERROR", response });
                if (typeof cb === "function") cb();
            }
        })
    }
}


export const updateNews = (credentials) => {
    return (dispatch, getState) => {
        post(`/category/id`, credentials).then((response) => {
            console.log("Update category response ()=>", response);
        })
    }
}