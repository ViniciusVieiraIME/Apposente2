import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Transactions extends React.Component {
  static navigationOptions = {
    title: 'Transactions'
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello from Route 2</Text>
        <Text onPress={() => this.props.navigation.goBack()}>Go Back</Text>
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

export default Transactions