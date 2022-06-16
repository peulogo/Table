import { CURRENTPAGE_DECREMENT, CURRENTPAGE_INCREMENT, CURRENTPAGE_SET, ITEMS_GET, LOADING_CHANGE, PAGECOUNT_SET } from "./types"


export function itemGet(params, perPage, currentPage) {
    return dispatch => {
        dispatch(loadingChange(true))
        fetch(`https://jsonplaceholder.typicode.com/posts?${params}`)
        .then(resp => {
            Number(resp.headers.get('x-total-count')) === perPage ? dispatch(setPageCount(0)) : dispatch(setPageCount(Math.round(Number(resp.headers.get('x-total-count')) / perPage)))
            if(currentPage > Math.round(Number(resp.headers.get('x-total-count')) / perPage)){
                dispatch(setCurrentPage(1))
            }
            return resp.json()
          })
        .then(data => dispatch(itemsSet(data)))
        .then(dispatch(loadingChange(false)))
    }
}

export const itemsSet = (payload) => {
    return {
        type: ITEMS_GET,
        payload: payload
    }
}

export const loadingChange = (payload) => {
    return {
        type : LOADING_CHANGE,
        payload: payload
    }
}

export const setPageCount = (payload) => {
    return {
        type: PAGECOUNT_SET,
        payload: payload
    }
}

export const setCurrentPage = (payload) => {
    return {
        type: CURRENTPAGE_SET,
        payload: payload
    }
}

export const currentPageIncrement = () => {
    return {
        type: CURRENTPAGE_INCREMENT
    }
}

export const currentPageDecrement = () => {
    return {
        type: CURRENTPAGE_DECREMENT
    }
}