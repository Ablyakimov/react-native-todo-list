import React from 'react'
import { StyleSheet, View, Text, FlatList, TextInput } from 'react-native';
import { RadioButton} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { inputTodoHandler, selectLocalList } from '../redux/action';
import { RootState } from '../redux/rootReducer';



const AddTodo = () => {
  const dispatch = useDispatch()
  const inputValue = useSelector((state:RootState) => state.todo.createTodo.todoInput)
  const localId = useSelector((state:RootState) => state.todo.createTodo.localId)
  const list = useSelector((state:RootState) => state.list.list)

  const _inputHandler = (text: string) => {
    dispatch(inputTodoHandler(text))
  }

  return (
    <View>
      <TextInput autoCorrect={false} style={styles.textInput} placeholder='Название задачи' onChangeText={(text) => _inputHandler(text)} value={inputValue}/>
      <View style={styles.container}>
        <Text style={styles.title}>Категории</Text>
        <RadioButton.Group onValueChange={newValue => dispatch(selectLocalList(Number(newValue)))} value={localId.toString()}>
        <FlatList
            data={list}
            renderItem={({item, index}) => {
              return(
                <View style={styles.radioButton}>
                  <Text style={styles.radioButtonText}>{item.title}</Text>
                  <RadioButton.Android color='blue' value={index.toString()} />
                </View>
              )
            }}
            keyExtractor={(item,index) => index.toString()}
          />
      </RadioButton.Group>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  title: {
    fontSize: 16,
    color: 'gray',
    textTransform: 'uppercase',
    marginBottom: 10,
    marginTop: 20
  },
    textInput:{
    backgroundColor: '#fff',
    padding: 20,
    fontSize: 20
  },
  radioButton:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  radioButtonText:{
    fontSize: 18
  }
})

export default AddTodo;