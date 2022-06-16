import { CURRENTPAGE_DECREMENT, CURRENTPAGE_INCREMENT, CURRENTPAGE_SET } from "./types"

let initialState = {
    currentPage: 1
}

export const currentPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENTPAGE_SET:
            return {
                ...state,
                currentPage: action.payload
            }
        case CURRENTPAGE_INCREMENT:
            return {
                ...state,
                currentPage: state.currentPage + 1
            }
        case CURRENTPAGE_DECREMENT:
            return {
                ...state,
                currentPage: state.currentPage - 1
            }
        default:
            return state
    }
}