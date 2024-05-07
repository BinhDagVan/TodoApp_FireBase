import { useState } from 'react';
import { Image, Text, Alert, View ,StyleSheet} from 'react-native';
import { Button , HelperText, Icon, TextInput} from "react-native-paper";
import auth from '@react-native-firebase/auth';


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleCreateAccount = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Đăng ký thành công');
        navigation.navigate('Login'); // Chuyển đến trang đăng nhập sau khi đăng ký thành công
      })
      .catch((e) => Alert.alert('Đăng ký thất bại', e.message));
  };
  const hasErrorPassword = () => password.length < 6 ;
  const hasErrorPasswordConfirm = () => passwordConfirm != password;
  const hasErrorEmail = () => !email.includes("@gmail.com");

  return (
    <View style={{backgroundColor:'#FF9900', flex: 1, justifyContent: 'center', alignItems:'center' }}>
      <Image source={require('./assets/banner_nro.png')} style={{resizeMode: 'contain', height:150,}}>
      </Image>
      <Text style={{fontSize:30 , fontWeight:500, textAlign: 'center', color: 'red', marginBottom:10}}>Create Account NRO</Text>
      <TextInput style={[styles.textStyle]} label="Email" value={email} onChangeText={setEmail} />
      <HelperText type="error" visible={hasErrorEmail()}>
        Địa chỉ Email không hợp lệ
      </HelperText>
      <TextInput
        style={[styles.textStyle]} 
        label="Password"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
        right={<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />}
      />
      <HelperText type ="error"  visible={hasErrorPassword()}>
        Password it nhat 6 ki tu 
        </HelperText>
      <TextInput
        style={[styles.textStyle]} 
        label="Password Confirm"
        secureTextEntry={!showPasswordConfirm}
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        right={<TextInput.Icon icon="eye" onPress={() => setShowPasswordConfirm(!showPasswordConfirm)} />}
      />
      <HelperText type ="error"  visible={hasErrorPasswordConfirm()}>
        Password Confirm khong khop
        </HelperText>
      <Button style={{backgroundColor:'#33CCFF',color:'black'}}  mode="contained" onPress={handleCreateAccount} disabled = {hasErrorEmail() || hasErrorPassword() || hasErrorPasswordConfirm()}>
        Đăng ký</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    width:'90%',
    borderTopEndRadius:20,
  }
});


export default Register;


