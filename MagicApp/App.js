import React from 'react';
import { StyleSheet } from 'react-native';
import Search from './Components/Search'
import Collection from './Components/Collection'
import Group from './Components/Group'
import CardDetail from './Components/CardDetail';
import Login from './Components/Login';
import Navigation from './Navigation/Navigation'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function Root() {
  return(
    <Tab.Navigator initialRouteName='Search' screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Search') {
          iconName = focused ? 'search' : 'zoom-in';
        } else if (route.name === 'Collection') {
          iconName = focused ? 'book-open' : 'book';
        }
        else if (route.name === 'Group') {
          iconName = focused ? 'users' : 'users';
        }
        return <Icon name={iconName} type='feather' color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Collection" component={Collection} />
      <Tab.Screen name="Group" component={Group} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Root'>
        <Stack.Screen name="Root" component={Root} options={{ headerShown: false }}/>
        <Stack.Screen name="CardDetail" component={CardDetail} />
      </Stack.Navigator>
    </NavigationContainer>
    //<Navigation/>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
/*import React from "react"
class Form extends React.Component {
  state = {
    colors: [{col:""}],
  }
handleChange = (e) => {
    if (["col"].includes(e.target.className) ) {
      let colors = [...this.state.colors]
      colors[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
      this.setState({ colors }, () => console.log(this.state.colors))
    } else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() })
    }
  }
addColor = (e) => {
    this.setState((prevState) => ({
      colors: [...prevState.colors, {col:""}],
    }));
  }
handleSubmit = (e) => { e.preventDefault() }
render() {
    let {colors} = this.state
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
        {
          colors.map((val, idx)=> {
            let ColorId = `Color-${idx}`, ageId = `age-${idx}`
            return (

              <div key={idx}>
                <label htmlFor={ColorId}>{`Color #${idx + 1}`}</label>
                <input
                  type="text"
                  col={ColorId}
                  data-id={idx}
                  id={ColorId}
                  value={colors[idx].col} 
                  className="col"
                />
              </div>
            )
          })
        }
        <button onClick={this.addColor}>Add new Color</button>
        <input type="submit" value="Submit" /> 
      </form>
        
    )
  }
}
export default Form*/