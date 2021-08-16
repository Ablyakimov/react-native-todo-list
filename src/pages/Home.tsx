
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-native';
import { fetchList } from '../redux/action';
import CreateTodo from './CreateTodo';
import Todos from './Todos';


const Home = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchList())
  },[])

  return (
    <View style={styles.container}>
        <Route exact path="/" component={Todos} />
        <Route path="/create" component={CreateTodo} />
    </View>
      
        
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
})

export default Home;

