import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper'; // Import Button from react-native-paper
import { launchImageLibraryAsync } from 'expo-image-picker'; // Import launchImageLibraryAsync from expo-image-picker
import { FileSystem } from 'expo'; // Import FileSystem from expo
import COLORS from '../constants';

const AddNewService = () => {
  const [service, setService] = useState('');
  const [serviceError, setServiceError] = useState('');
  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState('');
  const [imageUri, setImageUri] = useState(null); // State to hold the image URI

  const addService = async () => {
    // Validate service name
    if (service.trim() === '') {
      setServiceError('Hãy nhập dịch vụ.');
      return;
    } else {
      setServiceError('');
    }

    // Validate price
    if (isNaN(parseFloat(price))) {
      setPriceError('Hãy nhập giá tiền.');
      return;
    } else {
      setPriceError('');
    }

    // Upload image
    let imageUrl = '';
    if (imageUri) {
      const uriParts = imageUri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        name: `image.${fileType}`,
        type: `image/${fileType}`,
      });

      try {
        const response = await fetch('YOUR_UPLOAD_ENDPOINT', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const responseData = await response.json();
        imageUrl = responseData.imageUrl; // Assuming your API returns the uploaded image URL
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    // Add service to database
    // Example code (replace with your database logic)
    console.log('Service:', service);
    console.log('Price:', parseFloat(price));
    console.log('Image URL:', imageUrl);

    // Reset form fields
    setService('');
    setPrice('');
    setImageUri(null);
  };

  const selectImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Service name*"
            value={service}
            onChangeText={setService}
            style={styles.textInput}
          />
          <Text style={styles.errorText}>{serviceError}</Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Price*"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={styles.textInput}
          />
          <Text style={styles.errorText}>{priceError}</Text>
        </View>
        <View style={styles.inputWrapper}>
          <Button onPress={selectImage}>Select Image</Button>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
        </View>
        <View>
          <Button
            style={{ backgroundColor: COLORS.blue, width: 300, height: 50, justifyContent: 'center' }}
            contentStyle={{ height: 40 }}
            labelStyle={{ fontSize: 16 }}
            onPress={addService}
          >
            Thêm
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: 'column',
    marginBottom: 10,
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: COLORS.grey,
    height: 50,
    paddingHorizontal: 10,
    width: 390,
    borderRadius: 15,
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default AddNewService;
