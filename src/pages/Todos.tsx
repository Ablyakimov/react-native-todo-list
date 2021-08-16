import React from 'react'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, Keyboard} from 'react-native'
import { FAB } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-native'

import HeaderMain from '../components/HeaderMain'
import ListTodo from '../components/ListTodo'
import ModalList from '../components/ModalList'
import { RootState } from '../redux/rootReducer'





const Todos = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)
  const [heightKeyboard, setHeightKeyboard] = useState(0)

  const list = useSelector((store:RootState) => store.list.list)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        const { height, screenX, screenY, width } = e.endCoordinates
        setHeightKeyboard(height)
        setKeyboardVisible(true) // or some other action
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setHeightKeyboard(0)
        setKeyboardVisible(false) // or some other action
      }
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])
  
  return (
      <View style={styles.container}>
        <HeaderMain/>
        <FlatList
          data={list}
          renderItem={({item, index}) => {
            return(
              <ListTodo localId={index} title={item.title} id={item.id} todos={item.todos} />
            )
          }}
          keyExtractor={(item,index) => index.toString()}
        />
        <Link to='/create'>
          <FAB
              style={styles.fab}
              color="white"
              icon="plus"
            />
        </Link>
        <ModalList heightKeyboard={heightKeyboard} />
      </View>
)}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    height: '100%',
    paddingBottom: 30
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 0,
    backgroundColor: 'blue'
  }
})



export default Todos

