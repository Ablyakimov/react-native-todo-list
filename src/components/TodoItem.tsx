import React from 'react'
import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { Todo } from '../types';
import { editTodo } from '../redux/action';

const TodoItem = ({ text, id, checked, list_id: listId, localListId, localTodoId }: Todo) => {
    const dispatch = useDispatch()
    const [isChecked, setIsChecked] = useState(checked)
    
    const _onPress = () => {
        setIsChecked(prev => !prev)
        dispatch(editTodo(listId, localListId, id, {"text": {text}, "checked": !isChecked}, localTodoId))
    }
    return(
            <TouchableOpacity  style={styles.btn} onPress={_onPress}>  
                <View style={styles.todo} >
                    <Icon style={styles.icon} name={ isChecked ? 'check' : 'checkbox-blank-circle-outline'} size={30} color={ isChecked ? 'green' : 'black'}/>
                    <Text style={ isChecked ? styles.textChecked  : styles.textUnchecked}>{text}</Text>
                </View>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    none: {
        display: 'none'
    },
    btn:{
        justifyContent: 'space-between',
    },
    todo:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon:{
        marginRight: 20
    },
    textChecked: {
        fontSize: 15,
        color: 'gray',
        textDecorationLine: 'line-through'
    },
    textUnchecked: {
        fontSize: 15,
    }
})

export default TodoItem