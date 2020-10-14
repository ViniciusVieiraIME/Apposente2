import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Portfolio extends React.Component {
  static navigationOptions = {
    title: 'Portfolio'
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

export default Portfolio