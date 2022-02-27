import { useState, useEffect } from 'react'
import { StatusBar, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import { Card, Button, Input, Icon } from 'react-native-elements';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "./firebase-config";

const Auth = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authStatus, setAuthStatus] = useState(""); // Contient l'info de si l'email a été vérifié
  const [user, setUser] = useState({});
  const [secure, setSecure] = useState(true);
  const toogleSecure = () => setSecure(value => !value)
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((resuser) => {
        console.log("Mail de vérification envoyé")
        sendEmailVerification(auth.currentUser);
        setAuthStatus(resuser.user.emailVerified.toString())

        Alert.alert("Verifaction Email send, go check it and then Log In")
      })

      console.log(Object.getOwnPropertyNames(auth.currentUser));
      console.log(user);
    } catch (error) {
      console.log(error.message);
      Alert.alert(error.message)
      //TODO Homemade msg
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      ).then((resuser) => {
        console.log("Logged in")
        console.log(resuser.user.emailVerified)
        setAuthStatus(resuser.user.emailVerified.toString())
        if (authStatus == 'true')
          navigation.navigate('Root')
        else
          Alert.alert("Email non verifié")
      }).catch((err) => {
        console.log(err)
        setAuthStatus(err)
      });
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth)
      .then(() => {
        setAuthStatus('First sign in')
      }).catch((err) => {
        setAuthStatus(err)
      })
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.5 }}></View>
      <SafeAreaView style={{ flex: 4 }}>
        <Card containerStyle={styles.card}>
          <Card.Title style={{ color: "#14213D" }} h3>Authentification</Card.Title>
          <Card.Divider color="#14213D" />
          <Input
            inputStyle={{ marginTop: 1, color: "#14213D" }}
            label="Email"
            labelStyle={{ color: "#14213D" }}
            leftIcon={{ type: 'feather', name: 'mail', color: "#14213D" }}
            onChangeText={setEmail}
            value={email}
            errorMessage={reg.test(email) ? "" : "Enter valid email"}
          />
          <Input
            inputStyle={{ marginTop: 1, color: "#14213D" }}
            label="Password"
            labelStyle={{ color: "#14213D" }}
            leftIcon={
              <TouchableOpacity onPress={toogleSecure}>
                <Icon type='feather' color="#14213D" name={secure ? 'lock' : 'unlock'} />
              </TouchableOpacity>
            }
            onChangeText={setPassword}
            value={password}
            secureTextEntry={secure}
          />
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <View style={{ width: "49%", marginRight: 2 }}>
              <Button
                icon={{
                  name: "log-in",
                  type: "feather",
                  size: 15,
                  color: reg.test(email) && password ? "#FFFFFF" : "#FCA311"
                }}
                buttonStyle={{
                  borderColor: "#FCA311",
                  backgroundColor: "#FCA311",
                  borderWidth: 1.5,
                  borderRadius: 10,
                }}
                titleStyle={{
                  color: "#FFFFFF"
                }}
                disabledStyle={{
                  borderColor: "#FCA311",
                  backgroundColor: "#FFFFFF",
                  borderWidth: 1.5,
                  borderRadius: 10,
                }}
                disabledTitleStyle={{
                  color: "#FCA311"
                }}
                type='outline'
                title="Log In"
                disabled={reg.test(email) && password ? false : true}
                onPress={login}
              />
            </View>
            <View style={{ width: "49%", marginLeft: 2 }}>
              <Button
                icon={{
                  name: "user-plus",
                  type: "feather",
                  size: 15,
                  color: reg.test(email) && password ? "#FFFFFF" : "#FCA311"
                }}
                buttonStyle={{
                  borderColor: "#FCA311",
                  backgroundColor: "#FCA311",
                  borderWidth: 1.5,
                  borderRadius: 10,
                }}
                titleStyle={{
                  color: "#FFFFFF"
                }}
                disabledStyle={{
                  borderColor: "#FCA311",
                  backgroundColor: "#FFFFFF",
                  borderWidth: 1.5,
                  borderRadius: 10,
                }}
                disabledTitleStyle={{
                  color: "#FCA311"
                }}
                type='outline'
                title="Sign Up"
                disabled={reg.test(email) && password ? false : true}
                onPress={register}
              />
            </View>
          </View>
          <Card.Divider />
        </Card>
      </SafeAreaView>
      <View style={{ flex: 0.5 }}></View>
      <StatusBar style="auto" />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    flexDirection: 'row'
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,

    backgroundColor: "#FFFFFF",
    borderRadius: 10
  }
});

export default Auth

