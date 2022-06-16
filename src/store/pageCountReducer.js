import { PAGECOUNT_SET } from "./types";


let initialState = {
    pageCount: 0
}

export const pageCountReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAGECOUNT_SET:
            return {
                ...state,
                pageCount: action.payload
            }
        default:
            return state
    }
}