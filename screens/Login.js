import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { login, useMyContextController } from '../store';
import { COLORS } from '../constants';
import { Colors } from 'react-native-paper';
import AddNewService from './AddnewServices';

const Login = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;
    const [email, setEmail] = useState('1@gmail.com');
    const [password, setPassword] = useState('111111');
    const [showpassword, setShowPassword] = useState(false);

    const hasErrorEmail = () => !email.includes('@');
    const hasErrorPassword = () => password.length < 6;

    const handleLogin = () => {
        login(dispatch, email, password);
    };

    useEffect(() => {
        console.log(userLogin);
        if (userLogin != null) {
            if (userLogin.role === 'admin') {
                navigation.navigate('Admin');
            } else if (userLogin.role === 'customer') {
                navigation.navigate('Customer');
            }
        }
    }, [userLogin]);

    const onSubmit = () => {
        login(dispatch, email, password);
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text
                style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    color: 'pink',
                    marginTop: 50,
                    marginBottom: 10,
                }}
            >
                Login
            </Text>

            <TextInput label="Email" value={email} onChangeText={setEmail} />
            <HelperText type="error" visible={hasErrorEmail}>
                Sai địa chỉ email
            </HelperText>

            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showpassword}
            />
            <HelperText type="error" visible={hasErrorPassword}>
                Password ít nhất 6 kí tự
            </HelperText>

            <Button style={{backgroundColor:'#FF3366'}} mode="contained"  onPress={handleLogin}>
                Login
            </Button>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text>Don't have an account?</Text>
                <Button onPress={() => navigation.navigate('Register')}>Create new account</Button>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={() => navigation.navigate('AddNewService')}>Forgot Password</Button>
            </View>
        </View>
    );
};

export default Login;