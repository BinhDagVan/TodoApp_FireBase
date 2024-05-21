import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import COLORS from '../constants';

const UpdateService = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, title: initialTitle, price: initialPrice, imageUrl: initialImageUrl } = route.params;

  const [title, setTitle] = useState(initialTitle);
  const [price, setPrice] = useState(initialPrice.toString());
  const [imageUri, setImageUri] = useState(initialImageUrl);

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const handleUpdate = async () => {
    // Your update logic here
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Service Name"
        style={styles.input}
      />
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="Price"
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Select Image" onPress={selectImage} />
      {imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : null}
      <Button title="Update Service" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: COLORS.grey,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default UpdateService;
