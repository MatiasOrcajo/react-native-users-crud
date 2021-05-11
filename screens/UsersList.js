import React, {useState, useEffect} from 'react'
import {View, Button, ScrollView, StyleSheet, Text} from 'react-native'
import { set } from 'react-native-reanimated'
import firebase from '../database/firebase'
import { ListItem, Avatar } from "react-native-elements";

const UsersList = ({navigation}) => {
    
    const [users, setusers] = useState([])

    useEffect(()=>{
        
        firebase.db.collection('users').onSnapshot(onSnapshot=>{
            const users = []
            onSnapshot.docs.forEach(doc=>{
                const {name,email,phone} = doc.data()
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone
                })
            })
            setusers(users)
        })
    },[])

    return (
        <ScrollView>
            <Button title="Create user" onPress={()=> navigation.navigate("CreateUserScreen")}></Button>

            {
                users.map(user=>{
                    return(
                        
                        <ListItem key={user.id} 
                        onPress={()=>{navigation.navigate("UserDetailScreen",{
                            userId: user.id
                        })}}
                        >
                            <ListItem.Chevron/>
                            <Avatar source={{
                                uri: 
                                "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",}} rounded/>
                            <ListItem.Content>
                                <ListItem.Title>{user.name}</ListItem.Title>
                                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                                <ListItem.Subtitle>{user.phone}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })        



            }
        </ScrollView>
    )
}

export default UsersList
