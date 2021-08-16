import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-native';
import { addTodo } from '../redux/action';
import { RootState } from '../redux/rootReducer';

const HeaderCreateTodo = () => {
    const dispatch = useDispatch()
    const inputValue = useSelector((state:RootState) => state.todo.createTodo.todoInput)
    const localId = useSelector((state:RootState) => state.todo.createTodo.localId)
    const list = useSelector((state:RootState) => state.list.list)
    const _createTodo = () => {
      if (inputValue.trim()) {
        dispatch(addTodo(Number(list[localId].id), localId , { "text": inputValue, "checked": false}))
      }
    }

  return (
    <Appbar.Header style={styles.header}>
      <Link underlayColor="transparent" to='/'>
          <Appbar.BackAction  />
      </Link>
      <Appbar.Action icon="check" onPress={_createTodo} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
    header:{
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
})

export default HeaderCreateTodo;