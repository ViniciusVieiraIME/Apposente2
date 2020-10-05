import React from 'react'

import Home from './Home'
import Portfolio from './Portfolio'
import Transactions from './Transactions'
import Taxes from './Taxes'
import Account from './Account'
import { Image } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

function MainNav(props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: () => {
            if (route.name === 'Home') {
              return <Image source={require('../../../assets/icons/home.png')} style={{ width: 20, height: 20 }}/>
            } else if (route.name === 'Carteira') {
              return <Image source={require('../../../assets/icons/portfolio.png')} style={{ width: 20, height: 20 }}/>
            } else if (route.name === 'Transações') {
              return <Image source={require('../../../assets/icons/transactions.png')} style={{ width: 20, height: 20 }}/>
            } else if (route.name === 'Impostos') {
              return <Image source={require('../../../assets/icons/taxes.png')} style={{ width: 20, height: 20 }}/>
            } else if (route.name === 'Conta') {
              return <Image source={require('../../../assets/icons/account.png')} style={{ width: 20, height: 20 }}/>
            }
            },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}>
      <Tab.Screen name="Home">
        { screenProps => <Home {...screenProps} updateAuth={props.updateAuth} />}
      </Tab.Screen>
      <Tab.Screen name="Carteira">
        { screenProps => <Portfolio {...screenProps} updateAuth={props.updateAuth} />}
      </Tab.Screen>
      <Tab.Screen name="Transações">
        { screenProps => <Transactions {...screenProps} updateAuth={props.updateAuth} />}
      </Tab.Screen>
      <Tab.Screen name="Impostos">
        { screenProps => <Taxes {...screenProps} updateAuth={props.updateAuth} />}
      </Tab.Screen>
      <Tab.Screen name="Conta">
        { screenProps => <Account {...screenProps} updateAuth={props.updateAuth} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default MainNav


