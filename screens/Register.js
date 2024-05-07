import { useState } from 'react';
import { Image, Text, Alert, View ,StyleSheet} from 'react-native';
import { Button , HelperText, Icon, TextInput} from "react-native-paper";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

const Register = ({navigation}) => {
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleCreateAccount = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Lưu fullname vào cơ sở dữ liệu Firestore
        firestore()
          .collection('users')
          .doc(user.uid)
          .set({
            fullname: fullname,
            email: email,
            // Các thông tin khác nếu cần
          })
          .then(() => {
            Alert.alert('Đăng ký thành công với tài khoản: ' + fullname);
            navigation.navigate('Login');
          })
          .catch((error) => {
            Alert.alert('Có lỗi xảy ra khi lưu thông tin người dùng: ', error.message);
          });
      })
      .catch((error) => {
        Alert.alert('Tài khoản đã tồn tại hoặc sai thông tin đăng ký: ', error.message);
      });
  };
  const hasErrorPassword = () => password.length < 6 ;
  const hasErrorPasswordConfirm = () => passwordConfirm != password;
  const hasErrorEmail = () => !email.includes("@gmail.com");
  const hasErrorName = () => fullname.length < 1 ;

  return (
    <View style={{backgroundColor:'#2d8cec', flex: 1, justifyContent: 'center', alignItems:'center' }}>
      <Image source={require('../assets/1691964348159.png')} style={{resizeMode: 'contain', height:150,}}>
      </Image>
      <Text style={{fontSize:30 , fontWeight:500, textAlign: 'center', color: 'red', marginBottom:10}}>Create a new AWS account</Text>
      <TextInput style={[styles.textStyle]} label="Full Name" value={fullname} onChangeText={setName} />
      <HelperText type="error" visible={hasErrorName()}>
        Không được để trống
      </HelperText>
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
      <Button style={{backgroundColor:'#FF9900',marginTop:10,}}  mode="contained" onPress={handleCreateAccount} disabled = {hasErrorEmail() || hasErrorPassword() || hasErrorPasswordConfirm()}>
        Đăng ký</Button>
        <Text style={styles.createAccountText} onPress={() => {navigation.navigate('Login')}}>Login In ?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    width:'90%',
    borderTopEndRadius:20,
    marginTop:20,
  },
  createAccountText: {
    marginTop:10,
    color: 'blue',
    fontSize:15,
  },
});


export default Register;


