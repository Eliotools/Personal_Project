import React from 'react'
import { Text } from 'react-native'
import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('Users');
console.log(usersCollection)
const Login = (props) => {
    return(
        <Text>To login</Text>
    )
}

export default Login