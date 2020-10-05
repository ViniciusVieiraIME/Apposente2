import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Account extends React.Component {
  static navigationOptions = {
    title: 'Account'
  }

  signOut = async () => {
  try {
    await Auth.signOut()
    console.log('signed out')
    this.props.updateAuth('auth')
  } catch (err) {
    console.log('error signing out...', err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello from Route 2</Text>
        <Text onPress={() => this.props.navigation.goBack()}>Go Back</Text>
         <Text onPress={this.signOut} style={styles.link}>Sign Out</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})

export default Route2