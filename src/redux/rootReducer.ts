import { combineReducers } from "redux";
import { listReducer } from './listReducer'
import { appReducer } from "./appReducer";
import { todoReducer } from "./todoReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    list: listReducer,
    todo: todoReducer
})

export type RootState = ReturnType<typeof rootReducer>