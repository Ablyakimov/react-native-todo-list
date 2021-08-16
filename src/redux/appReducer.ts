
import { CLOSE_CREATE_LIST, SHOW_CREATE_LIST } from './types'

const initialState = {
    isOpenCreateList: false
}

export const appReducer = (state = initialState, action: any) => {
    switch (action.type){
        case SHOW_CREATE_LIST:
            return { ...state, isOpenCreateList: true }
        case CLOSE_CREATE_LIST:
            return { ...state, isOpenCreateList: false }
        default:
            return state
    }
}