import React, {useState} from 'react'
import {View, Button, TextInput, ScrollView, StyleSheet} from 'react-native'
import firebase from '../database/firebase'

const CreateUserScreen = ({navigation}) => {
    const [state, setState] = useState({
        name:"",
        email:"",
        phone:"",
    });

    const handleChange = (name, value)=>{
        setState({...state, [name]: value})
    }

    const saveNewUser = async()=>{
        if(state.name === ""){
            alert("Please provide a name")
        } else{
            try {
                await firebase.db.collection("users").add({
                    name: state.name,
                    email: state.email,
                    phone: state.phone
                })
                alert("created")
                navigation.navigate("UsersList");
            } catch (error) {
                console.log(error)
            }
           
        }

    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Name User" onChangeText={(value)=> {handleChange("name", value)}}></TextInput>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Email User" onChangeText={(value)=> {handleChange("email", value)}}></TextInput>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Phone User" onChangeText={(value)=> {handleChange("phone", value)}}></TextInput>
            </View>
            <View>
                <Button title="Send" onPress={()=> saveNewUser()}></Button>
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
})


export default CreateUserScreen