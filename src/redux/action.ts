
import axios, { AxiosResponse } from "axios"
import { Todo } from "../types"
import { ADD_LIST, FETCH_LIST, SHOW_CREATE_LIST, CLOSE_CREATE_LIST, INPUT_TODO, ADD_TODO, ADD_TODO_IN_LIST, SELECT_LIST_TO_CREATE_TODO, SELECT_LOCAL_LIST_TO_CREATE_TODO, DELETE_LIST, INPUT_LIST, CLEAR_INPUT_LIST, DELETE_TODO, EDITING_LIST } from "./types"
import Constants from 'expo-constants';

const API_URL = Constants.manifest?.extra?.API_URL;

// ============== App ================
export function showOpenCreateList() {
    return {
        type: SHOW_CREATE_LIST
    }
}

export function closeOpenCreateList() {
    return {
        type: CLOSE_CREATE_LIST
    }
}

// ============== List ================
export function fetchList() {
    return async (dispatch: any) => {
        try {
            const response:AxiosResponse<object> = await axios.get(`${API_URL}/list`)
            dispatch({ type: FETCH_LIST, payload: response.data })
        } catch (error) {
            console.log(error.message);
            
        }
       
    }
}

export function addTodoInList(todo: Todo, localId: number) {
    return {
        type: ADD_TODO_IN_LIST,
        payload: {todo, localId}
    }
}

export function deleteList(id: number) {
    return async (dispatch: any) => {
        try {
            const respons:AxiosResponse<any> = await axios.delete(`${API_URL}/list/${id}`)
            dispatch({ type: DELETE_LIST, payload: id })
        } catch (error) {
            console.log(error.message);
            
        }
    }
}
export function addList(title: string) {
    return async (dispatch: any) => {
        try {
            const respons:AxiosResponse<any> = await axios.post(`${API_URL}/list`, { "title": title })
            dispatch({ type: ADD_LIST, payload: respons.data})
            dispatch({type: CLEAR_INPUT_LIST})
        } catch (error) {
            console.log(error.message);
            
        }
    }
}

export function inputListHandler(text: string) {
    return {
        type: INPUT_LIST,
        payload: text
    }
}

export function removeTodoFromList(localId: number, todoLocalId: number) {
    return {
        type: DELETE_TODO,
        payload: { localId, todoLocalId }
    }
}

export function editTodoInList(todo: Todo, listLocalId: number, localTodoId: number) {
    return {
        type: EDITING_LIST,
        payload: { todo, listLocalId, localTodoId }
    }
}
// ============== TODO ================

export function removeTodo(listId: number, listLocalId:number, todoId: number, todoLocalId: number ) {
    return async (dispatch: any) => {
        try {
            const response:AxiosResponse<any> = await axios.delete(`${API_URL}/list/${listId}/todo/${todoId}`);
            dispatch(removeTodoFromList(listLocalId, todoLocalId))
        } catch (error) {
            console.log(error.message);
            
        }
    }
}

export function editTodo(listId: number, listLocalId:number, todoId: number, body: object, localTodoId: number ) {
    return async (dispatch: any) => {
        try {
            const response:AxiosResponse<any> = await axios.patch(`http://mobile-dev.oblakogroup.ru/candidate/remziablyakimov//list/${listId}/todo/${todoId}`, body);
            dispatch(editTodoInList(response.data, listLocalId, localTodoId))
        } catch (error) {
            console.log(error.message);
            
        }
    }
}

export function inputTodoHandler(text: string) {
    return {
        type: INPUT_TODO,
        payload: text
    }
}

export function addTodo(id: number, localId: number ,body: object) {
    return async (dispatch: any) => {
        try {
            const response:AxiosResponse<any> = await axios.post(`http://mobile-dev.oblakogroup.ru/candidate/remziablyakimov/list/${id}/todo`, body);
            dispatch(addTodoInList(response.data, localId))
            dispatch({ type: ADD_TODO })
        } catch (error) {
            console.log(error.message);
            
        }
    }
}

export function selectList(id: number) {
    return{
        type: SELECT_LIST_TO_CREATE_TODO,
        payload: id
    }
}

export function selectLocalList(id: number) {
    return{
        type: SELECT_LOCAL_LIST_TO_CREATE_TODO,
        payload: id
    }
}