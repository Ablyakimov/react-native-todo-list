declare module 'redux-persist/lib/*';

export interface Todo {
  id: number;
  text: string;
  list_id: number;
  checked: boolean;
  localListId: number;
  created_at?: string;
  updated_at?: string;
  localTodoId: number;
}

export interface ListType {
    id: number;
    localId: number;
    title: string;
    todos: Array<Todo>
}


