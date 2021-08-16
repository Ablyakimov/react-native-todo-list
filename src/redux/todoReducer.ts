
import { ADD_TODO, INPUT_TODO, SELECT_LIST_TO_CREATE_TODO, SELECT_LOCAL_LIST_TO_CREATE_TODO } from './types'

const initialState:any = {
    createTodo: {
        id: 0,
        localId: 0,
        todoInput: '',
    }
}

export const todoReducer = (state = initialState, action: any) => {
    switch (action.type){
        case INPUT_TODO:
            return { ...state, createTodo:{ ...state.createTodo, todoInput: action.payload }}
        case ADD_TODO:
            return { ...state, createTodo:{...state.createTodo, todoInput: ''}}
        case SELECT_LOCAL_LIST_TO_CREATE_TODO:
            return { ...state, createTodo:{ ...state.createTodo, localId: action.payload }}
        case SELECT_LIST_TO_CREATE_TODO:
                return { ...state, createTodo:{...state.createTodo, id: action.payload }}    
        default:
            return state
    }
}