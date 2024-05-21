import { createContext, useContext, useMemo, useReducer } from "react";
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { alert} from "react-native"

const MyContext= createContext();
MyContext.displayName = "MyContextContext"
function reducer(state,action) {
    switch (action.type) {
        case "USER_LOGIN": {
            return {...state,userLogin: action.value};
        }
        default: {
            throw new Error('Unhandled action type: ${action.type}');
        }
    }
}
//react context provider
function MyContextControllerProvider({children}) {
    const initialState={
        userLogin:null,
    };
    const [controller,dispatch] =useReducer(reducer,initialState);
    const value =useMemo(()=> [controller,dispatch], [controller,dispatch]);
    return <MyContext.Provider value={value}>{children}</MyContext.Provider>
}

//react custom hook for using context 
function useMyContextController() {
    const context =useContext(MyContext);
    if(!context) {
        throw new Error(
            "useMyContextController should be used inside the MyContextControllerProvider"
        );
    }
    return context;
}
//table
const USERS = firestore().collection("USERS")
const SERVICES = firestore().collection("SERVICES")
//actions
const login=(dispatch,email,password)=>{
    auth().signInWithEmailAndPassword(email,password)
    .then(
        ()=>
            USERS.doc(email).onSnapshot(u => {
                const value=u.data();
                console.log("Đăng nhập thành công với User : " ,value)
                dispatch({type:"USER_LOGIN",value})
            })      
    )
    .catch(e => alert("Sai user và Password"))
}
const logout = (dispatch) => {
    dispatch({type:"USER_LOGIN", })
}
const createNewService = (newService) => {
    newService.finalUpdate =firestore.FieldValue.serverTimetamp()
    SERVICES.add(newService)
    .then(()=> alert("Add new service ! "))
    .catch((e)=> alert(e))
}



export{
    MyContextControllerProvider,
    useMyContextController,
    login,
    logout,
    createContext,
};