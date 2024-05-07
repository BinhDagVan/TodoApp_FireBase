import React, { useState } from 'react';
import { Image, Text, Alert, View, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigation.navigate('Theme'))
      .catch(error => Alert.alert('Đăng nhập thất bại', error.message));
  };
  const hasErrorEmail = () => !email.includes('@gmail.com');
  const hasErrorPassword = () => password.length < 6;

   return (
    <View style={styles.container}>
      <Image source={require('../assets/banner_nro.png')} style={styles.banner} />
      <Text style={styles.title}>Đăng nhập vào tài khoản NRO</Text>
      <TextInput
        style={styles.textInput}
        label="Email"
        value={email}
        onChangeText={setEmail}
      />
      {/* <HelperText type="error" visible={hasErrorEmail()}>
        Địa chỉ Email không hợp lệ
      </HelperText> */}
      <TextInput
        style={styles.textInput}
        label="Password"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
        right={<TextInput.Icon name="eye" onPress={() => setShowPassword(!showPassword)} />}
      />
      {/* <HelperText type="error" visible={hasErrorPassword()}>
        Password ít nhất 6 ký tự
      </HelperText> */}
      <Text style={styles.createAccountText} onPress={() => {navigation.navigate('Register')}}>Tạo tài khoản ?</Text>
      <Button style={styles.button} mode="contained" onPress={handleLogin} disabled={hasErrorEmail() || hasErrorPassword()}>
        Đăng nhập
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF9900',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    resizeMode: 'contain',
    height: 150,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    color: 'red',
    marginBottom: 10,
  },
  textInput: {
    width: '90%',
    borderTopEndRadius: 20,
    marginTop:20,
  },
  button: {
    backgroundColor: '#33CCFF',
    color: 'black',
    marginTop: 10,
    
  },
  createAccountText: {
    position: 'absolute',
    right: 20,
    color: 'blue',
    paddingBottom: 10,
    fontSize:15,
  },
});

export default Login;
