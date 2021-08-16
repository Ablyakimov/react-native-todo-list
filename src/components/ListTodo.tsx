import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { ListType } from '../types';
import { removeTodo } from '../redux/action';
import TodoItem from './TodoItem';

const ListTodo = ({ title, id, todos, localId }: ListType ) => {
    const dispatch = useDispatch()
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    const _removeTodo = (listId: number, listLocalId:number, todoId: number, todoLocalId: number ) => {
        dispatch(removeTodo(listId, listLocalId, todoId, todoLocalId))
    }
    const onSwipeValueChange = (swipeData: any) => {
        const { key, value, isActivated } = swipeData;
        if (
            value < -75 && isActivated
        ) {
            _removeTodo(id, localId, todos[key].id, +key)
        }
    };

    return(
        <View>
            <Text style={styles.title}>{title}</Text>
            <SwipeListView
                keyExtractor={(item,index) => index.toString()}
                data={todos}
                renderItem={ (data, rowMap) => (
                    <View style={styles.rowFront}>
                    <TodoItem localListId={localId} localTodoId={data.index} list_id={data.item.list_id} id={data.item.id} text={data.item.text} checked={data.item.checked} />
                    </View>
                )}
                renderHiddenItem={ (data, rowMap) => (
                    <View style={styles.rowBack}>
                        <Text><Icon size={30} name='pencil-outline' /></Text>
                        <Text><Icon color='red' size={30} name='trash-can-outline'/></Text>
                    </View>
                )}
                rightOpenValue={-75}
                rightActivationValue={-75}
                onRightActionStatusChange={onSwipeValueChange}
                leftOpenValue={75}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        textTransform: 'uppercase',
        fontSize: 16,
        color: 'gray',
        marginTop: 30,
        marginBottom: 10,
        paddingHorizontal: 20
    },
    rowFront: {
        backgroundColor: '#fff',
        borderLeftColor: 'gray',
        borderLeftWidth: 1,
        borderRightColor: 'gray',
        borderRightWidth: 1,
        justifyContent: 'center',
        height: 50,
        paddingHorizontal: 20
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderLeftColor: 'gray',
        borderLeftWidth: 1,
        borderRightColor: 'gray',
        borderRightWidth: 1,
        paddingHorizontal: 15
    },
});

export default ListTodo