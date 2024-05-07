import React, { useState } from 'react';
import { Image, Text, Alert, View, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigate('Theme'))
      .catch(error => Alert.alert('Đăng nhập thất bại', error.message));
  };

  const hasErrorEmail = () => !email.includes('@gmail.com');
  const hasErrorPassword = () => password.length < 6;

  return (
    <View style={{ backgroundColor: '#FF9900', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../assets/banner_nro.png')} style={{ resizeMode: 'contain', height: 150 }} />
      <Text style={{ fontSize: 30, fontWeight: '500', textAlign: 'center', color: 'red', marginBottom: 10 }}>Đăng nhập vào tài khoản NRO</Text>
      <TextInput
        style={[styles.textStyle]}
        label="Email"
        value={email}
        onChangeText={setEmail}
      />
      <HelperText type="error" visible={hasErrorEmail()}>
        Địa chỉ Email không hợp lệ
      </HelperText>
      <TextInput
        style={[styles.textStyle]}
        label="Password"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
        right={<TextInput.Icon name="eye" onPress={() => setShowPassword(!showPassword)} />}
      />
      <HelperText type="error" visible={hasErrorPassword()}>
        Password ít nhất 6 ký tự
      </HelperText>
      <Button style={{ backgroundColor: '#33CCFF', color: 'black' }} mode="contained" onPress={handleLogin} disabled={hasErrorEmail() || hasErrorPassword()}>
        Đăng nhập
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    width: '90%',
    borderTopEndRadius: 20,
  },
});

export default Login;
