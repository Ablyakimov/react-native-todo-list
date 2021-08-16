import React from 'react'
import { FlatList, StyleSheet, Text, View, TextInput} from 'react-native'
import { IconButton, Portal, Provider, Modal } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import { addList, closeOpenCreateList, deleteList, inputListHandler } from '../redux/action'
import { RootState } from '../redux/rootReducer'





const ModalList = ({heightKeyboard}: any) => {
  const dispatch = useDispatch()

  const list = useSelector((store:RootState) => store.list.list)
  const listInput = useSelector((store:RootState) => store.list.listInput)
  const isOpenCreateList = useSelector((store:RootState) => store.app.isOpenCreateList)
  const _hideModal = () => dispatch(closeOpenCreateList())


  const _inputHandler = (text: string) => {
    dispatch(inputListHandler(text))
  }
  const _addList = () => {
    if (listInput.trim()) {
      dispatch(addList(listInput))
    }
    
  }

  const _removeList = (id: any) => {
    dispatch(deleteList(id))
   }

  const modalStyle = function(options: number): object {
    return {
        backgroundColor: '#fff',
        height: '30%',
        padding: 20,
        position: 'absolute',
        bottom: options,
        left: 0,
        right: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    }
  }
  
  return (
    <Provider>
        <Portal>
            <Modal visible={isOpenCreateList} onDismiss={_hideModal} contentContainerStyle={modalStyle(heightKeyboard)}>
                <View>
                    <FlatList
                    style={{height:'80%'}}
                        data={list}
                        renderItem={({item}) => {
                        return(
                        <View style={styles.listContainer}>
                            <Text style={styles.listContainerText}>{item.title}</Text>
                            <IconButton color='red' onPress={() => _removeList(item.id)} icon='trash-can-outline'/>
                        </View> 
                        )
                        }}
                        keyExtractor={(item,index) => index.toString()}
                    />
                    <View style={styles.createListContainer}>
                        <TextInput autoCorrect={false} onChangeText={(text) => _inputHandler(text)} style={styles.textInput} placeholder='Название задачи' value={listInput} />
                        <IconButton onPress={_addList} color='gray' icon='plus'/>
                    </View>
                </View>  
            </Modal>
        </Portal>
    </Provider>
  )
}

const styles = StyleSheet.create({
  createListContainer:{
    flexDirection: 'row'
  },
  textInput:{
    backgroundColor: '#fff',
    width: '90%'
  },
  listContainer:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  listContainerText: {
    fontSize: 18
  },
})



export default ModalList

