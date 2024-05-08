import { View, Text, ScrollView, FlatList, Alert } from 'react-native'
import { Appbar, TextInput, Button } from 'react-native-paper'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const DemoTheme = ({navigation}) => {
  const [newTodo, setNewTodo] = useState('');
  const [Jobs, setJobs] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {


    // Load danh sách Jobs từ Firestore khi component được render
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        firestore()
          .collection('users')
          .doc(userId)
          .get()
          .then(doc => {
            if (doc.exists) {
              const userData = doc.data();
              setUserName(userData.fullname);
            } else {
              console.log('No such document!');
            }
          })
          .catch(error => {
            console.log('Error getting document:', error);
          });

          const jobListener = firestore()
          .collection('Jobs')
          .where('userId', '==', userId)
          .onSnapshot(snapshot => {
            const newJobs = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setJobs(newJobs);
          });

        return () => {
          jobListener();
        };
      } else {
        setJobs([]);
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim() === '') {
      Alert.alert('Error', 'Todo cannot be empty');
      return;
    }

    try {
      const currentUser = auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;

        await firestore()
          .collection('Jobs')
          .add({
            text: newTodo,
            createdAt: firestore.FieldValue.serverTimestamp(),
            userId: userId,
          });

        setNewTodo('');
      } else {
        Alert.alert('Error', 'User not signed in');
      }
    } catch (error) {
      console.error('Error adding todo: ', error);
    }
  };

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => {
        console.error('Error logging out: ', error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar>
        <Appbar.Content  title={userName ? userName : 'Theme'}></Appbar.Content>
        <Appbar.Action icon="logout" onPress={handleLogout} />
      </Appbar>
      
      <View style={{ flexDirection: 'row' }}>
            <TextInput   
            style ={{width:'80%', marginLeft:5}}   
            label={'Add New'}
            value={newTodo}
            mode='outlined'
            onChangeText={setNewTodo}
        />
        <Button style ={{marginLeft:2,marginTop:5, width:'18%', height:50, backgroundColor:'#FF9900', borderRadius: 10, justifyContent:'center'}} onPress={handleAddTodo}>Add </Button> 
      </View>

      <FlatList
        style={{ flex: 1 , marginTop:10 }}
        data={Jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text style={{fontSize:25, marginLeft:10}}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default DemoTheme;
