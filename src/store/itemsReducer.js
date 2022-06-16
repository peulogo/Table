import { ITEMS_GET} from "./types";



let initialState = {
    items: []
}

export const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ITEMS_GET:
            return {
                ...state,
                items: [...action.payload]
            }
        default:
            return state
    }
}