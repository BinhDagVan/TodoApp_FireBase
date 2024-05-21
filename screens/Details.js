import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import COLORS from '../constants';

const DetailService = () => {
  const route = useRoute();
  const { title, price, imageUrl } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
      {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.image} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    color: COLORS.grey,
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default DetailService;