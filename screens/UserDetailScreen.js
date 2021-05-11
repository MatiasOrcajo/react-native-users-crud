import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const UserDetailScreen = (props) => {
    const [state, setState] = useState({
        name:"",
        email:"",
        phone:"",
    });

    const handleChange = (name, value)=>{
        setuser({...user, [name]: value})
    }

    const initialState = {
        
        id:'',
        name:'',
        email:'',
        phone:''
    }

    const [user, setuser] = useState(initialState)

    const [loading, setloading] = useState(true)

    // OBTENEMOS EL USUARIO A RENDERIZAR MEDIANTE EL ID

    const getUserById = async (id)=>{
        const dbRef = firebase.db.collection('users').doc(id);
        // se usa await por el tiempo de espera para la recepción de la petición
        const doc = await dbRef.get();
        const user = doc.data();
        console.log(user)
        setuser({
            ...user,
        })
        setloading(false)
    }

    useEffect(()=>{
        getUserById(props.route.params.userId)
    },[])

    // ELIMINAR USUARIO

    const deleteUser = async () => {
        const dbRef = firebase.db.collection('users').doc(props.route.params.userId)
        await dbRef.delete()
        props.navigation.navigate("UsersList")
    }

    const openConfirmationAlert = () => {
        Alert.alert(
          "Removing the User",
          "Are you sure?",
          [
            { text: "Yes", onPress: () => deleteUser() },
            { text: "No", onPress: () => console.log("canceled") },
          ],
          {
            cancelable: true,
          }
        );
      };

      const updateUser = async () => {
          const dbRef = firebase.db.collection('users').doc(props.route.params.userId)
          await dbRef.set({
              name: user.name,
              email: user.email,
              phone: user.phone
          })
        //   setuser(initialState)
          props.navigation.navigate("UsersList")
      }

    if(loading){
        return(
            <View>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        )
    }
    
    return (
        <ScrollView
            style={styles.container}
        // style={styles.container}
        >
            <View>
                <TextInput
                    placeholder="Name"
                    autoCompleteType="username"
                    style={styles.inputGroup}
                    value={user.name}
                    onChangeText={(value) => handleChange("name",value)}
                />
            </View>
            <View>
                <TextInput
                    autoCompleteType="email"
                    placeholder="Email"
                    style={styles.inputGroup}
                    value={user.email}
                    onChangeText={(value) => handleChange("email", value)}
                />
            </View>
            <View>
                <TextInput
                    placeholder="Phone"
                    autoCompleteType="tel"
                    style={styles.inputGroup}
                     value={user.phone}
                    onChangeText={(value) => handleChange("phone", value)}
                />
            </View>
            <View
            style={styles.button}
            //   style={styles.btn}
            >
                <Button
                    
                    title="Delete"
                    //   onPress={() => openConfirmationAlert()}
                    color="#E37399"
                    onPress={()=>openConfirmationAlert()}
                />
            </View>
            <View>
                <Button title="Update"
                    onPress={() => updateUser()} 
                    color="#19AC52" />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 35,
    },
    inputGroup:{
        flex: 1,
        padding: 10,
        marginBottom: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    button:{
        marginBottom:5,
    }
})

export default UserDetailScreen