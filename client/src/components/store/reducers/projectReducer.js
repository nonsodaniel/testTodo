const initState = {
    status: null,
    projectMessage: null,
    projectData: null
}

export const projectReducer = (state = initState, action) => {
    switch (action.type) {

        case "CREATE_CATEGORY_SUCCESS":
            return {
                ...state,
                projectData: action.response.data,
                projectMessage: action.response.message,
                status: action.response.status
            }

        case "CREATE_CATEGORY_ERROR":
            return {
                ...state,
                projectData: action.response.data,
                projectMessage: action.response.message,
                status: action.response.status
            }

        default:
            return state;
    }
}


export default projectReducer