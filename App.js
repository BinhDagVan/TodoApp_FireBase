import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { MyContextControllerProvider } from "./store";
import Router from "./screens/Router";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import COLORS from "./constants";
import RouterServices from "./screens/RouterServices";

const Stack = createStackNavigator();

const initial = () => {
  const USERS = firestore().collection("USERS");
  const admin = {
    name: "admin",
    phone: "0911111111",
    address: "Binh Duong",
    email: "admin@gmail.com",
    password: "111111",
    role: "admin"
  };
  USERS.doc(admin.email).onSnapshot(u => {
    if (!u.exists) {
      auth()
        .createUserWithEmailAndPassword(admin.email, admin.password)
        .then(() =>
          USERS.doc(admin.email).set(admin).then(() => console.log("Add new user admin!"))
        );
    }
  });
};

const App = () => {
  useEffect(() => {
    initial();
  }, []);

  return (
    <PaperProvider>
      {/* <StatusBar backgroundColor={COLORS.pink} /> */}
      <MyContextControllerProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Router" component={Router} />
          </Stack.Navigator>
        </NavigationContainer>
      </MyContextControllerProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {}
});

export default App;
