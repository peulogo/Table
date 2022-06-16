import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { currentPageReducer } from "./currentPageReducer";
import { itemsReducer } from "./itemsReducer";
import { loadingReducer } from "./loadingReducer";
import { pageCountReducer } from "./pageCountReducer";


export const store = configureStore({
    reducer:{
        items: itemsReducer,
        loading : loadingReducer,
        pageCount: pageCountReducer,
        currentPage: currentPageReducer
    },
    middleware: [thunk]
})