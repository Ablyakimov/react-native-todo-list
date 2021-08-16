import { ListType} from '../types'
import { ADD_LIST, ADD_TODO_IN_LIST, CLEAR_INPUT_LIST, DELETE_LIST, DELETE_TODO, EDITING_LIST, FETCH_LIST, INPUT_LIST, INPUT_TODO } from './types'

const initialState: any = {
    list:[],
    listInput: '',
}

export const listReducer = (state = initialState, action: any) => {
    switch (action.type){
        case FETCH_LIST:
            return { ...state, list: action.payload }
        case ADD_LIST:
            return{...state, list:[...state.list, action.payload ]}
        case ADD_TODO_IN_LIST:
            const list = [...state.list]
            list[action.payload.localId] = {
                ...state.list[action.payload.localId], 
                todos:[ 
                    ...state.list[action.payload.localId].todos, 
                    action.payload.todo 
                ]
            }
            return{ ...state, list:[...list]}
        case DELETE_LIST:
            return{ ...state, list:[ ...state.list.filter((item: ListType) => item.id !== action.payload)]} 
        case INPUT_LIST:
            return{ ...state, listInput:action.payload }
        case CLEAR_INPUT_LIST:
            return{ ...state, listInput:'' }  
        case DELETE_TODO: 
            const listToDelet = [...state.list]
            const arraOfTodos = [...state.list[action.payload.localId].todos].filter((item, index) => index !== action.payload.todoLocalId)
            listToDelet[action.payload.localId] = {
                ...state.list[action.payload.localId], 
                todos:
                    [...arraOfTodos]
            }
            return{ ...state, list:[...listToDelet]}
        case EDITING_LIST:
            const editTodos = [...state.list[action.payload.listLocalId].todos]
            editTodos[action.payload.listTodoId] = [action.payload.todo]
            const listToEdit = [...state.list]
            listToEdit[action.payload.listLocalId].todos = editTodos
            return{ ...state, ...listToEdit}
        default:
            return state
    }
}