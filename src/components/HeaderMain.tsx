import React from 'react'
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper'
import { useDispatch } from 'react-redux';
import { showOpenCreateList } from '../redux/action';

const HeaderMain = () => {
  const dispatch = useDispatch()

  const _openModal = () => dispatch(showOpenCreateList())

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Content style={styles.content} titleStyle={styles.title} title="Задачи"/>
      <Appbar.Action icon="shape-outline" onPress={_openModal} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
    header:{
        backgroundColor: '#fff',
        justifyContent: 'flex-start'
    },
    title:{
        fontSize: 24,
    },
    content:{
        alignItems: 'flex-start',
    }
})

export default HeaderMain;