
import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import AddTodo from '../components/AddTodo';
import HeaderCreateTodo from '../components/HeaderCreateTodo';


const CreateTodo = () => {
  return (
    <View style={styles.container}>
        <HeaderCreateTodo/>
        <AddTodo/>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    paddingBottom: 30
  }
})

export default CreateTodo;