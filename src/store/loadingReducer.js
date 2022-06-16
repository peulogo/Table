import { LOADING_CHANGE } from "./types"


let initialState = {
    loading: false
}

export const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_CHANGE:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }

}